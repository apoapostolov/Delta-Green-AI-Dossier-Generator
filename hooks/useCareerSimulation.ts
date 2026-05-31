import { useState, useCallback } from 'react';
import { GoogleGenAI, Type } from '@google/genai';
import { runSimulation } from '../sim/runClient';
import type { SimResult, CareerState } from '../sim/types';
import type { Profession, ExperienceLevel, ProfessionGroup, Department, ToastType } from '../types';
import { getCareerNarrativePrompt, getInjuryReportPrompt, getEducationAndVitalsPrompt } from '../prompts/prompt-data';

// Helper functions (moved from useAIGeneration)
const mapProfessionToStartState = (group: ProfessionGroup): CareerState => {
    switch(group) {
        case 'Military': return 'Military';
        case 'Federal Agent': return 'LawEnforcement';
        case 'Academic Expert': return 'Academic';
        case 'Civilian Specialist': return 'PrivateSecurity';
        default: return 'Education';
    }
};

export const getYearFromDecade = (decade: string): number => {
    const yearMap: Record<string, number> = {
        '2020s': 2023, '2010s': 2015, '2000s': 2005, '1990s': 1995,
        '1980s': 1985, '1970s': 1975, '1960s': 1965, '1950s': 1955,
    };
    return yearMap[decade] || 2023;
};

const getYearsOfServiceRange = (level: ExperienceLevel): { min: number; max: number } => {
    switch (level) {
        case 'New Recruit': return { min: 1, max: 4 };
        case 'Experienced': return { min: 5, max: 12 };
        case 'Veteran':     return { min: 13, max: 20 };
        case 'Legend':      return { min: 21, max: 35 }; // Capped at 35 years for plausibility
        default:            return { min: 5, max: 12 };
    }
};

