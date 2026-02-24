
import React from 'react';
import type { DamagedVeteranOption } from '../../types';
import { useCharacterContext } from '../../context/CharacterContext';

interface DamagedVeteranOptionsProps {
    selectedOption: DamagedVeteranOption | null;
    onSelectOption: (option: DamagedVeteranOption | null) => void;
    onOpenHardExperienceModal: () => void;
}

const options: { id: DamagedVeteranOption; title: string; description: string; }[] = [
    { id: 'Extreme Violence', title: 'Extreme Violence', description: '+10% Occult, SAN -5, CHA -3. Adapted to violence.' },
    { id: 'Captivity or Imprisonment', title: 'Captivity', description: '+10% Occult, SAN -5, POW -3. Adapted to helplessness.' },
    { id: 'Hard Experience', title: 'Hard Experience', description: '+10% Occult, +10% to five other skills. SAN -5, Remove one Bond.' },
    { id: 'Things Man Was Not Meant to Know', title: 'Forbidden Knowledge', description: '+10% Unnatural, +20% Occult. SAN -POW. Gain a new disorder. Reset Breaking Point.' }
];

const AdaptedInfoPanel: React.FC<{ type: 'Violence' | 'Helplessness' }> = ({ type }) => {
    const isViolence = type === 'Violence';
    const title = `ADAPTED TO ${type.toUpperCase()}`;
    const text = isViolence
        ? "You no longer lose SAN from acts of violence. Responding to violence with violence costs 0 SAN."
        : "You no longer lose SAN from being captured, restrained, or helpless against your will.";

    const colors = isViolence ? {
        bg: 'bg-red-900/80',
        border: 'border-red-500',
        titleText: 'text-red-300',
        bodyText: 'text-red-200',
    } : { // Helplessness -> Orange
        bg: 'bg-orange-900/80',
        border: 'border-orange-500',
        titleText: 'text-orange-300',
        bodyText: 'text-orange-200',
    };

    return (
        <div className={`p-4 mt-4 ${colors.bg} border-4 ${colors.border} rounded-lg text-center`}>
            <h4 className={`text-2xl font-black uppercase ${colors.titleText}`}>{title}</h4>
            <p className={`mt-2 ${colors.bodyText}`}>{text}</p>
        </div>
    );
};

const DisorderInfoPanel: React.FC = () => {
    const { assignedDisorder } = useCharacterContext();
    if (!assignedDisorder) return null;

    const colors = {
        bg: 'bg-purple-900/80',
        border: 'border-purple-500',
        titleText: 'text-purple-300',
        bodyText: 'text-purple-200',
    };

    return (
        <div className={`p-4 mt-4 ${colors.bg} border-4 ${colors.border} rounded-lg text-center`}>
            <h4 className={`text-2xl font-black uppercase ${colors.titleText}`}>{assignedDisorder.name}</h4>
            <p className={`mt-2 ${colors.bodyText}`}>{assignedDisorder.description}</p>
        </div>
    );
};

export const DamagedVeteranOptions: React.FC<DamagedVeteranOptionsProps> = ({ selectedOption, onSelectOption, onOpenHardExperienceModal }) => {
    const { adaptedToViolence, adaptedToHelplessness, assignedDisorder, bonds, setToastMessage } = useCharacterContext();

    const handleSelect = (optionId: DamagedVeteranOption) => {
        const isTogglingOn = selectedOption !== optionId;

        if (optionId === 'Hard Experience' && isTogglingOn && bonds.length === 0) {
            setToastMessage("You must create at least one Bond to select 'Hard Experience'.", 'warning');
            return;
        }

        const newSelection = selectedOption === optionId ? null : optionId;
        onSelectOption(newSelection);
        if (newSelection === 'Hard Experience') {
            onOpenHardExperienceModal();
        }
    };
    
    return (
        <div className="space-y-2">
            <p className="text-sm text-gray-400 mb-2">Optionally, select a past trauma that brought your agent to Delta Green's attention. This is for experienced agents only.</p>
            {options.map(opt => (
                <button
                    key={opt.id}
                    onClick={() => handleSelect(opt.id)}
                    className={`w-full text-left p-3 rounded-md border-2 transition-all duration-200 ${
                        selectedOption === opt.id
                            ? 'bg-green-500/20 border-green-400 ring-2 ring-green-400/50'
                            : 'bg-gray-800/50 border-gray-600 hover:border-green-500'
                    }`}
                >
                    <h4 className="font-bold text-green-300">{opt.title}</h4>
                    <p className="text-xs text-gray-400 mt-1">{opt.description}</p>
                </button>
            ))}

            {selectedOption && (
                <button
                    onClick={() => onSelectOption(null)}
                    className="w-full flex items-center justify-center gap-2 text-center mt-2 py-2 px-3 rounded-md bg-gray-700 hover:bg-red-800/80 text-gray-300 hover:text-white font-semibold border border-gray-600 hover:border-red-700/50 transition-colors text-sm"
                >
                    <i className="fa-solid fa-times"></i>
                    Clear Damaged Veteran Option
                </button>
            )}

            {adaptedToViolence && <AdaptedInfoPanel type="Violence" />}
            {adaptedToHelplessness && <AdaptedInfoPanel type="Helplessness" />}
            {assignedDisorder && <DisorderInfoPanel />}
        </div>
    );
};
