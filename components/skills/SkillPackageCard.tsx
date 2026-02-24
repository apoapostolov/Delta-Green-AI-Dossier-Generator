import React from 'react';
import type { SkillPackage } from '../../types';

interface SkillPackageCardProps {
  pkg: SkillPackage;
  isSelected: boolean;
  onSelect: () => void;
}

export const SkillPackageCard: React.FC<SkillPackageCardProps> = ({ pkg, isSelected, onSelect }) => {
    const borderClasses = isSelected 
        ? 'border-sky-400 ring-2 ring-sky-500/50' 
        : 'border-gray-700 hover:border-sky-600';

    return (
        <div className={`relative w-full bg-gray-800/50 rounded-lg border-2 transition-all duration-200 ${borderClasses} flex flex-col`}>
            <button
                onClick={onSelect}
                className="w-full h-full text-left p-4 flex-grow flex flex-col justify-between"
                aria-pressed={isSelected}
            >
                <div>
                    <div className="flex justify-between items-start gap-2">
                        <h4 className="font-bold text-lg text-sky-300">{pkg.name}</h4>
                        <span className="bg-gray-900/50 text-sky-300 text-xs font-bold px-2 py-1 rounded-full border border-gray-600 flex-shrink-0">
                            {pkg.skills.length} skills
                        </span>
                    </div>
                    <div className="text-xs text-gray-400 mt-2 space-y-1">
                        <p className="font-semibold text-gray-300">Core Skills:</p>
                        <p className="leading-relaxed">{pkg.skills.join(', ')}</p>
                        {pkg.choices && (
                            <p className="italic text-gray-500 pt-1">{pkg.choices}</p>
                        )}
                    </div>
                </div>

                <div className="mt-4 flex justify-center items-center">
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${isSelected ? 'border-sky-400 bg-gray-900/50' : 'border-gray-600'}`}>
                        {isSelected && <div className="w-3.5 h-3.5 bg-sky-400 rounded-full" />}
                    </div>
                </div>
            </button>
        </div>
    );
};
