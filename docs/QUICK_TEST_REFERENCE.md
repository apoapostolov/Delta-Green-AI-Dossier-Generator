# Quick Test Reference Card

## Save Naming Priority Test

**Priority**: AI Name > Custom Name > Placeholder

| Test | AI Name | Custom Name | Expected Result |
|------|---------|-------------|-----------------|
| 1 | "Agent Smith" | - | "Agent Smith" |
| 2 | "Agent Smith" | "My Save" | "Agent Smith" (customName stored separately) |
| 3 | null | "My Save" | "My Save" |
| 4 | null | null (Slot 0) | "Character 1" |
| 5 | null | null (Slot 4) | "Character 5" |

## Quick Save/Load Test

1. **Create Complete Character**
   - Roll attributes
   - Select profession
   - Allocate skills
   - Create bonds
   - Generate AI name
   - Simulate career
   - Add inventory

2. **Save**
   - Click save icon
   - Select slot
   - Verify name displays correctly

3. **Export**
   - Export slot to JSON
   - Copy to clipboard or download
   - Verify JSON is valid

4. **Import**
   - Delete slot
   - Import JSON
   - Verify all fields present

5. **Verify Persistence**
   - Refresh page (F5)
   - Open save drawer
   - Verify character still there

## Fields to Verify in localStorage

Open DevTools > Application > Local Storage > `delta-green-character-saves`

Check for these key fields:
```json
{
  "characterName": "...",
  "data": {
    "characterData": {
      "attributes": { STR, CON, DEX, INT, POW, CHA },
      "skills": { ... },
      "bonds": [ ... ],
      "ai": {
        "name": "...",
        "codename": "...",
        "traits": { ... }
      },
      "selectedProfession": { ... },
      "careerApplied": true/false,
      "inventory": [ ... ]
    }
  }
}
```

## Run Automated Tests

```bash
npm test
```

Should see: `✓ tests/saveLoadIntegration.test.ts (15)`

## Common Issues

| Issue | Solution |
|-------|----------|
| Tests fail | Run `npm install` |
| Save doesn't show name | Check AI name generation |
| Import fails | Verify JSON format is valid |
| Page refresh loses data | Check localStorage not disabled |

## Test Status Tracker

- [ ] Save with AI name ✓
- [ ] Save with custom name ✓
- [ ] Save with placeholder ✓
- [ ] All fields persist ✓
- [ ] Export works ✓
- [ ] Import works ✓
- [ ] Page refresh persists ✓
- [ ] 5 slots work ✓
- [ ] Delete works ✓
- [ ] Automated tests pass ✓
