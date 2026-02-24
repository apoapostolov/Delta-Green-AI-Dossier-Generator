# Save/Load System Test Guide

This document provides step-by-step instructions for manually testing the save/load and import/export functionality for the Delta Green AI Dossier Generator.

## Prerequisites

1. Start the development server: `npm run dev`
2. Open the application in your browser
3. Open browser DevTools (F12) to inspect localStorage and console output

## Test 1: Save Naming Priority

### Test 1.1: AI-Generated Name Priority
**Expected**: Save should use AI-generated character name

1. Create a new character and roll attributes
2. Select a profession
3. Generate AI name in the Dossier tab
4. Open Save Drawer (click the save icon)
5. Click "Save" on Slot 1
6. **Expected Result**: Slot shows the AI-generated character name

### Test 1.2: Custom Name with AI Name Present
**Expected**: Display AI name but store custom name as well

1. With AI name generated, open Save Drawer
2. Save to a slot and provide a custom name when prompted
3. **Expected Result**: Slot displays AI-generated name as the characterName

### Test 1.3: Custom Name Without AI Name
**Expected**: Use custom name when no AI name exists

1. Create a character but DON'T generate AI name
2. Open Save Drawer and save to a slot
3. Provide a custom name when prompted
4. **Expected Result**: Slot shows the custom name you provided

### Test 1.4: Placeholder Name
**Expected**: Use "Character X" when neither AI nor custom name exists

1. Create a character without generating AI name
2. Save to Slot 1 without providing a custom name
3. Save to Slot 2 without providing a custom name
4. Save to Slot 5 without providing a custom name
5. **Expected Results**:
   - Slot 1: "Character 1"
   - Slot 2: "Character 2"
   - Slot 5: "Character 5"

## Test 2: Complete Character Data Persistence

### Test 2.1: Basic Character Fields
**Expected**: All core character data persists

1. Create a complete character with:
   - Rolled attributes (STR, CON, DEX, INT, POW, CHA)
   - Selected profession
   - Allocated skill points
   - Created bonds

2. Save the character to Slot 1

3. Open browser DevTools > Application > Local Storage
4. Find key: `delta-green-character-saves`
5. Inspect the JSON data

6. **Expected Fields Present**:
   ```json
   {
     "characterName": "...",
     "system": "delta-green",
     "timestamp": <number>,
     "data": {
       "version": "1.0.0",
       "characterData": {
         "attributes": { STR, CON, DEX, INT, POW, CHA },
         "baseAttributes": { ... },
         "derivedStats": { HP, WP, SAN, BP, Bonds },
         "skills": { ... },
         "bonds": [ ... ],
         "selectedProfession": { ... }
       }
     }
   }
   ```

### Test 2.2: AI-Generated Content Persistence
**Expected**: AI content saves (except portraits if configured)

1. Create character and generate:
   - Name
   - Codename
   - Portrait (optional)
   - Traits
   - Career simulation
   - Memories
   - Final dossier

2. Save to a slot

3. Inspect localStorage JSON

4. **Expected AI Fields**:
   - `ai.name`
   - `ai.codename`
   - `ai.age`
   - `ai.gender`
   - `ai.nationality`
   - `ai.decade`
   - `ai.traits`
   - `ai.memories`
   - `ai.finalDossier`

### Test 2.3: Career Simulation Data Persistence
**Expected**: All career changes persist

1. Create character and simulate career
2. Accept consequences
3. Save character

4. **Expected Career Fields**:
   - `careerApplied: true`
   - `careerAttributeChanges: { ... }`
   - `careerSkillGains: { ... }`
   - `careerSanChange: <number>`
   - `careerBondChange: <number>`
   - `careerMaxHpChange: <number>`

### Test 2.4: Inventory and Equipment Persistence
**Expected**: All inventory items save

1. Select equipment kit
2. Add custom items
3. Save character

4. **Expected Fields**:
   - `inventory: [ ... ]`
   - `kitInventory: [ ... ]`
   - `activeKitName: "..."`

### Test 2.5: Special Character States
**Expected**: Special states persist

1. Create a "Damaged Veteran" character
2. Select damaged veteran option and make choices
3. Save character

