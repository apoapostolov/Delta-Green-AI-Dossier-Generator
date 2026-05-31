import React from 'react';
import { useCharacterContext } from '../context/CharacterContext';
import { PortraitStudio } from './PortraitStudio';
import { CharacterDetailsColumn } from './CharacterDetailsColumn';

interface CreativeColumnProps {
    onShowPromptInfo: () => void;
    dob: string;
    setDob: (dob: string) => void;
}

export const CreativeColumn: React.FC<CreativeColumnProps> = ({ onShowPromptInfo, dob, setDob }) => {
    const { ai } = useCharacterContext();

    return (
        <div className="space-y-6">
            <CharacterDetailsColumn dob={dob} setDob={setDob} />
            <PortraitStudio
                portrait={ai.portrait}
                headshot={ai.headshot}
                portraitView={ai.portraitView}
                setPortraitView={ai.setPortraitView}
                portraitError={ai.portraitError}
                isGeneratingPortrait={ai.isGeneratingPortrait}
                onGeneratePortrait={ai.onGeneratePortrait}
                isCroppingHeadshot={ai.isCroppingHeadshot}
                onCropHeadshot={ai.onCropHeadshot}
                pdfPortraitSrc={ai.pdfPortraitSrc}
                onSelectPdfPortrait={ai.onSelectPdfPortrait}
                characterName={ai.characterName}
                onShowPromptInfo={onShowPromptInfo}
            />
        </div>
    );
};