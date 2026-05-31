import React from 'react';
import type { Bond } from '../../types';
import { MarkdownDisplay } from '../MarkdownDisplay';

interface BondCardProps {
    bond: Bond;
    onDelete: () => void;
}

export const BondCard: React.FC<BondCardProps> = ({ bond, onDelete }) => {
    const finalScore = bond.score + (bond.scoreModifier || 0);

    if (bond.terminated) {
        return (
            <div className="bg-red-900/50 p-4 rounded-lg border border-red-700 relative text-center">
                <h4 className="text-lg font-bold text-red-300">{bond.type}</h4>
                <p className="font-mono font-black text-2xl text-red-400 my-2">TERMINATED</p>
                <p className="text-gray-400 text-sm">
                    <MarkdownDisplay text={bond.name} />
                </p>
            </div>
        );
    }

    return (
        <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-700 relative">
            <div className="flex justify-between items-center gap-4">
                <h4 className="text-lg font-bold text-green-300 flex-grow">{bond.type}</h4>
                <div className="text-center">
                    <div className="text-xs text-gray-400">SCORE</div>
                    <div className="text-2xl font-mono font-bold text-white">{finalScore}</div>
                </div>
                <button
                    onClick={onDelete}
                    className="text-gray-500 hover:text-red-400 transition-colors p-2"
                    aria-label="Delete Bond"
                >
                    <i className="fa-solid fa-trash-can"></i>
                </button>
            </div>
            <p className="text-gray-300 mt-2 text-sm leading-relaxed">
                <MarkdownDisplay text={bond.description} />
            </p>
        </div>
    );
};