export const useCareerSimulation = (showToast: (msg: string, type?: ToastType) => void) => {
    const [simResult, setSimResult] = useState<SimResult | null>(null);
    const [isSimulating, setIsSimulating] = useState(false);
    const [isGeneratingNarrative, setIsGeneratingNarrative] = useState(false);
    const [injuryReport, setInjuryReport] = useState<string | null>(null);
    const [injurySummary, setInjurySummary] = useState<string | null>(null);
    const [injuryShortDescription, setInjuryShortDescription] = useState<string | null>(null);
    const [injuryMechanics, setInjuryMechanics] = useState<string | null>(null);
    const [isGeneratingInjuryReport, setIsGeneratingInjuryReport] = useState(false);

    const simulateCareer = useCallback(async (profession: Profession, department: Department | null, decade: string, experienceLevel: ExperienceLevel) => {
        setIsSimulating(true);
        setIsGeneratingNarrative(false);
        setIsGeneratingInjuryReport(false);
        setInjuryReport(null);
        setInjurySummary(null);
        setInjuryShortDescription(null);
        setInjuryMechanics(null);
        setSimResult(null);

        try {
            // Step 1: Generate Education and Starting Age via AI
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            const vitalsPrompt = getEducationAndVitalsPrompt(profession, department);
            const vitalsResponse = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: vitalsPrompt,
                config: {
                    responseMimeType: "application/json",
                    responseSchema: {
                        type: Type.OBJECT,
                        properties: {
                            education: { type: Type.STRING },
                            startingAge: { type: Type.INTEGER },
                        },
                        required: ["education", "startingAge"],
                    },
                },
            });
            const { education: generatedEducation, startingAge } = JSON.parse(vitalsResponse.text.trim());
            
            // Step 2: Run procedural simulation with AI-provided starting age
            const endYear = getYearFromDecade(decade);
            const yearsOfServiceRange = getYearsOfServiceRange(experienceLevel);
            const yearsOfService = Math.floor(Math.random() * (yearsOfServiceRange.max - yearsOfServiceRange.min + 1)) + yearsOfServiceRange.min;
            const startYear = endYear - yearsOfService + 1;

            const birthYear = startYear - startingAge;
            const birthMonth = Math.floor(Math.random() * 12) + 1;
            const birthDay = Math.floor(Math.random() * 28) + 1; // Keep it simple
            const generatedDob = `${birthYear}-${birthMonth.toString().padStart(2, '0')}-${birthDay.toString().padStart(2, '0')}`;
            
            let ranksToUse = profession.ranks;
            if (department && department.ranks && department.ranks[profession.name]) {
                ranksToUse = department.ranks[profession.name];
            }

            const rawResult = await runSimulation({
                seed: Date.now(),
                startYear,
                endYear,
                startState: mapProfessionToStartState(profession.group),
                professionRanks: ranksToUse,
                startingAge: startingAge,
            });

            // Step 3: Generate AI injury reports if needed
            let finalInjuryReport: string | null = null;
            let finalInjurySummary: string | null = null;
            let finalInjuryShortDescription: string | null = null;
            let finalInjuryMechanics: string | null = null;
            const permanentInjuries = rawResult.events.filter(e => e.kind === 'PermanentInjury');
            if (permanentInjuries.length > 0) {
                setIsGeneratingInjuryReport(true);
                try {
                    const injuryPrompt = getInjuryReportPrompt(permanentInjuries);
                    const injuryResponse = await ai.models.generateContent({ 
                        model: 'gemini-2.5-flash', 
                        contents: injuryPrompt,
                        config: {
                            responseMimeType: "application/json",
                            responseSchema: {
                                type: Type.OBJECT,
                                properties: {
                                    report: { type: Type.STRING },
                                    shortDescription: { type: Type.STRING },
                                    mechanicalEffect: { type: Type.STRING },
                                },
                                required: ["report", "shortDescription", "mechanicalEffect"],
                            },
                        },
                    });
                    const injuryData = JSON.parse(injuryResponse.text.trim());

                    finalInjuryReport = injuryData.report;
                    setInjuryReport(finalInjuryReport);
                    
                    finalInjuryShortDescription = injuryData.shortDescription;
                    setInjuryShortDescription(finalInjuryShortDescription);

                    finalInjuryMechanics = injuryData.mechanicalEffect;
                    setInjuryMechanics(finalInjuryMechanics);

                    const summaryPrompt = `Summarize the following medical report into one or two sentences for a personnel file. Focus on the agent's long-term operational limitations and suitability for non-frontline roles (e.g., support, analysis, advisory capacity) due to their injuries.\n\nMedical Report:\n"""\n${finalInjuryReport}\n"""\n\nSummary:`;
                    const summaryResponse = await ai.models.generateContent({ model: 'gemini-2.5-flash', contents: summaryPrompt });
                    finalInjurySummary = summaryResponse.text.trim();
                    setInjurySummary(finalInjurySummary);

                } catch (e) {
                    console.error("Injury report/summary generation failed:", e);
                    finalInjuryReport = "Medical report generation failed. See event log for mechanical effects.";
                    finalInjurySummary = "Agent has sustained permanent injuries affecting operational readiness.";
                    finalInjuryShortDescription = "Sustained permanent injuries during career.";
                    finalInjuryMechanics = "Consult Handler for mechanical effects.";
                    setInjuryReport(finalInjuryReport);
                    setInjurySummary(finalInjurySummary);
                    setInjuryShortDescription(finalInjuryShortDescription);
                    setInjuryMechanics(finalInjuryMechanics);
                } finally {
                    setIsGeneratingInjuryReport(false);
                }
            }

            if (rawResult.isDeceased) {
                setSimResult(rawResult);
                 return { simResult: rawResult, dob: generatedDob, education: generatedEducation, injuryReport: finalInjuryReport, injurySummary: finalInjurySummary, injuryShortDescription: finalInjuryShortDescription, injuryMechanics: finalInjuryMechanics };
            }

            // Step 4: Generate AI narrative for events
            setIsGeneratingNarrative(true);
            const narrativePrompt = getCareerNarrativePrompt(rawResult.events.map(e => ({ year: e.year, detail: e.detail, success: e.check.success })));
            
            const response = await ai.models.generateContent({
              model: 'gemini-2.5-flash',
              contents: narrativePrompt,
              config: {
                responseMimeType: "application/json",
                responseSchema: {
                  type: Type.OBJECT,
                  properties: { narratives: { type: Type.ARRAY, items: { type: Type.STRING } } },
                  required: ["narratives"],
                },
              },
            });

            const result = JSON.parse(response.text.trim());
            const narratives = result.narratives;

            let finalSimResult = rawResult;
            if (narratives && narratives.length === rawResult.events.length) {
                const enrichedEvents = rawResult.events.map((event, index) => ({ ...event, narrative: narratives[index] }));
                finalSimResult = { ...rawResult, events: enrichedEvents };
                setSimResult(finalSimResult);
            } else {
                setSimResult(rawResult);
            }
            return { simResult: finalSimResult, dob: generatedDob, education: generatedEducation, injuryReport: finalInjuryReport, injurySummary: finalInjurySummary, injuryShortDescription: finalInjuryShortDescription, injuryMechanics: finalInjuryMechanics };

        } catch (e) {
            console.error("Career simulation or narrative generation failed:", e);
            showToast("Could not simulate career path. Please try again.", 'error');
            return null;
        } finally {
            setIsSimulating(false);
            setIsGeneratingNarrative(false);
        }
    }, [showToast]);

    const reset = useCallback(() => {
        setSimResult(null);
        setIsSimulating(false);
        setIsGeneratingNarrative(false);
        setInjuryReport(null);
        setInjurySummary(null);
        setInjuryShortDescription(null);
        setInjuryMechanics(null);
        setIsGeneratingInjuryReport(false);
    }, []);

    return {
        simResult,
        isSimulating,
        isGeneratingNarrative,
        injuryReport,
        injurySummary,
        injuryShortDescription,
        injuryMechanics,
        isGeneratingInjuryReport,
        simulateCareer,
        reset,
    };
};
