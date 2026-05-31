// sim-events/criminal.ts
import type { EventBlueprint } from "../sim/types";
type Weight<T> = { item: T; w: number };

export const criminalEvents: Weight<EventBlueprint>[] = [
    { item: { kind: "Arrest", detail: "Arrested on suspicion, but charges were dropped.", check: { type: 'skill', name: 'Law' }, onSuccess: { skillChanges: [{ name: 'Law', value: '1d4' }] }, onFailure: { sanChange: -1 } }, w: 15 },
    { item: { kind: "Injury", detail: "Injured during a high-stakes illegal enterprise.", check: { type: 'attribute', name: 'CON' }, onSuccess: {}, onFailure: { sanChange: -1, attributeChange: { name: 'CON', value: -1 } } }, w: 10 },
    { item: { kind: "Contract", detail: "Completed a lucrative but dangerous job.", check: { type: 'skill', name: 'Stealth' }, onSuccess: { skillChanges: [{ name: 'Stealth', value: '1d4' }] }, onFailure: { skillChanges: [{ name: 'Stealth', value: '1' }] } }, w: 20 },
    { item: { kind: "Investigation", detail: "A heist went wrong, forcing a violent escape and attracting police attention.", check: { type: 'skill', name: 'Athletics' }, onSuccess: { skillChanges: [{ name: 'Drive', value: '1d4' }] }, onFailure: { sanChange: -2 } }, w: 12 },
    { item: { kind: "Burned", detail: "Betrayed by a partner, losing your score and nearly your life.", check: { type: 'attribute', name: 'POW' }, onSuccess: {}, onFailure: { sanChange: -3, bondChange: -1 } }, w: 8 },
    { item: { kind: "SpecialAssignment", detail: "Spent a year laying low under a false identity after a high-profile job.", check: { type: 'skill', name: 'Disguise' }, onSuccess: { skillChanges: [{ name: 'Disguise', value: '1d4' }] }, onFailure: {} }, w: 9 },
    { item: { kind: "Arrest", detail: "Served a short prison sentence.", check: { type: 'attribute', name: 'CON' }, onSuccess: { skillChanges: [{ name: 'Melee Weapons', value: '1d4' }] }, onFailure: { sanChange: -2, attributeChange: { name: 'CON', value: -1 } } }, w: 5 },
    { item: { kind: "Contract", detail: "Successfully established a new criminal enterprise (e.g., smuggling route).", check: { type: 'attribute', name: 'INT' }, onSuccess: { skillChanges: [{ name: 'Accounting', value: '1d4' }] }, onFailure: { sanChange: -1 } }, w: 7 },
    { item: { kind: "Investigation", detail: "A trusted associate became a police informant.", check: { type: 'skill', name: 'HUMINT' }, onSuccess: {}, onFailure: { sanChange: -2 } }, w: 6 },
    { item: { kind: "Injury", detail: "Survived an assassination attempt from a rival crew.", check: { type: 'skill', name: 'Dodge' }, onSuccess: { sanChange: -1 }, onFailure: { sanChange: -3, maxHpChange: '1d3' } }, w: 4 },
    { item: { kind: "SpecialAssignment", detail: "Cultivated a source inside a law enforcement agency.", check: { type: 'skill', name: 'Persuade' }, onSuccess: { skillChanges: [{ name: 'HUMINT', value: '1d4' }] }, onFailure: {} }, w: 3 },
];
