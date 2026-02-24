// sim-events/education.ts
import type { EventBlueprint } from "../sim/types";
type Weight<T> = { item: T; w: number };

export const educationEvents: Weight<EventBlueprint>[] = [
    { item: { kind: "Graduate", detail: "Graduated with honors in a relevant field.", check: { type: 'attribute', name: 'INT' }, onSuccess: { skillChanges: [{ name: 'Science', value: '1d4' }] }, onFailure: { skillChanges: [{ name: 'Science', value: '1' }] } }, w: 50 },
    { item: { kind: "Training", detail: "Completed a valuable internship with a government agency.", check: { type: 'attribute', name: 'CHA' }, onSuccess: { skillChanges: [{ name: 'Bureaucracy', value: '1d4' }] }, onFailure: {} }, w: 15 },
    { item: { kind: "Investigation", detail: "Changed majors after a crisis of confidence in original field of study.", check: { type: 'attribute', name: 'POW' }, onSuccess: {}, onFailure: { sanChange: -1 } }, w: 10 },
    { item: { kind: "Award", detail: "Won a prestigious scholarship, easing financial burdens.", check: { type: 'attribute', name: 'INT' }, onSuccess: { sanChange: 1 }, onFailure: {} }, w: 5 },
    { item: { kind: "DisciplinaryAction", detail: "Faced academic probation due to poor grades or conduct.", check: { type: 'attribute', name: 'CON' }, onSuccess: {}, onFailure: { sanChange: -1 } }, w: 10 },
    { item: { kind: "Contract", detail: "Worked a menial part-time job to pay for tuition.", check: { type: 'attribute', name: 'CON' }, onSuccess: {}, onFailure: {} }, w: 10 },
];