4. **Expected Fields**:
   - `damagedVeteranOption`
   - `hardExperienceSkills`
   - `assignedDisorder`
   - `veteranChanges`

## Test 3: Export Functionality

### Test 3.1: Export Saved Slot
**Expected**: Creates valid JSON export

1. Save a character to a slot
2. Click the export button on that slot
3. Modal appears with JSON data
4. Click "Copy to Clipboard"
5. Paste into a text editor

6. **Verify**:
   - Valid JSON format
   - Contains `characterName`
   - Contains `system: "delta-green"`
   - Contains `data.characterData` with all fields

### Test 3.2: Export Current Character
**Expected**: Exports current unsaved character

1. Create a character (don't save to a slot)
2. Open Save Drawer
3. Click "Export Current Character"
4. Modal appears with JSON

5. **Verify**:
   - Contains current character data
   - Can be copied to clipboard
   - Can be downloaded as .json file

### Test 3.3: Download Exported Character
**Expected**: Downloads as .json file

1. Export current character
2. Click "Download" button
3. **Verify**:
   - File downloads with name: `<character-name>_<timestamp>.json`
   - File contains valid JSON
   - File can be opened and imported

## Test 4: Import Functionality

### Test 4.1: Import from Slot Export
**Expected**: Imports into first available slot

1. Export a character from Slot 1
2. Delete Slot 1
3. Click "Import Character"
4. Paste the exported JSON
5. Click "Import"

6. **Verify**:
   - Character appears in Slot 1 (first empty slot)
   - Character name matches
   - Timestamp is updated

### Test 4.2: Import from Current Character Export
**Expected**: Imports current character export format

1. Export current character (not from a slot)
2. Clear all slots or pick an empty one
3. Import the JSON
4. **Verify**: Character imports successfully

### Test 4.3: Import When All Slots Full
**Expected**: Imports to Slot 1, overwriting existing

1. Fill all 5 slots with characters
2. Import a new character
3. **Verify**: Slot 1 is overwritten with imported character

### Test 4.4: Import Error Handling
**Expected**: Shows error for invalid JSON

1. Click "Import Character"
2. Paste invalid JSON (e.g., `{ broken json`)
3. Click "Import"
4. **Verify**: Error message appears: "Failed to import character: ..."

## Test 5: Complete Save/Load Cycle

### Test 5.1: Full Character Reconstruction
**Expected**: All fields populate correctly after import

1. Create a COMPLETE character with:
   - All attributes rolled
   - Profession selected
   - All skill points allocated
   - All bonds created
   - AI name, codename, traits generated
   - Career simulated and accepted
   - Equipment selected
   - Special trainings selected (if applicable)

2. Save to Slot 1

3. Export Slot 1 to JSON (copy the JSON)

4. Delete Slot 1

5. Import the JSON back

6. **Manually verify in localStorage** that ALL fields are present:
   - ✓ attributes & baseAttributes
   - ✓ derivedStats (HP, WP, SAN, BP, Bonds)
   - ✓ skills & baseSkills
   - ✓ bonusSkillAdvancementsSpent
   - ✓ selectedProfession
   - ✓ selectedDepartment (if any)
   - ✓ bonds array
   - ✓ ai object (name, codename, age, gender, nationality, decade, traits, memories, finalDossier)
   - ✓ careerApplied & career changes
   - ✓ inventory & kitInventory
   - ✓ userCreatedSkills
   - ✓ selectedSpecialTrainings
   - ✓ damagedVeteranOption & related fields (if applicable)
   - ✓ assignedDisorder (if applicable)

7. Note: Portraits (base64 image data) may be excluded to save space, as requested

## Test 6: LocalStorage Persistence

### Test 6.1: Persistence Across Sessions
**Expected**: Saves persist after page reload

1. Save multiple characters to different slots
2. Refresh the page (F5)
3. Open Save Drawer
4. **Verify**: All saved characters are still present

### Test 6.2: Multiple Characters
**Expected**: Can save and manage 5 different characters

1. Create 5 different characters
2. Save each to a different slot
3. **Verify**:
   - All 5 slots show different character names
   - Each has correct timestamp
   - Can export any of them
   - Can delete any of them

### Test 6.3: Update Existing Save
**Expected**: Overwrites slot with new timestamp

1. Save a character to Slot 1
2. Note the timestamp
3. Make changes to the character (add skills, items, etc.)
4. Save again to Slot 1
5. **Verify**:
   - Timestamp is updated
   - New changes are present in the save

## Test 7: Edge Cases

### Test 7.1: Empty Character Save
**Expected**: Can save even with minimal data

1. Roll attributes only (don't select profession or generate anything)
2. Try to save
3. **Verify**: 
   - Can save with placeholder name
   - At minimum, attributes are saved

### Test 7.2: Character Without AI Name
**Expected**: Uses custom or placeholder name

1. Create complete character but DON'T generate AI name
2. Save without providing custom name
3. **Verify**: Uses "Character X" placeholder

### Test 7.3: Very Long Character Name
**Expected**: Handles long names gracefully

1. Generate AI name (or use custom name)
2. If possible, edit to create very long name (50+ characters)
3. Save
4. **Verify**: 
   - Name saves correctly
   - UI doesn't break
   - Can export/import successfully

### Test 7.4: Special Characters in Name
**Expected**: Handles special characters

1. Use custom name with special chars: `"Agent Müller (Ö'Reilly)"`
2. Save, export, import
3. **Verify**: Special characters preserved through cycle

## Test 8: Delete Functionality

### Test 8.1: Delete Confirmation
**Expected**: Requires confirmation before delete

1. Save a character
2. Click delete button on the slot
3. **Verify**: Confirmation dialog appears

### Test 8.2: Delete Success
**Expected**: Slot becomes empty after delete

1. Confirm deletion
2. **Verify**: 
   - Slot shows "Empty Slot"
   - Can save new character to that slot
   - LocalStorage updated

### Test 8.3: Cannot Delete Empty Slot
**Expected**: Delete button only appears on filled slots

1. Find an empty slot
2. **Verify**: No delete button visible

## Test Results Checklist

Mark each test as ✓ (pass), ✗ (fail), or ⚠ (partial):

### Naming Priority
- [ ] Test 1.1: AI name priority
- [ ] Test 1.2: Custom name with AI name
- [ ] Test 1.3: Custom name without AI name
- [ ] Test 1.4: Placeholder name generation

### Data Persistence
- [ ] Test 2.1: Basic character fields
- [ ] Test 2.2: AI-generated content
- [ ] Test 2.3: Career simulation data
- [ ] Test 2.4: Inventory and equipment
- [ ] Test 2.5: Special character states

### Export
- [ ] Test 3.1: Export saved slot
- [ ] Test 3.2: Export current character
- [ ] Test 3.3: Download exported file

### Import
- [ ] Test 4.1: Import from slot export
- [ ] Test 4.2: Import current export
- [ ] Test 4.3: Import when slots full
- [ ] Test 4.4: Import error handling

### Save/Load Cycle
- [ ] Test 5.1: Full character reconstruction

### LocalStorage
- [ ] Test 6.1: Persistence across sessions
- [ ] Test 6.2: Multiple characters
- [ ] Test 6.3: Update existing save

### Edge Cases
- [ ] Test 7.1: Empty character save
- [ ] Test 7.2: Character without AI name
- [ ] Test 7.3: Very long name
- [ ] Test 7.4: Special characters in name

### Delete
- [ ] Test 8.1: Delete confirmation
- [ ] Test 8.2: Delete success
- [ ] Test 8.3: Cannot delete empty slot

## Known Limitations

1. **Portrait Data**: Base64 portrait images may be excluded from saves to reduce localStorage size (as requested)
2. **Load Function**: Currently displays data in console rather than fully restoring the character in the UI (restoration requires exposing setter functions from useCharacter hook)
3. **5 Slot Limit**: Only 5 save slots available due to localStorage size constraints

## Reporting Issues

If any test fails, please note:
- Which test failed
- What the expected result was
- What actually happened
- Browser and version
- Any console errors

## Automated Tests

To run automated unit tests (after installing dependencies):

```bash
npm install
npm test
```

The automated tests cover:
- Save naming priority logic
- Data serialization and deserialization
- Import/export format validation
- Field preservation through save/load cycles
