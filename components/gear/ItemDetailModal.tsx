import React from 'react';
import type { DGItem } from '../../types';
import { ExpensePill } from './ExpensePill';
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

interface ItemDetailModalProps {
  item: DGItem | null;
  onClose: () => void;
  onAddItem: (item: DGItem) => void;
}

export const ItemDetailModal: React.FC<ItemDetailModalProps> = ({ item, onClose, onAddItem }) => {
  if (!item) return null;

  const handleAddItem = () => {
    onAddItem(item);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="item-detail-modal-title"
    >
      <div
        className="bg-gray-800 border-2 border-green-500/50 rounded-lg shadow-2xl w-full max-w-md"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="p-4 border-b border-gray-700">
          <h2 id="item-detail-modal-title" className="text-xl font-bold text-green-300 flex items-center gap-2">
            {item.name}
            {item.isRestricted && <span className="px-1.5 py-0.5 bg-red-900/80 text-red-300 text-xs font-black rounded-md border border-red-700/60">R</span>}
            {item.sourceType === 'ai' && (
                <Tooltip content="AI Generated Item">
                    <span><AIIcon className="text-sky-400" /></span>
                </Tooltip>
            )}
            {item.sourceType === 'homebrew' && (
                <Tooltip content="Homebrew Item">
                    <span><HomebrewIcon className="text-yellow-400" /></span>
                </Tooltip>
            )}
          </h2>
        </header>
        <div className="p-4 space-y-4 max-h-[60vh] overflow-y-auto">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-400">{item.section}</span>
            <ExpensePill expense={item.expense} />
          </div>
          {item.description && <p className="text-sm text-gray-300">{item.description}</p>}
          <ItemStats item={item} />
        </div>
        <footer className="p-4 bg-gray-900/50 border-t border-gray-700 flex justify-end gap-3">
          <button onClick={onClose} className="bg-gray-600 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded-lg">Cancel</button>
          <button onClick={handleAddItem} className="bg-green-700 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg flex items-center gap-2">
            <i className="fa-solid fa-plus-circle"></i>
            Add to Inventory
          </button>
        </footer>
      </div>
    </div>
  );
};