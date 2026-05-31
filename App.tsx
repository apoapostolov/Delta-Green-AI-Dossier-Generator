import React, { useState, useEffect, useCallback } from 'react';
import { SourceProvider, useSourceContext } from './context/SourceContext';
import { CharacterProvider } from './context/CharacterContext';
import { SheetProvider } from './context/SheetContext';
import { AiSettingsProvider } from './context/AiSettingsContext';
import { useUIState } from './hooks/useUIState';
import { useCharacter } from './hooks/useCharacter';
import { useAggregatedData } from './hooks/useAggregatedData';
import { usePdfPrinting } from './hooks/usePdfPrinting';
import { Toast } from './components/Toast';
import { DossierTab } from './components/DossierTab';
import { GearTab } from './components/GearTab';
import { StatsTab } from './components/StatsTab';
import { SkillsTab } from './components/SkillsTab';
import { PromptInfoModal } from './components/PromptInfoModal';
import { SourcesModal } from './components/SourcesModal';
import { SettingsModal } from './components/SettingsModal';
import { ProfessionInfoModal } from './components/ProfessionInfoModal';
import { DepartmentInfoModal } from './components/DepartmentInfoModal';
import Logo from './components/icons/Logo';
import { PrintIcon } from './components/icons/PrintIcon';
import { GearIcon } from './components/icons/GearIcon';
import { TabButton } from './components/TabButton';
import type { Profession, AttributeSet, Department } from './types';
import { AlphonseAxioms } from './components/AlphonseAxioms';
import { SaveSlotDrawer } from './components/SaveSlotDrawer';

