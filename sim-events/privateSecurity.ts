// sim-events/privateSecurity.ts
import type { EventBlueprint } from "../sim/types";
type Weight<T> = { item: T; w: number };

export const privateSecurityEvents: Weight<EventBlueprint>[] = [
    { item: { kind: "SpecialAssignment", detail: "Served as a bodyguard for a high-profile corporate executive.", check: { type: 'skill', name: 'Alertness' }, onSuccess: { skillChanges: [{ name: 'Alertness', value: '1d4' }, { name: 'Firearms', value: '1' }] }, onFailure: { sanChange: -1 } }, w: 12 },
    { item: { kind: "Investigation", detail: "Conducted a technical surveillance counter-measures (TSCM) sweep for corporate espionage.", check: { type: 'skill', name: 'SIGINT' }, onSuccess: { skillChanges: [{ name: 'SIGINT', value: '1d4' }] }, onFailure: { skillChanges: [{ name: 'SIGINT', value: '1' }] } }, w: 8 },
    { item: { kind: "SpecialAssignment", detail: "Managed security for a sensitive R&D facility.", check: { type: 'skill', name: 'Bureaucracy' }, onSuccess: { skillChanges: [{ name: 'Bureaucracy', value: '1d4' }] }, onFailure: {} }, w: 10 },
    { item: { kind: "Investigation", detail: "Investigated a large-scale internal theft ring.", check: { type: 'skill', name: 'Criminology' }, onSuccess: { skillChanges: [{ name: 'Criminology', value: '1d4' }, { name: 'Search', value: '1' }] }, onFailure: { sanChange: -1 } }, w: 9 },
    { item: { kind: "SpecialAssignment", detail: "Worked crowd control at a chaotic, high-profile public event.", check: { type: 'attribute', name: 'STR' }, onSuccess: { skillChanges: [{ name: 'Persuade', value: '1' }] }, onFailure: { sanChange: -1 } }, w: 10 },
    { item: { kind: "Deploy", detail: "Handled logistics for a high-risk international asset transport.", check: { type: 'skill', name: 'Navigate' }, onSuccess: { skillChanges: [{ name: 'Drive', value: '1d4' }] }, onFailure: { sanChange: -1 } }, w: 7 },
    { item: { kind: "Contract", detail: "Provided security consultation to a company after a major data breach.", check: { type: 'skill', name: 'Computer Science' }, onSuccess: { skillChanges: [{ name: 'Computer Science', value: '1d4' }] }, onFailure: {} }, w: 8 },
    { item: { kind: "SpecialAssignment", detail: "Involved in the hostile termination of a dangerous employee.", check: { type: 'skill', name: 'Persuade' }, onSuccess: {}, onFailure: { sanChange: -2 } }, w: 5 },
    { item: { kind: "Training", detail: "Hired for a 'red team' exercise to test a facility's penetration security.", check: { type: 'skill', name: 'Stealth' }, onSuccess: { skillChanges: [{ name: 'Stealth', value: '1d4' }, { name: 'Disguise', value: '1d4' }] }, onFailure: { sanChange: -1 } }, w: 6 },
    { item: { kind: "Investigation", detail: "Responded to a credible kidnapping threat against a client's family.", check: { type: 'skill', name: 'HUMINT' }, onSuccess: { skillChanges: [{ name: 'Alertness', value: '1d4' }] }, onFailure: { sanChange: -2, bondChange: -1 } }, w: 4 },
    { item: { kind: "Deploy", detail: "Deployed overseas to protect corporate assets in a politically unstable region.", check: { type: 'skill', name: 'Survival' }, onSuccess: { skillChanges: [{ name: 'Survival', value: '1d4' }, { name: 'Firearms', value: '1d4' }] }, onFailure: { sanChange: -2, maxHpChange: '1d3' } }, w: 5 },
    { item: { kind: "Injury", detail: "Sustained an injury during a violent confrontation on the job.", check: { type: 'attribute', name: 'CON' }, onSuccess: {}, onFailure: { sanChange: -1, attributeChange: { name: 'CON', value: -1 } } }, w: 8 },
];
