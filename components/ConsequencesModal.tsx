import React from 'react';
import type { SimResult } from '../sim/types';
import type { AttributeSet, Attribute } from '../types';

interface ConsequencesModalProps {
  simResult: SimResult;
  baseAttributes: AttributeSet;
  baseSkills: Record<string, number>;
  onAccept: () => void;
  onClose: () => void;
}

const STARTING_BONDS = 3;

const calculateDerivedStats = (attributes: AttributeSet) => {
    const SAN = attributes.POW * 5;
    return {
        SAN: SAN,
        HP: Math.floor((attributes.STR + attributes.CON) / 2),
        WP: attributes.POW,
        BP: SAN - attributes.POW,
    };
};

const ChangeRow: React.FC<{ label: string, before: number | string, after: number | string, isSkill?: boolean }> = ({ label, before, after, isSkill }) => {
    const change = Number(after) - Number(before);
    let changeColor = 'text-gray-400';
    if (change > 0) changeColor = 'text-green-400';
    if (change < 0) changeColor = 'text-red-400';

    return (
        <div className="grid grid-cols-3 gap-4 py-2 border-b border-gray-700/50">
            <div className="font-semibold text-gray-300">{label}</div>
            <div className="text-center font-mono">{before}{isSkill ? '%' : ''}</div>
            <div className={`text-center font-mono font-bold ${changeColor}`}>{after}{isSkill ? '%' : ''}</div>
        </div>
    );
};

export const ConsequencesModal: React.FC<ConsequencesModalProps> = ({ simResult, baseAttributes, baseSkills, onAccept, onClose }) => {
    const newAttributes = { ...baseAttributes };
    for (const [attr, change] of Object.entries(simResult.attributeChanges)) {
        newAttributes[attr as Attribute] = Math.max(1, (newAttributes[attr as Attribute] || 0) + change);
    }

    const baseDerived = calculateDerivedStats(baseAttributes);
    const newDerived = calculateDerivedStats(newAttributes);

    const changedAttributes = Object.keys(simResult.attributeChanges).filter(key => simResult.attributeChanges[key] !== 0);
    const changedSkills = Object.keys(simResult.skills).filter(key => simResult.skills[key] !== 0);

    const sanAfter = baseDerived.SAN + simResult.sanChange;
    const bondsAfter = STARTING_BONDS + simResult.bondChange;
    const hpAfter = baseDerived.HP + simResult.maxHpChange;

    return (
      <div
        className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-labelledby="consequences-modal-title"
      >
        <div
          className="bg-gray-800 border-2 border-yellow-500/50 rounded-lg shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          <header className="flex items-center justify-between p-4 border-b border-gray-700">
            <h2 id="consequences-modal-title" className="text-2xl font-bold text-yellow-400">Career Consequences</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-white" aria-label="Close modal">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </header>
  
          <div className="p-6 overflow-y-auto space-y-6">
            <p className="text-gray-400">Your agent's career has shaped them. Review the changes to your attributes and skills. This is a permanent choice for this character roll.</p>
            
            {(changedAttributes.length > 0 || simResult.sanChange !== 0 || simResult.bondChange !== 0 || simResult.maxHpChange !== 0) && (
                <div>
                    <h3 className="text-xl font-semibold text-gray-200 mb-2">Attributes & Derived Stats</h3>
                    <div className="bg-gray-900/50 p-4 rounded-lg">
                        <div className="grid grid-cols-3 gap-4 pb-2 font-bold text-gray-500 uppercase text-sm">
                            <div>Stat</div><div className="text-center">Before</div><div className="text-center">After</div>
                        </div>
                        {changedAttributes.map(attr => (
                            <ChangeRow key={attr} label={attr} before={baseAttributes[attr as Attribute]} after={newAttributes[attr as Attribute]} />
                        ))}
                        {simResult.maxHpChange !== 0 && <ChangeRow label="Max HP" before={baseDerived.HP} after={hpAfter} />}
                        {simResult.sanChange !== 0 && <ChangeRow label="SAN" before={baseDerived.SAN} after={sanAfter} />}
                        {simResult.bondChange !== 0 && <ChangeRow label="Bonds" before={STARTING_BONDS} after={bondsAfter} />}
                    </div>
                </div>
            )}

            {changedSkills.length > 0 && (
                <div>
                    <h3 className="text-xl font-semibold text-gray-200 mb-2">Skill Improvements</h3>
                     <div className="bg-gray-900/50 p-4 rounded-lg max-h-64 overflow-y-auto">
                        <div className="grid grid-cols-3 gap-4 pb-2 font-bold text-gray-500 uppercase text-sm">
                            <div>Skill</div><div className="text-center">Before</div><div className="text-center">After</div>
                        </div>
                        {changedSkills.sort().map(skill => (
                            <ChangeRow key={skill} label={skill} before={baseSkills[skill] || 0} after={(baseSkills[skill] || 0) + simResult.skills[skill]} isSkill />
                        ))}
                    </div>
                </div>
            )}
          </div>

          <footer className="p-4 bg-gray-900/50 border-t border-gray-700 flex justify-end gap-4">
              <button onClick={onClose} className="bg-gray-600 hover:bg-gray-500 text-white font-bold py-2 px-6 rounded-lg transition-colors">Cancel</button>
              <button onClick={onAccept} className="bg-green-700 hover:bg-green-600 text-white font-bold py-2 px-6 rounded-lg transition-colors">Accept Consequences</button>
          </footer>
        </div>
      </div>
    );
};