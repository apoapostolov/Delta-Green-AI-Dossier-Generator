import React, { useState } from 'react';
import type { Skill as SkillType } from '../../types';
import type { SimResult } from '../../sim/types';
import { Tooltip } from '../Tooltip';
import { CheckIcon } from '../icons/CheckIcon';
import { isCriticalThreshold, pointsToNextCritical, normalizeEventKind } from './skill-utils';

interface SkillRowProps {
    skillName: string;
    value: number;
    creationValue: number;
    baseSkill: SkillType | undefined;
    isProfessional: boolean;
    isSuggested: boolean;
    onBonusSkillAdd: (skillName: string) => void;
    onBonusSkillRemove: (skillName: string) => void;
    canIncrement: boolean;
    totalGain?: number;
    simResult: SimResult | null;
    advancements: number;
    allSkills: SkillType[];
    canSpecialize: boolean;
    availableSubTypes: string[];
    onAddSpecialization: (displayName: string, specializationBase: string, subType: string, valueToInherit: number) => void;
    onDeleteSpecialization: (skillName: string) => void;
    baseName: string;
    isGeneric: boolean;
    veteranGainInfo: string | null;
}

export const SkillRow: React.FC<SkillRowProps> = ({ skillName, value, creationValue, baseSkill, isProfessional, isSuggested, onBonusSkillAdd, onBonusSkillRemove, canIncrement, totalGain, simResult, advancements, allSkills, canSpecialize, availableSubTypes, onAddSpecialization, onDeleteSpecialization, baseName, isGeneric, veteranGainInfo }) => {
    const [isSpecializing, setIsSpecializing] = useState(false);
    const [selectedSubType, setSelectedSubType] = useState('');

    const isCritical = isCriticalThreshold(value);
    const criticalThresholdText = pointsToNextCritical(value);
    
    const careerEvents = simResult?.events
        .filter(e => e.outcome.skillDelta && e.outcome.skillDelta[skillName])
        .map(e => `${normalizeEventKind(e.kind)} (${e.year}, +${e.outcome.skillDelta![skillName]}%)`)
        .join('\n');

    const skillDef = baseSkill || allSkills.find(s => s.name === baseName) || allSkills.find(s => s.stub === baseName);

    const tooltipContent = skillDef?.description ? (
        <div>
            <p>{skillDef.description}</p>
            {isProfessional && <p className="text-green-400 font-bold mt-2">Professional Skill</p>}
            {isSuggested && <p className="text-teal-300 font-bold mt-2">Department Suggested Skill</p>}
            {(careerEvents || veteranGainInfo) && <div className="border-t border-gray-700 my-1.5"></div>}
            {careerEvents && <p className="text-sky-300 text-xs whitespace-pre-wrap"><span className="font-bold">Career:</span> {careerEvents}</p>}
            {veteranGainInfo && <p className="text-yellow-300 text-xs"><span className="font-bold">Background:</span> {veteranGainInfo}</p>}
            <div className="border-t border-gray-700 my-1.5"></div>
            <p className="text-gray-400 italic text-xs">{criticalThresholdText}</p>
        </div>
    ) : undefined;

    const handleConfirmSpecialization = () => {
        if (selectedSubType) {
            const specializationBase = skillDef?.stub || baseName;
            onAddSpecialization(baseName, specializationBase, selectedSubType, creationValue);
            setIsSpecializing(false);
            setSelectedSubType('');
        }
    };

    const handleCancelSpecialization = () => {
        setIsSpecializing(false);
        setSelectedSubType('');
    };

    return (
        <div className="bg-black/30 rounded-md">
            <div className="flex items-center justify-between p-2">
                <Tooltip content={tooltipContent}>
                    <div className={`font-bold flex items-center ${isProfessional ? 'text-green-400' : ''} ${isSuggested ? 'text-teal-300' : ''}`}>
                        <span title={isProfessional ? 'Professional Skill' : ''}>{skillName}</span>
                        {baseSkill?.specialty && isGeneric && (
                             <i className="fa-solid fa-list ml-2 text-gray-500" title="This skill has specializations"></i>
                        )}
                    </div>
                </Tooltip>
                <div className="flex items-center gap-2">
                    <div className={`relative text-xl font-mono w-20 text-center bg-gray-900 py-1 rounded flex items-center justify-center ${isCritical ? 'animate-critical-glow' : ''}`}>
                        <span>{value}%</span>
                        {totalGain && totalGain > 0 ? (
                             <Tooltip content={tooltipContent}>
                                <span className="text-green-400 text-xs ml-1">(+{totalGain})</span>
                             </Tooltip>
                        ) : null}
                    </div>
                    <button onClick={() => onBonusSkillRemove(skillName)} disabled={advancements === 0} className="w-7 h-8 bg-red-900/80 hover:bg-red-800/100 rounded text-red-300 font-bold text-xl disabled:bg-gray-700 disabled:text-gray-500 disabled:cursor-not-allowed flex items-center justify-center">-</button>
                    <div className="w-5 text-center font-mono text-lg text-sky-300">{advancements}</div>
                    <button onClick={() => onBonusSkillAdd(skillName)} disabled={!canIncrement} className="w-7 h-8 bg-green-900/80 hover:bg-green-800/100 rounded text-green-300 font-bold text-xl disabled:bg-gray-700 disabled:text-gray-500 disabled:cursor-not-allowed flex items-center justify-center">+</button>
                </div>
            </div>
            <div className={`
                overflow-hidden transition-all duration-500 ease-in-out
                ${canSpecialize ? 'max-h-24 opacity-100 pt-0 p-2' : 'max-h-0 opacity-0'}
            `}>
                {!isSpecializing ? (
                    <button 
                        onClick={() => setIsSpecializing(true)}
                        className="w-full text-center py-2 px-3 rounded-md bg-green-900/60 hover:bg-green-800/80 text-green-300 font-semibold border border-green-700/50 transition-colors text-sm"
                    >
                        Choose Specialization...
                    </button>
                ) : (
                    <div className="flex items-center gap-2 bg-gray-900/50 p-2 rounded-md border border-green-600">
                        <select 
                            value={selectedSubType}
                            onChange={(e) => setSelectedSubType(e.target.value)}
                            className="flex-grow bg-gray-800 border border-gray-600 rounded-md p-1.5 text-sm text-white focus:ring-1 focus:ring-green-400"
                        >
                            <option value="">Select...</option>
                            {availableSubTypes.map(sub => <option key={sub} value={sub}>{sub}</option>)}
                        </select>
                        <button 
                            onClick={handleConfirmSpecialization}
                            disabled={!selectedSubType}
                            className="p-1.5 bg-green-700 hover:bg-green-600 text-white rounded-md disabled:bg-gray-600 disabled:cursor-not-allowed flex-shrink-0"
                            aria-label="Confirm Specialization"
                        >
                            <CheckIcon className="h-4 w-4" />
                        </button>
                        <button
                            onClick={handleCancelSpecialization}
                            className="p-1.5 bg-gray-700 hover:bg-red-800 text-white rounded-md flex-shrink-0"
                            aria-label="Cancel Specialization"
                        >
                           <i className="fa-solid fa-xmark h-4 w-4"></i>
                        </button>
                    </div>
                )}
            </div>
            {!isGeneric && value === 0 && (
                <div className="p-2 pt-0">
                    <button
                        onClick={() => onDeleteSpecialization(skillName)}
                        className="w-full text-center py-1.5 px-3 rounded-md bg-red-900/60 hover:bg-red-800/80 text-red-300 font-semibold border border-red-700/50 transition-colors text-sm"
                    >
                        Delete Specialization
                    </button>
                </div>
            )}
        </div>
    );
};