import { useState, useCallback, useMemo, useEffect } from 'react';
import type { Profession, Theme, DecadeConfig, AttributeSet, Nationality, ExperienceLevel, Department, BondType, SkillPackage, ToastType, DamagedVeteranOption, Disorder, DistinguishingFeatures } from '../types';
import type { AggregatedData } from './useAggregatedData';
import { useNameGeneration } from './ai/useNameGeneration';
import { usePortraitGeneration } from './ai/usePortraitGeneration';
import { useBackstoryGeneration } from './ai/useBackstoryGeneration';
import { useCareerSimulation, getYearFromDecade } from './useCareerSimulation';
import { getPortraitPrompt } from '../prompts/prompt-data';
import { THEMES } from '../data/theme-data';
import { buildPrompt, getDossierPromptTemplate } from '../narrative/build';
// FIX: Import useTraitsGeneration to provide character traits.
import { useTraitsGeneration } from './ai/useTraitsGeneration';
import { useBondGeneration } from './ai/useBondGeneration';

export const useAIGeneration = (
    characterConcept: string,
    selectedProfession: Profession | null,
    selectedDepartment: Department | null,
    attributes: AttributeSet | null,
    showToast: (msg: string, type?: ToastType) => void,
    aggregatedData: AggregatedData,
    baseSkills: Record<string, number>,
    skillPackage: SkillPackage | null,
    damagedVeteranOption: DamagedVeteranOption | null,
    assignedDisorder: Disorder | null
) => {
    // Basic character details state
    const [decade, setDecade] = useState<string>('2020s');
    const [gender, setGender] = useState<'male' | 'female' | null>(null);
    const [theme] = useState<Theme>('delta-green'); // This theme is fixed for this app
    const [nationality, setNationality] = useState<Nationality>('American (Unspecified/Mixed)');
    const [experienceLevel, setExperienceLevel] = useState<ExperienceLevel>('Experienced');
    const [dob, _setDob] = useState<string>('');
    const [dobOverwrittenByCareer, setDobOverwrittenByCareer] = useState(false);
    const [education, setEducation] = useState<string>('');
    const [physicalDescription, setPhysicalDescription] = useState<string | null>(null);
    const [distinguishingFeatures, setDistinguishingFeatures] = useState<DistinguishingFeatures | null>(null);

    const decadeConfig = useMemo(() => aggregatedData.DECADES.find(d => d.name === decade), [aggregatedData.DECADES, decade]);

    // Name Generation
    const nameGen = useNameGeneration(showToast, aggregatedData);

    // Portrait Generation
    const portraitGen = usePortraitGeneration(showToast, setPhysicalDescription, setDistinguishingFeatures);
    
    // Career Simulation
    const careerSim = useCareerSimulation(showToast);

    // Dossier Generation
    const dossierGen = useBackstoryGeneration(showToast);

    // Bond Generation
    const bondGen = useBondGeneration(showToast);

    // FIX: Instantiate useTraitsGeneration hook.
    const traitsGen = useTraitsGeneration(showToast, aggregatedData);

    const setDob = useCallback((newDob: string) => {
        _setDob(newDob);
        setDobOverwrittenByCareer(false); // Manual change resets the flag
    }, []);

     useEffect(() => {
        // Set a default DOB when the decade changes, but only if a career hasn't been simulated yet.
        if (!careerSim.simResult) {
            const startYear = getYearFromDecade(decade);
            const birthYear = startYear - 25; // Assume a 25-year-old starting agent
            _setDob(`${birthYear}-07-01`);
            setDobOverwrittenByCareer(false);
        }
    }, [decade, careerSim.simResult]);

    const currentYear = useMemo(() => getYearFromDecade(decade), [decade]);
    const age = useMemo(() => {
        if (!dob) return null;
        try {
            const birthYear = new Date(dob).getFullYear();
            if (isNaN(birthYear) || birthYear < 1900) return null;
            return currentYear - birthYear;
        } catch (e) {
            return null;
        }
    }, [dob, currentYear]);

    const onGenerateRandomNationality = useCallback(() => {
        const totalWeight = aggregatedData.WEIGHTED_NATIONALITIES.reduce((sum, nat) => sum + nat.weight, 0);
        let random = Math.random() * totalWeight;
        for (const nat of aggregatedData.WEIGHTED_NATIONALITIES) {
            if (random < nat.weight) {
                setNationality(nat.name);
                return;
            }
            random -= nat.weight;
        }
        if (aggregatedData.NATIONALITIES.length > 0) {
            setNationality(aggregatedData.NATIONALITIES[0]);
        }
    }, [aggregatedData.WEIGHTED_NATIONALITIES, aggregatedData.NATIONALITIES]);

    const portraitPrompt = useMemo(() => getPortraitPrompt(
        characterConcept, gender, nationality, 
        selectedProfession?.name || "Agent", 
        selectedProfession?.archetypicalClothing || "practical clothing", 
        THEMES[theme], decadeConfig, attributes, selectedDepartment, 
        skillPackage?.descriptor || null,
        damagedVeteranOption,
        assignedDisorder,
        age
    ), [characterConcept, gender, nationality, selectedProfession, theme, decadeConfig, attributes, selectedDepartment, skillPackage, damagedVeteranOption, assignedDisorder, age]);
    
    const dossierPrompt = useMemo(() => {
        if (!careerSim.simResult) {
            return getDossierPromptTemplate(
                nameGen.characterName,
                nameGen.codename,
                nationality,
                decadeConfig,
                selectedProfession,
                selectedDepartment
            );
        }
        return buildPrompt(
            careerSim.simResult,
            nameGen.characterName || 'AGENT',
            nameGen.codename || 'ASSET',
            careerSim.injurySummary,
            decadeConfig,
            nationality,
            selectedProfession,
            selectedDepartment,
            baseSkills,
            damagedVeteranOption,
            assignedDisorder
        );
    }, [careerSim.simResult, careerSim.injurySummary, nameGen.characterName, nameGen.codename, decadeConfig, nationality, selectedProfession, selectedDepartment, baseSkills, damagedVeteranOption, assignedDisorder]);

    const onGeneratePortrait = useCallback(() => {
        if (!selectedProfession) {
            showToast("Please select a profession first.", 'warning');
            return;
        }
        portraitGen.onGeneratePortrait(portraitPrompt);
    }, [portraitGen, portraitPrompt, selectedProfession, showToast]);
    
    const onGenerateDossier = useCallback(() => {
        if (!dossierPrompt || !careerSim.simResult) { // Also check for simResult
            showToast("Please simulate a career first.", 'warning');
            return;
        }
        dossierGen.onGenerateBackstory(dossierPrompt);
    }, [dossierGen, dossierPrompt, careerSim.simResult, showToast]);

    // FIX: Added a wrapper function for simulating a career to align with other 'on...' event handlers in this hook.
    const onSimulateCareer = useCallback(async () => {
        if (selectedProfession) {
            const result = await careerSim.simulateCareer(selectedProfession, selectedDepartment, decade, experienceLevel);
            if (result) {
                if (result.dob) {
                    _setDob(result.dob);
                    setDobOverwrittenByCareer(true);
                }
                if (result.education) setEducation(result.education);
            }
        } else {
            showToast("Please select a profession first.", 'warning');
        }
    }, [careerSim, selectedProfession, selectedDepartment, decade, experienceLevel, showToast]);

    const reset = useCallback(() => {
        nameGen.reset();
        portraitGen.reset();
        // FIX: Add traitsGen to the reset logic.
        traitsGen.reset();
        careerSim.reset();
        dossierGen.reset();
        setEducation('');
        setPhysicalDescription(null);
        setDistinguishingFeatures(null);
        setDobOverwrittenByCareer(false);
        // DOB is reset by the decade useEffect
    }, [nameGen, portraitGen, traitsGen, careerSim, dossierGen]);

    return {
        decade, setDecade,
        gender, setGender,
        theme, // No setter, it's fixed
        nationality, setNationality,
        experienceLevel, setExperienceLevel,
        dob, setDob,
        dobOverwrittenByCareer,
        education,
        physicalDescription,
        distinguishingFeatures,
        characterName: nameGen.characterName,
        isGeneratingName: nameGen.isGeneratingName,
        codename: nameGen.codename,
        isGeneratingCodename: nameGen.isGeneratingCodename,
        onGenerateName: () => nameGen.generateName(gender, characterConcept, nationality),
        onGenerateCodename: () => nameGen.generateCodename(characterConcept, decadeConfig),
        onGenerateRandomNationality,
        ...portraitGen,
        ...traitsGen,
        onGenerateTraits: () => traitsGen.onGenerateTraits(gender, characterConcept, theme),
        onGeneratePortrait,
        portraitPrompt,
        dossierPrompt,
        ...careerSim,
        onSimulateCareer,
        age: careerSim.simResult?.age, // Convenience accessor for age
        dossier: dossierGen.backstory,
        isGeneratingDossier: dossierGen.isGeneratingBackstory,
        onGenerateDossier,
        reset,
        ...bondGen,
        onGenerateBond: (bondType: BondType, chaScore: number, chaCheckSuccess: boolean) => bondGen.onGenerateBond(
            bondType,
            decadeConfig,
            nationality,
            nameGen.characterName,
            gender,
            chaScore,
            chaCheckSuccess
        ),
    };
};
