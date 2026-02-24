import React, { useState, useCallback, useMemo } from 'react';
import { useCharacterContext } from '../context/CharacterContext';
import { GoogleGenAI, Type } from '@google/genai';
import type { DGItem } from '../../types';
import { ITEMS } from '../item-data';
import { EquipmentList } from './gear/EquipmentList';
import { AgentInventory } from './gear/AgentInventory';
import { CustomItemCreator } from './gear/CustomItemCreator';
import { PromptInfoModal } from './PromptInfoModal';
import { RestrictedRequisitionModal } from './gear/RestrictedRequisitionModal';
import { TerminalConsequenceDisplay } from './gear/TerminalConsequenceDisplay';
import { ToolsOfTheTrade } from './gear/ToolsOfTheTrade';
import { ItemDetailModal } from './gear/ItemDetailModal';
import { RULES_TEXT } from '../item-creation-rules';

// --- AI PROMPT ENGINEERING FOR CUSTOM ITEMS ---

const buildPhase1Prompt = (itemName: string, itemDescription: string): string => {
    const allSections = [...new Set(ITEMS.map(i => i.section))];
    return `You are an expert game designer for the Delta Green role-playing game. Your first task is to analyze an item concept and categorize it.

Item Name: "${itemName}"
Description: "${itemDescription || 'No description provided.'}"

1.  **Categorize**: Determine the most appropriate item "section" from this list: ${allSections.join(', ')}.
2.  **Analyze**: Based on the name and description, identify keywords that describe the item's function and relevant game mechanics.

The output MUST be a raw JSON object with two keys: "section" (a string) and "analysisKeywords" (an array of strings).

Keywords to consider:
weapon, melee, ranged, explosive, lethality, armor, vehicle, surveillance, computer, tool, medical, survival, restricted, modern, unnatural, service, bonus, penalty, consumable.

Example for a "Neural-Inhibitor Grenade":
{
  "section": "Stun Grenades",
  "analysisKeywords": ["weapon", "ranged", "consumable", "penalty", "restricted", "modern", "unnatural"]
}`;
};

const buildPhase2Prompt = (itemName: string, itemDescription: string, section: string, decadeDisplayName: string, rulesContent: string): string => {
    return `You are an expert game designer for the Delta Green RPG. Your task is to generate a balanced and thematic item based on the provided concept and rules.

**User Input (Item Concept):**
- Name: "${itemName}"
- Description: "${itemDescription || 'No description provided.'}"
- Determined Section: "${section}"

**Input Processing Instructions:**
1.  **Normalize Name:** Clean up the user-provided name. This includes fixing any obvious spelling or capitalization errors and applying Title Case (e.g., "portable emf detector" becomes "Portable EMF Detector").
2.  **Refine Description:** If the user provided a description, correct any obvious typos or grammatical errors to create a clear, professional-sounding description for the item.

**Operational Era:**
The current operational era is the **${decadeDisplayName}**. All technology, terminology, and functionality for the new item MUST be appropriate for this time period. Do not create an item that is anachronistically advanced.

**Expense Level Guidelines (CRITICAL):**
You MUST use the following guidelines to set the 'expense' field. Be extremely realistic. Your primary goal is to get this field correct.
- **Incidental (Up to ~$150):** Common, everyday items that draw no attention. Simple tools, burner phones, basic civilian clothing, a meal, a taxi. If an ordinary person can buy it easily and it's not specialized, it's Incidental.
- **Standard ($200 to $800):** Substantial purchases. A standard pistol/rifle, a basic computer, a week at a motel. **Crucially, items requiring specialized sources (like a gun store) or online purchase that could be tracked are AT LEAST Standard.**
- **Unusual ($1,000 to $5,000):** Specialized or expensive gear. A good rifle with a scope, a cheap used car, a forged passport. **Crucially, if an item is on a federal watch list or its purchase could draw attention for potential illegal/covert activity, it is AT LEAST Unusual.**
- **Major ($6,000 to $30,000):** Very expensive or restricted items. Heavy weapons, professional forgeries, a new vehicle.
- **Extreme ($36,000+):** Black budget or millionaire-level items. Military hardware, chartered jets, a new identity.

**Master Rulebook for Item Creation:**
You MUST follow these rules precisely.
---
${rulesContent}
---

**Task:**
1.  **Identify Archetype:** First, identify the correct "Item Archetype" from the Master Rulebook that best fits the item concept.
2.  **Generate JSON:** Generate a complete JSON object for the item. This object MUST strictly adhere to the schema for the identified archetype, filling in all relevant properties and leaving unused ones null. The generated stats must be balanced and consistent with the provided rules. The 'name' and 'description' fields in your output JSON must reflect the cleaned-up and normalized text from the 'Input Processing Instructions'.

**CRITICAL JSON Fields:**
- \`isRestricted\`: Set to \`true\` if the item is illegal for civilians, military-grade, or requires special government clearance. Otherwise, set to \`false\`.
- \`sourceType\`: This field MUST be set to the string \`"ai"\`.

The output MUST be a raw JSON object only.`;
};

