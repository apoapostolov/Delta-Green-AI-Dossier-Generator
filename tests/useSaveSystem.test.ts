/**
 * Comprehensive tests for Save/Load system
 * 
 * Tests:
 * 1. Save naming priority (AI name > custom name > placeholder)
 * 2. Full character state serialization
 * 3. Import/Export character data
 * 4. LocalStorage persistence
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useSaveSystem } from '../hooks/useSaveSystem';
import type { AttributeSet, Profession, Bond, Skill, Department } from '../types';

// Mock the CharacterContext
const mockCharacter = {
    // Core attributes
    attributes: {
        STR: 12,
        CON: 11,
        DEX: 13,
        INT: 15,
        POW: 14,
        CHA: 10
    } as AttributeSet,
    baseAttributes: {
        STR: 12,
        CON: 11,
        DEX: 13,
        INT: 15,
        POW: 14,
        CHA: 10
    } as AttributeSet,
    
    // Derived stats
    derivedStats: {
        HP: 11,
        WP: 14,
        SAN: 70,
        BP: 56,
        Bonds: 4
    },
    
    // Skills
    skills: {
        'Alertness': 40,
        'Bureaucracy': 30,
        'Firearms': 50,
        'Persuade': 45,
        'Stealth': 35
    } as Record<string, number>,
    
    baseSkills: {
        'Alertness': 20,
        'Bureaucracy': 10,
        'Firearms': 20
    } as Record<string, number>,
    
    bonusSkillAdvancementsSpent: {
        'Persuade': 1,
        'Stealth': 1
    } as Record<string, number>,
    
    // Profession
    selectedProfession: {
        name: 'FBI Special Agent',
        description: 'Federal law enforcement',
        group: 'Federal Agent' as const,
        recommendedStats: ['DEX' as const, 'INT' as const],
        professionalSkills: [],
        choiceGroups: [],
        bonds: 4,
        bonusSkillAdvancementsSpent: 2
    } as Profession,
    
    selectedDepartment: null as Department | null,
    
    // Bonds
    bonds: [
        {
            type: 'Family',
            name: 'Sarah Chen',
            description: 'Wife',
            score: 10
        },
        {
            type: 'Friend',
            name: 'Marcus Stone',
            description: 'Former partner',
            score: 8
        },
        {
            type: 'Organization',
            name: 'FBI',
            description: 'Employer',
            score: 12
        }
    ] as Bond[],
    
    // AI-generated content
    ai: {
        name: 'Agent John Smith',
        codename: 'NIGHTHAWK',
        age: 38,
        dob: '1985-06-15',
        gender: 'male' as const,
        nationality: 'American',
        decade: '2020s',
        experienceLevel: 'Experienced' as const,
        portrait: 'data:image/png;base64,mockImageData',
        headshot: 'data:image/png;base64,mockHeadshotData',
        traits: {
            positivePhysical: 'Athletic build',
            positiveMental: 'Sharp analytical mind',
            negative: 'Tends to be cynical'
        },
        memories: [
            { year: 2010, event: 'Joined FBI', narrative: 'A fresh start...' },
            { year: 2015, event: 'First assignment', narrative: 'The case that changed everything...' }
        ],
        medicalReport: null,
        finalDossier: 'Agent Smith has proven to be a reliable asset...'
    },
    
    // Career simulation
    careerApplied: true,
    careerAttributeChanges: {
        'STR': 1,
        'POW': -1
    } as Record<string, number>,
    careerSkillGains: {
        'Firearms': 15,
        'Persuade': 10
    } as Record<string, number>,
    careerSanChange: -10,
    careerBondChange: -1,
    careerMaxHpChange: 2,
    
    // Special states
    isDeceased: false,
    damagedVeteranOption: null,
    hardExperienceSkills: [] as string[],
    hardExperienceBondToRemove: null as number | null,
    assignedDisorder: null,
    
    // User customizations
    userCreatedSkills: ['Arabic', 'Forensic Analysis'] as string[],
    selectedSpecialTrainings: new Set(['HALO']),
    
    // Inventory
    inventory: [
        'Glock 19',
        'FBI Badge',
        'Handcuffs',
        'Smartphone'
    ] as string[],
    kitInventory: [] as string[],
    activeKitName: 'Standard FBI Kit',
};

// Mock useCharacterContext
vi.mock('../context/CharacterContext', () => ({
    useCharacterContext: () => mockCharacter
}));

describe('useSaveSystem - Save Naming Priority', () => {
    beforeEach(() => {
        localStorage.clear();
    });

    it('should use AI-generated name as priority', () => {
        const { result } = renderHook(() => useSaveSystem());
        
        act(() => {
            result.current.saveCharacter(0);
        });

        expect(result.current.slots[0]?.characterName).toBe('Agent John Smith');
        expect(result.current.slots[0]?.customName).toBeUndefined();
    });

    it('should use AI-generated name even when custom name is provided', () => {
        const { result } = renderHook(() => useSaveSystem());
        
        act(() => {
            result.current.saveCharacter(0, 'Custom Name');
        });

        expect(result.current.slots[0]?.characterName).toBe('Agent John Smith');
        expect(result.current.slots[0]?.customName).toBe('Custom Name');
    });

    it('should use custom name when no AI name is available', () => {
        // Mock character without AI name
        const charWithoutName = { ...mockCharacter, ai: { ...mockCharacter.ai, name: null } };
        vi.mocked(vi.importActual('../context/CharacterContext')).useCharacterContext = () => charWithoutName;
        
        const { result } = renderHook(() => useSaveSystem());
        
        act(() => {
            result.current.saveCharacter(0, 'Custom Name');
        });

        expect(result.current.slots[0]?.characterName).toBe('Custom Name');
    });

    it('should use placeholder when no name is available', () => {
        const charWithoutName = { ...mockCharacter, ai: { ...mockCharacter.ai, name: null } };
        vi.mocked(vi.importActual('../context/CharacterContext')).useCharacterContext = () => charWithoutName;
        
        const { result } = renderHook(() => useSaveSystem());
        
        act(() => {
            result.current.saveCharacter(0);
        });

        expect(result.current.slots[0]?.characterName).toBe('Character 1');
    });

    it('should create correct placeholder for different slots', () => {
        const charWithoutName = { ...mockCharacter, ai: { ...mockCharacter.ai, name: null } };
        vi.mocked(vi.importActual('../context/CharacterContext')).useCharacterContext = () => charWithoutName;
        
        const { result } = renderHook(() => useSaveSystem());
        
        act(() => {
            result.current.saveCharacter(0);
            result.current.saveCharacter(1);
            result.current.saveCharacter(4);
        });

        expect(result.current.slots[0]?.characterName).toBe('Character 1');
        expect(result.current.slots[1]?.characterName).toBe('Character 2');
        expect(result.current.slots[4]?.characterName).toBe('Character 5');
    });
});

describe('useSaveSystem - Save/Load Functionality', () => {
    beforeEach(() => {
        localStorage.clear();
    });

    it('should save all character fields', () => {
        const { result } = renderHook(() => useSaveSystem());
        
        act(() => {
            result.current.saveCharacter(0);
        });

        const slot = result.current.slots[0];
        expect(slot).toBeDefined();
        expect(slot?.data.characterData).toMatchObject({
            attributes: mockCharacter.attributes,
            baseAttributes: mockCharacter.baseAttributes,
            derivedStats: mockCharacter.derivedStats,
            skills: mockCharacter.skills,
            bonds: mockCharacter.bonds,
            selectedProfession: mockCharacter.selectedProfession,
            careerApplied: mockCharacter.careerApplied,
            inventory: mockCharacter.inventory,
        });
    });

    it('should save AI-generated content (except portraits)', () => {
        const { result } = renderHook(() => useSaveSystem());
        
        act(() => {
            result.current.saveCharacter(0);
        });

        const aiData = result.current.slots[0]?.data.characterData.ai;
        expect(aiData).toBeDefined();
        expect(aiData.name).toBe('Agent John Smith');
        expect(aiData.codename).toBe('NIGHTHAWK');
        expect(aiData.age).toBe(38);
        expect(aiData.traits).toEqual(mockCharacter.ai.traits);
        expect(aiData.memories).toEqual(mockCharacter.ai.memories);
        expect(aiData.finalDossier).toBe(mockCharacter.ai.finalDossier);
        
        // Note: Portraits are excluded in this implementation as requested
        // but the data structure allows them if needed
    });

    it('should persist to localStorage', () => {
        const { result } = renderHook(() => useSaveSystem());
        
        act(() => {
            result.current.saveCharacter(0);
        });

        const stored = localStorage.getItem('delta-green-character-saves');
        expect(stored).toBeDefined();
        
        const parsed = JSON.parse(stored!);
        expect(parsed[0]).toBeDefined();
        expect(parsed[0].characterName).toBe('Agent John Smith');
    });

    it('should load from localStorage on mount', () => {
        // Pre-populate localStorage
        const mockSlot = {
            characterName: 'Test Character',
            system: 'delta-green',
            timestamp: Date.now(),
            data: {
                version: '1.0.0',
                system: 'delta-green',
                timestamp: Date.now(),
                characterData: { ...mockCharacter }
            }
        };
        
        localStorage.setItem('delta-green-character-saves', JSON.stringify([mockSlot, null, null, null, null]));
        
        const { result } = renderHook(() => useSaveSystem());
        
        expect(result.current.slots[0]?.characterName).toBe('Test Character');
    });

    it('should delete a save slot', () => {
        const { result } = renderHook(() => useSaveSystem());
        
        act(() => {
            result.current.saveCharacter(0);
            result.current.deleteSlot(0);
        });

        expect(result.current.slots[0]).toBeNull();
    });

    it('should handle multiple saves', () => {
        const { result } = renderHook(() => useSaveSystem());
        
        act(() => {
            result.current.saveCharacter(0, 'Save 1');
            result.current.saveCharacter(1, 'Save 2');
            result.current.saveCharacter(2, 'Save 3');
        });

        expect(result.current.slots[0]?.characterName).toBe('Agent John Smith');
        expect(result.current.slots[1]?.characterName).toBe('Agent John Smith');
        expect(result.current.slots[2]?.characterName).toBe('Agent John Smith');
        expect(result.current.slots[0]?.customName).toBe('Save 1');
        expect(result.current.slots[1]?.customName).toBe('Save 2');
        expect(result.current.slots[2]?.customName).toBe('Save 3');
    });
});

describe('useSaveSystem - Import/Export Functionality', () => {
    beforeEach(() => {
        localStorage.clear();
    });

    it('should export a slot to JSON', () => {
        const { result } = renderHook(() => useSaveSystem());
        
        act(() => {
            result.current.saveCharacter(0);
        });

        const exported = result.current.exportSlot(0);
        const parsed = JSON.parse(exported);
        
        expect(parsed.characterName).toBe('Agent John Smith');
        expect(parsed.system).toBe('delta-green');
        expect(parsed.data.characterData.attributes).toEqual(mockCharacter.attributes);
    });

    it('should export current character', () => {
        const { result } = renderHook(() => useSaveSystem());
        
        const exported = result.current.exportCurrentCharacter();
        const parsed = JSON.parse(exported);
        
        expect(parsed.characterName).toBe('Agent John Smith');
        expect(parsed.data.characterData.skills).toEqual(mockCharacter.skills);
    });

    it('should import a character from exported slot format', () => {
        const { result } = renderHook(() => useSaveSystem());
        
        // First export
        let exported: string;
        act(() => {
            result.current.saveCharacter(0);
            exported = result.current.exportSlot(0);
            result.current.deleteSlot(0);
        });

        // Then import
        act(() => {
            result.current.importSlot(exported!);
        });

        expect(result.current.slots[0]?.characterName).toBe('Agent John Smith');
    });

    it('should import a character from current character export format', () => {
        const { result } = renderHook(() => useSaveSystem());
        
        const exported = result.current.exportCurrentCharacter();
        
        act(() => {
            result.current.importSlot(exported);
        });

        expect(result.current.slots[0]?.characterName).toBe('Agent John Smith');
    });

    it('should handle import errors gracefully', () => {
        const { result } = renderHook(() => useSaveSystem());
        
        expect(() => {
            act(() => {
                result.current.importSlot('invalid json');
            });
        }).toThrow('Failed to import character');
    });

    it('should preserve all fields during export/import cycle', () => {
        const { result } = renderHook(() => useSaveSystem());
        
        let exported: string;
        act(() => {
            result.current.saveCharacter(0);
            exported = result.current.exportSlot(0);
            result.current.deleteSlot(0);
            result.current.importSlot(exported!);
        });

        const importedData = result.current.slots[0]?.data.characterData;
        
        // Check all major fields
        expect(importedData.attributes).toEqual(mockCharacter.attributes);
        expect(importedData.skills).toEqual(mockCharacter.skills);
        expect(importedData.bonds).toEqual(mockCharacter.bonds);
        expect(importedData.selectedProfession).toEqual(mockCharacter.selectedProfession);
        expect(importedData.ai.name).toBe(mockCharacter.ai.name);
        expect(importedData.ai.codename).toBe(mockCharacter.ai.codename);
        expect(importedData.ai.traits).toEqual(mockCharacter.ai.traits);
        expect(importedData.careerApplied).toBe(mockCharacter.careerApplied);
        expect(importedData.inventory).toEqual(mockCharacter.inventory);
    });
});

describe('useSaveSystem - Edge Cases', () => {
    beforeEach(() => {
        localStorage.clear();
    });

    it('should handle invalid slot index', () => {
        const { result } = renderHook(() => useSaveSystem());
        
        expect(() => {
            act(() => {
                result.current.saveCharacter(-1);
            });
        }).toThrow('Invalid slot index');

        expect(() => {
            act(() => {
                result.current.saveCharacter(5);
            });
        }).toThrow('Invalid slot index');
    });

    it('should handle empty slot export', () => {
        const { result } = renderHook(() => useSaveSystem());
        
        expect(() => {
            result.current.exportSlot(0);
        }).toThrow('Slot is empty');
    });

    it('should handle empty slot load', () => {
        const { result } = renderHook(() => useSaveSystem());
        
        expect(() => {
            act(() => {
                result.current.loadCharacter(0);
            });
        }).toThrow('Slot is empty');
    });

    it('should handle localStorage errors gracefully', () => {
        // Mock localStorage to throw error
        const originalSetItem = Storage.prototype.setItem;
        Storage.prototype.setItem = () => {
            throw new Error('QuotaExceededError');
        };

        const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});
        
        const { result } = renderHook(() => useSaveSystem());
        
        act(() => {
            result.current.saveCharacter(0);
        });

        expect(consoleError).toHaveBeenCalledWith(
            'Failed to persist save slots:',
            expect.any(Error)
        );

        // Restore
        Storage.prototype.setItem = originalSetItem;
        consoleError.mockRestore();
    });

    it('should overwrite existing slot', () => {
        const { result } = renderHook(() => useSaveSystem());
        
        act(() => {
            result.current.saveCharacter(0, 'First Save');
        });

        const firstTimestamp = result.current.slots[0]?.timestamp;
        
        // Wait a bit and save again
        act(() => {
            result.current.saveCharacter(0, 'Second Save');
        });

        expect(result.current.slots[0]?.customName).toBe('Second Save');
        expect(result.current.slots[0]?.timestamp).toBeGreaterThan(firstTimestamp!);
    });
});
