import React, { useState, useCallback, useMemo, useRef, useEffect } from 'react';
import { useCharacterContext } from '../context/CharacterContext';
import { GoogleGenAI, Type } from '@google/genai';
import type { DGItem } from '../types';
import { ITEMS } from '../item-data';
import { EquipmentList } from './gear/EquipmentList';
import { AgentInventory } from './gear/AgentInventory';
import { CustomItemCreator } from './gear/CustomItemCreator';
import { PromptInfoModal } from './PromptInfoModal';
import { RestrictedRequisitionModal } from './gear/RestrictedRequisitionModal';
import { TerminalConsequenceDisplay } from './gear/TerminalConsequenceDisplay';
import { ToolsOfTheTrade } from './gear/ToolsOfTheTrade';

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

const buildPhase2Prompt = (itemName: string, itemDescription: string, section: string, analysisKeywords: string[]): string => {
    const rules = new Set<string>();

    // General Rules (always include)
    rules.add("Core Mechanic: All checks are d100 roll-under. A roll <= skill/stat is a success.");
    rules.add("Expense Levels: Items have an Expense (Incidental, Standard, Unusual, Major, Extreme) reflecting rarity and cost, which affects acquisition difficulty.");
    rules.add("Item Naming: Names should be descriptive. Add examples where appropriate (e.g., 'Club / nightstick / baton').");
    rules.add("Descriptions: Descriptions must be concise and contain special rules. If an item is illegal or requires special clearance, its description MUST start with 'RESTRICTED.'.");

    // Add rules based on analysis keywords
    if (analysisKeywords.includes('weapon') || analysisKeywords.includes('melee') || analysisKeywords.includes('ranged')) {
        rules.add("Weapon Damage: Damage is dice-based (e.g., 1D4, 1D8). Unarmed is 1D4-1. Small knives 1D4, large knives 1D6, clubs 1D6, swords 1D8, axes 1D10.");
        rules.add("Armor Piercing (AP): AP reduces a target's Armor value. Knives have AP 3. Most firearms have AP. Blunt weapons have AP 0.");
        rules.add("Weapon Skills: Melee weapons use 'Melee Weapons'. Brawling uses 'Unarmed Combat'. Guns use 'Firearms'. Military-grade weapons use 'Heavy Weapons'.");
    }
    if (analysisKeywords.includes('lethality') || analysisKeywords.includes('explosive')) {
        rules.add("Lethality %: Lethality is for weapons causing instant death. If damage > target's HP, they roll d100. If roll <= Lethality %, they die. Hand grenades are 15%, RPGs 30%.");
        rules.add("Kill Radius: For explosives. Anyone inside this radius (in meters) is subject to a Lethality check. Grenades are 10m.");
    }
    if (analysisKeywords.includes('armor')) {
        rules.add("Armor Rating (AR): Body Armor provides an AR, subtracted from incoming damage. This value goes in the 'Lethality' field for stat generation. Kevlar vest is AR 3, tactical armor is AR 5.");
        rules.add("Armor Concealment: Descriptions should state if armor can be concealed and if noticing it requires an Alertness test.");
    }
    if (analysisKeywords.includes('vehicle')) {
        rules.add("Vehicle HP: Called 'Structural Integrity', this goes in the 'Lethality' field. A sedan is 25-30, a tank is 100.");
        rules.add("Vehicle Armor: Goes in the 'Kill Radius' field. A sedan is 3, a tank is 25.");
        rules.add("Vehicle Speed: A category: Slow, Average, Fast. Goes in the 'Ammo Capacity' field.");
    }
    if (analysisKeywords.includes('tool') || analysisKeywords.includes('bonus') || analysisKeywords.includes('penalty') || analysisKeywords.includes('consumable')) {
        rules.add("Gear Bonuses: Gear can provide a bonus to a skill check (e.g., '+20% to First Aid'). This goes in the description.");
        rules.add("Consumables: Items can have a 'uses' stat (e.g., 1, 10).");
        rules.add("Range/Radius: Items can have an effective range or area of effect in meters.");
        rules.add("Penalties: Items can inflict a percentage penalty on a victim's actions (e.g., '-40% for 1 hr').");
    }
    if (analysisKeywords.includes('unnatural')) {
        rules.add("Unnatural Items: These items often cause Sanity (SAN) loss, specified in the description (e.g., 'Costs 0/1D4 SAN to witness'). They might use or increase the 'Unnatural' skill.");
    }
    if (analysisKeywords.includes('service')) {
        rules.add("Services: Services (e.g., 'hiring a hacker') lack physical stats. Their effects and requirements (e.g., 'Requires Criminology to find a reliable source') go in the description.");
    }


    return `You are an expert game designer for the Delta Green RPG. Your task is to generate a balanced and thematic item based on the provided concept and rules.

**Item Concept:**
- Name: "${itemName}"
- Description: "${itemDescription || 'No description provided.'}"
- Determined Section: "${section}"

**Applicable Game Rules for this Item Type:**
${[...rules].map(r => `- ${r}`).join('\n')}

**Task:**
Generate a complete JSON object for the item. Fill in all relevant fields for this item type and leave others null. The generated stats must be balanced and consistent with the provided rules.

The output MUST be a raw JSON object only.`;
};