interface GearTabProps {
    kitInventory: DGItem[];
    inventory: DGItem[];
    ownedItems: Set<string>;
    isUnderReview: boolean;
    terminalConsequence: string | null;
    onDrop: (e: React.DragEvent<HTMLDivElement>) => void;
    onDeleteItem: (itemName: string) => void;
    onAcquisitionRoll: (item: DGItem, type: 'Get' | 'Requisition', isRisky?: boolean) => { success: boolean, roll: number, target: number };
}


export const GearTab: React.FC<GearTabProps> = ({ kitInventory, inventory, ownedItems, isUnderReview, terminalConsequence, onDrop, onDeleteItem, onAcquisitionRoll }) => {
    const { attributes, skills, setToastMessage, setEquipmentKit, activeKitName, ai, aggregatedData, findFailedItems, requisitionFailedItems, fullyFailedItems } = useCharacterContext();
    const [filterText, setFilterText] = useState('');
    const [acquisitionInProgress, setAcquisitionInProgress] = useState<string | null>(null);
    const [customItemName, setCustomItemName] = useState('');
    const [customItemDescription, setCustomItemDescription] = useState('');
    const [isGeneratingCustomItem, setIsGeneratingCustomItem] = useState(false);
    const [generationPhase, setGenerationPhase] = useState<string | null>(null);
    const [generatedCustomItem, setGeneratedCustomItem] = useState<DGItem | null>(null);
    const [isCustomItemPromptModalVisible, setIsCustomItemPromptModalVisible] = useState(false);
    const [phase1Prompt, setPhase1Prompt] = useState<string | null>(null);
    const [phase2Prompt, setPhase2Prompt] = useState<string | null>(null);
    const [showItemStats, setShowItemStats] = useState(false);
    const [requisitionModalItem, setRequisitionModalItem] = useState<DGItem | null>(null);
    
    // Mobile State
    const [mobileTab, setMobileTab] = useState<'list' | 'inventory'>('list');
    const [modalItem, setModalItem] = useState<DGItem | null>(null);
    
    const decadeConfig = useMemo(() => aggregatedData.DECADES.find(d => d.name === ai.decade), [aggregatedData.DECADES, ai.decade]);
    const decadeDisplayName = decadeConfig?.displayName || 'Modern era';

    const combinedPrompt = useMemo(() => {
        if (!phase1Prompt && !phase2Prompt) {
            return "The prompts used to generate custom items via AI will appear here. \n\nPhase 1 involves categorizing the item based on its name and description. \n\nPhase 2 involves generating game-ready stats based on that category and a set of game rules.";
        }
        let promptText = '';
        if (phase1Prompt) { promptText += `## Phase 1: Categorization & Analysis\n\nThis prompt is sent to the AI first to determine the item's general category.\n\n---\n\n${phase1Prompt}`; }
        if (phase2Prompt) { promptText += `\n\n\n## Phase 2: Stat Generation\n\nBased on the category from Phase 1, this second prompt is sent to generate the final stats.\n\n---\n\n${phase2Prompt}`; }
        return promptText;
    }, [phase1Prompt, phase2Prompt]);

    const handleGetItem = (item: DGItem) => {
        setAcquisitionInProgress(item.name);
        setTimeout(() => {
            onAcquisitionRoll(item, 'Get');
            setAcquisitionInProgress(null);
        }, 500);
    };

    const handleRequisitionItem = (item: DGItem, isRisky: boolean = false) => {
        setAcquisitionInProgress(item.name);
        setTimeout(() => {
            onAcquisitionRoll(item, 'Requisition', isRisky);
            setAcquisitionInProgress(null);
        }, 500);
    };

    const handleAttemptRequisition = (item: DGItem) => {
        if (item.isRestricted) { setRequisitionModalItem(item); } 
        else { handleRequisitionItem(item, false); }
    };

    const handleNormalRequisition = () => {
        if (requisitionModalItem) { handleRequisitionItem(requisitionModalItem, false); }
        setRequisitionModalItem(null);
    };

    const handleRiskyRequisition = () => {
        if (requisitionModalItem) { handleRequisitionItem(requisitionModalItem, true); }
        setRequisitionModalItem(null);
    };

    const handleAddItemFromModal = useCallback((item: DGItem) => {
        if (item.isRestricted && isUnderReview) {
            setToastMessage("Cannot acquire restricted items while under review.", 'warning');
            return;
        }
        const fakeEvent = {
            dataTransfer: { getData: () => JSON.stringify(item) },
            preventDefault: () => {},
        } as unknown as React.DragEvent<HTMLDivElement>;
        onDrop(fakeEvent);
        setModalItem(null);
        setMobileTab('inventory');
    }, [isUnderReview, setToastMessage, onDrop]);

    const handleGenerateCustomItem = async () => {
        if (!customItemName) {
            setToastMessage("Please provide a name for the custom item.", 'warning');
            return;
        }
        setIsGeneratingCustomItem(true);
        setGeneratedCustomItem(null);
        setPhase1Prompt(null);
        setPhase2Prompt(null);
        try {
            const gemini = new GoogleGenAI({ apiKey: process.env.API_KEY });
            setGenerationPhase("Phase 1: Categorizing...");
            const builtPhase1Prompt = buildPhase1Prompt(customItemName, customItemDescription);
            setPhase1Prompt(builtPhase1Prompt);
            const phase1Response = await gemini.models.generateContent({
                model: 'gemini-2.5-flash', contents: builtPhase1Prompt,
                config: {
                    responseMimeType: "application/json",
                    responseSchema: { type: Type.OBJECT, properties: { section: { type: Type.STRING }, analysisKeywords: { type: Type.ARRAY, items: { type: Type.STRING } } }, required: ["section", "analysisKeywords"] }
                }
            });
            const { section } = JSON.parse(phase1Response.text.trim());
            const promptForPhase2 = buildPhase2Prompt(customItemName, customItemDescription, section, decadeDisplayName, RULES_TEXT);
            setPhase2Prompt(promptForPhase2);
            setGenerationPhase("Phase 2: Generating stats...");
            const phase2Response = await gemini.models.generateContent({
                model: 'gemini-2.5-flash', contents: promptForPhase2,
                config: {
                    responseMimeType: "application/json",
                    responseSchema: {
                        type: Type.OBJECT,
                        properties: { 
                            section: { type: Type.STRING }, name: { type: Type.STRING }, 
                            skill: { type: Type.STRING, nullable: true }, damage: { type: Type.STRING, nullable: true }, 
                            armorPiercing: { type: Type.STRING, nullable: true }, 
                            expense: { type: Type.STRING, enum: ['None', 'Incidental', 'Standard', 'Unusual', 'Major', 'Extreme'] }, 
                            range: { type: Type.STRING, nullable: true }, uses: { type: Type.STRING, nullable: true }, 
                            radius: { type: Type.STRING, nullable: true }, victimsPenalty: { type: Type.STRING, nullable: true }, 
                            baseRange: { type: Type.STRING, nullable: true }, lethality: { type: Type.STRING, nullable: true }, 
                            killRadius: { type: Type.STRING, nullable: true }, ammoCapacity: { type: Type.STRING, nullable: true }, 
                            description: { type: Type.STRING, nullable: true },
                            isRestricted: { type: Type.BOOLEAN, nullable: true },
                            sourceType: { type: Type.STRING, enum: ['core', 'homebrew', 'ai'], nullable: true },
                        },
                        required: ["section", "name", "expense"]
                    }
                }
            });
            const result = JSON.parse(phase2Response.text.trim());
            setGeneratedCustomItem(result);
        } catch (e) {
            console.error("Custom item generation failed:", e);
            setToastMessage("AI failed to generate item. Please try again or rephrase your description.", 'error');
        } finally {
            setIsGeneratingCustomItem(false);
            setGenerationPhase(null);
        }
    };

    const handleAcceptGeneratedItem = () => {
        if (generatedCustomItem) {
            onDrop({ dataTransfer: { getData: () => JSON.stringify(generatedCustomItem) }, preventDefault: () => {}, } as unknown as React.DragEvent<HTMLDivElement>);
            setGeneratedCustomItem(null);
            setCustomItemName('');
            setCustomItemDescription('');
            setPhase1Prompt(null);
            setPhase2Prompt(null);
        }
    };
    
    const handleScrapGeneratedItem = () => {
        setGeneratedCustomItem(null);
        setPhase1Prompt(null);
        setPhase2Prompt(null);
    };

    const filteredItems = useMemo(() => {
        const allItems = [...new Set(ITEMS.map(item => item.name))].map(name => ITEMS.find(item => item.name === name)!);
        if (!filterText) return allItems;
        return allItems.filter(item => item.name.toLowerCase().includes(filterText.toLowerCase()));
    }, [filterText]);

    return (
        <div className="bg-gray-800/50 p-6 rounded-lg border-2 border-gray-700/50 max-w-7xl mx-auto">
             <ItemDetailModal item={modalItem} onClose={() => setModalItem(null)} onAddItem={handleAddItemFromModal} />
             {isCustomItemPromptModalVisible && <PromptInfoModal title="AI Item Generation Prompts" prompt={combinedPrompt} onClose={() => setIsCustomItemPromptModalVisible(false)} />}
             <RestrictedRequisitionModal item={requisitionModalItem} attributes={attributes} skills={skills} onClose={() => setRequisitionModalItem(null)} onNormal={handleNormalRequisition} onRisky={handleRiskyRequisition} />
             <h2 className="text-3xl font-bold text-green-400 text-center mb-2">Standard Issue & Requisitions</h2>
             <p className="text-gray-400 text-center mb-8">Drag items (desktop) or tap items (mobile) to add them to your inventory, then attempt to acquire them.</p>
             {terminalConsequence && <TerminalConsequenceDisplay consequence={terminalConsequence} />}

            {/* --- DESKTOP VIEW --- */}
            <div className="hidden lg:grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                    <EquipmentList items={filteredItems} filterText={filterText} onFilterChange={setFilterText} isUnderReview={isUnderReview} height="auto" fullyFailedItems={fullyFailedItems} />
                    <CustomItemCreator itemName={customItemName} onItemNameChange={setCustomItemName} description={customItemDescription} onDescriptionChange={setCustomItemDescription} onGenerate={handleGenerateCustomItem} isGenerating={isGeneratingCustomItem} generationPhase={generationPhase} generatedItem={generatedCustomItem} onAccept={handleAcceptGeneratedItem} onScrap={handleScrapGeneratedItem} onShowPrompt={() => setIsCustomItemPromptModalVisible(true)} decadeDisplayName={decadeDisplayName} />
                </div>
                <div className="lg:col-span-1 flex flex-col space-y-4">
                    <ToolsOfTheTrade onSetKit={setEquipmentKit} activeKitName={activeKitName} />
                    <AgentInventory attributes={attributes} kitInventory={kitInventory} inventory={inventory} onDrop={onDrop} onDeleteItem={onDeleteItem} handleGetItem={handleGetItem} handleRequisitionItem={handleAttemptRequisition} ownedItems={ownedItems} findFailedItems={findFailedItems} requisitionFailedItems={requisitionFailedItems} acquisitionInProgress={acquisitionInProgress} showItemStats={showItemStats} onToggleShowItemStats={() => setShowItemStats(prev => !prev)} isUnderReview={isUnderReview} />
                </div>
            </div>

            {/* --- MOBILE VIEW --- */}
            <div className="lg:hidden space-y-4">
                <div className="flex justify-center border-b border-gray-600 mb-4">
                    <button onClick={() => setMobileTab('list')} className={`py-2 px-6 font-bold text-lg ${mobileTab === 'list' ? 'border-b-2 border-green-400 text-green-300' : 'text-gray-500'}`}>Equipment List</button>
                    <button onClick={() => setMobileTab('inventory')} className={`py-2 px-6 font-bold text-lg ${mobileTab === 'inventory' ? 'border-b-2 border-green-400 text-green-300' : 'text-gray-500'}`}>Agent Inventory</button>
                </div>

                {mobileTab === 'list' && (
                    <EquipmentList items={filteredItems} filterText={filterText} onFilterChange={setFilterText} isUnderReview={isUnderReview} onItemClick={setModalItem} fullyFailedItems={fullyFailedItems} />
                )}

                {mobileTab === 'inventory' && (
                    <div className="space-y-6">
                        <ToolsOfTheTrade onSetKit={setEquipmentKit} activeKitName={activeKitName} />
                        <AgentInventory attributes={attributes} kitInventory={kitInventory} inventory={inventory} onDrop={onDrop} onDeleteItem={onDeleteItem} handleGetItem={handleGetItem} handleRequisitionItem={handleAttemptRequisition} ownedItems={ownedItems} findFailedItems={findFailedItems} requisitionFailedItems={requisitionFailedItems} acquisitionInProgress={acquisitionInProgress} showItemStats={showItemStats} onToggleShowItemStats={() => setShowItemStats(prev => !prev)} isUnderReview={isUnderReview} />
                        <CustomItemCreator itemName={customItemName} onItemNameChange={setCustomItemName} description={customItemDescription} onDescriptionChange={setCustomItemDescription} onGenerate={handleGenerateCustomItem} isGenerating={isGeneratingCustomItem} generationPhase={generationPhase} generatedItem={generatedCustomItem} onAccept={handleAcceptGeneratedItem} onScrap={handleScrapGeneratedItem} onShowPrompt={() => setIsCustomItemPromptModalVisible(true)} decadeDisplayName={decadeDisplayName} />
                    </div>
                )}
            </div>
        </div>
    );
};