import { useState, useCallback } from 'react';
import { GoogleGenAI, Type } from '@google/genai';
import type { CharacterTraits, Theme, ToastType } from '../../types';
import { getTraitsPrompt } from '../../prompt-data';
import type { AggregatedData } from '../useAggregatedData';

export const useTraitsGeneration = (
    showToast: (msg: string, type?: ToastType) => void,
    aggregatedData: AggregatedData
) => {
    const [characterTraits, setCharacterTraits] = useState<CharacterTraits | null>(null);
    const [isGeneratingTraits, setIsGeneratingTraits] = useState(false);
    
    const onGenerateTraits = useCallback(async (
        gender: 'male' | 'female' | null, 
        characterConcept: string,
        theme: Theme
    ) => {
        if (!characterConcept) {
             showToast("A character concept is needed to generate traits.", 'warning');
             return;
        }
        setIsGeneratingTraits(true);
        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            const selectedGender = gender ?? (Math.random() > 0.5 ? 'male' : 'female');
            const prompt = getTraitsPrompt(characterConcept, selectedGender, theme, aggregatedData.THEMES);
    
            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: prompt,
                config: {
                    responseMimeType: "application/json",
                    responseSchema: {
                        type: Type.OBJECT,
                        properties: {
                            positivePhysical: { type: Type.STRING },
                            positiveMental: { type: Type.STRING },
                            negative: { type: Type.STRING },
                        },
                        required: ["positivePhysical", "positiveMental", "negative"],
                    },
                },
            });
            const result = JSON.parse(response.text.trim());
            setCharacterTraits(result);
        } catch (e) {
            console.error("Trait generation failed:", e);
            showToast("Could not generate traits. Please try again.", 'error');
        } finally {
            setIsGeneratingTraits(false);
        }
    }, [showToast, aggregatedData.THEMES]);

    const reset = useCallback(() => {
        setCharacterTraits(null);
        setIsGeneratingTraits(false);
    }, []);

    return {
        characterTraits,
        isGeneratingTraits,
        onGenerateTraits,
        reset,
    };
};
