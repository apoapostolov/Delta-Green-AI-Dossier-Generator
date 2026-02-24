import React, { useEffect, useRef, useState } from 'react';
import type { DGItem, AttributeSet } from '../../types';
import { InventoryItemCard } from './InventoryItemCard';

interface AgentInventoryProps {
    kitInventory: DGItem[];
    inventory: DGItem[];
    onDrop: (e: React.DragEvent<HTMLDivElement>) => void;
    onDeleteItem: (itemName: string) => void;
    handleGetItem: (item: DGItem) => void;
    handleRequisitionItem: (item: DGItem) => void;
    ownedItems: Set<string>;
    findFailedItems: Set<string>;
    requisitionFailedItems: Set<string>;
    acquisitionInProgress: string | null;
    showItemStats: boolean;
    onToggleShowItemStats: () => void;
    isUnderReview: boolean;
    attributes: AttributeSet | null;
}

export const AgentInventory: React.FC<AgentInventoryProps> = ({ kitInventory, inventory, onDrop, onDeleteItem, handleGetItem, handleRequisitionItem, ownedItems, findFailedItems, requisitionFailedItems, acquisitionInProgress, showItemStats, onToggleShowItemStats, isUnderReview, attributes }) => {
    const sortedKitInventory = [...kitInventory].sort((a, b) => a.name.localeCompare(b.name));
    
    const prevInventoryRef = useRef<DGItem[]>([]);
    const [newItems, setNewItems] = useState<Set<string>>(new Set());
    const inventoryContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const prevNames = new Set(prevInventoryRef.current.map(i => i.name));
        const newAddedItems = inventory.filter(item => !prevNames.has(item.name));

        if (newAddedItems.length > 0) {
            setNewItems(new Set(newAddedItems.map(i => i.name)));
            
            if (inventoryContainerRef.current) {
                inventoryContainerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
            }

            const timer = setTimeout(() => setNewItems(new Set()), 1000); // Animation duration + buffer
            return () => clearTimeout(timer);
        }
        prevInventoryRef.current = inventory;
    }, [inventory]);

    const inventoryWithoutKitItems = inventory.filter(invItem => !kitInventory.some(kitItem => kitItem.name === invItem.name));
    
    return (
        <div className="bg-gray-900/50 p-4 rounded-lg border-2 border-gray-700/50 flex flex-col flex-grow">
            <div className="flex justify-between items-center mb-4 pb-2 border-b-2 border-gray-700">
                <h3 className="text-2xl font-bold text-green-300">Agent Inventory</h3>
                <div className="flex items-center gap-2 text-sm">
                    <span className="font-bold text-gray-400">Stats</span>
                    <button
                        onClick={onToggleShowItemStats}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900/50 focus:ring-green-500 ${showItemStats ? 'bg-green-600' : 'bg-gray-600'}`}
                        aria-label="Toggle item stats visibility"
                    >
                        <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${showItemStats ? 'translate-x-6' : 'translate-x-1'}`} />
                    </button>
                </div>
            </div>
            {isUnderReview && (
                 <div className="p-3 mb-4 bg-orange-900/50 border-2 border-orange-500 rounded-lg text-orange-200 text-center">
                    <h4 className="font-bold">AGENT UNDER REVIEW</h4>
                    <p className="text-sm">Your actions are being scrutinized. Access to restricted items is revoked.</p>
                </div>
            )}
            <div 
                ref={inventoryContainerRef}
                className="flex-grow space-y-3 overflow-y-auto"
                onDragOver={(e) => e.preventDefault()}
                onDrop={onDrop}
            >
                {kitInventory.length === 0 && inventory.length === 0 ? (
                    <div className="h-full flex items-center justify-center">
                        <p className="text-gray-500 text-center p-4 border-2 border-dashed border-gray-600 rounded-lg">
                            Drag items here to add them to your agent's inventory.
                        </p>
                    </div>
                ) : (
                    <>
                        {inventoryWithoutKitItems.map(item => (
                            <InventoryItemCard
                                key={`user-${item.name}`}
                                item={item}
                                isKitItem={false}
                                isNew={newItems.has(item.name)}
                                onDelete={() => onDeleteItem(item.name)}
                                onGet={() => handleGetItem(item)}
                                onRequisition={() => handleRequisitionItem(item)}
                                isOwned={ownedItems.has(item.name)}
                                isFindFailed={findFailedItems.has(item.name)}
                                isRequisitionFailed={requisitionFailedItems.has(item.name)}
                                isAcquiring={acquisitionInProgress === item.name}
                                showStats={showItemStats}
                                attributes={attributes}
                            />
                        ))}
                        {sortedKitInventory.map(item => (
                            <InventoryItemCard
                                key={`kit-${item.name}`}
                                item={item}
                                isKitItem={true}
                                attributes={attributes}
                                // FIX: Corrected typo, using 'showItemStats' from props instead of undefined 'showStats'.
                                showStats={showItemStats}
                            />
                        ))}
                    </>
                )}
            </div>
        </div>
    );
};