import React from 'react';
import { BackstoryDisplay } from '../BackstoryDisplay';
import { SpinnerIcon } from '../icons/SpinnerIcon';
import { QuestionIcon } from '../icons/QuestionIcon';
import { DiceIcon } from '../icons/DiceIcon';
import type { SimResult } from '../../sim/types';
import type { ExperienceLevel, Profession, Department, DamagedVeteranOption } from '../../types';
import { CareerTimeline } from './CareerTimeline';
import { CheckCircleIcon } from '../icons/CheckCircleIcon';
import { PermanentInjuryDisplay } from './PermanentInjuryDisplay';
import { useCharacterContext } from '../../context/CharacterContext';

interface CareerDossierGeneratorProps {
    dossier: string | null;
    isGeneratingDossier: boolean;
    onGenerateDossier: () => void;
    canGenerateDossier: boolean;
    isSimulating: boolean;
    isGeneratingNarrative: boolean;
    injuryReport: string | null;
    isGeneratingInjuryReport: boolean;
    onSimulateCareer: () => void;
    simResult: SimResult | null;
    canSimulate: boolean;
    onShowPromptInfo: () => void;
    dossierPrompt: string | null;
    onAcceptConsequencesClick: () => void;
    onIgnoreConsequences: () => void;
    careerApplied: boolean;
    experienceLevel: ExperienceLevel;
    onExperienceLevelChange: (level: ExperienceLevel) => void;
    selectedProfession: Profession | null;
    selectedDepartment: Department | null;
}

const ExperienceSelector: React.FC<{
    level: ExperienceLevel;
    onChange: (level: ExperienceLevel) => void;
    isDisabled: boolean;
    disabledOptions?: ExperienceLevel[];
}> = ({ level, onChange, isDisabled, disabledOptions = [] }) => {
    const levels: ExperienceLevel[] = ['New Recruit', 'Experienced', 'Veteran', 'Legend'];
    return (
        <div className={`flex justify-center mb-4 bg-gray-900/50 p-1 rounded-full border border-gray-700 max-w-md mx-auto ${isDisabled ? 'opacity-50' : ''}`}>
            {levels.map(l => (
                <button
                    key={l}
                    onClick={() => onChange(l)}
                    disabled={isDisabled || disabledOptions.includes(l)}
                    className={`px-3 py-1.5 text-sm font-bold rounded-full transition-colors duration-200 flex-1 whitespace-nowrap ${
                        level === l ? 'bg-sky-600 text-white shadow' : 'text-gray-400 hover:bg-gray-700/50'
                    } disabled:cursor-not-allowed disabled:bg-gray-800/50 disabled:text-gray-600`}
                >
                    {l}
                </button>
            ))}
        </div>
    );
};

const AgentTerminatedDisplay: React.FC = () => (
    <div className="bg-red-900/80 border-2 border-red-500 text-white p-6 rounded-lg text-center my-8">
        <h3 className="text-3xl font-black uppercase text-red-300">Agent Terminated</h3>
        <p className="mt-2 text-red-200">This agent was killed in action during their career. Their file has been sealed.</p>
        <p className="mt-4 text-sm text-red-300">Return to Tab 1 to generate a new agent.</p>
    </div>
);

