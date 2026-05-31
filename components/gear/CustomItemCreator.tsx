import React from 'react';
import type { DGItem } from '../../types';
import { SpinnerIcon } from '../icons/SpinnerIcon';
import { ExpensePill } from './ExpensePill';
import { QuestionIcon } from '../icons/QuestionIcon';

interface CustomItemCreatorProps {
    itemName: string;
    onItemNameChange: (value: string) => void;
    description: string;
    onDescriptionChange: (value: string) => void;
    onGenerate: () => void;
    isGenerating: boolean;
    generationPhase: string | null;
    generatedItem: DGItem | null;
    onAccept: () => void;
    onScrap: () => void;
    onShowPrompt: () => void;
    decadeDisplayName: string;
}

const STAT_LABELS: Record<string, string> = {
    skill: 'Skill',
    damage: 'Damage',
    armorPiercing: 'AP',
    range: 'Range',
    uses: 'Uses',
    radius: 'Radius',
    victimsPenalty: 'Penalty',
    lethality: 'Lethality/Armor',
    killRadius: 'Kill Radius/Armor',
    ammoCapacity: 'Capacity/Speed',
};

const STAT_ORDER: (keyof DGItem)[] = [
    'skill', 'damage', 'armorPiercing', 'lethality', 'range', 'killRadius',
    'ammoCapacity', 'uses', 'radius', 'victimsPenalty'
];

const GeneratedItemStats: React.FC<{ item: DGItem }> = ({ item }) => {
    const stats = STAT_ORDER
        .map(key => ({ key, value: item[key] }))
        .filter(stat => stat.value !== undefined && stat.value !== null && stat.value !== '' && stat.value !== 'N/A');

    if (stats.length === 0) {
        return null;
    }

    return (
        <div className="my-3 grid grid-cols-2 gap-2">
            {stats.map(({ key, value }) => (
                <div key={key as string} className="bg-black/30 p-2 rounded-md text-center">
                    <div className="text-xs font-bold text-gray-500 uppercase tracking-wider">{STAT_LABELS[key as string]}</div>
                    <div className="text-sm font-mono text-white font-semibold truncate">{String(value)}</div>
                </div>
            ))}
        </div>
    );
};


const GeneratedItemCard: React.FC<{ item: DGItem, onAccept: () => void, onScrap: () => void }> = ({ item, onAccept, onScrap }) => (
    <div className="mt-4 p-4 bg-gray-900/50 border-2 border-green-500/50 rounded-lg animate-item-fade-in">
        <div className="flex items-center gap-2">
            <h4 className="text-xl font-bold text-green-300">AI Suggestion: {item.name}</h4>
            {item.isRestricted && (
                <span 
                    className="px-1.5 py-0.5 bg-red-900/80 text-red-300 text-xs font-black rounded-md border border-red-700/60"
                    title="Restricted Item"
                >
                    R
                </span>
            )}
        </div>
        <div className="flex justify-between items-center my-2">
            <span className="text-gray-400 text-sm">Section: {item.section}</span>
            <ExpensePill expense={item.expense} />
        </div>
        
        <GeneratedItemStats item={item} />

        {item.description && <p className="text-gray-300 text-sm mb-4">{item.description}</p>}

        <div className="flex justify-end gap-2">
            <button onClick={onScrap} className="bg-red-800 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg text-sm">Scrap</button>
            <button onClick={onAccept} className="bg-green-700 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg text-sm">Accept & Add to Inventory</button>
        </div>
    </div>
);


export const CustomItemCreator: React.FC<CustomItemCreatorProps> = (props) => {
    const { itemName, onItemNameChange, description, onDescriptionChange, onGenerate, isGenerating, generationPhase, generatedItem, onAccept, onScrap, onShowPrompt, decadeDisplayName } = props;

    const placeholderText = `Describe the item's function, appearance, or desired effect. You can also request specific rules, uses, skill checks, or property values. The AI will tailor the item for the ${decadeDisplayName}.`;

    return (
        <div className="bg-gray-900/50 p-4 rounded-lg border-2 border-gray-700/50">
            <div className="flex items-center justify-center gap-2 mb-4 pb-2 border-b-2 border-gray-700">
                <h3 className="text-2xl font-bold text-green-300 text-center">Custom Item Generator (AI)</h3>
                <button
                    onClick={onShowPrompt}
                    className="text-gray-500 hover:text-green-400 transition-colors p-1 -m-1"
                    aria-label="Show AI generation prompts"
                >
                    <QuestionIcon className="h-5 w-5" />
                </button>
            </div>
            <div className="space-y-4">
                <input
                    type="text"
                    placeholder="Item Name (e.g., 'Portable EMF Detector')"
                    value={itemName}
                    onChange={(e) => onItemNameChange(e.target.value)}
                    className="w-full bg-gray-800 border border-gray-600 rounded-md p-2 text-white placeholder-gray-500 focus:ring-2 focus:ring-green-400"
                />
                <textarea
                    placeholder={placeholderText}
                    value={description}
                    onChange={(e) => onDescriptionChange(e.target.value)}
                    rows={3}
                    className="w-full bg-gray-800 border border-gray-600 rounded-md p-2 text-white placeholder-gray-500 focus:ring-2 focus:ring-green-400"
                />
                <button
                    onClick={onGenerate}
                    disabled={isGenerating || !itemName}
                    className="w-full bg-green-700 hover:bg-green-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-bold py-3 px-6 rounded-lg shadow-lg flex items-center justify-center gap-2"
                >
                    {isGenerating ? (
                        <>
                            <SpinnerIcon className="h-5 w-5" />
                            <span>{generationPhase || 'Generating...'}</span>
                        </>
                    ) : (
                        <>
                            <i className="fa-solid fa-microchip h-5 w-5"></i>
                            <span>Generate Item Stats</span>
                        </>
                    )}
                </button>
            </div>
            {generatedItem && <GeneratedItemCard item={generatedItem} onAccept={onAccept} onScrap={onScrap} />}
        </div>
    );
};