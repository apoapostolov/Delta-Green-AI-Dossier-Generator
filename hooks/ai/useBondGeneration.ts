import { useState, useCallback } from 'react';
import { GoogleGenAI, Type } from '@google/genai';
import type { BondType, DecadeConfig, Nationality, ToastType } from '../../types';
import { getBondGenerationPrompt } from '../../prompt-data';

export const useBondGeneration = (showToast: (msg: string, type?: ToastType) => void) => {
    const [isGeneratingBond, setIsGeneratingBond] = useState(false);

    const onGenerateBond = useCallback(async (
        bondType: BondType,
        decadeConfig: DecadeConfig | undefined,
        nationality: Nationality,
        agentName: string,
        agentGender: 'male' | 'female' | null,
        chaScore: number,
        chaCheckSuccess: boolean,
    ): Promise<{ name: string; description: string } | null> => {
        setIsGeneratingBond(true);
        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            const prompt = getBondGenerationPrompt(bondType, decadeConfig, nationality, agentName, agentGender, chaScore, chaCheckSuccess);

            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: prompt,
                config: {
                    responseMimeType: "application/json",
                    responseSchema: {
                        type: Type.OBJECT,
                        properties: {
                            name: { type: Type.STRING },
                            description: { type: Type.STRING },
                        },
                        required: ["name", "description"],
                    },
                },
            });

            return JSON.parse(response.text.trim());
        } catch (e) {
            console.error("Bond generation failed:", e);
            showToast("Could not generate bond details. Please try again.", 'error');
            return null;
        } finally {
            setIsGeneratingBond(false);
        }
    }, [showToast]);

    return {
        isGeneratingBond,
        onGenerateBond,
    };
};
