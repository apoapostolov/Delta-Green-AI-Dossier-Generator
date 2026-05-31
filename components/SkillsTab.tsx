import React, { useState, useMemo, useCallback } from 'react';
import type { Profession, Skill as SkillType, Department, SkillValue, SkillPackage } from '../../types';
import type { SimResult } from '../../sim/types';
import { useCharacterContext } from '../context/CharacterContext';
import { SkillsHeader } from './skills/SkillsHeader';
import { ChoiceSkillsSelector } from './skills/ChoiceSkillsSelector';
import { SkillRow } from './skills/SkillRow';
import { SKILL_GROUPS } from './skills/skill-utils';
import { QuickAssignModal } from './skills/QuickAssignModal';
import { SKILL_PACKAGES } from '../data/skill-packages-data';
import { SpecialTrainingsManager } from './skills/SpecialTrainingsManager';
import { AiDistributionModal } from './skills/AiDistributionModal';

interface SkillsTabProps {
    selectedProfession: Profession | null;
    selectedDepartment: Department | null;
    skills: Record<string, number>;
    skillsWithBonuses: Record<string, number>;
    allSkills: SkillType[];
    onBonusSkillAdd: (skillName: string) => void;
    onBonusSkillRemove: (skillName: string) => void;
    onBonusSkillsReset: () => void;
    careerSkillGains: Record<string, number>;
    simResult: SimResult | null;
    availableAdvancements: number;
    bonusSkillAdvancementsSpent: Record<string, number>;
    selectedChoiceSkills: Record<number, SkillValue[]>;
    onChoiceSkillToggle: (groupIndex: number, skill: SkillValue) => void;
    userCreatedSkills: string[];
    handleAddSpecialization: (displayName: string, specializationBase: string, subType: string, valueToInherit: number) => void;
    handleDeleteSpecialization: (skillName: string) => void;
    aggregatedData: { SKILL_SPECIALIZATIONS: Record<string, string[]>, SPECIAL_TRAININGS: any[] };
    selectedSpecialTrainings: Set<string>;
    handleToggleSpecialTraining: (trainingName: string) => void;
}

