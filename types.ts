// types.ts

// AI & UI Types
export type Nationality = string;
export type ExperienceLevel = 'New Recruit' | 'Experienced' | 'Veteran' | 'Legend';
export type DamagedVeteranOption = 'Extreme Violence' | 'Captivity or Imprisonment' | 'Hard Experience' | 'Things Man Was Not Meant to Know';
export type ToastType = 'success' | 'error' | 'warning';

// FIX: Added Emotion interface, used for generating expressive portraits.
export interface Emotion {
  name: string;
  prompt: string;
}

// FIX: Added CharacterTraits interface for AI-generated character details.
export interface CharacterTraits {
  positivePhysical: string;
  positiveMental: string;
  negative: string;
}

export interface DistinguishingFeatures {
  STR?: string;
  CON?: string;
  DEX?: string;
  INT?: string;
  POW?: string;
  CHA?: string;
}

export interface WeightedNationality {
  name: string;
  weight: number;
}

// FIX: Added Theme type alias for theme selection.
export type Theme = string;

export interface ThemeConfig {
  displayName: string;
  portrait: {
    theme: string;
    setting: string;
    atmosphere: string;
    visualStyle: string;
    additionalDetails: string;
  };
  name: {
    promptDescription: string;
  };
  // FIX: Added optional traits property to support theme-specific trait generation.
  traits?: {
    promptDescription: string;
  };
}

export interface DecadePromptConfig {
  artStyle: string;
  fashion: string;
  looks: string;
  mannerisms: string;
  politicsAndMood: string;
  technology: string;
}

export interface DecadeConfig {
  name: string;
  displayName: string;
  prompt: DecadePromptConfig;
}


export type Tab = 'stats' | 'skills' | 'gear' | 'dossier';

// Delta Green System-Specific Data Types
export type Attribute = 'STR' | 'CON' | 'DEX' | 'INT' | 'POW' | 'CHA';
export const ATTRIBUTES: Attribute[] = ['STR', 'CON', 'DEX', 'INT', 'POW', 'CHA'];

export interface AttributeSet {
  STR: number;
  CON: number;
  DEX: number;
  INT: number;
  POW: number;
  CHA: number;
}

export interface Skill {
  name: string;
  stub?: string; // The "real" name for specializations
  shortName?: string;
  base: number;
  specialty?: boolean;
  description?: string; // Added for skill tooltips
  sourceId?: SourceID;
}

export type ProfessionGroup = 'Federal Agent' | 'Military' | 'Civilian Specialist' | 'Academic Expert';

export interface SkillValue {
    name: string;
    value: number;
}

export interface Profession {
    name: string;
    description: string;
    group: ProfessionGroup;
    recommendedStats: Attribute[];
    professionalSkills: SkillValue[];
    choiceGroups: {
        count: number;
        options: SkillValue[];
    }[];
    bonds: number;
    bonusSkillAdvancements: number;
    sourceId?: SourceID;
    infoId?: string;
    archetypicalClothing?: string;
    ranks?: string[];
    source?: string;
    page?: number;
    equipmentKit?: string[];
    isDepartment?: boolean;
    eligibleProfessions?: string[];
    specialTrainings?: string[];
}


export interface Department {
    stub: string;
    name: string;
    description: string;
    country: string;
    agency?: string;
    rank_order: number;
    yearOfEstablishment?: number;
    info: {
        powers_of_arrest: string;
        carry_of_weapon: string;
        access_to_funds: {
            maximum_request: 'Incidental' | 'Standard' | 'Unusual' | 'Major' | 'Extreme';
            access_protocol: 'Unlimited' | 'Limited' | 'On Request';
        };
        budget_and_restricted_items: string;
    };
    wikipedia_url: string;
    professions: string[];
    suggested_bonus_skills: string[];
    equipment: string[];
    ranks: Record<string, string[]>; // Map Profession name to rank array
    source?: string;
    page?: number;
    sourceId?: SourceID;
    infoId?: string;
    equipmentKit?: string[];
    isProfessionAsDept?: boolean;
    specialTrainings?: string[];
}

export interface BondType {
    name: string;
    isGroup: boolean;
    description: string;
    weight?: number;
    allowRepeat?: boolean;
    repeatWeight?: number;
    exclusionGroup?: string;
}

export interface Bond {
    type: string;
    name: string;
    description: string;
    score: number;
    scoreModifier?: number;
    terminated?: boolean;
}

export type DGItemExpense = 'None' | 'Incidental' | 'Standard' | 'Unusual' | 'Major' | 'Extreme';

export interface DGItem {
    section: string;
    name: string;
    shortName?: string;
    skill?: string;
    damage?: string;
    armorPiercing?: string;
    expense: DGItemExpense;
    range?: string;
    uses?: string;
    radius?: string;
    victimsPenalty?: string;
    baseRange?: string;
    lethality?: string;
    killRadius?: string;
    ammoCapacity?: string;
    description?: string;
    isRestricted?: boolean;
    sourceType?: 'core' | 'homebrew' | 'ai';
}

export interface SkillPackage {
  name: string;
  descriptor: string;
  skills: string[];
  choices?: string;
}

export interface Disorder {
    name: string;
    description: string;
    source: 'Violence' | 'Helplessness';
    weight: number;
}

export interface SpecialTraining {
    name: string;
    basedOn: Attribute | string; // e.g. 'DEX' or 'Swim'
    description: string;
    sourceId?: SourceID;
}

// Data Loading Types
export type SourceID = 'delta-green' | string;

export interface Source {
    id: SourceID;
    name:string;
    isDefault?: boolean;
    publisher?: string;
    theme?: string;
    setting?: string;
}

// FIX: Added placeholder types to resolve compilation errors in utility files.
export type SystemClass = any;
export type SystemRace = any;

// Save System Types (System Agnostic)
export interface CharacterSaveData {
  version: string; // Save format version for future-proofing
  system: string; // e.g., 'delta-green', 'call-of-cthulhu', 'ose'
  timestamp: number;
  characterData: Record<string, any>; // Generic character data object
  metadata?: {
    characterName?: string;
    customName?: string;
    notes?: string;
  };
}

export interface SaveSlot {
  characterName: string;
  customName?: string;
  system: string;
  timestamp: number;
  data: CharacterSaveData;
}