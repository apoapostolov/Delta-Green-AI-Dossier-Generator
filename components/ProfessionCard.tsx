
import React from 'react';
import type { Profession, ProfessionGroup, AttributeSet } from '../types';
import { QuestionIcon } from './icons/QuestionIcon';
import { Tooltip } from './Tooltip';

interface ProfessionCardProps {
    profession: Profession;
    isSelected: boolean;
    onSelect: () => void;
    onShowInfo: () => void;
    attributes: AttributeSet | null;
}

const groupStyles: Record<ProfessionGroup, {
    text: string;
    hoverBorder: string;
    selected: {
        border: string;
        ring: string;
        bg: string;
    }
}> = {
    'Federal Agent': {
        text: 'text-blue-300',
        hoverBorder: 'hover:border-blue-600',
        selected: { border: 'border-blue-400', ring: 'ring-blue-500/50', bg: 'bg-blue-400' },
    },
    'Military': {
        text: 'text-green-300',
        hoverBorder: 'hover:border-green-600',
        selected: { border: 'border-green-400', ring: 'ring-green-500/50', bg: 'bg-green-400' },
    },
    'Civilian Specialist': {
        text: 'text-purple-300',
        hoverBorder: 'hover:border-purple-600',
        selected: { border: 'border-purple-400', ring: 'ring-purple-500/50', bg: 'bg-purple-400' },
    },
    'Academic Expert': {
        text: 'text-amber-300',
        hoverBorder: 'hover:border-amber-600',
        selected: { border: 'border-amber-400', ring: 'ring-amber-500/50', bg: 'bg-amber-400' },
    },
};

const isProfessionQualified = (profession: Profession, attributes: AttributeSet | null): boolean => {
    if (!attributes) return false;
    if (!profession.recommendedStats || profession.recommendedStats.length === 0) return true;
    return profession.recommendedStats.every(stat => attributes[stat] >= 10);
};


export const ProfessionCard: React.FC<ProfessionCardProps> = ({ profession, isSelected, onSelect, onShowInfo, attributes }) => {
    const styles = groupStyles[profession.group];
    const isQualified = isProfessionQualified(profession, attributes);

    const borderClasses = isSelected 
        ? `${styles.selected.border} ring-2 ${styles.selected.ring}` 
        : isQualified
        ? `border-green-700/80 ${styles.hoverBorder}`
        : `border-gray-700 ${styles.hoverBorder}`;

    const qualificationTooltip = isQualified && attributes ? (
        <div>
            <p className="font-bold mb-1 text-green-300">Qualification Met</p>
            <p className="text-xs text-gray-400 mb-2">This agent's attributes meet the recommended minimums for this profession.</p>
            <ul className="list-disc list-inside text-xs">
                {profession.recommendedStats.map(stat => (
                    <li key={stat}>
                        <span className="font-semibold">{stat}:</span> {attributes[stat]} (10+ required)
                    </li>
                ))}
            </ul>
        </div>
    ) : undefined;
        
    return (
        <div className={`relative w-full bg-gray-800/50 rounded-lg border-2 transition-all duration-200 ${borderClasses} flex flex-col`}>
            <div className="flex-grow">
                <button
                    onClick={onSelect}
                    className="w-full h-full text-left p-4"
                    aria-pressed={isSelected}
                >
                    <div className="flex justify-between items-start gap-2">
                        <h4 className={`font-bold text-lg ${styles.text}`}>{profession.name}</h4>
                        <div className="flex items-center gap-2 flex-shrink-0">
                            {isQualified && !isSelected && (
                                <Tooltip content={qualificationTooltip}>
                                    <div className="bg-green-900/80 text-green-300 text-xs font-bold px-2 py-0.5 rounded-full border border-green-700/50">
                                        QUALIFIED
                                    </div>
                                </Tooltip>
                            )}
                            <button
                                onClick={(e) => { e.stopPropagation(); onShowInfo(); }}
                                className="text-gray-500 hover:text-green-400 transition-colors p-1 -m-1"
                                aria-label="Show profession details"
                            >
                                <QuestionIcon className="h-5 w-5" />
                            </button>
                        </div>
                    </div>
                    <p className="text-sm text-gray-400 mt-2 line-clamp-4">{profession.description}</p>
                </button>
            </div>
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 bg-gray-900 p-1 rounded-full flex items-center justify-center pointer-events-none">
                 <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all ${isSelected ? styles.selected.border : isQualified ? 'border-green-600/80' : 'border-gray-600'}`}>
                    {isSelected && <div className={`w-5 h-5 ${styles.selected.bg} rounded-full`} />}
                </div>
            </div>
        </div>
    );
};
