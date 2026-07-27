import React, { useState, useMemo } from 'react';
import type { BondType } from '../../types';
import { useCharacterExtras } from '../../context/CharacterContext';
import { BondCard } from './BondCard';
import { SpinnerIcon } from '../icons/SpinnerIcon';
import { DiceIcon } from '../icons/DiceIcon';
import { Tooltip } from '../Tooltip';

export const BondManager: React.FC = () => {
    const { bonds, handleCreateBond, handleDeleteBond, selectedProfession, ai, aggregatedData } = useCharacterExtras();
    const [isCreating, setIsCreating] = useState(false);
    const [selectedBondType, setSelectedBondType] = useState<BondType | null>(null);

    const maxBonds = selectedProfession?.bonds || 0;
    const canCreate = bonds.length < maxBonds && !!selectedProfession;

    const sortedBondTypes = useMemo(() => {
        return [...aggregatedData.BONDS].sort((a, b) => a.name.localeCompare(b.name));
    }, [aggregatedData.BONDS]);

    const handleRandomize = () => {
        if (ai.isGeneratingBond) return;

        // Get info about existing bonds
        const existingBondTypes = bonds.map(b => b.type);
        const existingExclusionGroups = new Set(
            bonds.map(b => {
                const bondTypeDef = aggregatedData.BONDS.find(bt => bt.name === b.type);
                return bondTypeDef?.exclusionGroup;
            }).filter(Boolean)
        );

        const bondTypeCounts: Record<string, number> = {};
        existingBondTypes.forEach(type => {
            bondTypeCounts[type] = (bondTypeCounts[type] || 0) + 1;
        });

        // Filter available bonds based on rules
        const availableBondTypes = sortedBondTypes.filter(bondType => {
            if (bondType.exclusionGroup && existingExclusionGroups.has(bondType.exclusionGroup)) {
                return false;
            }

            const count = bondTypeCounts[bondType.name] || 0;
            if (count > 0) {
                if (!bondType.allowRepeat) {
                    return false;
                }
            }
            // Special rule: Max 2 parents
            if (bondType.name === 'Parent' && count >= 2) {
                return false;
            }

            return true;
        });

        if (availableBondTypes.length === 0) {
            console.warn("No available bond types to randomize.");
            return;
        }

        // Calculate weights and pick a random bond
        const weightedOptions = availableBondTypes.map(bondType => {
            const count = bondTypeCounts[bondType.name] || 0;
            let weight = bondType.weight || 1;
            if (count > 0 && bondType.allowRepeat && typeof bondType.repeatWeight === 'number') {
                weight = bondType.repeatWeight;
            }
            return { item: bondType, w: weight };
        });

        const totalWeight = weightedOptions.reduce((sum, option) => sum + option.w, 0);
        let random = Math.random() * totalWeight;
        let randomBondType: BondType | null = null;

        for (const option of weightedOptions) {
            random -= option.w;
            if (random <= 0) {
                randomBondType = option.item;
                break;
            }
        }

        if (!randomBondType && weightedOptions.length > 0) {
            randomBondType = weightedOptions[weightedOptions.length - 1].item;
        }
        
        if (randomBondType) {
            handleCreateBond(randomBondType).then(() => {
                setIsCreating(false);
                setSelectedBondType(null);
            });
        }
    };
    
    const handleAccept = () => {
        if (selectedBondType) {
            handleCreateBond(selectedBondType).then(() => {
                setIsCreating(false);
                setSelectedBondType(null);
            });
        }
    };

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selected = sortedBondTypes.find(bt => bt.name === e.target.value) || null;
        setSelectedBondType(selected);
    };

    if (!selectedProfession) {
        return (
            <div className="text-center text-gray-500 italic p-4 bg-gray-900/30 rounded-md">
                Please select a Profession on Tab 1 to define your agent's Bonds.
            </div>
        );
    }

    return (
        <div className="space-y-4">
            <p className="text-gray-400 text-sm">
                Your profession allows for <span className="font-bold text-white">{maxBonds}</span> bond(s). You have <span className="font-bold text-white">{maxBonds - bonds.length}</span> remaining.
            </p>
            
            {bonds.map((bond, index) => (
                <BondCard key={index} bond={bond} onDelete={() => handleDeleteBond(index)} />
            ))}

            {isCreating ? (
                <div className="bg-gray-800/50 p-3 rounded-lg border border-green-700/50">
                    <div className="space-y-2">
                        <select
                            value={selectedBondType?.name || ''}
                            onChange={handleSelectChange}
                            className="w-full bg-gray-900 border border-gray-600 rounded-md p-2 text-white focus:ring-2 focus:ring-green-400 text-sm"
                        >
                            <option value="">-- Select a Bond Type manually --</option>
                            {sortedBondTypes.map(bt => <option key={bt.name} value={bt.name}>{bt.name}</option>)}
                        </select>
                        <Tooltip content="Create a random bond immediately">
                            <button
                                onClick={handleRandomize}
                                disabled={ai.isGeneratingBond}
                                className="w-full h-10 p-2 rounded-lg bg-green-600 hover:bg-green-500 text-white font-bold transition-colors flex items-center justify-center gap-2 disabled:bg-gray-500 disabled:cursor-wait"
                                aria-label="Create Random Bond"
                            >
                                {ai.isGeneratingBond && !selectedBondType ? <SpinnerIcon className="h-5 w-5" /> : <DiceIcon className="h-5 w-5" />}
                                <span>{ai.isGeneratingBond && !selectedBondType ? 'Generating...' : 'Create Random Bond'}</span>
                            </button>
                        </Tooltip>
                    </div>
                    {selectedBondType && (
                        <p className="text-xs text-gray-500 mt-2 ml-1 italic">{selectedBondType.description}</p>
                    )}
                    <div className="flex gap-2 mt-3">
                        <button
                            onClick={() => { setIsCreating(false); setSelectedBondType(null); }}
                            className="flex-1 bg-gray-600 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded-lg transition-colors text-sm"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleAccept}
                            disabled={!selectedBondType || ai.isGeneratingBond}
                            className="flex-1 bg-green-700 hover:bg-green-600 disabled:bg-gray-500 disabled:cursor-not-allowed text-white font-bold py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 text-sm"
                        >
                            {ai.isGeneratingBond && selectedBondType ? <SpinnerIcon className="h-4 w-4" /> : null}
                            {ai.isGeneratingBond && selectedBondType ? 'Generating...' : 'Accept Selected'}
                        </button>
                    </div>
                </div>
            ) : canCreate && (
                <div className="text-center">
                    <button
                        onClick={() => setIsCreating(true)}
                        className="w-full bg-green-800/70 hover:bg-green-700/70 text-white font-bold py-2 px-4 rounded-lg shadow-md transition-all duration-300 ease-in-out"
                    >
                        + Create Bond
                    </button>
                </div>
            )}
        </div>
    );
};