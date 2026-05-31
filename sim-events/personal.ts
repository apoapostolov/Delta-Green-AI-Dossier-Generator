// sim-events/personal.ts
import type { EventBlueprint } from "../sim/types";
type Weight<T> = { item: T; w: number };

export const personalEvents: Weight<EventBlueprint>[] = [
    { item: { kind: "Marriage", detail: "Entered into a marriage.", check: { type: 'attribute', name: 'CHA' }, onSuccess: { sanChange: '1d3' }, onFailure: {} }, w: 5 },
    { item: { kind: "Childbirth", detail: "A child was born.", check: { type: 'attribute', name: 'CON' }, onSuccess: { sanChange: '1d3' }, onFailure: {} }, w: 4 },
    { item: { kind: "Divorce", detail: "Marriage ended in divorce.", check: { type: 'attribute', name: 'CHA' }, onSuccess: {}, onFailure: { sanChange: -2, bondChange: -1 } }, w: 3 },
    { item: { kind: "Hobby", detail: "Developed a new personal hobby.", check: { type: 'attribute', name: 'INT' }, onSuccess: { skillChanges: [{ name: 'Art', value: '1d4' }], sanChange: 1 }, onFailure: {} }, w: 8 },
    { item: { kind: "FinancialWindfall", detail: "Received a small inheritance.", check: { type: 'attribute', name: 'POW' }, onSuccess: { sanChange: 1 }, onFailure: {} }, w: 2 },
    { item: { kind: "FinancialHardship", detail: "Faced unexpected financial hardship.", check: { type: 'attribute', name: 'POW' }, onSuccess: {}, onFailure: { sanChange: -1 } }, w: 3 },
    { item: { kind: "Relocation", detail: "Moved to a new city for personal reasons.", check: { type: 'attribute', name: 'CHA' }, onSuccess: {}, onFailure: {} }, w: 6 },
    { item: { kind: "HealthScare", detail: "Dealt with a significant but non-permanent health issue.", check: { type: 'attribute', name: 'CON' }, onSuccess: { sanChange: -1 }, onFailure: { sanChange: -2 } }, w: 4 },
    { item: { kind: "PersonalLoss", detail: "Experienced the death of a close family member or friend.", check: { type: 'attribute', name: 'POW' }, onSuccess: { sanChange: -2 }, onFailure: { sanChange: -3, bondChange: -1 } }, w: 3 },
    { item: { kind: "PetAdoption", detail: "Adopted a pet.", check: { type: 'attribute', name: 'CHA' }, onSuccess: { sanChange: 1 }, onFailure: {} }, w: 7 },
    { item: { kind: "OldFriend", detail: "Reconnected with a friend from the past.", check: { type: 'attribute', name: 'CHA' }, onSuccess: { sanChange: 1 }, onFailure: {} }, w: 5 },
    { item: { kind: "IdentityTheft", detail: "Victim of identity theft, spending months sorting it out.", check: { type: 'skill', name: 'Bureaucracy' }, onSuccess: { skillChanges: [{ name: 'Bureaucracy', value: '1d4' }] }, onFailure: { sanChange: -2 } }, w: 2 },
    { item: { kind: "JuryDuty", detail: "Served on a jury for a disturbing criminal trial.", check: { type: 'skill', name: 'Law' }, onSuccess: { skillChanges: [{ name: 'Law', value: '1' }] }, onFailure: { sanChange: -1 } }, w: 4 },
];
