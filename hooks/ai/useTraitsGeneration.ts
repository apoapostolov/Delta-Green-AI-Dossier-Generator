import { useState, useCallback } from 'react';
import type { CharacterTraits, Theme, ToastType } from '../../types';
import { getTraitsPrompt } from '../../prompts/prompt-data';
import type { AggregatedData } from '../useAggregatedData';
import { useAiRuntime } from '../useAiRuntime';
import { parseJsonLike } from '../../lib/ai/json';

export const useTraitsGeneration = (
    showToast: (msg: string, type?: ToastType) => void,
    aggregatedData: AggregatedData
) => {
    const [characterTraits, setCharacterTraits] = useState<CharacterTraits | null>(null);
    const [isGeneratingTraits, setIsGeneratingTraits] = useState(false);
    const { generateText } = useAiRuntime();
    
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
            const selectedGender = gender ?? (Math.random() > 0.5 ? 'male' : 'female');
            const prompt = getTraitsPrompt(characterConcept, selectedGender, theme, aggregatedData.THEMES);
            const result = parseJsonLike(await generateText({ prompt, json: true, purpose: 'simple' })) as CharacterTraits;
            setCharacterTraits(result);
        } catch (e) {
            console.error("Trait generation failed:", e);
            showToast("Could not generate traits. Please try again.", 'error');
        } finally {
            setIsGeneratingTraits(false);
        }
    }, [aggregatedData.THEMES, generateText, showToast]);

    const reset = useCallback(() => {
        setCharacterTraits(null);
        setIsGeneratingTraits(false);
    }, []);

    const hydrate = useCallback((data: {
        characterTraits?: CharacterTraits | null;
    } | null | undefined) => {
        setCharacterTraits(data?.characterTraits || null);
        setIsGeneratingTraits(false);
    }, []);

    return {
        characterTraits,
        isGeneratingTraits,
        onGenerateTraits,
        hydrate,
        reset,
    };
};
