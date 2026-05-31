// sim-events/medical.ts
import type { EventBlueprint } from "../sim/types";
type Weight<T> = { item: T; w: number };

export const medicalEvents: Weight<EventBlueprint>[] = [
    { item: { kind: "Investigation", detail: "Treated a patient with a bizarre, unidentifiable disease that spread to staff.", check: { type: 'skill', name: 'Medicine' }, onSuccess: { skillChanges: [{ name: 'Medicine', value: '1d4' }] }, onFailure: { sanChange: -2 } }, w: 10 },
    { item: { kind: "Investigation", detail: "Faced a frivolous but stressful malpractice lawsuit.", check: { type: 'skill', name: 'Law' }, onSuccess: {}, onFailure: { sanChange: -2 } }, w: 8 },
    { item: { kind: "SpecialAssignment", detail: "Worked through a mass casualty event that overwhelmed the hospital.", check: { type: 'attribute', name: 'POW' }, onSuccess: { skillChanges: [{ name: 'First Aid', value: '1d4' }] }, onFailure: { sanChange: -3 } }, w: 7 },
    { item: { kind: "SpecialAssignment", detail: "Pulled a series of grueling shifts in a high-stress ER environment.", check: { type: 'attribute', name: 'CON' }, onSuccess: { skillChanges: [{ name: 'Medicine', value: '1' }] }, onFailure: { sanChange: -1 } }, w: 12 },
    { item: { kind: "Publication", detail: "Published a case study on a rare and unusual medical condition.", check: { type: 'attribute', name: 'INT' }, onSuccess: { skillChanges: [{ name: 'Science', value: '1d4' }], sanChange: 1 }, onFailure: {} }, w: 9 },
    { item: { kind: "Deploy", detail: "Volunteered for a medical mission in a developing country.", check: { type: 'attribute', name: 'CON' }, onSuccess: { skillChanges: [{ name: 'Medicine', value: '1d4' }], sanChange: 1 }, onFailure: { sanChange: -1 } }, w: 6 },
    { item: { kind: "Investigation", detail: "Dealt with a hospital-wide contagion outbreak.", check: { type: 'skill', name: 'Science' }, onSuccess: { skillChanges: [{ name: 'Medicine', value: '1d4' }] }, onFailure: { sanChange: -2 } }, w: 7 },
    { item: { kind: "EthicalDilemma", detail: "Confronted a colleague who was stealing narcotics.", check: { type: 'attribute', name: 'POW' }, onSuccess: {}, onFailure: { sanChange: -1 } }, w: 6 },
    { item: { kind: "SpecialAssignment", detail: "Performed a risky, experimental surgery.", check: { type: 'skill', name: 'Surgery' }, onSuccess: { skillChanges: [{ name: 'Surgery', value: '1d4' }], sanChange: 1 }, onFailure: { sanChange: -2 } }, w: 5 },
    { item: { kind: "Investigation", detail: "A patient died under mysterious and inexplicable circumstances, prompting a review.", check: { type: 'skill', name: 'Forensics' }, onSuccess: { skillChanges: [{ name: 'Medicine', value: '1' }] }, onFailure: { sanChange: -2 } }, w: 4 },
    { item: { kind: "DGIncident", detail: "A patient's autopsy revealed anatomically impossible features.", check: { type: 'skill', name: 'Medicine' }, onSuccess: { skillChanges: [{ name: 'Unnatural', value: '1' }] }, onFailure: { sanChange: -5, skillChanges: [{ name: 'Unnatural', value: '1d4' }] }, flags: ["classified"] }, w: 3 },
];