interface GearTabProps {
    kitInventory: DGItem[];
    inventory: DGItem[];
    ownedItems: Set<string>;
    failedItems: Set<string>;
    isUnderReview: boolean;
    terminalConsequence: string | null;
    onDrop: (e: React.DragEvent<HTMLDivElement>) => void;
    onDeleteItem: (itemName: string) => void;
    onAcquisitionRoll: (item: DGItem, type: 'Get' | 'Requisition', isRisky?: boolean) => { success: boolean, roll: number, target: number };
}


export const GearTab: React.FC<GearTabProps> = ({ kitInventory, inventory, ownedItems, failedItems, isUnderReview, terminalConsequence, onDrop, onDeleteItem, onAcquisitionRoll }) => {
    const { attributes, skills, setToastMessage, setEquipmentKit, activeKitName } = useCharacterContext();
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
    
    const agentInventoryContainerRef = useRef<HTMLDivElement>(null);
    const [equipmentListHeight, setEquipmentListHeight] = useState<number | 'auto'>('auto');

    useEffect(() => {
        const updateHeight = () => {
            if (agentInventoryContainerRef.current) {
                const inventoryHeight = agentInventoryContainerRef.current.offsetHeight;
                const windowHeight = window.innerHeight;
                const maxHeight = 3 * windowHeight;
                const newHeight = Math.min(inventoryHeight, maxHeight);
                setEquipmentListHeight(newHeight);
            }
        };

        const observer = new ResizeObserver(updateHeight);
        const currentRef = agentInventoryContainerRef.current;
        if (currentRef) {
            observer.observe(currentRef);
        }

        window.addEventListener('resize', updateHeight);

        // Initial calculation after layout settles
        const timeoutId = setTimeout(updateHeight, 150);

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
            window.removeEventListener('resize', updateHeight);
            clearTimeout(timeoutId);
        };
    }, []); // Empty array ensures this setup runs only once

    const combinedPrompt = useMemo(() => {
        if (!phase1Prompt && !phase2Prompt) {
            return "The prompts used to generate custom items via AI will appear here. \n\nPhase 1 involves categorizing the item based on its name and description. \n\nPhase 2 involves generating game-ready stats based on that category and a set of game rules.";
        }

        let promptText = '';
        if (phase1Prompt) {
            promptText += `## Phase 1: Categorization & Analysis\n\nThis prompt is sent to the AI first to determine the item's general category.\n\n---\n\n${phase1Prompt}`;
        }
        if (phase2Prompt) {
            promptText += `\n\n\n## Phase 2: Stat Generation\n\nBased on the category from Phase 1, this second prompt is sent to generate the final stats.\n\n---\n\n${phase2Prompt}`;
        }
        return promptText;
    }, [phase1Prompt, phase2Prompt]);

    const handleGetItem = (item: DGItem) => {
        setAcquisitionInProgress(item.name);
        // Delay to allow UI to update
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
        if (item.isRestricted) {
            setRequisitionModalItem(item);
        } else {
            handleRequisitionItem(item, false);
        }
    };

    const handleNormalRequisition = () => {
        if (requisitionModalItem) {
            handleRequisitionItem(requisitionModalItem, false);
        }
        setRequisitionModalItem(null);
    };

    const handleRiskyRequisition = () => {
        if (requisitionModalItem) {
            handleRequisitionItem(requisitionModalItem, true);
        }
        setRequisitionModalItem(null);
    };

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
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

            // Phase 1: Categorization & Analysis
            setGenerationPhase("Phase 1: Categorizing...");
            const builtPhase1Prompt = buildPhase1Prompt(customItemName, customItemDescription);
            setPhase1Prompt(builtPhase1Prompt);

            const phase1Response = await ai.models.generateContent({
                model: 'gemini-2.5-flash', contents: builtPhase1Prompt,
                config: {
                    responseMimeType: "application/json",
                    responseSchema: {
                        type: Type.OBJECT,
                        properties: { section: { type: Type.STRING }, analysisKeywords: { type: Type.ARRAY, items: { type: Type.STRING } } },
                        required: ["section", "analysisKeywords"]
                    }
                }
            });
            const { section, analysisKeywords } = JSON.parse(phase1Response.text.trim());

            // Build and set Phase 2 prompt
            const promptForPhase2 = buildPhase2Prompt(customItemName, customItemDescription, section, analysisKeywords);
            setPhase2Prompt(promptForPhase2);

            // Phase 2: Stat Generation
            setGenerationPhase("Phase 2: Generating stats...");
            const phase2Response = await ai.models.generateContent({
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
                            description: { type: Type.STRING, nullable: true }
                        },
                        required: ["section", "name", "expense"]
                    }
                }
            });

            const result = JSON.parse(phase2Response.text.trim());
            setGeneratedCustomItem({ ...result, name: customItemName }); // Ensure original name is preserved
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
            // FIX: Cast the mocked event object to 'unknown' first to satisfy TypeScript's type assertion rules for complex types.
            onDrop({
                dataTransfer: { getData: () => JSON.stringify(generatedCustomItem) },
                preventDefault: () => {},
            } as unknown as React.DragEvent<HTMLDivElement>);
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
             {isCustomItemPromptModalVisible && (
                <PromptInfoModal
                    title="AI Item Generation Prompts"
                    prompt={combinedPrompt}
                    onClose={() => setIsCustomItemPromptModalVisible(false)}
                />
            )}
            <RestrictedRequisitionModal
                item={requisitionModalItem}
                attributes={attributes}
                skills={skills}
                onClose={() => setRequisitionModalItem(null)}
                onNormal={handleNormalRequisition}
                onRisky={handleRiskyRequisition}
            />
             <h2 className="text-3xl font-bold text-green-400 text-center mb-2">Standard Issue & Requisitions</h2>
             <p className="text-gray-400 text-center mb-8">
                Drag items from the Equipment List to your Agent's Inventory, then attempt to acquire them.
            </p>
            {terminalConsequence && <TerminalConsequenceDisplay consequence={terminalConsequence} />}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                    <EquipmentList 
                        items={filteredItems} 
                        filterText={filterText} 
                        onFilterChange={setFilterText} 
                        isUnderReview={isUnderReview}
                        height={equipmentListHeight}
                    />
                    <CustomItemCreator 
                        itemName={customItemName}
                        onItemNameChange={setCustomItemName}
                        description={customItemDescription}
                        onDescriptionChange={setCustomItemDescription}
                        onGenerate={handleGenerateCustomItem}
                        isGenerating={isGeneratingCustomItem}
                        generationPhase={generationPhase}
                        generatedItem={generatedCustomItem}
                        onAccept={handleAcceptGeneratedItem}
                        onScrap={handleScrapGeneratedItem}
                        onShowPrompt={() => setIsCustomItemPromptModalVisible(true)}
                    />
                </div>
                <div className="space-y-4" ref={agentInventoryContainerRef}>
                    <ToolsOfTheTrade onSetKit={setEquipmentKit} activeKitName={activeKitName} />
                    <AgentInventory 
                        kitInventory={kitInventory}
                        inventory={inventory} 
                        onDrop={onDrop}
                        onDeleteItem={onDeleteItem}
                        handleGetItem={handleGetItem}
                        handleRequisitionItem={handleAttemptRequisition}
                        ownedItems={ownedItems}
                        failedItems={failedItems}
                        acquisitionInProgress={acquisitionInProgress}
                        showItemStats={showItemStats}
                        onToggleShowItemStats={() => setShowItemStats(prev => !prev)}
                        isUnderReview={isUnderReview}
                    />
                </div>
            </div>
        </div>
    );
};