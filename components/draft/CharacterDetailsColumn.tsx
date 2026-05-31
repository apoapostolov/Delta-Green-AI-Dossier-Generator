
import React, { useMemo, useEffect, useState } from 'react';
import { useCharacterContext } from '../../context/CharacterContext';
import { GenderSelector } from './GenderSelector';
import { DiceIcon } from '../icons/DiceIcon';
import { SpinnerIcon } from '../icons/SpinnerIcon';
import { AIStarsIcon } from '../icons/AIStarsIcon';
import type { Department } from '../../types';
import { Tooltip } from '../Tooltip';
import { BondManager } from '../bonds/BondManager';
import { DamagedVeteranOptions } from './DamagedVeteranOptions';
import { HardExperienceModal } from './HardExperienceModal';

interface CharacterDetailsColumnProps {
    decades: { name: string, displayName: string }[];
    selectedDecade: string;
    onDecadeChange: (decade: string) => void;
    selectedDepartment: Department | null;
    dob: string;
    setDob: (dob: string) => void;
    dobOverwrittenByCareer: boolean;
}

const DetailCard: React.FC<{title: string; step: number; children: React.ReactNode}> = ({ title, step, children }) => (
    <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-700">
        <h3 className="text-lg font-bold text-gray-300 mb-3 border-b border-gray-600 pb-2">{step}. {title}</h3>
        {children}
    </div>
);

const DecadeSelector: React.FC<{
    decades: { name: string, displayName: string }[],
    selected: string,
    onChange: (decade: string) => void,
    selectedDepartment: Department | null,
}> = ({ decades, selected, onChange, selectedDepartment }) => {
    
    const getDecadeEndYear = (decadeName: string) => {
        return parseInt(decadeName.slice(0, 4)) + 9;
    };

    const isDecadeValid = useMemo(() => (decadeName: string) => {
        if (!selectedDepartment || !selectedDepartment.yearOfEstablishment) {
            return true;
        }
        const decadeEndYear = getDecadeEndYear(decadeName);
        return selectedDepartment.yearOfEstablishment <= decadeEndYear;
    }, [selectedDepartment]);

    const earliestDecade = useMemo(() => {
        if (!selectedDepartment || !selectedDepartment.yearOfEstablishment) return null;
        // Sort decades chronologically to find the true earliest valid decade for the tooltip.
        const sortedDecades = [...decades].sort((a, b) => a.name.localeCompare(b.name));
        return sortedDecades.find(d => isDecadeValid(d.name));
    }, [decades, selectedDepartment, isDecadeValid]);

    useEffect(() => {
        // If a department is selected and the current decade is no longer valid,
        // automatically switch to the earliest valid decade.
        if (selectedDepartment && selectedDepartment.yearOfEstablishment) {
            if (!isDecadeValid(selected)) {
                if (earliestDecade) {
                    onChange(earliestDecade.name);
                }
            }
        }
    }, [selectedDepartment, selected, earliestDecade, onChange, isDecadeValid]);

    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
            {decades.map(d => {
                const isActive = selected === d.name;
                const isValid = isDecadeValid(d.name);
                
                const tooltipContent = !isValid && selectedDepartment && earliestDecade ? (
                    `The ${selectedDepartment.name} was established in ${selectedDepartment.yearOfEstablishment}. The earliest available decade is the ${earliestDecade.displayName}.`
                ) : undefined;

                return (
                    <Tooltip content={tooltipContent} key={d.name}>
                        <button
                            onClick={() => onChange(d.name)}
                            disabled={!isValid}
                            className={`py-2 px-2 rounded-lg border-2 font-bold text-sm transition-all duration-200 text-center w-full ${
                                isActive 
                                    ? 'bg-green-500/20 border-green-400 text-green-300 ring-2 ring-green-400/50' 
                                    : isValid
                                    ? 'bg-gray-800/50 border-gray-600 text-gray-300 hover:border-green-500 hover:text-white'
                                    : 'bg-gray-800/30 border-gray-700 text-gray-600 cursor-not-allowed'
                            }`}
                        >
                            {d.displayName}
                        </button>
                    </Tooltip>
                );
            })}
        </div>
    );
};


const NationalitySelector: React.FC<{
    nationalities: string[], 
    selected: string, 
    onChange: (nat: string) => void,
    onRandomize: () => void
}> = ({nationalities, selected, onChange, onRandomize}) => (
    <div className="flex items-stretch gap-2">
        <select
            value={selected}
            onChange={(e) => onChange(e.target.value)}
            className="w-full bg-gray-800 border border-gray-600 rounded-md p-2 text-white focus:ring-2 focus:ring-green-400"
        >
            {nationalities.map(n => <option key={n} value={n}>{n}</option>)}
        </select>
        <button
            onClick={onRandomize}
            className="w-10 h-10 p-2 rounded-lg bg-green-600 hover:bg-green-500 text-gray-900 transition-colors flex-shrink-0 flex items-center justify-center"
            aria-label="Randomize Nationality"
            title="Randomize Nationality (Weighted)"
        >
            <DiceIcon className="h-5 w-5" />
        </button>
    </div>
);