const RankDisplay: React.FC<{
    ranks: string[];
    currentRank?: string;
    yearsInRank?: number;
    promotionFailures: Record<string, number>;
}> = ({ ranks, currentRank, yearsInRank, promotionFailures }) => {
    const currentRankIndex = currentRank ? ranks.indexOf(currentRank) : -1;
  
    return (
      <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-700">
        <h4 className="text-lg font-bold text-gray-300 mb-3 text-center">Career Progression</h4>
        <ol className="space-y-1">
          {ranks.slice().reverse().map((rank) => {
            const originalIndex = ranks.indexOf(rank);
            const isCurrent = originalIndex === currentRankIndex;
            const isAchieved = currentRankIndex !== -1 && originalIndex <= currentRankIndex;
            const failures = promotionFailures[rank];
  
            let rankClasses = 'text-gray-600';
            let chevronClasses = 'text-gray-700';
            
            if (isCurrent) {
              rankClasses = 'text-green-300 font-bold';
              chevronClasses = 'text-green-400 animate-pulse';
            } else if (isAchieved) {
              rankClasses = 'text-sky-300';
              chevronClasses = 'text-sky-500';
            }
  
            return (
              <li key={rank} className={`flex items-center justify-between p-2 rounded-md transition-all duration-300 ${isCurrent ? 'bg-green-900/40' : ''}`}>
                <div className="flex items-center">
                  <i className={`fa-solid fa-chevron-right w-4 mr-3 ${chevronClasses}`}></i>
                  <span className={rankClasses}>{rank}</span>
                  {failures > 0 && (
                    <span className="text-xs text-red-400/80 ml-2">
                        ({failures} failed promotion{failures > 1 ? 's' : ''})
                    </span>
                  )}
                </div>
                {isCurrent && yearsInRank !== undefined && (
                  <span className="text-sm font-mono text-green-400 bg-green-900/50 px-2 py-0.5 rounded">
                    {yearsInRank} years
                  </span>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    );
  };


export const CareerDossierGenerator: React.FC<CareerDossierGeneratorProps> = ({ 
    dossier, isGeneratingDossier, onGenerateDossier, canGenerateDossier,
    isSimulating, isGeneratingNarrative, injuryReport, isGeneratingInjuryReport, onSimulateCareer, simResult, canSimulate,
    onShowPromptInfo, dossierPrompt,
    onAcceptConsequencesClick, onIgnoreConsequences, careerApplied,
    experienceLevel, onExperienceLevelChange,
    selectedProfession, selectedDepartment
}) => {
    const { damagedVeteranOption } = useCharacterContext();
    const isLoading = isSimulating || isGeneratingNarrative || isGeneratingInjuryReport;
    const hideExperienceSelector = !!simResult || isLoading;
    const disabledExpOptions = damagedVeteranOption ? ['New Recruit', 'Experienced'] as ExperienceLevel[] : [];

    const ranksForDisplay = (
        selectedDepartment &&
        selectedDepartment.ranks &&
        selectedProfession &&
        selectedDepartment.ranks[selectedProfession.name]
    ) ? selectedDepartment.ranks[selectedProfession.name] : selectedProfession?.ranks;

    return (
        <div className="mt-8 pt-6 border-t-2 border-gray-700/50">
            <h2 className="text-3xl font-bold text-green-400 text-center mb-2">Career History</h2>
            <p className="text-gray-400 text-center mb-6">
                Select an experience level to generate a procedural career history. Each year of service carries the risk of permanent injury or sudden termination; a longer career means greater cumulative risk. Once simulated, use AI to synthesize the events into a classified dossier.
            </p>

            <div className="bg-gray-900/40 p-4 rounded-lg border border-gray-700/50">
                <h3 className="text-xl font-semibold text-gray-300 mb-3 text-center">Step 1: Simulate Career Path</h3>
                
                {selectedProfession && ranksForDisplay && (
                   <div className="mb-4">
                        <RankDisplay
                            ranks={ranksForDisplay}
                            currentRank={simResult?.summary.finalRank}
                            yearsInRank={simResult?.summary.yearsInFinalRank}
                            promotionFailures={simResult?.summary.promotionFailures || {}}
                        />
                    </div>
                )}

                {!hideExperienceSelector && (
                    <ExperienceSelector level={experienceLevel} onChange={onExperienceLevelChange} isDisabled={false} disabledOptions={disabledExpOptions} />
                )}
                
                {!simResult && !isLoading && (
                     <div className="text-center">
                        <button 
                            onClick={onSimulateCareer} 
                            disabled={!canSimulate}
                            className="bg-sky-700 hover:bg-sky-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-bold py-3 px-8 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300 ease-in-out flex items-center justify-center mx-auto"
                        >
                            <DiceIcon className="mr-2 h-6 w-6" />
                            Simulate Career
                        </button>
                        {!canSimulate && <p className="text-xs text-gray-500 mt-2">Please select a profession first.</p>}
                    </div>
                )}
                {isLoading && (
                     <div className="text-center text-gray-400 py-10">
                        <SpinnerIcon className="h-12 w-12 mx-auto mb-4" />
                        <p className="font-semibold text-lg">
                            {isGeneratingInjuryReport ? 'Compiling medical report...' : isGeneratingNarrative ? 'Generating narrative...' : 'Simulating agent\'s life...'}
                        </p>
                        <p className="text-sm">
                            {isGeneratingInjuryReport ? 'Assessing long-term damage.' : isGeneratingNarrative ? 'This can take a moment.' : 'This is done locally and is very fast.'}
                        </p>
                    </div>
                )}
                {simResult && (
                    <>
                        <CareerTimeline events={simResult.events} />
                        {injuryReport && <PermanentInjuryDisplay report={injuryReport} />}

                        {simResult.isDeceased ? (
                            <AgentTerminatedDisplay />
                        ) : (
                            <div className="text-center mt-4 flex justify-center items-center gap-4 flex-wrap">
                                {careerApplied ? (
                                    <div className="flex items-center justify-center gap-4">
                                        <div className="bg-green-900/50 text-green-300 font-bold py-2 px-4 rounded-lg flex items-center gap-2">
                                            <CheckCircleIcon className="h-5 w-5" />
                                            Consequences Applied
                                        </div>
                                        <button
                                            onClick={onIgnoreConsequences}
                                            className="bg-yellow-800/70 hover:bg-yellow-700/70 text-white font-bold py-2 px-4 rounded-lg shadow-md transition-all duration-300"
                                            title="Ignore the consequences and revert all changes to attributes and skills."
                                        >
                                            Ignore Consequences
                                        </button>
                                    </div>
                                ) : (
                                    <button
                                        onClick={onAcceptConsequencesClick}
                                        className="bg-green-700 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg shadow-md transition-all duration-300 ease-in-out flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-green-400"
                                    >
                                        Review & Accept Consequences
                                    </button>
                                )}
                            </div>
                        )}
                    </>
                )}
            </div>
            
            {simResult && !simResult.isDeceased && (
                <div className="mt-6 bg-gray-900/40 p-4 rounded-lg border border-gray-700/50">
                    <div className="flex items-center justify-center gap-2 mb-3">
                        <h3 className="text-xl font-semibold text-gray-300 text-center">Step 2: Generate Dossier Narrative</h3>
                        {simResult && !simResult.isDeceased && (
                            <button
                                onClick={onShowPromptInfo}
                                className="text-gray-400 hover:text-green-400 transition-colors duration-200"
                                aria-label="Show dossier generation prompt"
                            >
                                <QuestionIcon className="h-5 w-5" />
                            </button>
                        )}
                    </div>

                    {!dossier && !isGeneratingDossier && (
                        <div className="text-center">
                            <button 
                                onClick={onGenerateDossier} 
                                className="bg-green-700 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300 ease-in-out flex items-center justify-center mx-auto"
                            >
                                Generate Dossier
                            </button>
                        </div>
                    )}
                    
                    {isGeneratingDossier && (
                         <div className="text-center text-gray-400 py-10">
                            <SpinnerIcon className="h-12 w-12 mx-auto mb-4" />
                            <p className="font-semibold text-lg">Synthesizing narrative...</p>
                            <p className="text-sm">This can take a moment.</p>
                        </div>
                    )}

                    {dossier && !isGeneratingDossier && (
                        <BackstoryDisplay text={dossier} />
                    )}
                </div>
            )}
        </div>
    );
};