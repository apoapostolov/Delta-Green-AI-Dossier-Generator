import React, { useState, useEffect, useMemo } from 'react';
import { useCharacterContext } from '../context/CharacterContext';
import { CareerDossierGenerator } from './draft/CareerDossierGenerator';
import { ExpressivePortraitsStudio } from './draft/ExpressivePortraitsStudio';
import { CharacterDetailsColumn } from './draft/CharacterDetailsColumn';
import { PortraitStudio } from './draft/PortraitStudio';
import { ConsequencesModal } from './ConsequencesModal';

interface DossierTabProps {
    onShowPromptInfo: () => void;
    onShowBackstoryPromptInfo: () => void;
    dob: string;
    setDob: (dob: string) => void;
    dobOverwrittenByCareer: boolean;
}

export const DossierTab: React.FC<DossierTabProps> = ({ onShowPromptInfo, onShowBackstoryPromptInfo, dob, setDob, dobOverwrittenByCareer }) => {
    const { ai, selectedProfession, selectedDepartment, baseAttributes, baseSkills, applyCareerConsequences, ignoreConsequences, careerApplied, damagedVeteranOption, aggregatedData } = useCharacterContext();
    const [isConsequencesModalOpen, setIsConsequencesModalOpen] = useState(false);

    useEffect(() => {
        if (damagedVeteranOption && (ai.experienceLevel === 'New Recruit' || ai.experienceLevel === 'Experienced')) {
            ai.setExperienceLevel('Veteran');
        }
    }, [damagedVeteranOption, ai.experienceLevel, ai.setExperienceLevel]);

    const canGenerateDossier = !!(ai.simResult);
    const showExpressivePortraits = !!(ai.headshot && !ai.isGeneratingPortrait && !ai.isCroppingHeadshot);

    return (
        <div className="bg-gray-800/50 p-6 rounded-lg border-2 border-gray-700/50 max-w-4xl mx-auto">
            {isConsequencesModalOpen && ai.simResult && baseAttributes && (
                <ConsequencesModal
                    simResult={ai.simResult}
                    baseAttributes={baseAttributes}
                    baseSkills={baseSkills}
                    onAccept={() => {
                        applyCareerConsequences(ai.simResult!);
                        setIsConsequencesModalOpen(false);
                    }}
                    onClose={() => setIsConsequencesModalOpen(false)}
                />
            )}

            <h2 className="text-3xl font-bold text-green-400 text-center mb-2">Agent Dossier</h2>
            <p className="text-gray-400 text-center mb-8">
                Finalize your agent's identity, then use AI to generate a portrait and official dossier.
            </p>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
                <CharacterDetailsColumn
                    decades={aggregatedData.DECADES}
                    selectedDecade={ai.decade}
                    onDecadeChange={ai.setDecade}
                    selectedDepartment={selectedDepartment}
                    dob={dob} 
                    setDob={setDob}
                    dobOverwrittenByCareer={dobOverwrittenByCareer}
                />
                <div className="space-y-6">
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
            </div>
            
            {showExpressivePortraits && (
                <ExpressivePortraitsStudio
                    pdfPortraitSrc={ai.pdfPortraitSrc}
                    onSelectPdfPortrait={ai.onSelectPdfPortrait}
                    emotionalPortraits={ai.emotionalPortraits}
                    generatingEmotion={ai.generatingEmotion}
                    onGenerateEmotionalPortrait={ai.onGenerateEmotionalPortrait}
                    characterName={ai.characterName}
                />
            )}

            <CareerDossierGenerator
                dossier={ai.dossier}
                isGeneratingDossier={ai.isGeneratingDossier}
                onGenerateDossier={ai.onGenerateDossier}
                canGenerateDossier={canGenerateDossier}
                isSimulating={ai.isSimulating}
                isGeneratingNarrative={ai.isGeneratingNarrative}
                injuryReport={ai.injuryReport}
                isGeneratingInjuryReport={ai.isGeneratingInjuryReport}
                onSimulateCareer={ai.onSimulateCareer}
                simResult={ai.simResult}
                canSimulate={!!selectedProfession}
                onShowPromptInfo={onShowBackstoryPromptInfo}
                dossierPrompt={ai.dossierPrompt}
                onAcceptConsequencesClick={() => setIsConsequencesModalOpen(true)}
                onIgnoreConsequences={ignoreConsequences}
                careerApplied={careerApplied}
                experienceLevel={ai.experienceLevel}
                onExperienceLevelChange={ai.setExperienceLevel}
                selectedProfession={selectedProfession}
                selectedDepartment={selectedDepartment}
            />
        </div>
    );
};