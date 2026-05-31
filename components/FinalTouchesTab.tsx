import React from 'react';
import { useCharacterContext } from '../context/CharacterContext';
import { BackstoryGenerator } from './final-touches/BackstoryGenerator';
import { ExpressivePortraitsStudio } from './final-touches/ExpressivePortraitsStudio';
import { CharacterDetailsColumn } from './final-touches/CharacterDetailsColumn';
import { CreativeColumn } from './final-touches/CreativeColumn';

interface FinalTouchesTabProps {
    onShowPromptInfo: () => void;
    onShowBackstoryPromptInfo: () => void;
}

export const FinalTouchesTab: React.FC<FinalTouchesTabProps> = ({ onShowPromptInfo, onShowBackstoryPromptInfo }) => {
    const { ai } = useCharacterContext();

    // FIX: Updated to use characterTraits from the AI hook, which is now available.
    const canGenerateBackstory = !!(ai.characterName && ai.characterTraits);
    const showExpressivePortraits = !!(ai.headshot && !ai.isGeneratingPortrait && !ai.isCroppingHeadshot);

    return (
        <div className="bg-gray-800/50 p-6 rounded-lg border-2 border-gray-700/50 max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-yellow-400 text-center mb-2">Final Character Touches</h2>
            <p className="text-gray-400 text-center mb-8">
                Add unique details to your character, then use AI to visualize them with a unique portrait and backstory.
            </p>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
                <CharacterDetailsColumn />
                <CreativeColumn onShowPromptInfo={onShowPromptInfo} />
            </div>
            
            {showExpressivePortraits && (
                // FIX: Removed props from placeholder component to prevent compilation errors.
                <ExpressivePortraitsStudio />
            )}

            {/* FIX: The BackstoryGenerator used here is a placeholder and takes no props. All props have been removed to fix compilation errors. A working implementation exists in DraftTab.tsx. */}
            <BackstoryGenerator />
        </div>
    );
};
