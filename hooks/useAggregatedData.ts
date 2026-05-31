import { useMemo } from 'react';
import type { Profession, Skill, ThemeConfig, SourceID, Nationality, WeightedNationality, DecadeConfig, Department, BondType, Disorder, SpecialTraining, DGItem } from '../types';
import { thirdPartyData } from '../third-party/manifest';
import { SKILL_SPECIALIZATIONS } from '../data/skill-specializations-data';

export interface AggregatedData {
    PROFESSIONS: Profession[];
    SKILLS: Skill[];
    ITEMS: DGItem[];
    WEIGHTED_NATIONALITIES: WeightedNationality[];
    NATIONALITIES: Nationality[];
    THEMES: Record<string, ThemeConfig>;
    DECADES: DecadeConfig[];
    DEPARTMENTS: Department[];
    SKILL_SPECIALIZATIONS: Record<string, string[]>;
    BONDS: BondType[];
    DISORDERS: Disorder[];
    SPECIAL_TRAININGS: SpecialTraining[];
    sheetConfigs: Record<SourceID, any>;
    PDF_FIELD_MAPS: Record<SourceID, any>;
}

export const useAggregatedData = (selectedSources: Set<SourceID>): AggregatedData => {
    const aggregatedData = useMemo(() => {
        let allProfessions: Profession[] = [];
        let allSkills: Skill[] = [];
        let allItems: DGItem[] = [];
        let allWeightedNationalities: WeightedNationality[] = [];
        let allThemes: Record<string, ThemeConfig> = {};
        let allDecades: DecadeConfig[] = [];
        let allDepartments: Department[] = [];
        let allBonds: BondType[] = [];
        let allDisorders: Disorder[] = [];
        let allSpecialTrainings: SpecialTraining[] = [];
        let allSheetConfigs: Record<SourceID, any> = {};
        let allPdfFieldMaps: Record<SourceID, any> = {};
        
        const addSourceId = <T extends { sourceId?: SourceID }>(items: T[], sourceId: SourceID): T[] => 
            items.map(item => ({ ...item, sourceId }));

        for (const sourceId of selectedSources) {
            const sourceData = thirdPartyData[sourceId];
            if (sourceData) {
                if (sourceData.professions) allProfessions.push(...addSourceId(sourceData.professions, sourceId));
                if (sourceData.skills) allSkills.push(...addSourceId(sourceData.skills, sourceId));
                if (sourceData.items) allItems.push(...sourceData.items);
                if (sourceData.nationalities) allWeightedNationalities.push(...sourceData.nationalities);
                if (sourceData.themes) allThemes = { ...allThemes, ...sourceData.themes };
                if (sourceData.decades) allDecades.push(...sourceData.decades);
                if (sourceData.departments) allDepartments.push(...addSourceId(sourceData.departments, sourceId));
                if (sourceData.bonds) allBonds.push(...sourceData.bonds);
                if (sourceData.disorders) allDisorders.push(...sourceData.disorders);
                if (sourceData.specialTrainings) allSpecialTrainings.push(...addSourceId(sourceData.specialTrainings, sourceId));
                if (sourceData.sheetConfig) allSheetConfigs[sourceId] = sourceData.sheetConfig;
                if (sourceData.pdfFieldMap) allPdfFieldMaps[sourceId] = sourceData.pdfFieldMap;
            }
        }
        
        return {
            PROFESSIONS: allProfessions,
            SKILLS: allSkills,
            ITEMS: allItems,
            WEIGHTED_NATIONALITIES: allWeightedNationalities,
            NATIONALITIES: [...new Set(allWeightedNationalities.map(n => n.name))].sort(),
            THEMES: allThemes,
            DECADES: allDecades,
            DEPARTMENTS: allDepartments,
            SKILL_SPECIALIZATIONS: SKILL_SPECIALIZATIONS,
            BONDS: allBonds,
            DISORDERS: allDisorders,
            SPECIAL_TRAININGS: allSpecialTrainings,
            sheetConfigs: allSheetConfigs,
            PDF_FIELD_MAPS: allPdfFieldMaps,
        };
    }, [selectedSources]);

    return aggregatedData;
};
