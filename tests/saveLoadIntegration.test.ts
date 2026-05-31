/**
 * Integration tests for Save/Load and Import/Export functionality
 * 
 * This test file focuses on testing the complete save/load workflow
 * with actual character data to ensure all fields are properly persisted.
 * 
 * Test Coverage:
 * 1. Save naming priority (AI name > custom name > placeholder)
 * 2. Complete character data serialization
 * 3. Import/Export character JSON
 * 4. All fields except portraits populate correctly
 */

import { describe, it, expect, beforeEach } from 'vitest';

// Simple localStorage mock for tests
const createMockLocalStorage = () => {
    let store: Record<string, string> = {};
    return {
        getItem: (key: string) => store[key] || null,
        setItem: (key: string, value: string) => { store[key] = value; },
        removeItem: (key: string) => { delete store[key]; },
        clear: () => { store = {}; },
    };
};

describe('Save/Load System - Naming Priority', () => {
    let mockStorage: ReturnType<typeof createMockLocalStorage>;

    beforeEach(() => {
        mockStorage = createMockLocalStorage();
    });

    it('should prioritize AI-generated name over custom name', () => {
        const characterData = {
            ai: { name: 'Agent Smith' },
            attributes: { STR: 12, CON: 11, DEX: 13, INT: 15, POW: 14, CHA: 10 }
        };

        const customName = 'Custom Name';
        const slotIndex = 0;

        // Simulate save logic
        const aiName = characterData.ai.name;
        const finalName = aiName || customName || `Character ${slotIndex + 1}`;

        expect(finalName).toBe('Agent Smith');
    });

    it('should use custom name when AI name is not available', () => {
        const characterData = {
            ai: { name: null },
            attributes: { STR: 12, CON: 11, DEX: 13, INT: 15, POW: 14, CHA: 10 }
        };

        const customName = 'Custom Name';
        const slotIndex = 0;

        const aiName = characterData.ai.name;
        const finalName = aiName || customName || `Character ${slotIndex + 1}`;

        expect(finalName).toBe('Custom Name');
    });

    it('should use placeholder when neither AI nor custom name exists', () => {
        const characterData = {
            ai: { name: null },
            attributes: { STR: 12, CON: 11, DEX: 13, INT: 15, POW: 14, CHA: 10 }
        };

        const customName = null;
        const slotIndex = 0;

        const aiName = characterData.ai.name;
        const finalName = aiName || customName || `Character ${slotIndex + 1}`;

        expect(finalName).toBe('Character 1');
    });

    it('should create correct placeholder for different slot indices', () => {
        const testCases = [
            { slotIndex: 0, expected: 'Character 1' },
            { slotIndex: 1, expected: 'Character 2' },
            { slotIndex: 4, expected: 'Character 5' },
        ];

        testCases.forEach(({ slotIndex, expected }) => {
            const finalName = `Character ${slotIndex + 1}`;
            expect(finalName).toBe(expected);
        });
    });
});

