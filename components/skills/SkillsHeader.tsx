import React from 'react';
import { ResetIcon } from '../icons/ResetIcon';
import { AIIcon } from '../icons/AIIcon';

interface SkillsHeaderProps {
    onBonusSkillsReset: () => void;
    groupSkills: boolean;
    onGroupToggle: () => void;
    onOpenAiDistribution: () => void;
    disableAiDistribution?: boolean;
}

export const SkillsHeader: React.FC<SkillsHeaderProps> = ({
    onBonusSkillsReset,
    groupSkills,
    onGroupToggle,
    onOpenAiDistribution,
    disableAiDistribution = false,
}) => {
    return (
        <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
            <div>
                <h2 className="text-3xl font-bold text-green-400">Skill Development</h2>
            </div>
            <div className="flex flex-col items-stretch md:items-end gap-2">
                <div className="flex items-center justify-end gap-3 text-sm flex-shrink-0">
                    <span className="font-bold text-gray-400">Group Skills:</span>
                    <span className={`font-bold ${!groupSkills ? 'text-green-300' : 'text-gray-500'}`}>Off</span>
                    <button
                        onClick={onGroupToggle}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800/50 focus:ring-green-500 ${groupSkills ? 'bg-green-600' : 'bg-gray-600'}`}
                        aria-label="Toggle skill grouping"
                    >
                        <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${groupSkills ? 'translate-x-6' : 'translate-x-1'}`} />
                    </button>
                    <span className={`font-bold ${groupSkills ? 'text-green-300' : 'text-gray-500'}`}>On</span>
                </div>
                <div className="flex flex-wrap items-center justify-end gap-2">
                    <button
                        onClick={onOpenAiDistribution}
                        disabled={disableAiDistribution}
                        className="flex items-center justify-center gap-2 bg-green-700 hover:bg-green-600 disabled:bg-gray-700 disabled:text-gray-400 disabled:cursor-not-allowed text-white font-bold py-2 px-3 rounded-lg text-sm transition-colors"
                    >
                        <AIIcon className="h-4 w-4" /> AI Distribution
                    </button>
                    <button onClick={onBonusSkillsReset} className="flex items-center justify-center gap-2 bg-gray-700 hover:bg-red-800 text-white font-bold py-2 px-3 rounded-lg text-sm transition-colors">
                    <ResetIcon className="h-4 w-4" /> Reset Bonus Skills
                    </button>
                </div>
            </div>
        </div>
    );
};
