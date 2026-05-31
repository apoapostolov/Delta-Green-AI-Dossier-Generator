# Save/Load System Tests

This directory contains tests for the Delta Green AI Dossier Generator's save/load and import/export functionality.

## Overview

The save/load system allows users to:
- Save characters to 5 different slots
- Export characters as JSON files
- Import characters from JSON
- Persist data across browser sessions using localStorage

## Test Files

### `saveLoadIntegration.test.ts`
Integration tests covering:
- **Naming Priority**: Tests the save naming logic (AI name > custom name > placeholder)
- **Data Serialization**: Ensures all character fields are properly saved
- **Import/Export**: Validates JSON format and data integrity
- **LocalStorage Persistence**: Tests browser storage functionality

### `useSaveSystem.test.ts`
Unit tests for the `useSaveSystem` hook (requires React Testing Library setup):
- Hook behavior and state management
- Full character state serialization
- Edge cases and error handling

## Running Tests

### Automated Tests

```bash
# Run all tests once
npm test

# Run tests in watch mode (auto-rerun on changes)
npm run test:watch
```

### Manual Testing

Follow the comprehensive manual test guide in `SAVE_LOAD_TEST_GUIDE.md`. This includes:
- Step-by-step test procedures
- Expected results for each test
- Test results checklist
- Edge case scenarios

## Save Naming Priority

The system implements the following priority for character save names:

1. **AI-Generated Name** (highest priority)
   - If character has `ai.name` field populated, use that
   
2. **Custom Name** (medium priority)
   - If user provides a custom name during save, use that
   - Note: AI name still takes precedence if both exist
   
3. **Placeholder Name** (fallback)
   - Format: `"Character X"` where X is the slot number + 1
   - Example: Slot 0 → "Character 1", Slot 4 → "Character 5"

## Character Data Saved

The save system serializes the following data:

### Core Character Data
- `attributes`: STR, CON, DEX, INT, POW, CHA
- `baseAttributes`: Original rolled values
- `derivedStats`: HP, WP, SAN, BP, Bonds

### Skills
- `skills`: All skill values
- `baseSkills`: Base skill values before bonuses
- `bonusSkillAdvancementsSpent`: Bonus point allocations
- `userCreatedSkills`: Custom specializations

### Profession & Department
- `selectedProfession`: Chosen profession details
- `selectedDepartment`: Department (if applicable)

### Bonds
- `bonds`: Array of bond objects with type, name, description, score

### AI-Generated Content
- `ai.name`: Character name
- `ai.codename`: Operational codename
- `ai.age`, `ai.dob`: Age and date of birth
- `ai.gender`, `ai.nationality`, `ai.decade`: Demographics
- `ai.traits`: Physical and mental traits
- `ai.memories`: Career event memories
- `ai.finalDossier`: Generated dossier text
- **Note**: Portraits (base64 images) may be excluded to save space

### Career Simulation
- `careerApplied`: Whether career has been accepted
- `careerAttributeChanges`: Attribute modifications
- `careerSkillGains`: Skill improvements
- `careerSanChange`: Sanity changes
- `careerBondChange`: Bond count modifications
- `careerMaxHpChange`: HP modifications

### Special States
- `damagedVeteranOption`: Selected veteran damage type
- `hardExperienceSkills`: Skills from hard experience
- `assignedDisorder`: Mental disorder
- `selectedSpecialTrainings`: Special training selections

### Equipment
- `inventory`: All owned items
- `kitInventory`: Items from equipment kit
- `activeKitName`: Selected equipment kit name

## Import/Export Formats

### Slot Export Format
```json
{
  "characterName": "Agent Smith",
  "customName": "My Campaign Character",
  "system": "delta-green",
  "timestamp": 1234567890,
  "data": {
    "version": "1.0.0",
    "system": "delta-green",
    "timestamp": 1234567890,
    "characterData": { /* full character data */ }
  }
}
```

### Current Character Export Format
```json
{
  "characterName": "Agent Smith",
  "system": "delta-green",
  "timestamp": 1234567890,
  "data": {
    "version": "1.0.0",
    "system": "delta-green",
    "timestamp": 1234567890,
    "characterData": { /* full character data */ }
  }
}
```

Both formats are compatible with import functionality.

## LocalStorage Structure

**Key**: `delta-green-character-saves`

**Value**: Array of 5 slots (SaveSlot | null)

```json
[
  {
    "characterName": "Agent Smith",
    "customName": null,
    "system": "delta-green",
    "timestamp": 1234567890,
    "data": { /* SaveData */ }
  },
  null,
  null,
  null,
  null
]
```

## Known Limitations

1. **5 Slot Maximum**: Due to localStorage size constraints
2. **Portrait Exclusion**: Base64 portrait images may be excluded to save space
3. **Load Function**: Currently logs data to console; full restoration requires UI integration
4. **Browser Storage**: Data persists only in the current browser; not synced across devices

## Testing Checklist

- [ ] Save with AI name
- [ ] Save with custom name only
- [ ] Save with placeholder name
- [ ] All character fields persist
- [ ] Export to JSON works
- [ ] Import from JSON works
- [ ] Data survives page refresh
- [ ] Can save to all 5 slots
- [ ] Can delete saves
- [ ] Can overwrite existing saves
- [ ] Edge cases handled (empty character, long names, special characters)

## Troubleshooting

### Tests Fail to Run
```bash
# Reinstall dependencies
npm install

# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### LocalStorage Issues
- Check browser storage quota (typically 5-10 MB)
- Clear localStorage if corrupted: `localStorage.clear()` in browser console
- Check browser privacy settings (localStorage may be disabled)

### Import/Export Issues
- Verify JSON is valid: Use jsonlint.com or browser JSON validator
- Check system field matches: `"system": "delta-green"`
- Ensure timestamp is present and valid

## Contributing

When adding new character fields:

1. Add field to character state in `useCharacter.ts`
2. Field will automatically be included in saves (unless explicitly excluded)
3. Add test coverage in `saveLoadIntegration.test.ts`
4. Update manual test guide if needed
5. Update this README with new field documentation

## References

- Implementation: `hooks/useSaveSystem.ts`
- Types: `types.ts` (SaveSlot, CharacterSaveData)
- UI Component: `components/SaveSlotDrawer.tsx`
- Character Context: `context/CharacterContext.tsx`