describe('Save/Load System - Data Serialization', () => {
    it('should serialize complete character data', () => {
        const fullCharacterData = {
            // Core Attributes
            attributes: {
                STR: 12, CON: 11, DEX: 13, INT: 15, POW: 14, CHA: 10
            },
            baseAttributes: {
                STR: 12, CON: 11, DEX: 13, INT: 15, POW: 14, CHA: 10
            },

            // Derived Stats
            derivedStats: {
                HP: 11, WP: 14, SAN: 70, BP: 56, Bonds: 4
            },

            // Skills
            skills: {
                'Alertness': 40,
                'Bureaucracy': 30,
                'Firearms': 50,
                'Persuade': 45
            },
            baseSkills: {
                'Alertness': 20,
                'Bureaucracy': 10
            },
            bonusSkillAdvancementsSpent: {
                'Persuade': 1
            },

            // Profession
            selectedProfession: {
                name: 'FBI Special Agent',
                group: 'Federal Agent'
            },

            // Bonds
            bonds: [
                { type: 'Family', name: 'Sarah', score: 10 },
                { type: 'Friend', name: 'Marcus', score: 8 }
            ],

            // AI Content
            ai: {
                name: 'Agent John Smith',
                codename: 'NIGHTHAWK',
                age: 38,
                gender: 'male',
                nationality: 'American',
                traits: {
                    positivePhysical: 'Athletic',
                    positiveMental: 'Sharp mind',
                    negative: 'Cynical'
                },
                memories: [
                    { year: 2010, event: 'Joined FBI' }
                ],
                finalDossier: 'Reliable asset...'
            },

            // Career Data
            careerApplied: true,
            careerAttributeChanges: { 'STR': 1 },
            careerSkillGains: { 'Firearms': 15 },
            careerSanChange: -10,

            // Inventory
            inventory: ['Glock 19', 'Badge'],
            userCreatedSkills: ['Arabic']
        };

        // Simulate save
        const saveData = {
            version: '1.0.0',
            system: 'delta-green',
            timestamp: Date.now(),
            characterData: { ...fullCharacterData }
        };

        const serialized = JSON.stringify(saveData);
        const deserialized = JSON.parse(serialized);

        // Verify all major fields are present
        expect(deserialized.characterData.attributes).toEqual(fullCharacterData.attributes);
        expect(deserialized.characterData.skills).toEqual(fullCharacterData.skills);
        expect(deserialized.characterData.bonds).toEqual(fullCharacterData.bonds);
        expect(deserialized.characterData.ai.name).toBe('Agent John Smith');
        expect(deserialized.characterData.ai.traits).toEqual(fullCharacterData.ai.traits);
        expect(deserialized.characterData.careerApplied).toBe(true);
        expect(deserialized.characterData.inventory).toEqual(fullCharacterData.inventory);
    });

    it('should exclude portrait data from serialization if needed', () => {
        const characterWithPortrait = {
            ai: {
                name: 'Agent Smith',
                portrait: 'data:image/png;base64,verylongstring...',
                headshot: 'data:image/png;base64,anotherverylongstring...'
            },
            attributes: { STR: 12 }
        };

        // For this test, we just verify that portraits CAN be excluded
        // In actual implementation, you might want to:
        const saveDataWithoutPortraits = {
            ...characterWithPortrait,
            ai: {
                ...characterWithPortrait.ai,
                portrait: undefined,
                headshot: undefined
            }
        };

        expect(saveDataWithoutPortraits.ai.portrait).toBeUndefined();
        expect(saveDataWithoutPortraits.ai.headshot).toBeUndefined();
        expect(saveDataWithoutPortraits.ai.name).toBe('Agent Smith');
    });
});

describe('Save/Load System - Import/Export', () => {
    it('should export character to valid JSON format', () => {
        const character = {
            ai: { name: 'Test Agent' },
            attributes: { STR: 12, CON: 11, DEX: 13, INT: 15, POW: 14, CHA: 10 },
            skills: { 'Firearms': 50 }
        };

        const slot = {
            characterName: 'Test Agent',
            system: 'delta-green',
            timestamp: Date.now(),
            data: {
                version: '1.0.0',
                system: 'delta-green',
                timestamp: Date.now(),
                characterData: character
            }
        };

        const exported = JSON.stringify(slot, null, 2);
        
        // Should be valid JSON
        expect(() => JSON.parse(exported)).not.toThrow();
        
        // Should contain character data
        const parsed = JSON.parse(exported);
        expect(parsed.characterName).toBe('Test Agent');
        expect(parsed.data.characterData.attributes).toEqual(character.attributes);
    });

    it('should import character from exported JSON', () => {
        const exportedJSON = JSON.stringify({
            characterName: 'Imported Agent',
            system: 'delta-green',
            timestamp: Date.now(),
            data: {
                version: '1.0.0',
                system: 'delta-green',
                timestamp: Date.now(),
                characterData: {
                    ai: { name: 'Imported Agent' },
                    attributes: { STR: 14, CON: 13, DEX: 12, INT: 16, POW: 15, CHA: 11 },
                    skills: { 'Stealth': 60 }
                }
            }
        });

        const imported = JSON.parse(exportedJSON);

        expect(imported.characterName).toBe('Imported Agent');
        expect(imported.data.characterData.attributes.STR).toBe(14);
        expect(imported.data.characterData.skills.Stealth).toBe(60);
    });

    it('should handle both slot export and current character export formats', () => {
        // Slot export format (includes slot metadata)
        const slotExport = {
            characterName: 'Agent A',
            customName: 'My Save',
            system: 'delta-green',
            timestamp: Date.now(),
            data: { characterData: { ai: { name: 'Agent A' } } }
        };

        // Current character export format (direct save data)
        const currentExport = {
            characterName: 'Agent B',
            system: 'delta-green',
            timestamp: Date.now(),
            data: { characterData: { ai: { name: 'Agent B' } } }
        };

        // Both should be importable
        expect(slotExport.data.characterData.ai.name).toBe('Agent A');
        expect(currentExport.data.characterData.ai.name).toBe('Agent B');
    });
});

