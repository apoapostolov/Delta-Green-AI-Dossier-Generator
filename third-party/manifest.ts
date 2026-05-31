import type { Source, SourceID, Profession, Skill, ThemeConfig, WeightedNationality, DecadeConfig, Department, BondType, Disorder, SpecialTraining, DGItem } from '../types';

// Delta Green Data Imports
import { PROFESSIONS } from '../data/profession-data';
import { SKILLS } from '../data/skills-data';
import { THEMES } from '../data/theme-data';
import { NATIONALITIES } from '../data/nationality-data';
import { DECADES } from '../data/decades-data';
import { BONDS } from '../data/bonds-data';
import { DISORDERS } from '../data/disorders-data';
import { DEPARTMENTS } from '../departments-data/index';
import { SPECIAL_TRAININGS } from '../data/special-trainings-data';
import { SHEET_CONFIG } from './sheet-config';
import { PDF_FIELD_MAP } from '../data/pdf-form-fields';
import { ITEMS } from '../item-data';

// --- Single Source of Truth for available sources ---
export const SOURCES: Source[] = [
    { id: 'delta-green', name: 'Delta Green', isDefault: true, publisher: 'Arc Dream Publishing', theme: 'Modern Conspiracy Horror', setting: 'The Unnatural' },
];

export const SOURCE_IDS = SOURCES.map(s => s.id) as SourceID[];

// --- Manifest Structure ---
interface SourceData {
    professions: Profession[];
    skills: Skill[];
    themes: Record<string, ThemeConfig>;
    nationalities: WeightedNationality[];
    decades: DecadeConfig[];
    departments: Department[];
    bonds: BondType[];
    disorders: Disorder[];
    specialTrainings: SpecialTraining[];
    items: DGItem[];
    sheetConfig: any;
    pdfFieldMap: any;
}

// --- The Manifest ---
export const thirdPartyData: Partial<Record<SourceID, SourceData>> = {
    'delta-green': {
        professions: PROFESSIONS,
        skills: SKILLS,
        themes: THEMES,
        nationalities: NATIONALITIES,
        decades: DECADES,
        departments: DEPARTMENTS,
        bonds: BONDS,
        disorders: DISORDERS,
        specialTrainings: SPECIAL_TRAININGS,
        items: ITEMS,
        sheetConfig: SHEET_CONFIG,
        pdfFieldMap: PDF_FIELD_MAP,
    }
};