const AppContent: React.FC = () => {
    const { selectedSources } = useSourceContext();
    const aggregatedData = useAggregatedData(selectedSources);
    const uiState = useUIState();
    const character = useCharacter(uiState.setToastMessage, aggregatedData);
    const { printSheet, isPrinting } = usePdfPrinting(aggregatedData, uiState.setToastMessage);
    const [viewingProfession, setViewingProfession] = useState<Profession | null>(null);
    const [viewingDepartment, setViewingDepartment] = useState<Department | null>(null);
    
    // FIX: Destructured `dob` and `setDob` from the `ai` object, not directly from `character`.
    const { handleRoll, attributes, derivedStats, setProfession, selectedProfession, selectDepartmentOrSpecialProfession, selectedDepartment, skills, skillsWithBonuses, availableAdvancements, bonusSkillAdvancementsSpent, handleBonusSkillAdd, handleBonusSkillRemove, handleBonusSkillsReset, selectedChoiceSkills, handleChoiceSkillToggle, rollHistory, handleRestoreRoll, ai, careerAttributeChanges, careerSkillGains, isDeceased, careerApplied, userCreatedSkills, handleAddSpecialization, handleDeleteSpecialization, kitInventory, inventory, isUnderReview, terminalConsequence, handleDrop, handleDeleteItem, handleAcquisitionRoll, selectedSpecialTrainings, handleToggleSpecialTraining } = character;
    const [shouldPrintButtonGlow, setShouldPrintButtonGlow] = useState(false);

    useEffect(() => {
        const newCompleted = new Set(uiState.completedTabs);
        let updated = false;

        // Tab 1: Stats is complete when a profession is selected. If that profession has departments, a department must also be selected.
        if (selectedProfession && !uiState.completedTabs.has('stats')) {
            const professionHasDepartments = aggregatedData.DEPARTMENTS.some(d => d.professions.includes(selectedProfession.name));
            if (!professionHasDepartments || (professionHasDepartments && selectedDepartment) || selectedProfession.isDepartment) {
                newCompleted.add('stats');
                updated = true;
            }
        }

        // Tab 2: Skills is complete when all points are spent
        if (selectedProfession && availableAdvancements <= 0 && !uiState.completedTabs.has('skills')) {
            newCompleted.add('skills');
            updated = true;
        }

        // Tab 4: Dossier is complete when a portrait is generated
        if (ai.portrait && !uiState.completedTabs.has('dossier')) {
            newCompleted.add('dossier');
            setShouldPrintButtonGlow(true);
            updated = true;
        }

        if (updated) {
            uiState.setCompletedTabs(newCompleted);
        }
    }, [selectedProfession, selectedDepartment, availableAdvancements, ai.portrait, uiState.completedTabs, uiState.setCompletedTabs, aggregatedData.DEPARTMENTS]);

    const handleRollWrapper = useCallback(() => {
        handleRoll();
        uiState.setCompletedTabs(new Set());
        setShouldPrintButtonGlow(false);
    }, [handleRoll, uiState]);

    const handleRestoreRollWrapper = useCallback((roll: AttributeSet) => {
        handleRestoreRoll(roll);
        uiState.setCompletedTabs(new Set());
        setShouldPrintButtonGlow(false);
    }, [handleRestoreRoll, uiState]);

    const handlePrint = () => {
        if (!selectedProfession || !attributes || !derivedStats) {
            uiState.setToastMessage("Cannot print: Character basics are not finalized.", "warning");
            return;
        }

        // Portrait priority: explicitly selected > headshot > full-body > none
        const selectedPortrait = ai.pdfPortraitSrc || ai.headshot || ai.portrait || null;
        const characterSheetData = {
            ...character,
            pdfPortrait: selectedPortrait,
        };
        
        printSheet(characterSheetData);
    };

    const isStatsTabComplete = uiState.completedTabs.has('stats');
    const isSkillsTabComplete = uiState.completedTabs.has('skills');
    const isGearTabComplete = uiState.completedTabs.has('gear');

    const shouldSkillsTabGlow = isStatsTabComplete && !isSkillsTabComplete && uiState.activeTab !== 'skills';
    const shouldGearTabGlow = isSkillsTabComplete && !isGearTabComplete && uiState.activeTab !== 'gear';
    
    return (
        <CharacterProvider character={character}>
            <div className="min-h-screen bg-gray-900 text-gray-200 font-sans p-4 sm:p-8 bg-cover bg-center" style={{backgroundImage: "url('https://www.transparenttextures.com/patterns/dark-matter.png')"}}>
                <Toast 
                    message={uiState.toast?.message ?? null} 
                    type={uiState.toast?.type ?? 'error'} 
                    onDismiss={() => uiState.setToastMessage(null)} 
                />
                {viewingProfession && <ProfessionInfoModal profession={viewingProfession} allDepartments={aggregatedData.DEPARTMENTS} onClose={() => setViewingProfession(null)} />}
                {viewingDepartment && <DepartmentInfoModal department={viewingDepartment} onClose={() => setViewingDepartment(null)} />}
                {uiState.isPromptModalVisible && <PromptInfoModal title="Full Portrait AI Prompt" prompt={ai.portraitPrompt || "Generate a portrait to see the full AI prompt here."} onClose={() => uiState.setIsPromptModalVisible(false)} />}
                {uiState.isBackstoryPromptModalVisible && <PromptInfoModal title="The Career Dossier™ AI Prompt" prompt={ai.dossierPrompt || "Simulate a career and generate a dossier to see the full AI prompt here."} onClose={() => uiState.setIsBackstoryPromptModalVisible(false)} />}
                {uiState.isSourcesModalVisible && <SourcesModal onClose={() => uiState.setIsSourcesModalVisible(false)} />}
                {uiState.isSettingsModalVisible && <SettingsModal onClose={() => uiState.setIsSettingsModalVisible(false)} />}
                
                <div className="max-w-7xl mx-auto">
                    <header className="text-center mb-4"><Logo className="w-full max-w-md mx-auto h-auto px-4" /></header>
                    <div className="mb-8 flex justify-center items-center gap-4">
                        <button onClick={() => uiState.setIsSourcesModalVisible(true)} className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-4 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300 ease-in-out flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-blue-500" aria-label="Select Content Sources">
                            <i className="fa-solid fa-book-journal-whills h-5 w-5"></i>
                            <span className="hidden sm:inline ml-2">SOURCES</span>
                        </button>
                        <nav className="flex justify-center space-x-1" aria-label="Tabs">
                            <TabButton isActive={uiState.activeTab === 'stats'} isCompleted={uiState.completedTabs.has('stats')} onClick={() => uiState.setActiveTab('stats')} isDisabled={false}><span className="sm:hidden">1</span><span className="hidden sm:inline">1. Attributes</span></TabButton>
                            <TabButton isActive={uiState.activeTab === 'skills'} isCompleted={uiState.completedTabs.has('skills')} onClick={() => uiState.setActiveTab('skills')} shouldGlow={shouldSkillsTabGlow} isDisabled={isDeceased}><span className="sm:hidden">2</span><span className="hidden sm:inline">2. Skills</span></TabButton>
                            <TabButton isActive={uiState.activeTab === 'gear'} isCompleted={uiState.completedTabs.has('gear')} onClick={() => uiState.setActiveTab('gear')} shouldGlow={shouldGearTabGlow} isDisabled={isDeceased}><span className="sm:hidden">3</span><span className="hidden sm:inline">3. Gear</span></TabButton>
                            <TabButton isActive={uiState.activeTab === 'dossier'} isCompleted={uiState.completedTabs.has('dossier')} onClick={() => uiState.setActiveTab('dossier')} isDisabled={isDeceased}><span className="sm:hidden">4</span><span className="hidden sm:inline">4. Dossier</span></TabButton>
                        </nav>
                        <button onClick={handlePrint} disabled={isDeceased || isPrinting} className={`bg-sky-700 hover:bg-sky-600 disabled:bg-gray-700 disabled:cursor-not-allowed text-white font-bold py-3 px-4 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300 ease-in-out flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-sky-400 ${shouldPrintButtonGlow ? 'animate-pulse-glow' : ''}`}>
                           <PrintIcon className="h-5 w-5" />
                           <span className="hidden sm:inline ml-2">{isPrinting ? 'Printing...' : 'PRINT'}</span>
                        </button>
                        <button 
                            onClick={() => uiState.setIsSettingsModalVisible(true)} 
                            className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-4 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300 ease-in-out flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-blue-500" 
                            aria-label="Configure Settings">
                            <GearIcon className="h-5 w-5" />
                        </button>
                    </div>

                    <main id="main-content">
                        {uiState.activeTab === 'stats' && (
                            <StatsTab 
                                handleRoll={handleRollWrapper}
                                attributes={attributes}
                                derivedStats={derivedStats}
                                professions={aggregatedData.PROFESSIONS}
                                selectedProfession={selectedProfession}
                                onSelectProfession={setProfession}
                                onShowProfessionInfo={setViewingProfession}
                                departments={aggregatedData.DEPARTMENTS}
                                selectedDepartment={selectedDepartment}
                                onSelectDepartment={selectDepartmentOrSpecialProfession}
                                onShowDepartmentInfo={setViewingDepartment}
                                rollHistory={rollHistory}
                                onRestoreRoll={handleRestoreRollWrapper}
                                careerAttributeChanges={careerAttributeChanges}
                                simResult={ai.simResult}
                                careerApplied={careerApplied}
                                setActiveTab={uiState.setActiveTab}
                            />
                        )}
                        {uiState.activeTab === 'skills' && (
                           <SkillsTab
                                selectedProfession={selectedProfession}
                                selectedDepartment={selectedDepartment}
                                skills={skills}
                                skillsWithBonuses={skillsWithBonuses}
                                allSkills={aggregatedData.SKILLS}
                                careerSkillGains={careerSkillGains}
                                simResult={ai.simResult}
                                availableAdvancements={availableAdvancements}
                                bonusSkillAdvancementsSpent={bonusSkillAdvancementsSpent}
                                onBonusSkillAdd={handleBonusSkillAdd}
                                onBonusSkillRemove={handleBonusSkillRemove}
                                onBonusSkillsReset={handleBonusSkillsReset}
                                selectedChoiceSkills={selectedChoiceSkills}
                                onChoiceSkillToggle={handleChoiceSkillToggle}
                                userCreatedSkills={userCreatedSkills}
                                handleAddSpecialization={handleAddSpecialization}
                                handleDeleteSpecialization={handleDeleteSpecialization}
                                aggregatedData={aggregatedData}
                                selectedSpecialTrainings={selectedSpecialTrainings}
                                handleToggleSpecialTraining={handleToggleSpecialTraining}
                           />
                        )}
                        {uiState.activeTab === 'gear' && <GearTab 
                            kitInventory={kitInventory}
                            inventory={inventory}
                            ownedItems={character.ownedItems}
                            isUnderReview={isUnderReview}
                            terminalConsequence={terminalConsequence}
                            onDrop={handleDrop}
                            onDeleteItem={handleDeleteItem}
                            onAcquisitionRoll={handleAcquisitionRoll}
                        />}
                        {uiState.activeTab === 'dossier' && (
                            <DossierTab 
                                onShowPromptInfo={() => uiState.setIsPromptModalVisible(true)}
                                onShowBackstoryPromptInfo={() => uiState.setIsBackstoryPromptModalVisible(true)}
                                dob={ai.dob}
                                setDob={ai.setDob}
                                dobOverwrittenByCareer={ai.dobOverwrittenByCareer}
                            />
                        )}
                    </main>
                    <footer className="text-center mt-12 text-gray-600 text-sm">
                       <p>Delta Green AI-Powered Agent Creator. This is an unofficial fan project.</p>
                       <AlphonseAxioms />
                    </footer>
                    <SaveSlotDrawer />
                </div>
            </div>
        </CharacterProvider>
    );
};

const App: React.FC = () => (
    <SheetProvider>
        <AiSettingsProvider>
            <SourceProvider>
                <AppContent />
            </SourceProvider>
        </AiSettingsProvider>
    </SheetProvider>
);

export default App;
