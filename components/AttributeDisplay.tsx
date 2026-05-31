import React from 'react';
import { Tooltip } from './Tooltip';

const getAttributeColor = (score: number): string => {
    if (score >= 17) return 'bg-green-900/50 border-green-700 text-green-300';
    if (score >= 13) return 'bg-sky-900/50 border-sky-700 text-sky-300';
    if (score >= 9) return 'bg-gray-800/60 border-gray-600 text-gray-200';
    return 'bg-red-900/50 border-red-700 text-red-300';
};

interface AttributeDisplayProps {
  label: string;
  score: number;
  change?: number;
  changeEvents?: string;
}

export const AttributeDisplay: React.FC<AttributeDisplayProps> = ({ label, score, change, changeEvents }) => {
    const colorClasses = getAttributeColor(score);
    const hasChange = typeof change === 'number' && change !== 0;

    const changePill = hasChange ? (
        <div className={`absolute top-2 right-2 px-2 py-0.5 rounded-full text-xs font-bold border-2 shadow-lg backdrop-blur-sm ${change > 0 ? 'bg-green-900/80 border-green-500 text-green-300' : 'bg-red-900/80 border-red-500 text-red-300'}`}>
            {change > 0 ? '+' : ''}{change}
        </div>
    ) : null;

    return (
        <div className={`relative flex flex-col items-center justify-center p-4 rounded-md border-2 transition-all duration-300 min-h-[150px] ${colorClasses}`}>
            {hasChange ? (
                <Tooltip content={changeEvents ? <div className="text-xs whitespace-pre-wrap">{changeEvents}</div> : undefined}>
                    {changePill}
                </Tooltip>
            ) : null}
            <div className="text-sm font-bold uppercase tracking-wider text-gray-400 mb-1">{label}</div>
            <div className="text-5xl font-mono font-black text-gray-100 my-1">{score}</div>
            <div className="text-lg font-mono opacity-75">{score * 5}%</div>
        </div>
    );
};