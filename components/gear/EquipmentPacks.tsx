import React from 'react';
import { EQUIPMENT_PACKS } from '../../data/equipment-pack-data';
import { Tooltip } from '../Tooltip';

interface EquipmentPacksProps {
    onAddPack: (packName: string) => void;
}

export const EquipmentPacks: React.FC<EquipmentPacksProps> = ({ onAddPack }) => {
    return (
        <div className="bg-gray-900/50 p-4 rounded-lg border-2 border-gray-700/50">
            <div className="flex items-center justify-between gap-3 mb-4">
                <div>
                    <h3 className="text-2xl font-bold text-green-300">Equipment Packs</h3>
                    <p className="text-gray-400 text-sm mt-1">Add archetype-focused support packs straight into the inventory build.</p>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {EQUIPMENT_PACKS.map((pack) => (
                    <Tooltip key={pack.name} content={pack.description}>
                        <button
                            type="button"
                            onClick={() => onAddPack(pack.name)}
                            className="w-full rounded-lg border border-sky-700/60 bg-sky-900/40 px-3 py-3 text-left text-white transition-colors hover:bg-sky-800/60"
                        >
                            <div className="font-bold text-sm">{pack.name}</div>
                            <div className="text-xs text-sky-100/80 mt-1">{pack.items.length} items</div>
                        </button>
                    </Tooltip>
                ))}
            </div>
        </div>
    );
};
