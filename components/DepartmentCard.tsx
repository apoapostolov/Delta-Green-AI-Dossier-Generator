
import React from 'react';
import type { Department } from '../types';
import { QuestionIcon } from './icons/QuestionIcon';

interface DepartmentCardProps {
    department: Department;
    isSelected: boolean;
    onSelect: () => void;
    onShowInfo: () => void;
}

export const DepartmentCard: React.FC<DepartmentCardProps> = ({ department, isSelected, onSelect, onShowInfo }) => {
    const borderClasses = isSelected 
        ? 'border-green-400 ring-2 ring-green-500/50' 
        : 'border-gray-700 hover:border-green-600';
        
    return (
        <div className={`relative w-full bg-gray-800/50 rounded-lg border-2 transition-all duration-200 ${borderClasses} flex flex-col`}>
            <div className="flex-grow">
                <button
                    onClick={onSelect}
                    className="w-full h-full text-left p-4"
                    aria-pressed={isSelected}
                >
                    <div className="flex justify-between items-start gap-2">
                        <h4 className="font-bold text-lg text-green-300">{department.name}</h4>
                        <button
                            onClick={(e) => { e.stopPropagation(); onShowInfo(); }}
                            className="text-gray-500 hover:text-green-400 transition-colors p-1 -m-1 flex-shrink-0"
                            aria-label="Show department details"
                        >
                            <QuestionIcon className="h-5 w-5" />
                        </button>
                    </div>
                    <p className="text-sm text-gray-400 mt-2 line-clamp-4">{department.description}</p>
                </button>
            </div>
             <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 bg-gray-900 p-1 rounded-full flex items-center justify-center pointer-events-none">
                 <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all ${isSelected ? 'border-green-400' : 'border-gray-600'}`}>
                    {isSelected && <div className="w-5 h-5 bg-green-400 rounded-full" />}
                </div>
            </div>
        </div>
    );
};