export const SkillsTab: React.FC<SkillsTabProps> = (props) => {
    const { selectedProfession, selectedDepartment, skills, selectedChoiceSkills, userCreatedSkills, aggregatedData, allSkills } = props;
    const {
        handleSetSkillPackage,
        veteranChanges,
        damagedVeteranOption,
        attributes,
        pendingAiDistribution,
        handleAiSkillDistribution,
        applyPendingAiDistribution,
        clearPendingAiDistribution,
        isAiDistributionRunning,
    } = useCharacterContext();
    const [groupSkills, setGroupSkills] = useState(false);
    const [isQuickAssignModalOpen, setIsQuickAssignModalOpen] = useState(false);
    const [isAiDistributionModalOpen, setIsAiDistributionModalOpen] = useState(false);
    const [aiDistributionDescription, setAiDistributionDescription] = useState('');

    const isProfessional = useCallback((skillName: string): boolean => {
        if (!selectedProfession) return false;
        let baseName = skillName;
        const match = skillName.match(/(.*) \((.*)\)/);
        if (match) {
            const skillDef = allSkills.find(s => s.stub === match[1]);
            baseName = skillDef ? skillDef.name : match[1];
        }

        const profSkill = selectedProfession.professionalSkills.find(s => s.name === baseName);
        // FIX: Explicitly type 's' as SkillValue to prevent TypeScript from inferring it as 'unknown' in some compilation environments.
        const choiceSkill = Object.values(selectedChoiceSkills).flat().find((s: SkillValue) => s.name === baseName);
        return !!profSkill || !!choiceSkill;
    }, [selectedProfession, selectedChoiceSkills, allSkills]);

    const allSortedSkills = useMemo(() => Object.keys(skills).sort((a,b) => a.localeCompare(b)), [skills]);

    const handleConfirmQuickAssign = (pkg: SkillPackage) => {
        handleSetSkillPackage(pkg);
        setIsQuickAssignModalOpen(false);
    };

    const renderSkillRow = (skillName: string) => {
        const value = props.skills[skillName];
        if (value === undefined) return null;
        
        let baseName = skillName;
        const specializationMatch = skillName.match(/(.*) \((.*)\)/);
        if (specializationMatch) {
            baseName = specializationMatch[1];
        }
        
        const baseSkillDef = allSkills.find(s => s.name === baseName || s.stub === baseName);
        if (!baseSkillDef) return null;

        const isSpecializable = baseSkillDef.specialty === true;
        const isGeneric = !specializationMatch;
        const canSpecialize = isSpecializable && isGeneric && value > 0;
        
        const specializationKey = baseSkillDef.stub || baseName;

        const existingSubTypes = userCreatedSkills
            .filter(s => s.startsWith(`${specializationKey} (`))
            .map(s => s.substring(s.indexOf('(') + 1, s.length - 1));
            
        const availableSubTypes = (aggregatedData.SKILL_SPECIALIZATIONS[specializationKey] || [])
            .filter(sub => !existingSubTypes.includes(sub));
            
        const creationValue = props.skillsWithBonuses[skillName] ?? 0;
        
        const veteranGain = veteranChanges.skills[skillName] || 0;
        const totalGain = (props.careerSkillGains[skillName] || 0) + veteranGain;
        const veteranEvents = veteranGain ? `Background (${damagedVeteranOption}): +${veteranGain}%` : null;

        return (
            <SkillRow
                key={skillName}
                skillName={skillName}
                value={value}
                creationValue={creationValue}
                baseSkill={allSkills.find(s => s.name === skillName)}
                isProfessional={isProfessional(skillName)}
                isSuggested={selectedDepartment?.suggested_bonus_skills.includes(skillName) || false}
                onBonusSkillAdd={props.onBonusSkillAdd}
                onBonusSkillRemove={props.onBonusSkillRemove}
                canIncrement={props.availableAdvancements > 0 && creationValue < 80}
                totalGain={totalGain}
                simResult={props.simResult}
                veteranGainInfo={veteranEvents}
                advancements={props.bonusSkillAdvancementsSpent[skillName] || 0}
                allSkills={props.allSkills}
                canSpecialize={canSpecialize}
                availableSubTypes={availableSubTypes}
                onAddSpecialization={props.handleAddSpecialization}
                onDeleteSpecialization={props.handleDeleteSpecialization}
                baseName={baseName}
                isGeneric={isGeneric}
            />
        );
    };

    return (
        <div className="space-y-6 max-w-4xl mx-auto bg-gray-800/50 p-6 rounded-lg border-2 border-gray-700/50">
            {isQuickAssignModalOpen && (
                <QuickAssignModal
                    packages={SKILL_PACKAGES}
                    onClose={() => setIsQuickAssignModalOpen(false)}
                    onConfirm={handleConfirmQuickAssign}
                />
            )}
            <AiDistributionModal
                open={isAiDistributionModalOpen}
                occupationName={selectedProfession?.name || 'Agent'}
                description={aiDistributionDescription}
                onDescriptionChange={setAiDistributionDescription}
                onClose={() => {
                    setIsAiDistributionModalOpen(false);
                    clearPendingAiDistribution();
                }}
                onSubmit={handleAiSkillDistribution}
                onRetry={handleAiSkillDistribution}
                onApply={() => {
                    applyPendingAiDistribution();
                    setIsAiDistributionModalOpen(false);
                }}
                review={pendingAiDistribution}
            />
            <SkillsHeader 
                onBonusSkillsReset={props.onBonusSkillsReset}
                groupSkills={groupSkills}
                onGroupToggle={() => setGroupSkills(prev => !prev)}
                onOpenAiDistribution={() => setIsAiDistributionModalOpen(true)}
                disableAiDistribution={!selectedProfession || props.availableAdvancements <= 0 || isAiDistributionRunning}
            />

            {!selectedProfession ? (
                <p className="text-center text-lg text-gray-500 py-8">Please select a profession on the 'Attributes' tab first.</p>
            ) : (
                <>
                <ChoiceSkillsSelector profession={selectedProfession} selectedChoices={props.selectedChoiceSkills} onToggle={props.onChoiceSkillToggle} allSkills={allSkills} />
                
                {selectedDepartment && (
                    <div className="p-3 bg-gray-900/50 rounded-md border border-teal-700/50">
                        <h3 className="text-lg font-bold text-teal-300">Department Briefing: {selectedDepartment.name}</h3>
                        <p className="text-sm text-gray-400 mt-1">
                            This department suggests focusing on the skills highlighted in teal: {selectedDepartment.suggested_bonus_skills.join(', ')}.
                        </p>
                    </div>
                )}
                
                <div className="flex justify-between items-center flex-wrap gap-2">
                    <p className="text-gray-400">
                        Assign {selectedProfession?.bonusSkillAdvancements || 8} bonus advancements (+20% each). You have <span className="font-bold text-green-300">{props.availableAdvancements}</span> remaining.
                    </p>
                    <button 
                        onClick={() => setIsQuickAssignModalOpen(true)} 
                        className="bg-sky-700 hover:bg-sky-600 text-white font-bold py-2 px-4 rounded-lg text-sm transition-colors"
                    >
                        Quick Assign
                    </button>
                </div>

                {groupSkills ? (
                    <div className="space-y-6">
                        {SKILL_GROUPS.map(group => {
                            const groupSkillNames = new Set(group.skills);
                            const skillsInGroup = allSortedSkills.filter(skillName => {
                                let baseName = skillName;
                                const match = skillName.match(/(.*) \((.*)\)/);
                                if (match) {
                                    const skillDef = allSkills.find(s => s.stub === match[1]);
                                    baseName = skillDef ? skillDef.name : match[1];
                                }
                                return groupSkillNames.has(baseName);
                            });
                            
                            if (skillsInGroup.length === 0) return null;

                            return (
                                <div key={group.name}>
                                    <h3 className="text-xl font-bold text-green-300 mb-3 border-b-2 border-green-800/50 pb-1">{group.name}</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3">
                                        {skillsInGroup.map(renderSkillRow)}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3">
                         {allSortedSkills.map(renderSkillRow)}
                    </div>
                )}
                <SpecialTrainingsManager
                    allTrainings={aggregatedData.SPECIAL_TRAININGS}
                    selectedTrainings={props.selectedSpecialTrainings}
                    onToggle={props.handleToggleSpecialTraining}
                    attributes={attributes}
                    skills={props.skills}
                    professionTrainings={new Set(selectedProfession?.specialTrainings || [])}
                    departmentTrainings={new Set(selectedDepartment?.specialTrainings || [])}
                />
                </>
            )}
        </div>
    );
};
