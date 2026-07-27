import React, { createContext, useContext, useMemo } from 'react';
import type { useCharacter } from '../hooks/useCharacter';

/** Full character API (return type of useCharacter). */
export type CharacterApi = NonNullable<ReturnType<typeof useCharacter>>;

/** Stats, profession, department, career/veteran, rolls. */
export type CharacterIdentitySlice = Pick<
  CharacterApi,
  | 'aggregatedData'
  | 'attributes'
  | 'baseAttributes'
  | 'derivedStats'
  | 'selectedProfession'
  | 'setProfession'
  | 'selectedDepartment'
  | 'setDepartment'
  | 'selectDepartmentOrSpecialProfession'
  | 'handleRoll'
  | 'rollHistory'
  | 'handleRestoreRoll'
  | 'ai'
  | 'careerApplied'
  | 'careerAttributeChanges'
  | 'careerSkillGains'
  | 'applyCareerConsequences'
  | 'ignoreConsequences'
  | 'isDeceased'
  | 'damagedVeteranOption'
  | 'setDamagedVeteranOption'
  | 'hardExperienceSkills'
  | 'setHardExperienceSkills'
  | 'hardExperienceBondToRemove'
  | 'setHardExperienceBondToRemove'
  | 'veteranChanges'
  | 'adaptedToViolence'
  | 'adaptedToHelplessness'
  | 'assignedDisorder'
  | 'setToastMessage'
>;

/** Skill packages, bonus advances, specializations, AI distribution. */
export type CharacterSkillsSlice = Pick<
  CharacterApi,
  | 'skills'
  | 'skillsWithBonuses'
  | 'baseSkills'
  | 'handleBonusSkillAdd'
  | 'handleBonusSkillRemove'
  | 'handleBonusSkillsReset'
  | 'handleSetSkillPackage'
  | 'availableAdvancements'
  | 'bonusSkillAdvancementsSpent'
  | 'selectedChoiceSkills'
  | 'handleChoiceSkillToggle'
  | 'userCreatedSkills'
  | 'handleAddSpecialization'
  | 'handleDeleteSpecialization'
  | 'selectedSpecialTrainings'
  | 'handleToggleSpecialTraining'
  | 'pendingAiDistribution'
  | 'isAiDistributionRunning'
  | 'handleAiSkillDistribution'
  | 'applyPendingAiDistribution'
  | 'clearPendingAiDistribution'
  | 'aggregatedData'
  | 'selectedProfession'
  | 'selectedDepartment'
  | 'ai'
  | 'setToastMessage'
  | 'attributes'
  | 'veteranChanges'
  | 'damagedVeteranOption'
>;

/** Kits, inventory, acquisition. */
export type CharacterGearSlice = Pick<
  CharacterApi,
  | 'kitInventory'
  | 'inventory'
  | 'ownedItems'
  | 'findFailedItems'
  | 'requisitionFailedItems'
  | 'fullyFailedItems'
  | 'isUnderReview'
  | 'terminalConsequence'
  | 'setEquipmentKit'
  | 'handleDrop'
  | 'handleDeleteItem'
  | 'handleAcquisitionRoll'
  | 'activeKitName'
  | 'attributes'
  | 'skills'
  | 'ai'
  | 'aggregatedData'
  | 'setToastMessage'
>;

/** Bonds, save/load, full AI surface for dossier. */
export type CharacterExtrasSlice = Pick<
  CharacterApi,
  | 'bonds'
  | 'handleCreateBond'
  | 'handleDeleteBond'
  | 'ai'
  | 'loadFromSaveData'
  | 'aggregatedData'
  | 'selectedProfession'
  | 'selectedDepartment'
  | 'damagedVeteranOption'
  | 'setDamagedVeteranOption'
  | 'assignedDisorder'
  | 'adaptedToViolence'
  | 'adaptedToHelplessness'
  | 'setToastMessage'
  | 'baseAttributes'
  | 'baseSkills'
  | 'applyCareerConsequences'
  | 'ignoreConsequences'
  | 'careerApplied'
>;

const CharacterFullContext = createContext<CharacterApi | null>(null);
const CharacterIdentityContext = createContext<CharacterIdentitySlice | null>(null);
const CharacterSkillsContext = createContext<CharacterSkillsSlice | null>(null);
const CharacterGearContext = createContext<CharacterGearSlice | null>(null);
const CharacterExtrasContext = createContext<CharacterExtrasSlice | null>(null);

/**
 * Provides sliced character state so skill edits do not re-render gear/dossier
 * consumers (and vice versa). Full API remains via useCharacterContext.
 */
