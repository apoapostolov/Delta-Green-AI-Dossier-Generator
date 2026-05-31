// sim-events/deltaGreen.ts
import type { EventBlueprint } from "../sim/types";
type Weight<T> = { item: T; w: number };

export const deltaGreenEvents: Weight<EventBlueprint>[] = [
    { item: { kind: "DGIncident", detail: "Participated in a full-scale Delta Green operation.", check: { type: 'attribute', name: 'POW' }, onSuccess: { skillChanges: [{ name: 'Unnatural', value: '1' }] }, onFailure: { sanChange: -5, skillChanges: [{ name: 'Unnatural', value: '1d4' }] }, flags: ["classified"] }, w: 25 },
    { item: { kind: "Coverup", detail: "Tasked with cleaning up and containing the aftermath of an operation.", check: { type: 'skill', name: 'Bureaucracy' }, onSuccess: { sanChange: -1 }, onFailure: { sanChange: -2 }, flags: ["classified"] }, w: 15 },
    { item: { kind: "Investigation", detail: "Spent months monitoring a potential unnatural threat.", check: { type: 'skill', name: 'Alertness' }, onSuccess: { skillChanges: [{ name: 'Alertness', value: '1d4' }] }, onFailure: { skillChanges: [{ name: 'Alertness', value: '1' }] } }, w: 10 },
    { item: { kind: "SpecialAssignment", detail: "Activated as a 'friendly' asset on another agency's investigation.", check: { type: 'skill', name: 'HUMINT' }, onSuccess: { skillChanges: [{ name: 'Bureaucracy', value: '1d4' }] }, onFailure: {} }, w: 8 },
    { item: { kind: "EthicalDilemma", detail: "Forced to sacrifice an innocent to contain a threat.", check: { type: 'attribute', name: 'POW' }, onSuccess: { sanChange: -2 }, onFailure: { sanChange: -5, bondChange: -1 } }, w: 5 },
    { item: { kind: "SpecialAssignment", detail: "Sanctioned to 'retire' a friendly asset who knows too much.", check: { type: 'skill', name: 'Stealth' }, onSuccess: { sanChange: -2 }, onFailure: { sanChange: -5, bondChange: -1 } }, w: 4 },
    { item: { kind: "Investigation", detail: "Sent to investigate another Delta Green cell that has gone dark.", check: { type: 'skill', name: 'Criminology' }, onSuccess: { skillChanges: [{ name: 'Unnatural', value: '1' }] }, onFailure: { sanChange: -5 } }, w: 3 },
    { item: { kind: "SpecialAssignment", detail: "Tasked with maintaining and stocking a local Green Box.", check: { type: 'skill', name: 'Craft' }, onSuccess: {}, onFailure: {} }, w: 12 },
    { item: { kind: "PsychEval", detail: "Debriefing after an operation led to a mandatory psychological review.", check: { type: 'attribute', name: 'POW' }, onSuccess: {}, onFailure: { sanChange: -1 } }, w: 9 },
    { item: { kind: "Investigation", detail: "Discovered your own agency is unknowingly investigating your DG activities.", check: { type: 'skill', name: 'Stealth' }, onSuccess: { skillChanges: [{ name: 'Stealth', value: '1d4' }] }, onFailure: { sanChange: -2 } }, w: 4 },
    { item: { kind: "FamilyStrain", detail: "A sudden disappearance for an 'opera' causes severe strain on a relationship.", check: { type: 'attribute', name: 'CHA' }, onSuccess: {}, onFailure: { sanChange: -1, bondChange: -1 } }, w: 5 },
];
