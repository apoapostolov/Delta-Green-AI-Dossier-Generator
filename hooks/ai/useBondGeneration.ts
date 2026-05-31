import { useState, useCallback } from 'react';
import type { BondType, DecadeConfig, Nationality, ToastType } from '../../types';
import { getBondGenerationPrompt } from '../../prompts/prompt-data';
import { useAiRuntime } from '../useAiRuntime';
import { parseJsonLike } from '../../lib/ai/json';

export const useBondGeneration = (showToast: (msg: string, type?: ToastType) => void) => {
    const [isGeneratingBond, setIsGeneratingBond] = useState(false);
    const { generateText } = useAiRuntime();

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
            const prompt = getBondGenerationPrompt(bondType, decadeConfig, nationality, agentName, agentGender, chaScore, chaCheckSuccess);
            return parseJsonLike(await generateText({ prompt, json: true, purpose: 'simple' })) as { name: string; description: string };
        } catch (e) {
            console.error("Bond generation failed:", e);
            showToast("Could not generate bond details. Please try again.", 'error');
            return null;
        } finally {
            setIsGeneratingBond(false);
        }
    }, [generateText, showToast]);

    return {
        isGeneratingBond,
        onGenerateBond,
    };
};
