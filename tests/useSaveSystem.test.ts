import { act, renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { useSaveSystem } from '../hooks/useSaveSystem';

const loadFromSaveData = vi.fn();

let mockCharacter: any = {};

vi.mock('../context/CharacterContext', () => ({
    useCharacterContext: () => mockCharacter,
}));

describe('useSaveSystem', () => {
    beforeEach(() => {
        localStorage.clear();
        loadFromSaveData.mockReset();
        mockCharacter = {
            attributes: { STR: 12, CON: 11, DEX: 13, INT: 15, POW: 14, CHA: 10 },
            baseAttributes: { STR: 12, CON: 11, DEX: 13, INT: 15, POW: 14, CHA: 10 },
            derivedStats: { HP: 11, WP: 14, SAN: 70, BP: 56, Bonds: 4 },
            selectedProfession: { name: 'Federal Agent' },
            selectedDepartment: { name: 'FBI', suggested_bonus_skills: ['Alertness'] },
            bonds: [{ type: 'Family', name: 'Sarah', description: 'Wife', score: 10 }],
            selectedChoiceSkills: { 0: [{ name: 'Bureaucracy', value: 40 }] },
            bonusSkillAdvancementsSpent: { Alertness: 1 },
            userCreatedSkills: ['Language (Arabic)'],
            consumedGenericSkills: new Set(['Language']),
            skillPackage: { name: 'Investigator', skills: ['Alertness'], descriptor: 'Careful and methodical' },
            specializationInheritedValues: { 'Language (Arabic)': 40 },
            rollHistory: [{ STR: 10, CON: 10, DEX: 10, INT: 10, POW: 10, CHA: 10 }],
            careerApplied: true,
            careerAttributeChanges: { STR: 1 },
            careerSkillGains: { Alertness: 10 },
            careerSanChange: -5,
            careerBondChange: -1,
            careerMaxHpChange: 2,
            isDeceased: false,
            damagedVeteranOption: 'Hard Experience',
            hardExperienceSkills: ['Alertness'],
            hardExperienceBondToRemove: 0,
            assignedDisorder: { name: 'Insomnia' },
            forbiddenKnowledgeDisorder: null,
            inventory: [{ name: 'Burner Phone', expense: 'Incidental' }],
            ownedItems: new Set(['Burner Phone']),
            findFailedItems: new Set(['Gas Mask']),
            requisitionFailedItems: new Set(['Light Rifle or Carbine']),
            isUnderReview: true,
            terminalConsequence: 'Reprimand',
            activeKitName: 'FEDERAL AGENT',
            selectedSpecialTrainings: new Set(['HALO']),
            pendingAiDistribution: {
                analysis: { summary: 'good fit', themes: ['tradecraft'], likelyCoreSkills: ['Alertness'], likelySupportSkills: ['Bureaucracy'], cautions: [] },
                rationale: 'Keep the agent sharp and observant.',
                coreSkills: [{ skill: 'Alertness', improvements: 1 }],
                supplementalSkills: [],
                personalInterests: [],
            },
            ai: {
                characterName: 'Agent John Smith',
                codename: 'NIGHTHAWK',
                decade: '2020s',
                gender: 'male',
                nationality: 'American',
                experienceLevel: 'Experienced',
                dob: '1985-06-15',
                dobOverwrittenByCareer: true,
                education: 'Criminal Justice',
                physicalDescription: 'Lean and tense.',
                distinguishingFeatures: { CHA: 'Cold stare' },
                characterTraits: { positivePhysical: 'Athletic', positiveMental: 'Sharp', negative: 'Cynical' },
                portrait: 'data:image/png;base64,portrait',
                headshot: 'data:image/png;base64,headshot',
                pdfPortraitSrc: 'data:image/png;base64,headshot',
                simResult: { isDeceased: false, events: [] },
                injuryReport: null,
                injurySummary: null,
                injuryShortDescription: null,
                injuryMechanics: null,
                dossier: 'Reliable asset.',
            },
            loadFromSaveData,
        };
    });

    it('uses the AI-generated character name when saving', () => {
        const { result } = renderHook(() => useSaveSystem());

        act(() => {
            result.current.saveCharacter(0, 'Custom Name');
        });

        expect(result.current.slots[0]?.characterName).toBe('Agent John Smith');
        expect(result.current.slots[0]?.customName).toBe('Custom Name');
    });

    it('falls back to the custom name and placeholder name when needed', () => {
        mockCharacter.ai.characterName = '';
        const { result } = renderHook(() => useSaveSystem());

        act(() => {
            result.current.saveCharacter(0, 'Casefile');
            result.current.saveCharacter(1);
        });

        expect(result.current.slots[0]?.characterName).toBe('Casefile');
        expect(result.current.slots[1]?.characterName).toBe('Character 2');
    });

    it('serializes sets and nested AI/save state into plain JSON data', () => {
        const { result } = renderHook(() => useSaveSystem());

        act(() => {
            result.current.saveCharacter(0);
        });

        const saved = result.current.slots[0]?.data.characterData;
        expect(saved?.ownedItems).toEqual(['Burner Phone']);
        expect(saved?.findFailedItems).toEqual(['Gas Mask']);
        expect(saved?.selectedSpecialTrainings).toEqual(['HALO']);
        expect(saved?.ai.characterName).toBe('Agent John Smith');
        expect(saved?.pendingAiDistribution.coreSkills).toEqual([{ skill: 'Alertness', improvements: 1 }]);
    });

    it('loads a saved slot through the character loader', () => {
        const { result } = renderHook(() => useSaveSystem());

        act(() => {
            result.current.saveCharacter(0);
        });

        act(() => {
            result.current.loadCharacter(0);
        });

        expect(loadFromSaveData).toHaveBeenCalledTimes(1);
        expect(loadFromSaveData.mock.calls[0][0].characterData.ai.characterName).toBe('Agent John Smith');
    });

    it('imports exported slot JSON into the first empty slot', () => {
        const { result } = renderHook(() => useSaveSystem());

        act(() => {
            result.current.saveCharacter(0);
        });

        const exported = result.current.exportSlot(0);
        let importedSlotIndex = -1;
        act(() => {
            importedSlotIndex = result.current.importSlot(exported);
        });

        expect(importedSlotIndex).toBe(1);
        expect(result.current.slots[1]?.characterName).toBe('Agent John Smith');
    });
});