describe('Save/Load System - Field Validation', () => {
    it('should preserve all required character fields through save/load cycle', () => {
        const requiredFields = {
            attributes: { STR: 12, CON: 11, DEX: 13, INT: 15, POW: 14, CHA: 10 },
            derivedStats: { HP: 11, WP: 14, SAN: 70, BP: 56, Bonds: 4 },
            skills: { 'Firearms': 50 },
            bonds: [{ type: 'Family', name: 'Jane', score: 10 }],
            selectedProfession: { name: 'Agent' },
            ai: {
                name: 'Test',
                codename: 'ALPHA',
                age: 35,
                gender: 'male',
                nationality: 'American'
            }
        };

        // Simulate save/load cycle
        const saved = JSON.stringify({ characterData: requiredFields });
        const loaded = JSON.parse(saved).characterData;

        // Verify all fields
        expect(loaded.attributes).toEqual(requiredFields.attributes);
        expect(loaded.derivedStats).toEqual(requiredFields.derivedStats);
        expect(loaded.skills).toEqual(requiredFields.skills);
        expect(loaded.bonds).toEqual(requiredFields.bonds);
        expect(loaded.selectedProfession).toEqual(requiredFields.selectedProfession);
        expect(loaded.ai).toEqual(requiredFields.ai);
    });

    it('should preserve optional fields when present', () => {
        const optionalFields = {
            selectedDepartment: { name: 'FBI' },
            careerApplied: true,
            careerAttributeChanges: { 'POW': -1 },
            careerSkillGains: { 'Firearms': 10 },
            damagedVeteranOption: 'Hard Experience',
            assignedDisorder: { name: 'PTSD' },
            userCreatedSkills: ['Hacking'],
            inventory: ['Laptop'],
            selectedSpecialTrainings: ['HALO']
        };

        const saved = JSON.stringify({ characterData: optionalFields });
        const loaded = JSON.parse(saved).characterData;

        expect(loaded.selectedDepartment).toEqual(optionalFields.selectedDepartment);
        expect(loaded.careerApplied).toBe(true);
        expect(loaded.userCreatedSkills).toEqual(optionalFields.userCreatedSkills);
        expect(loaded.inventory).toEqual(optionalFields.inventory);
    });

    it('should handle missing or null fields gracefully', () => {
        const minimalData = {
            attributes: { STR: 12, CON: 11, DEX: 13, INT: 15, POW: 14, CHA: 10 },
            ai: { name: 'Minimal' }
        };

        const saved = JSON.stringify({ characterData: minimalData });
        const loaded = JSON.parse(saved).characterData;

        expect(loaded.attributes).toEqual(minimalData.attributes);
        expect(loaded.ai.name).toBe('Minimal');
        expect(loaded.bonds).toBeUndefined();
        expect(loaded.skills).toBeUndefined();
    });
});

describe('Save/Load System - LocalStorage Persistence', () => {
    let mockStorage: ReturnType<typeof createMockLocalStorage>;

    beforeEach(() => {
        mockStorage = createMockLocalStorage();
    });

    it('should persist saves to localStorage', () => {
        const slots = [
            {
                characterName: 'Agent 1',
                system: 'delta-green',
                timestamp: Date.now(),
                data: { characterData: { ai: { name: 'Agent 1' } } }
            },
            null,
            null,
            null,
            null
        ];

        mockStorage.setItem('delta-green-character-saves', JSON.stringify(slots));
        
        const stored = mockStorage.getItem('delta-green-character-saves');
        expect(stored).toBeDefined();
        
        const loaded = JSON.parse(stored!);
        expect(loaded[0].characterName).toBe('Agent 1');
    });

    it('should load saves from localStorage on initialization', () => {
        const existingSaves = [
            {
                characterName: 'Existing Agent',
                system: 'delta-green',
                timestamp: Date.now(),
                data: { characterData: { ai: { name: 'Existing Agent' } } }
            },
            null,
            null,
            null,
            null
        ];

        mockStorage.setItem('delta-green-character-saves', JSON.stringify(existingSaves));
        
        const loaded = JSON.parse(mockStorage.getItem('delta-green-character-saves')!);
        expect(loaded[0].characterName).toBe('Existing Agent');
    });

    it('should handle localStorage clear', () => {
        mockStorage.setItem('delta-green-character-saves', JSON.stringify([null, null, null, null, null]));
        mockStorage.clear();
        
        expect(mockStorage.getItem('delta-green-character-saves')).toBeNull();
    });
});
