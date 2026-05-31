// sim-events/index.ts
import type { CareerState, EventBlueprint } from "../sim/types";
import { militaryEvents } from './military';
import { lawEnforcementEvents } from './lawEnforcement';
import { intelligenceEvents } from './intelligence';
import { academicEvents } from './academic';
import { privateSecurityEvents } from './privateSecurity';
import { bureaucratEvents } from './bureaucracy';
import { medicalEvents } from './medical';
import { criminalEvents } from './criminal';
import { unemployedEvents } from './unemployed';
import { consultantEvents } from './consultant';
import { educationEvents } from './education';
import { deltaGreenEvents } from './deltaGreen';
import { personalEvents } from './personal';

type Weight<T> = { item: T; w: number };

// --- Rebuild the main eventTables object ---
export const eventTables: Record<CareerState, Weight<EventBlueprint>[]> = {
    Military: [...militaryEvents, ...personalEvents],
    LawEnforcement: [...lawEnforcementEvents, ...personalEvents],
    Intelligence: [...intelligenceEvents, ...personalEvents],
    Academic: [...academicEvents, ...personalEvents],
    PrivateSecurity: [...privateSecurityEvents, ...personalEvents],
    Bureaucrat: [...bureaucratEvents, ...personalEvents],
    Medical: [...medicalEvents, ...personalEvents],
    Criminal: [...criminalEvents, ...personalEvents],
    Unemployed: [...unemployedEvents, ...personalEvents],
    Consultant: [...consultantEvents, ...personalEvents],
    Education: [...educationEvents],
    DeltaGreenAdj: [...deltaGreenEvents],
};

// --- Re-export other data from the original file ---
export { careerStateDetails } from './details';
export { weirdEvents } from './weird';
