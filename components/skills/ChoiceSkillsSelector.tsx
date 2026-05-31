import React from 'react';
import type { Profession, SkillValue, Skill as SkillType } from '../../types';
import { Tooltip } from '../Tooltip';

interface ChoiceSkillsSelectorProps {
    profession: Profession;
    selectedChoices: Record<number, SkillValue[]>;
    onToggle: (groupIndex: number, skill: SkillValue) => void;
    allSkills: SkillType[];
}

export const ChoiceSkillsSelector: React.FC<ChoiceSkillsSelectorProps> = ({ profession, selectedChoices, onToggle, allSkills }) => (
    <>
        {profession.choiceGroups.map((group, gIndex) => (
            <div key={gIndex} className="mb-6 p-4 bg-gray-900/50 rounded-md border border-green-700/50">
                <h3 className="text-lg font-bold text-green-300">Professional Choice: Select {group.count}</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 mt-3">
                    {group.options.map((opt, oIndex) => {
                        const isSelected = selectedChoices[gIndex]?.some((s: SkillValue) => s.name === opt.name && s.value === opt.value);
                        const isDisabled = !isSelected && (selectedChoices[gIndex]?.length || 0) >= group.count;
                        const skillInfo = allSkills.find(s => s.name === opt.name);
                        return (
                            <Tooltip content={skillInfo?.description} key={`${opt.name}-${oIndex}`}>
                                <button
                                    onClick={() => onToggle(gIndex, opt)}
                                    disabled={isDisabled}
                                    className={`p-2 rounded-md border text-sm w-full transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${
                                        isSelected ? 'bg-green-500/20 border-green-400 text-green-300' : 'bg-gray-800/50 border-gray-600 text-gray-400 hover:border-green-500 hover:text-white'
                                    }`}
                                >
                                    {opt.name} {opt.value}%
                                </button>
                            </Tooltip>
                        );
                    })}
                </div>
            </div>
        ))}
    </>
);
