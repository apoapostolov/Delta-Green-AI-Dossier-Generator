// sim-events/unemployed.ts
import type { EventBlueprint } from "../sim/types";
type Weight<T> = { item: T; w: number };

export const unemployedEvents: Weight<EventBlueprint>[] = [
    { item: { kind: "Layoff", detail: "Picking up gig work (e.g., food delivery, ride-sharing) to make ends meet.", check: { type: 'attribute', name: 'CON' }, onSuccess: { skillChanges: [{ name: 'Drive', value: '1' }] }, onFailure: {} }, w: 20 },
    { item: { kind: "FinancialHardship", detail: "Lived off savings, which rapidly dwindled.", check: { type: 'attribute', name: 'POW' }, onSuccess: {}, onFailure: { sanChange: -1 } }, w: 15 },
    { item: { kind: "Enroll", detail: "Went back to school for a new certification.", check: { type: 'attribute', name: 'INT' }, onSuccess: { skillChanges: [{ name: 'Science', value: '1d4' }] }, onFailure: {} }, w: 10 },
    { item: { kind: "Hobby", detail: "Volunteered for a local organization to stay busy and build skills.", check: { type: 'attribute', name: 'CHA' }, onSuccess: { sanChange: 1 }, onFailure: {} }, w: 12 },
    { item: { kind: "PsychEval", detail: "Struggled with depression due to prolonged joblessness.", check: { type: 'attribute', name: 'POW' }, onSuccess: {}, onFailure: { sanChange: -2 } }, w: 8 },
    { item: { kind: "Investigation", detail: "A promising, multi-stage job interview process led to a dead end.", check: { type: 'skill', name: 'Persuade' }, onSuccess: {}, onFailure: { sanChange: -1 } }, w: 10 },
    { item: { kind: "Contract", detail: "Worked a menial, soul-crushing temp job.", check: { type: 'attribute', name: 'CON' }, onSuccess: {}, onFailure: { sanChange: -1 } }, w: 10 },
    { item: { kind: "FamilyStrain", detail: "Forced to rely on the charity of family or friends, causing friction.", check: { type: 'attribute', name: 'CHA' }, onSuccess: {}, onFailure: { sanChange: -1, bondChange: -1 } }, w: 7 },
    { item: { kind: "Investigation", detail: "Relentlessly networked with old contacts to find new opportunities.", check: { type: 'skill', name: 'Persuade' }, onSuccess: { skillChanges: [{ name: 'Persuade', value: '1d4' }] }, onFailure: {} }, w: 8 },
];
