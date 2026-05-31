import React from 'react';
import type { SpecialTraining, AttributeSet, Attribute } from '../../types';
import { Tooltip } from '../Tooltip';
import { CheckIcon } from '../icons/CheckIcon';

interface SpecialTrainingsManagerProps {
    allTrainings: SpecialTraining[];
    selectedTrainings: Set<string>;
    onToggle: (trainingName: string) => void;
    attributes: AttributeSet | null;
    skills: Record<string, number>;
    professionTrainings: Set<string>;
    departmentTrainings: Set<string>;
}

const TrainingCard: React.FC<{
    training: SpecialTraining;
    isSelected: boolean;
    isMandatory: boolean;
    value: number;
    onToggle: () => void;
}> = ({ training, isSelected, isMandatory, value, onToggle }) => {
    const baseClasses = 'w-full text-left p-3 rounded-md border-2 transition-all duration-200 h-full flex flex-col justify-between';
    let stateClasses = '';

    if (isSelected) {
        stateClasses = 'bg-yellow-500/20 border-yellow-400 text-yellow-300';
    } else {
        stateClasses = 'bg-gray-800/50 border-gray-600 text-gray-400 hover:border-yellow-500 hover:text-white';
    }

    if (isMandatory) {
        stateClasses += ' cursor-default';
    }

    return (
        <Tooltip content={training.description}>
            <button onClick={onToggle} disabled={isMandatory} className={`${baseClasses} ${stateClasses}`}>
                <div>
                    <div className="flex justify-between items-center">
                        <h4 className="font-bold">{training.name}</h4>
                        <span className="font-mono font-bold text-lg">{value}%</span>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                        Based on: {training.basedOn}
                    </div>
                </div>
                {isMandatory && (
                    <div className="flex items-center justify-end gap-1 text-xs font-bold text-yellow-300/80 mt-2">
                        <CheckIcon className="h-3 w-3" />
                        <span>Granted by Profession</span>
                    </div>
                )}
            </button>
        </Tooltip>
    );
};

export const SpecialTrainingsManager: React.FC<SpecialTrainingsManagerProps> = ({
    allTrainings,
    selectedTrainings,
    onToggle,
    attributes,
    skills,
    professionTrainings,
    departmentTrainings
}) => {
    if (allTrainings.length === 0) {
        return null;
    }
    
    const sortedTrainings = [...allTrainings].sort((a,b) => a.name.localeCompare(b.name));

    const calculateValue = (training: SpecialTraining): number => {
        if (!attributes || !skills) return 0;
        const basedOn = training.basedOn;
    
        // Handle attribute-based trainings
        if (['STR', 'CON', 'DEX', 'INT', 'POW', 'CHA'].includes(basedOn)) {
            return attributes[basedOn as Attribute] * 5;
        }
    
        // Handle skill-based trainings, considering specializations
        const baseValue = skills[basedOn] || 0;
        
        const specializationValues = Object.keys(skills)
            .filter(skillName => skillName.startsWith(`${basedOn} (`))
            .map(skillName => skills[skillName]);
            
        return Math.max(baseValue, ...specializationValues);
    };
    
    return (
        <div className="mt-8">
            <h3 className="text-xl font-bold text-yellow-300 mb-2 border-b-2 border-yellow-800/50 pb-1">Special Trainings</h3>
            <p className="text-xs text-gray-500 italic mb-3">Trainings pre-selected in yellow are granted by your profession or department. Selecting additional trainings requires Handler permission.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {sortedTrainings.map(training => {
                    const isMandatory = professionTrainings.has(training.name) || departmentTrainings.has(training.name);
                    return (
                        <TrainingCard
                            key={training.name}
                            training={training}
                            isSelected={selectedTrainings.has(training.name)}
                            isMandatory={isMandatory}
                            value={calculateValue(training)}
                            onToggle={() => onToggle(training.name)}
                        />
                    );
                })}
            </div>
        </div>
    );
};