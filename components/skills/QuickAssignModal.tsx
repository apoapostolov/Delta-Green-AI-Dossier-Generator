import React, { useState } from 'react';
import type { SkillPackage } from '../../types';
import { SkillPackageCard } from './SkillPackageCard';

interface QuickAssignModalProps {
  packages: SkillPackage[];
  onClose: () => void;
  onConfirm: (pkg: SkillPackage) => void;
}

export const QuickAssignModal: React.FC<QuickAssignModalProps> = ({ packages, onClose, onConfirm }) => {
    const [selectedPackage, setSelectedPackage] = useState<SkillPackage | null>(null);

    const handleConfirm = () => {
        if (selectedPackage) {
            onConfirm(selectedPackage);
        }
    };

    return (
        <div
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
            onClick={onClose}
            role="dialog"
            aria-modal="true"
            aria-labelledby="quick-assign-title"
        >
            <div
                className="bg-gray-800 border-2 border-sky-500/50 rounded-lg shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col"
                onClick={(e) => e.stopPropagation()}
            >
                <header className="flex items-center justify-between p-4 border-b border-gray-700">
                    <h2 id="quick-assign-title" className="text-2xl font-bold text-sky-400">Quick Assign Skill Package</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-white transition-colors rounded-full p-1 focus:outline-none focus:ring-2 focus:ring-sky-400"
                        aria-label="Close modal"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </header>

                <div className="p-6 overflow-y-auto">
                    <p className="text-gray-400 mb-6">Choose a background package to quickly assign bonus skill assignments. This will reset any assignments you've already made. Any remaining assignments can be made manually.</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {packages.map(pkg => (
                            <SkillPackageCard
                                key={pkg.name}
                                pkg={pkg}
                                isSelected={selectedPackage?.name === pkg.name}
                                onSelect={() => setSelectedPackage(pkg)}
                            />
                        ))}
                    </div>
                </div>

                <footer className="p-4 bg-gray-900/50 border-t border-gray-700 flex justify-end gap-4 mt-auto">
                    <button onClick={onClose} className="bg-gray-600 hover:bg-gray-500 text-white font-bold py-2 px-6 rounded-lg transition-colors">Cancel</button>
                    <button
                        onClick={handleConfirm}
                        disabled={!selectedPackage}
                        className="bg-sky-700 hover:bg-sky-600 text-white font-bold py-2 px-6 rounded-lg transition-colors disabled:bg-gray-500 disabled:cursor-not-allowed"
                    >
                        Confirm Selection
                    </button>
                </footer>
            </div>
        </div>
    );
};