export const CharacterDetailsColumn: React.FC<CharacterDetailsColumnProps> = ({ decades, selectedDecade, onDecadeChange, selectedDepartment, dob, setDob, dobOverwrittenByCareer }) => {
    const { ai, aggregatedData, damagedVeteranOption, setDamagedVeteranOption } = useCharacterContext();
    const [isHardExperienceModalOpen, setIsHardExperienceModalOpen] = useState(false);

    return (
        <div className="space-y-6">
            {isHardExperienceModalOpen && <HardExperienceModal onClose={() => setIsHardExperienceModalOpen(false)} />}
            
            <DetailCard title="Choose Decade" step={1}>
                <DecadeSelector
                    decades={decades}
                    selected={selectedDecade}
                    onChange={onDecadeChange}
                    selectedDepartment={selectedDepartment}
                />
            </DetailCard>

            <DetailCard title="Select Gender" step={2}>
                <GenderSelector gender={ai.gender} onGenderChange={ai.setGender} />
            </DetailCard>

            <DetailCard title="Select Nationality" step={3}>
                 <NationalitySelector 
                    nationalities={aggregatedData.NATIONALITIES}
                    selected={ai.nationality}
                    onChange={ai.setNationality}
                    onRandomize={ai.onGenerateRandomNationality}
                />
            </DetailCard>

            <DetailCard title="Identity Details" step={4}>
                <div>
                    <label className="block text-sm font-bold text-gray-400 mb-2">Name & Codename</label>
                    <div className="flex items-center gap-4">
                        <div className="flex-grow bg-black/30 p-3 rounded-md border border-gray-600 min-h-[48px] flex items-center justify-between gap-4">
                            
                            {/* Name Part */}
                            <div className="flex items-center gap-2 flex-1 min-w-0">
                                <span className="text-gray-200 font-semibold text-lg truncate" title={ai.characterName || undefined}>
                                    {ai.characterName || '...'}
                                </span>
                                <button 
                                    onClick={ai.onGenerateName} 
                                    disabled={ai.isGeneratingName || ai.isGeneratingCodename}
                                    className="w-7 h-7 p-1 rounded-full bg-green-800/80 hover:bg-green-700 disabled:bg-gray-600 disabled:cursor-wait text-white transition-colors flex-shrink-0 flex items-center justify-center"
                                    aria-label="Generate Name"
                                    title="Generate Name"
                                >
                                {ai.isGeneratingName ? <SpinnerIcon className="h-4 w-4"/> : <AIStarsIcon className="h-4 w-4" />}
                                </button>
                            </div>
                            
                            {/* Codename Part */}
                            <div className="flex items-center gap-2 flex-shrink-0">
                                <span className="text-lg font-mono font-bold text-green-300">
                                    '{ai.codename || '...'}'
                                </span>
                                <button 
                                    onClick={ai.onGenerateCodename} 
                                    disabled={ai.isGeneratingName || ai.isGeneratingCodename}
                                    className="w-7 h-7 p-1 rounded-full bg-green-800/80 hover:bg-green-700 disabled:bg-gray-600 disabled:cursor-wait text-white transition-colors flex-shrink-0 flex items-center justify-center"
                                    aria-label="Generate Codename"
                                    title="Generate Codename"
                                >
                                    {ai.isGeneratingCodename ? <SpinnerIcon className="h-4 w-4"/> : <AIStarsIcon className="h-4 w-4" />}
                                </button>
                            </div>

                        </div>
                    </div>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-600/50">
                     <label className="block text-sm font-bold text-gray-400 mb-2">Date of Birth</label>
                     {dobOverwrittenByCareer && (
                        <p className="text-xs text-gray-500 italic mb-2">
                            Date of Birth overwritten by Career Simulation.
                        </p>
                     )}
                    <input
                        type="date"
                        value={dob || ''}
                        onChange={(e) => setDob(e.target.value)}
                        className="w-full bg-gray-800 border border-gray-600 rounded-md p-2 text-white focus:ring-2 focus:ring-green-400"
                        style={{ colorScheme: 'dark' }}
                    />
                </div>
            </DetailCard>
             
            <DetailCard title="Define Bonds" step={5}>
                <BondManager />
            </DetailCard>
            <DetailCard title="Damaged Veteran Options" step={6}>
                <DamagedVeteranOptions 
                    selectedOption={damagedVeteranOption}
                    onSelectOption={setDamagedVeteranOption}
                    onOpenHardExperienceModal={() => setIsHardExperienceModalOpen(true)}
                />
            </DetailCard>
        </div>
    );
};
