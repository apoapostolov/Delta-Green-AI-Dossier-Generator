import React, { useState, useMemo } from 'react';
import { useCharacterContext } from '../../context/CharacterContext';
import type { Bond } from '../../types';

interface HardExperienceModalProps {
  onClose: () => void;
}

export const HardExperienceModal: React.FC<HardExperienceModalProps> = ({ onClose }) => {
  const { 
    skills: currentSkills,
    setDamagedVeteranOption, 
    setHardExperienceSkills,
    bonds,
    setHardExperienceBondToRemove,
  } = useCharacterContext();

  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  
  const allSelectableSkills = useMemo(() => {
    return Object.keys(currentSkills)
      .filter(skill => skill !== 'Unnatural')
      .sort((a, b) => a.localeCompare(b));
  }, [currentSkills]);

  const handleSkillToggle = (skillName: string) => {
    setSelectedSkills(prev => {
      if (prev.includes(skillName)) {
        return prev.filter(s => s !== skillName);
      }
      if (prev.length < 5) {
        return [...prev, skillName];
      }
      return prev;
    });
  };

  const handleConfirm = () => {
    if (selectedSkills.length === 5) {
      setHardExperienceSkills(selectedSkills);
      if (bonds.length > 0) {
        const randomIndex = Math.floor(Math.random() * bonds.length);
        setHardExperienceBondToRemove(randomIndex);
      }
      setDamagedVeteranOption('Hard Experience');
      onClose();
    }
  };

  const isConfirmDisabled = selectedSkills.length !== 5;

  return (
    <div
      className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="hard-experience-title"
    >
      <div
        className="bg-gray-800 border-2 border-yellow-500/50 rounded-lg shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="flex items-center justify-between p-4 border-b border-gray-700">
          <h2 id="hard-experience-title" className="text-2xl font-bold text-yellow-400">Hard Experience</h2>
        </header>

        <div className="p-6 overflow-y-auto space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-200">Choose 5 skills to improve (+10%)</h3>
            <p className="text-sm text-gray-400 mb-2">Selected: {selectedSkills.length} of 5</p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 max-h-64 overflow-y-auto bg-gray-900/50 p-2 rounded-md">
              {allSelectableSkills.map(skill => {
                const isSelected = selectedSkills.includes(skill);
                return (
                  <button
                    key={skill}
                    onClick={() => handleSkillToggle(skill)}
                    className={`p-2 rounded-md border text-sm w-full transition-colors duration-200 ${
                        isSelected ? 'bg-yellow-500/20 border-yellow-400 text-yellow-300' : 'bg-gray-800/50 border-gray-600 text-gray-400 hover:border-yellow-500 hover:text-white'
                    }`}
                  >
                    {skill}
                  </button>
                );
              })}
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-200">Remove one Bond</h3>
            <p className="text-sm text-gray-400 italic mt-2">A random Bond will be terminated automatically if one exists. If no Bonds have been created, your maximum number of Bonds will be reduced by one.</p>
          </div>
        </div>

        <footer className="p-4 bg-gray-900/50 border-t border-gray-700 flex justify-end gap-4">
          <button onClick={() => { setDamagedVeteranOption(null); onClose(); }} className="bg-gray-600 hover:bg-gray-500 text-white font-bold py-2 px-6 rounded-lg">Cancel</button>
          <button 
            onClick={handleConfirm}
            disabled={isConfirmDisabled}
            className="bg-yellow-700 hover:bg-yellow-600 text-white font-bold py-2 px-6 rounded-lg disabled:bg-gray-500 disabled:cursor-not-allowed"
          >
            Confirm
          </button>
        </footer>
      </div>
    </div>
  );
};