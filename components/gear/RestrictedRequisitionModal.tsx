import React from 'react';
import type { DGItem, DGItemExpense, AttributeSet } from '../../types';

interface RestrictedRequisitionModalProps {
  item: DGItem | null;
  attributes: AttributeSet | null;
  skills: Record<string, number> | null;
  onClose: () => void;
  onNormal: () => void;
  onRisky: () => void;
}

const getExpenseModifier = (expense: DGItemExpense) => {
    if (expense === 'Major') return -20;
    if (expense === 'Extreme') return -40;
    return 0;
};

const getConsequences = (expense: DGItem['expense'], type: 'normal' | 'risky-fail-cha' | 'risky-pass-cha') => {
    if (type === 'risky-fail-cha') {
        if (expense === 'Major') return "You are placed Under Review, leading to Suspension and/or Transfer.";
        if (expense === 'Extreme') return "You are placed Under Review, leading to Firing and/or prosecution.";
        return "You are placed Under Review and receive a formal Reprimand.";
    } 
    if (type === 'risky-pass-cha') {
        return "You are placed Under Review, but manage to avoid immediate disciplinary action through sheer force of personality."
    }
    // Type is 'normal'
    if (expense === 'Major') return "You are placed Under Review.";
    if (expense === 'Extreme') return "You are placed Under Review and receive a formal Reprimand.";
    
    return "Your request is denied, but there are no further consequences.";
};

export const RestrictedRequisitionModal: React.FC<RestrictedRequisitionModalProps> = ({ item, attributes, skills, onClose, onNormal, onRisky }) => {
  if (!item || !skills || !attributes) return null;

  const modifier = getExpenseModifier(item.expense);
  const bureaucracyTarget = (skills['Bureaucracy'] || 0) + modifier;
  const militaryScienceTarget = (skills['Military Science'] || 0) + modifier;
  const baseTarget = Math.max(bureaucracyTarget, militaryScienceTarget);

  const normalChance = Math.max(0, Math.min(99, baseTarget));
  const riskyChance = Math.max(0, Math.min(99, baseTarget + 20));

  const normalConsequence = getConsequences(item.expense, 'normal');
  const riskyFailConsequence = getConsequences(item.expense, 'risky-fail-cha');
  const chaCheckChance = attributes.CHA * 5;

  return (
    <div
      className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="restricted-modal-title"
    >
      <div
        className="bg-gray-900 border-2 border-red-500/50 rounded-lg shadow-2xl w-full max-w-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="flex items-center gap-4 p-4 border-b border-red-700/50 bg-red-900/20">
          <i className="fa-solid fa-triangle-exclamation text-3xl text-red-400"></i>
          <div>
            <h2 id="restricted-modal-title" className="text-2xl font-bold text-red-300">Restricted Requisition</h2>
            <p className="text-red-200/80">{item.name}</p>
          </div>
        </header>

        <div className="p-6 text-gray-300 space-y-4 max-h-[60vh] overflow-y-auto">
          <p>You are attempting to requisition a **RESTRICTED** item through official channels. This action is logged and carries significant career risk. Failure will not go unnoticed by your superiors. You have two approaches:</p>
          
          <div className="space-y-4">
            {/* Normal Requisition */}
            <div className="bg-gray-800/50 p-4 rounded-md border border-gray-600">
                <div className="flex justify-between items-center">
                    <h3 className="font-bold text-lg text-sky-300">Normal Requisition</h3>
                    <span className="font-mono text-lg font-bold text-sky-300 bg-sky-900/50 px-3 py-1 rounded-md">{normalChance}% Chance</span>
                </div>
                <div className="text-sm mt-2 space-y-1">
                    <p><strong className="text-green-400">On Success:</strong> The item is acquired. No negative repercussions.</p>
                    <p><strong className="text-red-400">On Failure:</strong> {normalConsequence}</p>
                </div>
            </div>
            {/* Risky Requisition */}
            <div className="bg-gray-800/50 p-4 rounded-md border border-gray-600">
                <div className="flex justify-between items-center">
                    <h3 className="font-bold text-lg text-yellow-300">Risky Requisition</h3>
                    <span className="font-mono text-lg font-bold text-yellow-300 bg-yellow-900/50 px-3 py-1 rounded-md">{riskyChance}% Chance</span>
                </div>
                <p className="text-sm mt-2 text-gray-400">You pull strings and call in favors, adding a **+20% bonus** to your check. The blowback from failure will be severe and requires a second check to mitigate.</p>
                <div className="text-sm mt-2 space-y-1">
                    <p><strong className="text-green-400">On Success:</strong> The item is acquired. No negative repercussions.</p>
                    <p><strong className="text-red-400">On Failure:</strong> You must immediately make a **Charisma check ({chaCheckChance}%)**.
                       <ul className="list-disc list-inside ml-4 mt-1 text-gray-400">
                           <li>**If the CHA check SUCCEEDS**, you talk your way out of the worst of it. {getConsequences(item.expense, 'risky-pass-cha')}</li>
                           <li>**If the CHA check FAILS**, the full weight of your overreach comes down. {riskyFailConsequence}</li>
                       </ul>
                    </p>
                </div>
            </div>
          </div>
        </div>
        
        <footer className="p-4 bg-gray-900/50 border-t border-gray-700 flex justify-end gap-3">
            <button onClick={onClose} className="bg-gray-600 hover:bg-gray-500 text-white font-bold py-2 px-6 rounded-lg transition-colors">Nevermind</button>
            <button onClick={onNormal} className="bg-sky-700 hover:bg-sky-600 text-white font-bold py-2 px-6 rounded-lg transition-colors">Normal Requisition</button>
            <button onClick={onRisky} className="bg-red-700 hover:bg-red-600 text-white font-bold py-2 px-6 rounded-lg transition-colors">Risky Requisition</button>
        </footer>
      </div>
    </div>
  );
};