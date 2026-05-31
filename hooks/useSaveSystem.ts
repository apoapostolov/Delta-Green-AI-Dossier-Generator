import { useState, useCallback, useEffect } from 'react';
import { useCharacterContext } from '../context/CharacterContext';
import type { CharacterSaveData, SaveSlot } from '../types';

const SAVE_VERSION = '1.0.0';
const MAX_SLOTS = 5;
const STORAGE_KEY = 'delta-green-character-saves';
const SYSTEM_NAME = 'delta-green';

/**
 * Custom hook for managing character save/load system
 * Provides save slots, import/export, and localStorage persistence
 *
 * This is a system-agnostic implementation that can serialize any character state.
 * The character data is stored as a generic Record<string, any> to accommodate
 * different RPG system data structures.
 */
export const useSaveSystem = () => {
    const [slots, setSlots] = useState<(SaveSlot | null)[]>(Array(MAX_SLOTS).fill(null));
    const character = useCharacterContext();

    const saveSet = <T,>(value: Set<T> | T[] | null | undefined) => Array.isArray(value) ? value : Array.from(value || []);

    // Load slots from localStorage on mount
    useEffect(() => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored) {
                const parsed = JSON.parse(stored);
                setSlots(parsed);
            }
        } catch (error) {
            console.error('Failed to load save slots:', error);
        }
    }, []);

    // Persist slots to localStorage whenever they change
    useEffect(() => {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(slots));
        } catch (error) {
            console.error('Failed to persist save slots:', error);
        }
    }, [slots]);

    /**
     * Create a save data object from current character state
     * This captures ALL character state for perfect restoration
     */
    const createSaveData = useCallback((): CharacterSaveData => {
        const charData = character as any;
        const characterName = charData.ai?.characterName || 'Unnamed Character';

        return {
            version: SAVE_VERSION,
            system: SYSTEM_NAME,
            timestamp: Date.now(),
            characterData: {
                attributes: charData.attributes,
                baseAttributes: charData.baseAttributes,
                derivedStats: charData.derivedStats,
                selectedProfession: charData.selectedProfession,
                selectedDepartment: charData.selectedDepartment,
                bonds: charData.bonds,
                selectedChoiceSkills: charData.selectedChoiceSkills,
                bonusSkillAdvancementsSpent: charData.bonusSkillAdvancementsSpent,
                userCreatedSkills: charData.userCreatedSkills,
                consumedGenericSkills: saveSet(charData.consumedGenericSkills),
                skillPackage: charData.skillPackage,
                specializationInheritedValues: charData.specializationInheritedValues,
                rollHistory: charData.rollHistory,
                careerApplied: charData.careerApplied,
                careerAttributeChanges: charData.careerAttributeChanges,
                careerSkillGains: charData.careerSkillGains,
                careerSanChange: charData.careerSanChange,
                careerBondChange: charData.careerBondChange,
                careerMaxHpChange: charData.careerMaxHpChange,
                isDeceased: charData.isDeceased,
                damagedVeteranOption: charData.damagedVeteranOption,
                hardExperienceSkills: charData.hardExperienceSkills,
                hardExperienceBondToRemove: charData.hardExperienceBondToRemove,
                assignedDisorder: charData.assignedDisorder,
                forbiddenKnowledgeDisorder: charData.forbiddenKnowledgeDisorder,
                inventory: charData.inventory,
                ownedItems: saveSet(charData.ownedItems),
                findFailedItems: saveSet(charData.findFailedItems),
                requisitionFailedItems: saveSet(charData.requisitionFailedItems),
                isUnderReview: charData.isUnderReview,
                terminalConsequence: charData.terminalConsequence,
                activeKitName: charData.activeKitName,
                selectedSpecialTrainings: saveSet(charData.selectedSpecialTrainings),
                pendingAiDistribution: charData.pendingAiDistribution || null,
                ai: {
                    characterName: charData.ai?.characterName || '',
                    codename: charData.ai?.codename || '',
                    decade: charData.ai?.decade || '2020s',
                    gender: charData.ai?.gender || null,
                    nationality: charData.ai?.nationality || 'American (Unspecified/Mixed)',
                    experienceLevel: charData.ai?.experienceLevel || 'Experienced',
                    dob: charData.ai?.dob || '',
                    dobOverwrittenByCareer: Boolean(charData.ai?.dobOverwrittenByCareer),
                    education: charData.ai?.education || '',
                    physicalDescription: charData.ai?.physicalDescription || null,
                    distinguishingFeatures: charData.ai?.distinguishingFeatures || null,
                    characterTraits: charData.ai?.characterTraits || null,
                    portrait: charData.ai?.portrait || null,
                    headshot: charData.ai?.headshot || null,
                    pdfPortraitSrc: charData.ai?.pdfPortraitSrc || null,
                    simResult: charData.ai?.simResult || null,
                    injuryReport: charData.ai?.injuryReport || null,
                    injurySummary: charData.ai?.injurySummary || null,
                    injuryShortDescription: charData.ai?.injuryShortDescription || null,
                    injuryMechanics: charData.ai?.injuryMechanics || null,
                    dossier: charData.ai?.dossier || null,
                },
            },
            metadata: {
                characterName,
            }
        };
    }, [character]);

    /**
     * Save current character to a slot
     * Naming priority:
     * 1. AI-generated character name (character.ai.name)
     * 2. Custom name provided during save
     * 3. "Character X" where X is slot number + 1
     */
    const saveCharacter = useCallback((slotIndex: number, customName?: string) => {
        if (slotIndex < 0 || slotIndex >= MAX_SLOTS) {
            throw new Error(`Invalid slot index: ${slotIndex}`);
        }

        const saveData = createSaveData();
        // Priority: AI-generated name > custom name > placeholder
        const aiGeneratedName = (character as any)?.ai?.characterName;
        const finalName = aiGeneratedName || customName || `Character ${slotIndex + 1}`;

        const slot: SaveSlot = {
            characterName: finalName,
            customName: customName && customName !== aiGeneratedName ? customName : undefined,
            system: SYSTEM_NAME,
            timestamp: Date.now(),
            data: saveData
        };

        setSlots(prev => {
            const newSlots = [...prev];
            newSlots[slotIndex] = slot;
            return newSlots;
        });
    }, [createSaveData, character]);

    /**
     * Load character from a slot
     *
     * NOTE: Currently displays save data in console
     * Actual restoration would require exposing setters from useCharacter
     * OR implementing a loadCharacter function in useCharacter hook
     * OR restructuring state management to use React Context setters
     *
     * For now, this serves as data persistence/export functionality
     * Full load/restore can be implemented by:
     * 1. Adding a loadFromSave(data) function to useCharacter
     * 2. OR exposing all setters from useCharacter
     * 3. OR using a state management library like Zustand/Redux
     */
    const loadCharacter = useCallback((slotIndex: number) => {
        if (slotIndex < 0 || slotIndex >= MAX_SLOTS) {
            throw new Error(`Invalid slot index: ${slotIndex}`);
        }

        const slot = slots[slotIndex];
        if (!slot) {
            throw new Error('Slot is empty');
        }

        const loader = (character as any).loadFromSaveData;
        if (typeof loader !== 'function') {
            throw new Error('Character loader is not available');
        }
        loader(slot.data);
    }, [character, slots]);

    /**
     * Delete a save slot
     */
    const deleteSlot = useCallback((slotIndex: number) => {
        if (slotIndex < 0 || slotIndex >= MAX_SLOTS) {
            throw new Error(`Invalid slot index: ${slotIndex}`);
        }

        setSlots(prev => {
            const newSlots = [...prev];
            newSlots[slotIndex] = null;
            return newSlots;
        });
    }, []);

    /**
     * Export a slot as JSON string
     */
    const exportSlot = useCallback((slotIndex: number): string => {
        if (slotIndex < 0 || slotIndex >= MAX_SLOTS) {
            throw new Error(`Invalid slot index: ${slotIndex}`);
        }

        const slot = slots[slotIndex];
        if (!slot) {
            throw new Error('Slot is empty');
        }

        return JSON.stringify(slot, null, 2);
    }, [slots]);

    /**
     * Import a character from JSON string
     */
    const importSlot = useCallback((jsonString: string) => {
        try {
            const imported = JSON.parse(jsonString);
            
            // Check if this is a SaveSlot (from exportSlot) or CharacterSaveData (from exportCurrentCharacter)
            let slot: SaveSlot;
            
            if (imported.data && imported.characterName !== undefined) {
                // This is a SaveSlot from exportSlot
                slot = {
                    characterName: imported.characterName || 'Imported Character',
                    customName: imported.customName,
                    system: imported.system || SYSTEM_NAME,
                    timestamp: Date.now(),
                    data: imported.data
                };
            } else if (imported.version && imported.system && imported.timestamp) {
                // This is CharacterSaveData from exportCurrentCharacter
                const characterName = imported.metadata?.characterName || 'Imported Character';
                slot = {
                    characterName,
                    system: imported.system,
                    timestamp: Date.now(),
                    data: imported
                };
            } else {
                throw new Error('Invalid save file format');
            }

            // Find first empty slot or use slot 0
            const emptySlotIndex = slots.findIndex(s => s === null);
            const targetSlot = emptySlotIndex >= 0 ? emptySlotIndex : 0;

            setSlots(prev => {
                const newSlots = [...prev];
                newSlots[targetSlot] = slot;
                return newSlots;
            });

            return targetSlot;
        } catch (error) {
            throw new Error('Failed to import character: ' + (error as Error).message);
        }
    }, [slots]);

    const exportCurrentCharacter = useCallback(() => {
        const saveData = createSaveData();
        const characterName = saveData.metadata?.characterName || 'Unnamed Character';
        const slot: SaveSlot = {
            characterName,
            system: SYSTEM_NAME,
            timestamp: Date.now(),
            data: saveData
        };
        return JSON.stringify(slot, null, 2);
    }, [createSaveData]);

    return {
        slots,
        saveCharacter,
        loadCharacter,
        deleteSlot,
        exportSlot,
        importSlot,
        exportCurrentCharacter
    };
};