export const CharacterProvider: React.FC<{
  character: CharacterApi;
  children: React.ReactNode;
}> = ({ character, children }) => {
  const identity = useMemo<CharacterIdentitySlice>(() => ({
    aggregatedData: character.aggregatedData,
    attributes: character.attributes,
    baseAttributes: character.baseAttributes,
    derivedStats: character.derivedStats,
    selectedProfession: character.selectedProfession,
    setProfession: character.setProfession,
    selectedDepartment: character.selectedDepartment,
    setDepartment: character.setDepartment,
    selectDepartmentOrSpecialProfession: character.selectDepartmentOrSpecialProfession,
    handleRoll: character.handleRoll,
    rollHistory: character.rollHistory,
    handleRestoreRoll: character.handleRestoreRoll,
    ai: character.ai,
    careerApplied: character.careerApplied,
    careerAttributeChanges: character.careerAttributeChanges,
    careerSkillGains: character.careerSkillGains,
    applyCareerConsequences: character.applyCareerConsequences,
    ignoreConsequences: character.ignoreConsequences,
    isDeceased: character.isDeceased,
    damagedVeteranOption: character.damagedVeteranOption,
    setDamagedVeteranOption: character.setDamagedVeteranOption,
    hardExperienceSkills: character.hardExperienceSkills,
    setHardExperienceSkills: character.setHardExperienceSkills,
    hardExperienceBondToRemove: character.hardExperienceBondToRemove,
    setHardExperienceBondToRemove: character.setHardExperienceBondToRemove,
    veteranChanges: character.veteranChanges,
    adaptedToViolence: character.adaptedToViolence,
    adaptedToHelplessness: character.adaptedToHelplessness,
    assignedDisorder: character.assignedDisorder,
    setToastMessage: character.setToastMessage,
  }), [
    character.aggregatedData,
    character.attributes,
    character.baseAttributes,
    character.derivedStats,
    character.selectedProfession,
    character.setProfession,
    character.selectedDepartment,
    character.setDepartment,
    character.selectDepartmentOrSpecialProfession,
    character.handleRoll,
    character.rollHistory,
    character.handleRestoreRoll,
    character.ai,
    character.careerApplied,
    character.careerAttributeChanges,
    character.careerSkillGains,
    character.applyCareerConsequences,
    character.ignoreConsequences,
    character.isDeceased,
    character.damagedVeteranOption,
    character.setDamagedVeteranOption,
    character.hardExperienceSkills,
    character.setHardExperienceSkills,
    character.hardExperienceBondToRemove,
    character.setHardExperienceBondToRemove,
    character.veteranChanges,
    character.adaptedToViolence,
    character.adaptedToHelplessness,
    character.assignedDisorder,
    character.setToastMessage,
  ]);

  const skills = useMemo<CharacterSkillsSlice>(() => ({
    skills: character.skills,
    skillsWithBonuses: character.skillsWithBonuses,
    baseSkills: character.baseSkills,
    handleBonusSkillAdd: character.handleBonusSkillAdd,
    handleBonusSkillRemove: character.handleBonusSkillRemove,
    handleBonusSkillsReset: character.handleBonusSkillsReset,
    handleSetSkillPackage: character.handleSetSkillPackage,
    availableAdvancements: character.availableAdvancements,
    bonusSkillAdvancementsSpent: character.bonusSkillAdvancementsSpent,
    selectedChoiceSkills: character.selectedChoiceSkills,
    handleChoiceSkillToggle: character.handleChoiceSkillToggle,
    userCreatedSkills: character.userCreatedSkills,
    handleAddSpecialization: character.handleAddSpecialization,
    handleDeleteSpecialization: character.handleDeleteSpecialization,
    selectedSpecialTrainings: character.selectedSpecialTrainings,
    handleToggleSpecialTraining: character.handleToggleSpecialTraining,
    pendingAiDistribution: character.pendingAiDistribution,
    isAiDistributionRunning: character.isAiDistributionRunning,
    handleAiSkillDistribution: character.handleAiSkillDistribution,
    applyPendingAiDistribution: character.applyPendingAiDistribution,
    clearPendingAiDistribution: character.clearPendingAiDistribution,
    aggregatedData: character.aggregatedData,
    selectedProfession: character.selectedProfession,
    selectedDepartment: character.selectedDepartment,
    ai: character.ai,
    setToastMessage: character.setToastMessage,
    attributes: character.attributes,
    veteranChanges: character.veteranChanges,
    damagedVeteranOption: character.damagedVeteranOption,
  }), [
    character.skills,
    character.skillsWithBonuses,
    character.baseSkills,
    character.handleBonusSkillAdd,
    character.handleBonusSkillRemove,
    character.handleBonusSkillsReset,
    character.handleSetSkillPackage,
    character.availableAdvancements,
    character.bonusSkillAdvancementsSpent,
    character.selectedChoiceSkills,
    character.handleChoiceSkillToggle,
    character.userCreatedSkills,
    character.handleAddSpecialization,
    character.handleDeleteSpecialization,
    character.selectedSpecialTrainings,
    character.handleToggleSpecialTraining,
    character.pendingAiDistribution,
    character.isAiDistributionRunning,
    character.handleAiSkillDistribution,
    character.applyPendingAiDistribution,
    character.clearPendingAiDistribution,
    character.aggregatedData,
    character.selectedProfession,
    character.selectedDepartment,
    character.ai,
    character.setToastMessage,
    character.attributes,
    character.veteranChanges,
    character.damagedVeteranOption,
  ]);

  const gear = useMemo<CharacterGearSlice>(() => ({
    kitInventory: character.kitInventory,
    inventory: character.inventory,
    ownedItems: character.ownedItems,
    findFailedItems: character.findFailedItems,
    requisitionFailedItems: character.requisitionFailedItems,
    fullyFailedItems: character.fullyFailedItems,
    isUnderReview: character.isUnderReview,
    terminalConsequence: character.terminalConsequence,
    setEquipmentKit: character.setEquipmentKit,
    handleDrop: character.handleDrop,
    handleDeleteItem: character.handleDeleteItem,
    handleAcquisitionRoll: character.handleAcquisitionRoll,
    activeKitName: character.activeKitName,
    attributes: character.attributes,
    skills: character.skills,
    ai: character.ai,
    aggregatedData: character.aggregatedData,
    setToastMessage: character.setToastMessage,
  }), [
    character.kitInventory,
    character.inventory,
    character.ownedItems,
    character.findFailedItems,
    character.requisitionFailedItems,
    character.fullyFailedItems,
    character.isUnderReview,
    character.terminalConsequence,
    character.setEquipmentKit,
    character.handleDrop,
    character.handleDeleteItem,
    character.handleAcquisitionRoll,
    character.activeKitName,
    character.attributes,
    character.skills,
    character.ai,
    character.aggregatedData,
    character.setToastMessage,
  ]);

  const extras = useMemo<CharacterExtrasSlice>(() => ({
    bonds: character.bonds,
    handleCreateBond: character.handleCreateBond,
    handleDeleteBond: character.handleDeleteBond,
    ai: character.ai,
    loadFromSaveData: character.loadFromSaveData,
    aggregatedData: character.aggregatedData,
    selectedProfession: character.selectedProfession,
    selectedDepartment: character.selectedDepartment,
    damagedVeteranOption: character.damagedVeteranOption,
    setDamagedVeteranOption: character.setDamagedVeteranOption,
    assignedDisorder: character.assignedDisorder,
    adaptedToViolence: character.adaptedToViolence,
    adaptedToHelplessness: character.adaptedToHelplessness,
    setToastMessage: character.setToastMessage,
    baseAttributes: character.baseAttributes,
    baseSkills: character.baseSkills,
    applyCareerConsequences: character.applyCareerConsequences,
    ignoreConsequences: character.ignoreConsequences,
    careerApplied: character.careerApplied,
  }), [
    character.bonds,
    character.handleCreateBond,
    character.handleDeleteBond,
    character.ai,
    character.loadFromSaveData,
    character.aggregatedData,
    character.selectedProfession,
    character.selectedDepartment,
    character.damagedVeteranOption,
    character.setDamagedVeteranOption,
    character.assignedDisorder,
    character.adaptedToViolence,
    character.adaptedToHelplessness,
    character.setToastMessage,
    character.baseAttributes,
    character.baseSkills,
    character.applyCareerConsequences,
    character.ignoreConsequences,
    character.careerApplied,
  ]);

  return (
    <CharacterFullContext.Provider value={character}>
      <CharacterIdentityContext.Provider value={identity}>
        <CharacterSkillsContext.Provider value={skills}>
          <CharacterGearContext.Provider value={gear}>
            <CharacterExtrasContext.Provider value={extras}>
              {children}
            </CharacterExtrasContext.Provider>
          </CharacterGearContext.Provider>
        </CharacterSkillsContext.Provider>
      </CharacterIdentityContext.Provider>
    </CharacterFullContext.Provider>
  );
};

export const useCharacterContext = () => {
  const context = useContext(CharacterFullContext);
  if (!context) {
    throw new Error('useCharacterContext must be used within a CharacterProvider');
  }
  return context;
};

export const useCharacterIdentity = () => {
  const ctx = useContext(CharacterIdentityContext);
  if (!ctx) throw new Error('useCharacterIdentity must be used within a CharacterProvider');
  return ctx;
};

export const useCharacterSkills = () => {
  const ctx = useContext(CharacterSkillsContext);
  if (!ctx) throw new Error('useCharacterSkills must be used within a CharacterProvider');
  return ctx;
};

export const useCharacterGear = () => {
  const ctx = useContext(CharacterGearContext);
  if (!ctx) throw new Error('useCharacterGear must be used within a CharacterProvider');
  return ctx;
};

export const useCharacterExtras = () => {
  const ctx = useContext(CharacterExtrasContext);
  if (!ctx) throw new Error('useCharacterExtras must be used within a CharacterProvider');
  return ctx;
};
