import React, { useMemo } from 'react';
import type { DGItem, DGItemExpense, AttributeSet } from '../../types';
import { ExpensePill } from './ExpensePill';
import { SpinnerIcon } from '../icons/SpinnerIcon';
import { Tooltip } from '../Tooltip';
import { AIIcon } from '../icons/AIIcon';
import { HomebrewIcon } from '../icons/HomebrewIcon';

const STAT_LABELS: Record<string, string> = {
    skill: 'Skill',
    damage: 'Damage',
    armorPiercing: 'AP',
    range: 'Range',
    uses: 'Uses',
    radius: 'Radius',
    victimsPenalty: 'Penalty',
    lethality: 'Lethality/Armor',
    killRadius: 'Kill Radius/Armor',
    ammoCapacity: 'Capacity/Speed',
};

const STAT_ORDER: (keyof DGItem)[] = [
    'skill', 'damage', 'armorPiercing', 'lethality', 'range', 'killRadius',
    'ammoCapacity', 'uses', 'radius', 'victimsPenalty'
];

const ItemStats: React.FC<{ item: DGItem }> = ({ item }) => {
    const stats = STAT_ORDER
        .map(key => ({ key, value: item[key] }))
        .filter(stat => stat.value !== undefined && stat.value !== null && stat.value !== '');

    if (stats.length === 0) {
        return null;
    }

    return (
        <div className="mt-2 grid grid-cols-2 gap-1 border-t border-gray-700/50 pt-2">
            {stats.map(({ key, value }) => (
                <div key={key as string} className="bg-black/30 p-1 rounded-md text-center">
                    <div className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">{STAT_LABELS[key as string]}</div>
                    <div className="text-sm font-mono text-white font-semibold">{String(value)}</div>
                </div>
            ))}
        </div>
    );
};

const getExpenseModifier = (expense: DGItemExpense) => {
    if (expense === 'Major') return -20;
    if (expense === 'Extreme') return -40;
    return 0;
};


interface InventoryItemCardProps {
    item: DGItem;
    isKitItem: boolean;
    isNew?: boolean;
    onDelete?: () => void;
    onGet?: () => void;
    onRequisition?: () => void;
    isOwned?: boolean;
    isFindFailed?: boolean;
    isRequisitionFailed?: boolean;
    isAcquiring?: boolean;
    showStats: boolean;
    attributes: AttributeSet | null;
}

export const InventoryItemCard: React.FC<InventoryItemCardProps> = ({ item, isKitItem, isNew, onDelete, onGet, onRequisition, isOwned, isFindFailed, isRequisitionFailed, isAcquiring, showStats, attributes }) => {
    const isAutoAcquired = !isKitItem && (item.expense === 'None' || (item.expense === 'Incidental' && !item.isRestricted));

    const isFullyFailed = (item.isRestricted && isRequisitionFailed) || (isFindFailed && isRequisitionFailed);

    const baseClasses = 'p-3 rounded-lg border-2 relative transition-all duration-300';
    let stateClasses = 'bg-gray-800/50 border-gray-700/50';
    if (isKitItem || isAutoAcquired) {
        stateClasses = 'bg-gray-700/30 border-gray-600/50';
    } else if (isOwned) {
        stateClasses = 'bg-green-900/30 border-green-700/50';
    } else if (isFullyFailed) {
        stateClasses = 'bg-red-900/50 border-red-700/50 opacity-70';
    }

    const animationClass = isNew ? 'animate-item-fade-in' : '';

    const findChance = useMemo(() => {
        if (!attributes) return 0;
        const modifier = getExpenseModifier(item.expense);
        const chance = Math.max((attributes.INT * 5) + modifier, 50 + modifier);
        return Math.max(0, Math.min(99, chance));
    }, [attributes, item.expense]);

    const showFindButton = onGet && !item.isRestricted && !isFindFailed;
    const showRequisitionButton = onRequisition && !isRequisitionFailed;

    return (
        <div className={`${baseClasses} ${stateClasses} ${animationClass}`}>
            <div className="flex justify-between items-start gap-2">
                <h4 className="font-bold text-gray-200 flex items-center flex-grow min-w-0 pr-4">
                    <span className="truncate" title={item.name}>{item.name}</span>
                    {item.isRestricted && (
                        <span 
                            className="ml-2 px-1.5 py-0.5 bg-red-900/80 text-red-300 text-xs font-black rounded-md border border-red-700/60 flex-shrink-0"
                            title="Restricted Item"
                        >
                            R
                        </span>
                    )}
                    {item.sourceType === 'ai' && (
                        <Tooltip content="AI Generated Item">
                            <span className="ml-2">
                                <AIIcon className="text-sky-400 fa-sm" />
                            </span>
                        </Tooltip>
                    )}
                    {item.sourceType === 'homebrew' && (
                        <Tooltip content="Homebrew Item">
                            <span className="ml-2">
                                <HomebrewIcon className="text-yellow-400 fa-sm" />
                            </span>
                        </Tooltip>
                    )}
                </h4>
                <div className="flex-shrink-0 flex items-center gap-2">
                    {isKitItem || isAutoAcquired ? (
                        <div className="inline-flex items-center px-2 py-0.5 bg-gray-600 text-gray-300 text-[10px] font-bold rounded-full border border-gray-500">
                            {isKitItem ? 'ISSUED' : 'ACQUIRED'}
                        </div>
                    ) : (
                        <ExpensePill expense={item.expense} />
                    )}
                    {!isKitItem && onDelete && (
                        <button
                            onClick={onDelete}
                            className="w-7 h-7 flex items-center justify-center text-gray-500 hover:text-red-400 hover:bg-red-900/50 rounded-full transition-colors"
                            aria-label="Delete Item"
                        >
                            <i className="fa-solid fa-trash-can fa-sm"></i>
                        </button>
                    )}
                </div>
            </div>
            {item.description && <p className="text-xs text-gray-400 mt-1">{item.description}</p>}
            
            {showStats && <ItemStats item={item} />}

            {!isKitItem && !isAutoAcquired && (
                <div className="mt-3">
                    {isAcquiring ? (
                        <div className="flex items-center justify-center gap-2 text-sky-300">
                            <SpinnerIcon className="h-4 w-4"/>
                            <span className="text-sm">Rolling...</span>
                        </div>
                    ) : isOwned ? (
                         <div className="flex items-center justify-center gap-2 text-green-300 font-bold text-sm">
                            <i className="fa-solid fa-check-circle"></i> Acquired
                        </div>
                    ) : isFullyFailed ? (
                        <div className="flex items-center justify-center gap-2 text-red-300 font-bold text-sm">
                            <i className="fa-solid fa-times-circle"></i> Acquisition Failed
                        </div>
                    ) : (
                        <div className="flex gap-2">
                            {showFindButton && (
                                <button 
                                    onClick={onGet}
                                    className="flex-1 bg-sky-800/80 hover:bg-sky-700/80 text-white text-sm font-bold py-1.5 px-3 rounded-md transition-colors"
                                >
                                    Find ({findChance}%)
                                </button>
                            )}
                            {showRequisitionButton && (
                                <button 
                                    onClick={onRequisition} 
                                    className={`flex-1 text-white text-sm font-bold py-1.5 px-3 rounded-md transition-colors ${
                                        item.isRestricted 
                                            ? 'bg-red-800/80 hover:bg-red-700/80' 
                                            : 'bg-sky-800/80 hover:bg-sky-700/80'
                                    }`}
                                >
                                    Requisition
                                </button>
                            )}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};