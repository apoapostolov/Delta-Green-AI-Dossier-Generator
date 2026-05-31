// sim-events/bureaucracy.ts
import type { EventBlueprint } from "../sim/types";
type Weight<T> = { item: T; w: number };

export const bureaucratEvents: Weight<EventBlueprint>[] = [
    { item: { kind: "SpecialAssignment", detail: "Drafted a new government policy that faced significant political opposition.", check: { type: 'skill', name: 'Law' }, onSuccess: { skillChanges: [{ name: 'Bureaucracy', value: '1d4' }] }, onFailure: { sanChange: -1 } }, w: 12 },
    { item: { kind: "Investigation", detail: "Navigated a complex, year-long budget approval process.", check: { type: 'skill', name: 'Accounting' }, onSuccess: { skillChanges: [{ name: 'Bureaucracy', value: '1d4' }] }, onFailure: { sanChange: -1 } }, w: 15 },
    { item: { kind: "Testimony", detail: "Forced to respond to a hostile congressional inquiry.", check: { type: 'skill', name: 'Persuade' }, onSuccess: {}, onFailure: { sanChange: -2 } }, w: 8 },
    { item: { kind: "SpecialAssignment", detail: "Managed a government project that was massively over-budget and behind schedule.", check: { type: 'attribute', name: 'INT' }, onSuccess: { skillChanges: [{ name: 'Bureaucracy', value: '1' }] }, onFailure: { sanChange: -2 } }, w: 10 },
    { item: { kind: "Investigation", detail: "Caught in the middle of an inter-departmental turf war.", check: { type: 'attribute', name: 'CHA' }, onSuccess: {}, onFailure: { sanChange: -1 } }, w: 11 },
    { item: { kind: "SpecialAssignment", detail: "Tasked with implementing a deeply unpopular new internal procedure.", check: { type: 'skill', name: 'Persuade' }, onSuccess: {}, onFailure: { sanChange: -1 } }, w: 9 },
    { item: { kind: "PublicScandal", detail: "A whistleblower in the department created a media scandal.", check: { type: 'attribute', name: 'POW' }, onSuccess: {}, onFailure: { sanChange: -2 } }, w: 5 },
    { item: { kind: "SpecialAssignment", detail: "Served as an interim department head during a leadership crisis.", check: { type: 'skill', name: 'Bureaucracy' }, onSuccess: { sanChange: 1 }, onFailure: { sanChange: -1 } }, w: 6 },
    { item: { kind: "Coverup", detail: "A critical file was 'lost' on your watch, creating a major problem that had to be contained.", check: { type: 'attribute', name: 'INT' }, onSuccess: {}, onFailure: { sanChange: -2 } }, w: 4 },
    { item: { kind: "SpecialAssignment", detail: "Organized a major, tedious government conference or summit.", check: { type: 'attribute', name: 'CON' }, onSuccess: { skillChanges: [{ name: 'Bureaucracy', value: '1' }] }, onFailure: {} }, w: 10 },
    { item: { kind: "SpecialAssignment", detail: "Tasked with the unpleasant job of downsizing a department.", check: { type: 'skill', name: 'Persuade' }, onSuccess: { sanChange: -1 }, onFailure: { sanChange: -2, bondChange: -1 } }, w: 5 },
];

export const consultantEvents: Weight<EventBlueprint>[] = [
    { item: { kind: "Testimony", detail: "Hired to write an expert report for a high-profile court case.", check: { type: 'skill', name: 'Law' }, onSuccess: { skillChanges: [{ name: 'Law', value: '1d4' }] }, onFailure: { sanChange: -1 } }, w: 10 },
    { item: { kind: "Contract", detail: "Contracted by a corporation to conduct opposition research on a competitor.", check: { type: 'skill', name: 'Investigation' }, onSuccess: { skillChanges: [{ name: 'SIGINT', value: '1d4' }] }, onFailure: {} }, w: 12 },
    { item: { kind: "SpecialAssignment", detail: "Worked as a subject matter expert for a government committee.", check: { type: 'skill', name: 'Bureaucracy' }, onSuccess: { skillChanges: [{ name: 'Bureaucracy', value: '1d4' }], sanChange: 1 }, onFailure: {} }, w: 11 },
    { item: { kind: "Burned", detail: "A major client disappeared without paying for a year's worth of work.", check: { type: 'attribute', name: 'POW' }, onSuccess: {}, onFailure: { sanChange: -2 } }, w: 6 },
    { item: { kind: "Training", detail: "Hired to train a corporate security team in a specialized skill.", check: { type: 'attribute', name: 'CHA' }, onSuccess: { skillChanges: [{ name: 'Firearms', value: '1d4' }] }, onFailure: {} }, w: 9 },
    { item: { kind: "EthicalDilemma", detail: "The expert advice you gave a client led to a public disaster.", check: { type: 'attribute', name: 'INT' }, onSuccess: { sanChange: -1 }, onFailure: { sanChange: -2 } }, w: 5 },
    { item: { kind: "Contract", detail: "A short-term contract was unexpectedly extended into a demanding, year-long project.", check: { type: 'attribute', name: 'CON' }, onSuccess: {}, onFailure: { sanChange: -1 } }, w: 10 },
    { item: { kind: "FinancialHardship", detail: "Struggled to find consistent work, leading to financial instability.", check: { type: 'skill', name: 'Persuade' }, onSuccess: {}, onFailure: { sanChange: -1 } }, w: 8 },
    { item: { kind: "PublicScandal", detail: "Your expert opinion was publicly discredited by a respected institution.", check: { type: 'attribute', name: 'POW' }, onSuccess: {}, onFailure: { sanChange: -2 } }, w: 4 },
    { item: { kind: "Contract", detail: "Contracted to work on a classified project for a defense contractor.", check: { type: 'skill', name: 'Science' }, onSuccess: { skillChanges: [{ name: 'Science', value: '1d4' }] }, onFailure: { sanChange: -1 }, flags: ["classified"] }, w: 7 },
];
