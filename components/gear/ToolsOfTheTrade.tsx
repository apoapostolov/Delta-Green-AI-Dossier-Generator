

import React, { useState } from 'react';
import { EQUIPMENT_KITS } from '../../data/equipment-kit-data';
import { Tooltip } from '../Tooltip';

interface ToolsOfTheTradeProps {
    onSetKit: (kitName: string) => void;
    activeKitName: string | null;
}

const getDisplayName = (name: string): string => {
    switch (name) {
        case 'INTELLIGENCE / COVERT OPS KIT':
            return 'INTEL/COVERT OPS';
        case 'SCIENTIST / MEDICAL KIT':
            return 'SCIENTIST/MEDICAL';
        case 'CIA SAD/SOG OPERATOR':
            return 'CIA SAD/SOG';
        case 'EPA CID SPECIAL AGENT':
            return 'EPA CID AGENT';
        default:
            return name;
    }
};

const kitOrder = [
    'FEDERAL AGENT',
    'SPECIAL OPERATOR',
    'INTELLIGENCE / COVERT OPS KIT',
    'POLICE OFFICER',
    'SCIENTIST / MEDICAL KIT',
    'INVESTIGATOR\'S KIT',
    'SWAT TEAM',
    'SOLDIER\'S KIT',
    'FIRST RESPONDER KIT',
    'BODYGUARD',
    'EOD KIT',
    'CORPORATE KIT',
    'CRIMINAL\'S KIT',
    'CIA SAD/SOG OPERATOR',
    'CIA SAD/PAG OFFICER',
    'EPA CID SPECIAL AGENT'
];

export const ToolsOfTheTrade: React.FC<ToolsOfTheTradeProps> = ({ onSetKit, activeKitName }) => {
    const [isOpen, setIsOpen] = useState(!activeKitName);

    const availableKits = EQUIPMENT_KITS
        .filter(kit => kit.items && kit.items.length > 0)
        .sort((a, b) => {
            const indexA = kitOrder.indexOf(a.name);
            const indexB = kitOrder.indexOf(b.name);
            if (indexA === -1) return 1;
            if (indexB === -1) return -1;
            return indexA - indexB;
        });
    
    return (
        <div className="bg-gray-900/50 p-4 rounded-lg border-2 border-gray-700/50">
            <div className="flex justify-between items-center">
                <h3 className="text-2xl font-bold text-green-300">Tools of the Trade</h3>
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="flex items-center gap-2 text-sm font-bold text-gray-400 hover:text-green-300 transition-colors py-1 px-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
                    aria-expanded={isOpen}
                >
                    {isOpen ? 'Hide' : 'Show'} Kits
                    <i className={`fa-solid fa-chevron-${isOpen ? 'up' : 'down'} transition-transform duration-300 ${isOpen ? '' : 'rotate-180'}`}></i>
                </button>
            </div>
            <div className={`transition-all duration-500 ease-in-out overflow-hidden ${isOpen ? 'max-h-[1000px] opacity-100 pt-4' : 'max-h-0 opacity-0 pt-0'}`}>
                <p className="text-gray-400 text-center mb-4 text-sm">Quickly add a standard equipment kit to your inventory.</p>
                <div className="grid grid-cols-2 gap-2">
                    {availableKits.map(kit => {
                        const isActive = activeKitName === kit.name;
                        return (
                            <Tooltip key={kit.name} content={kit.description}>
                                <button 
                                    onClick={() => onSetKit(kit.name)} 
                                    className={`w-full font-bold py-2 px-3 rounded-lg shadow-md transition-all duration-300 ease-in-out text-sm text-center flex items-center justify-center min-h-[44px]
                                        ${isActive 
                                            ? 'bg-green-600 hover:bg-green-500 text-white ring-2 ring-green-400' 
                                            : 'bg-sky-800/70 hover:bg-sky-700/70 text-white'
                                        }
                                    `}
                                >
                                   {getDisplayName(kit.name)}
                                </button>
                            </Tooltip>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};
