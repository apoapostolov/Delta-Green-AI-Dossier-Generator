import React, { useMemo } from 'react';
import type { DGItem } from '../../types';
import { SectionHeader } from './SectionHeader';
import { ExpensePill } from './ExpensePill';
import { Tooltip } from '../Tooltip';
import { AIIcon } from '../icons/AIIcon';
import { HomebrewIcon } from '../icons/HomebrewIcon';

interface EquipmentListProps {
    items: DGItem[];
    filterText: string;
    onFilterChange: (text: string) => void;
    isUnderReview: boolean;
    fullyFailedItems: Set<string>;
    height?: number | 'auto';
    onItemClick?: (item: DGItem) => void;
}

const SECTION_COLUMNS: Record<string, (keyof DGItem)[]> = {
    'Hand-to-Hand Weapons': ['name', 'skill', 'damage', 'armorPiercing', 'expense'],
    'Firearms': ['name', 'skill', 'damage', 'armorPiercing', 'baseRange', 'lethality', 'ammoCapacity', 'expense'],
    'Tear Gas and Pepper Spray': ['name', 'skill', 'range', 'uses', 'radius', 'victimsPenalty', 'expense'],
    'Stun Grenades': ['name', 'skill', 'range', 'uses', 'radius', 'victimsPenalty', 'expense'],
    'Electroshock Weapons': ['name', 'skill', 'range', 'uses', 'victimsPenalty', 'expense'],
    'Heavy Weapons': ['name', 'skill', 'lethality', 'killRadius', 'ammoCapacity', 'expense'],
    'Demolitions': ['name', 'skill', 'armorPiercing', 'lethality', 'killRadius', 'expense'],
    'Artillery': ['name', 'skill', 'lethality', 'killRadius', 'ammoCapacity', 'expense'],
    'Body Armor': ['name', 'lethality', 'description', 'expense'], // Lethality is armor rating here
    'Ground Vehicles': ['name', 'lethality', 'killRadius', 'ammoCapacity', 'expense'], // HP, Armor, Speed
    'Water Vehicles': ['name', 'lethality', 'killRadius', 'ammoCapacity', 'expense'], // HP, Armor, Speed
    'Air Vehicles': ['name', 'lethality', 'killRadius', 'ammoCapacity', 'expense'], // HP, Armor, Speed
};

// FIX: Added the missing `shortName` property to satisfy the `Record<keyof DGItem, React.ReactNode>` type.
const COLUMN_HEADERS: Record<keyof DGItem, React.ReactNode> = {
    name: 'Item',
    shortName: 'Item',
    skill: 'Skill',
    damage: 'Damage',
    armorPiercing: 'AP',
    expense: 'Expense',
    range: 'Range',
    uses: 'Uses',
    radius: 'Radius',
    victimsPenalty: 'Penalty',
    baseRange: 'Base Range',
    lethality: <>Lethality<br/>/Armor</>,
    killRadius: <>Kill&nbsp;Radius<br/>/Armor</>,
    ammoCapacity: <>Capacity<br/>/Speed</>,
    description: 'Description',
    section: 'Section',
    isRestricted: 'Restricted',
    sourceType: 'Source',
};

const handleDragStart = (e: React.DragEvent<HTMLTableRowElement>, item: DGItem) => {
    e.dataTransfer.setData("application/json", JSON.stringify(item));
};

export const EquipmentList: React.FC<EquipmentListProps> = ({ items, filterText, onFilterChange, isUnderReview, fullyFailedItems, height = 'auto', onItemClick }) => {
    const groupedItems = useMemo(() => {
        return items.reduce((acc, item) => {
            const section = item.section || 'Miscellaneous';
            if (!acc[section]) {
                acc[section] = [];
            }
            acc[section].push(item);
            return acc;
        }, {} as Record<string, DGItem[]>);
    }, [items]);

    return (
        <div className="space-y-6">
            <input
                type="text"
                placeholder="Filter equipment by name..."
                value={filterText}
                onChange={(e) => onFilterChange(e.target.value)}
                className="w-full bg-gray-800 border border-gray-600 rounded-md p-3 text-white placeholder-gray-500 focus:ring-2 focus:ring-green-400"
            />
            <div
                className="space-y-8 overflow-y-auto pr-2"
                style={{ height: height === 'auto' ? 'auto' : `${height}px` }}
            >
                {Object.keys(groupedItems).map((section) => {
                    const sectionItems = groupedItems[section];
                    const columns = SECTION_COLUMNS[section] || ['name', 'description', 'expense'];
                    return (
                        <div key={section}>
                            <SectionHeader section={section} />
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm text-left text-gray-300">
                                    <thead className="text-xs text-gray-400 uppercase bg-gray-900/50">
                                        <tr>
                                            {columns.map(col => <th key={col} className={`px-4 py-3 ${col === 'expense' ? 'text-center' : ''}`}>{COLUMN_HEADERS[col]}</th>)}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {sectionItems.map((item, index) => {
                                            const isLocked = item.isRestricted && isUnderReview;
                                            const isFullyFailed = fullyFailedItems.has(item.name);
                                            const isDisabled = isLocked || isFullyFailed;
                                            return (
                                            <tr 
                                                key={index} 
                                                className={`border-b border-gray-800 transition-colors ${
                                                    isDisabled ? 'text-gray-600 bg-gray-900/50 cursor-not-allowed' : 
                                                    onItemClick ? 'hover:bg-gray-800/60 cursor-pointer' : 'hover:bg-gray-800/60 cursor-grab'
                                                }`}
                                                draggable={!isDisabled && !onItemClick}
                                                onDragStart={!onItemClick ? (e) => handleDragStart(e, item) : undefined}
                                                onClick={onItemClick && !isDisabled ? () => onItemClick(item) : undefined}
                                            >
                                                {columns.map(col => (
                                                    <td key={col} className="px-4 py-2 align-top">
                                                        {col === 'expense' ? (
                                                            <div className="flex justify-center">
                                                                <ExpensePill expense={item.expense} />
                                                            </div>
                                                        ) : (
                                                            <span className={`flex items-center ${col === 'name' ? 'font-bold' : ''}`}>
                                                                {item[col] || '—'}
                                                                {col === 'name' && item.isRestricted && (
                                                                    <span 
                                                                        className={`ml-2 px-1.5 py-0.5 text-xs font-black rounded-md border ${isDisabled ? 'bg-gray-800 text-gray-600 border-gray-700' : 'bg-red-900/80 text-red-300 border-red-700/60'}`}
                                                                        title="Restricted Item"
                                                                    >
                                                                        R
                                                                    </span>
                                                                )}
                                                                {col === 'name' && item.sourceType === 'ai' && (
                                                                    <Tooltip content="AI Generated Item">
                                                                        <span className="ml-2">
                                                                            <AIIcon className="text-sky-400 fa-sm" />
                                                                        </span>
                                                                    </Tooltip>
                                                                )}
                                                                {col === 'name' && item.sourceType === 'homebrew' && (
                                                                    <Tooltip content="Homebrew Item">
                                                                        <span className="ml-2">
                                                                            <HomebrewIcon className="text-yellow-400 fa-sm" />
                                                                        </span>
                                                                    </Tooltip>
                                                                )}
                                                            </span>
                                                        )}
                                                    </td>
                                                ))}
                                            </tr>
                                        )})}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};