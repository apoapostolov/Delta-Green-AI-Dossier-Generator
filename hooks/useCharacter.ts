// FIX: Import React to use types like React.DragEvent.
import React, { useState, useCallback, useMemo, useEffect, useRef } from 'react';
import type { Profession, AttributeSet, Attribute, Department, SkillValue, Bond, BondType, DGItem, DGItemExpense, SkillPackage, DamagedVeteranOption, Disorder, ToastType, CharacterSaveData } from '../types';
import type { AggregatedData } from './useAggregatedData';
import { useAIGeneration } from './useAIGeneration';
import type { SimResult } from '../sim/types';
// FIX: Import equipment data to calculate kit inventory.
import { EQUIPMENT_KITS } from '../data/equipment-kit-data';
import { ITEMS } from '../item-data';
import { useAiRuntime } from './useAiRuntime';
import {
    buildDgSkillDistributionPrompt,
    normalizeDgSkillDistributionReview,
    reconcileDgSkillDistributionReview,
    type DgSkillDistributionReview,
} from '../lib/ai/dg-skill-distribution';

export interface Character {
    // Delta Green specific character data
    profession: Profession | null;
    attributes: AttributeSet | null;
    // Add other DG fields like bonds, disorders, etc.
}

const roll3d6 = () => {
    return Math.floor(Math.random() * 6) + 1 + Math.floor(Math.random() * 6) + 1 + Math.floor(Math.random() * 6) + 1;
};

const getExpenseModifier = (expense: DGItemExpense) => {
    if (expense === 'Major') return -20;
    if (expense === 'Extreme') return -40;
    return 0;
};


export const useCharacter = (setToastMessage: (msg: string | null, type?: ToastType) => void, aggregatedData: AggregatedData) => {
    const isHydratingRef = useRef(false);
    const [baseAttributes, setBaseAttributes] = useState<AttributeSet | null>(null);
    const [selectedProfession, setSelectedProfession] = useState<Profession | null>(null);
    const [selectedDepartment, setSelectedDepartment] = useState<Department | null>(null);
    const [bonds, setBonds] = useState<Bond[]>([]);
    
    // New Skill System State
    const [selectedChoiceSkills, setSelectedChoiceSkills] = useState<Record<number, SkillValue[]>>({});
    const [bonusSkillAdvancementsSpent, setBonusSkillAdvancementsSpent] = useState<Record<string, number>>({});
    const [userCreatedSkills, setUserCreatedSkills] = useState<string[]>([]);
    const [consumedGenericSkills, setConsumedGenericSkills] = useState<Set<string>>(new Set());
    const [skillPackage, setSkillPackage] = useState<SkillPackage | null>(null);
    const [specializationInheritedValues, setSpecializationInheritedValues] = useState<Record<string, number>>({});
    
    const [rollHistory, setRollHistory] = useState<AttributeSet[]>([]);

    const [careerApplied, setCareerApplied] = useState(false);
    const [careerAttributeChanges, setCareerAttributeChanges] = useState<Record<string, number>>({});
    const [careerSkillGains, setCareerSkillGains] = useState<Record<string, number>>({});
    const [careerSanChange, setCareerSanChange] = useState(0);
    const [careerBondChange, setCareerBondChange] = useState(0);
    const [careerMaxHpChange, setCareerMaxHpChange] = useState(0);
    const [isDeceased, setIsDeceased] = useState(false);

    // Damaged Veteran State
    const [_damagedVeteranOption, _setDamagedVeteranOption] = useState<DamagedVeteranOption | null>(null);
    const [hardExperienceSkills, setHardExperienceSkills] = useState<string[]>([]);
    const [hardExperienceBondToRemove, setHardExperienceBondToRemove] = useState<number | null>(null);
    const [assignedDisorder, setAssignedDisorder] = useState<Disorder | null>(null);
    const [forbiddenKnowledgeDisorder, setForbiddenKnowledgeDisorder] = useState<Disorder | null>(null);

    // --- Inventory State (Lifted for persistence) ---
    const [inventory, setInventory] = useState<DGItem[]>([]);
    const [ownedItems, setOwnedItems] = useState<Set<string>>(new Set());
    const [findFailedItems, setFindFailedItems] = useState<Set<string>>(new Set());
    const [requisitionFailedItems, setRequisitionFailedItems] = useState<Set<string>>(new Set());
    const [isUnderReview, setIsUnderReview] = useState<boolean>(false);
    const [terminalConsequence, setTerminalConsequence] = useState<string | null>(null);
    const [activeKitName, setActiveKitName] = useState<string | null>(null);

    // Special Trainings State
    const [selectedSpecialTrainings, setSelectedSpecialTrainings] = useState<Set<string>>(new Set());
    const [pendingAiDistribution, setPendingAiDistribution] = useState<DgSkillDistributionReview | null>(null);
    const [isAiDistributionRunning, setIsAiDistributionRunning] = useState(false);
    const { generateText } = useAiRuntime();

    const fullyFailedItems = useMemo(() => {
        const failed = new Set<string>();
        const findFailedSet = new Set(findFailedItems);

        for (const itemName of requisitionFailedItems) {
            const item = ITEMS.find(i => i.name === itemName);
            // A non-restricted item is fully failed if both Find and Requisition fail.
            if (!item?.isRestricted && findFailedSet.has(itemName)) {
                failed.add(itemName);
            }
            // A restricted item is fully failed if its only option, Requisition, fails.
            if (item?.isRestricted) {
                failed.add(itemName);
            }
        }
        return failed;
    }, [findFailedItems, requisitionFailedItems]);

    // This effect will set the default special trainings when profession or department changes
    useEffect(() => {
        if (isHydratingRef.current) {
            isHydratingRef.current = false;
            return;
        }
        const professionTrainings = selectedProfession?.specialTrainings || [];
        const departmentTrainings = selectedDepartment?.specialTrainings || [];
        const defaultTrainings = new Set([...professionTrainings, ...departmentTrainings]);
        setSelectedSpecialTrainings(defaultTrainings);
    }, [selectedProfession, selectedDepartment]);

    const handleToggleSpecialTraining = useCallback((trainingName: string) => {
        const professionTrainings = new Set(selectedProfession?.specialTrainings || []);
        const departmentTrainings = new Set(selectedDepartment?.specialTrainings || []);

        // Prevent un-selecting trainings granted by profession/department
        if (professionTrainings.has(trainingName) || departmentTrainings.has(trainingName)) {
            setToastMessage("Cannot de-select training granted by your profession or department.", "warning");
            return;
        }

        setSelectedSpecialTrainings(prev => {
            const newSet = new Set(prev);
            if (newSet.has(trainingName)) {
                newSet.delete(trainingName);
            } else {
                newSet.add(trainingName);
            }
            return newSet;
        });
    }, [selectedProfession, selectedDepartment, setToastMessage]);
    
    const setDamagedVeteranOption = useCallback((option: DamagedVeteranOption | null) => {
        _setDamagedVeteranOption(option);

        if (option === 'Things Man Was Not Meant to Know') {
            if (forbiddenKnowledgeDisorder) {
                setAssignedDisorder(forbiddenKnowledgeDisorder);
            } else {
                const disorders = aggregatedData.DISORDERS;
                if (disorders.length > 0) {
                    const totalWeight = disorders.reduce((sum, d) => sum + d.weight, 0);
                    let random = Math.random() * totalWeight;
                    for (const disorder of disorders) {
                        if (random < disorder.weight) {
                            setForbiddenKnowledgeDisorder(disorder);
                            setAssignedDisorder(disorder);
                            break;
                        }
                        random -= disorder.weight;
                    }
                }
            }
        } else {
            setAssignedDisorder(null);
        }
    
        if (option !== 'Hard Experience') {
            setHardExperienceBondToRemove(null);
        }
    }, [aggregatedData.DISORDERS, forbiddenKnowledgeDisorder]);
    
    const damagedVeteranOption = _damagedVeteranOption;

    const kitInventory = useMemo(() => {
        if (!activeKitName) return [];
        const kit = EQUIPMENT_KITS.find(k => k.name === activeKitName);
        if (!kit) return [];
        const itemNamesInKit = new Set<string>(kit.items);
        return ITEMS.filter(item => itemNamesInKit.has(item.name));
    }, [activeKitName]);

    const veteranChanges = useMemo(() => {
        const changes = {
            attributes: {} as Record<string, number>,
            skills: {} as Record<string, number>,
            san: 0,
            bondScoreModifier: 0,
            bondCountModifier: 0,
            bondToRemove: null as number | null,
            bpReset: false,
        };

        if (!damagedVeteranOption) return changes;

        switch (damagedVeteranOption) {
            case 'Extreme Violence':
                changes.skills['Occult'] = (changes.skills['Occult'] || 0) + 10;
                changes.san = -5;
                changes.attributes['CHA'] = -3;
                break;
            case 'Captivity or Imprisonment':
                changes.skills['Occult'] = (changes.skills['Occult'] || 0) + 10;
                changes.san = -5;
                changes.attributes['POW'] = -3;
                break;
            case 'Hard Experience':
                changes.skills['Occult'] = (changes.skills['Occult'] || 0) + 10;
                hardExperienceSkills.forEach(skill => {
                    changes.skills[skill] = (changes.skills[skill] || 0) + 10;
                });
                changes.san = -5;
                if (bonds.length > 0 && hardExperienceBondToRemove !== null) {
                    changes.bondToRemove = hardExperienceBondToRemove;
                } else if (bonds.length === 0) {
                    changes.bondCountModifier = -1;
                }
                break;
            case 'Things Man Was Not Meant to Know':
                changes.skills['Unnatural'] = (changes.skills['Unnatural'] || 0) + 10;
                changes.skills['Occult'] = (changes.skills['Occult'] || 0) + 20;
                if (baseAttributes) {
                    changes.san = -baseAttributes.POW;
                }
                changes.bpReset = true;
                break;
        }
        return changes;
    }, [damagedVeteranOption, baseAttributes, hardExperienceSkills, hardExperienceBondToRemove, bonds.length]);
    
    const attributes = useMemo(() => {
        if (!baseAttributes) return null;
        const newAttrs = { ...baseAttributes };

        if (careerApplied) {
            for (const [attr, change] of Object.entries(careerAttributeChanges)) {
                newAttrs[attr as Attribute] = Math.max(1, (newAttrs[attr as Attribute] || 0) + Number(change));
            }
        }
        for (const [attr, change] of Object.entries(veteranChanges.attributes)) {
            newAttrs[attr as Attribute] = Math.max(1, (newAttrs[attr as Attribute] || 0) + change);
        }
        return newAttrs;
    }, [baseAttributes, careerAttributeChanges, careerApplied, veteranChanges]);
    
    const derivedStats = useMemo(() => {
        if (!attributes) return null;
        const powForSan = baseAttributes?.POW ?? attributes.POW;
        const baseSan = powForSan * 5;
        let finalSan = baseSan;

        if (careerApplied) {
            finalSan += careerSanChange;
        }
        finalSan += veteranChanges.san;

        const baseBonds = selectedProfession ? selectedProfession.bonds : 0;
        const finalBonds = (careerApplied ? baseBonds + careerBondChange : baseBonds) + veteranChanges.bondCountModifier;

        const finalHp = careerApplied 
            ? Math.floor((attributes.STR + attributes.CON) / 2) + careerMaxHpChange 
            : Math.floor((attributes.STR + attributes.CON) / 2);
        
        const powForBp = attributes.POW;

        return {
            SAN: finalSan,
            HP: Math.max(1, finalHp), // HP cannot be less than 1
            WP: attributes.POW,
            BP: veteranChanges.bpReset ? finalSan - powForBp : baseSan - powForBp,
            Bonds: Math.max(0, finalBonds), // Bonds cannot be less than 0
        };
    }, [attributes, baseAttributes, selectedProfession, careerApplied, careerSanChange, careerBondChange, careerMaxHpChange, veteranChanges]);
    
    // --- SKILL CALCULATION ---
    const allSkillNames = useMemo(() => {
        const baseNames = aggregatedData.SKILLS.map(s => s.name);
        return [...new Set([...baseNames, ...userCreatedSkills])];
    }, [aggregatedData.SKILLS, userCreatedSkills]);

    const baseSkills = useMemo(() => {
        const calculatedSkills: Record<string, number> = {};
        
        allSkillNames.forEach(skillName => {
            const baseSkillDef = aggregatedData.SKILLS.find(s => s.name === skillName);
            if (baseSkillDef) {
                calculatedSkills[skillName] = baseSkillDef.base;
            } else {
                // It's a user-created specialization. It inherits its value.
                calculatedSkills[skillName] = specializationInheritedValues[skillName] || 0;
            }
        });

        if (selectedProfession) {
            const applySkillValue = (skill: SkillValue) => {
                // If a generic skill is consumed, don't apply its professional value to it.
                // It has been transferred to a specialization.
                if (consumedGenericSkills.has(skill.name)) {
                    return;
                }
                calculatedSkills[skill.name] = Math.max(calculatedSkills[skill.name] ?? 0, skill.value);
            };
            
            selectedProfession.professionalSkills.forEach(applySkillValue);
            Object.values(selectedChoiceSkills).flat().forEach(applySkillValue);
        }

        // Set the value of a consumed generic skill to its base (which is 0 for specializable skills).
        consumedGenericSkills.forEach(consumedSkillName => {
            const skillDef = aggregatedData.SKILLS.find(s => s.name === consumedSkillName);
            calculatedSkills[consumedSkillName] = skillDef?.base ?? 0;
        });
        
        return calculatedSkills;
    }, [allSkillNames, aggregatedData.SKILLS, selectedProfession, selectedChoiceSkills, consumedGenericSkills, specializationInheritedValues]);

    const skillsWithBonuses = useMemo(() => {
        const newSkills: Record<string, number> = { ...baseSkills };
        for (const [skillName, advancements] of Object.entries(bonusSkillAdvancementsSpent)) {
            const baseVal = newSkills[skillName] ?? 0;
            newSkills[skillName] = Math.min(80, baseVal + (Number(advancements) * 20));
        }
        for (const [skillName, change] of Object.entries(veteranChanges.skills)) {
            const currentVal = newSkills[skillName] || (baseSkills[skillName] || 0);
            newSkills[skillName] = Math.min(90, currentVal + change);
        }
        return newSkills;
    }, [baseSkills, bonusSkillAdvancementsSpent, veteranChanges]);

    const skills = useMemo(() => {
        if (!careerApplied) return skillsWithBonuses;
        const newSkills: Record<string, number> = { ...skillsWithBonuses };
        for (const [skillName, gain] of Object.entries(careerSkillGains)) {
            newSkills[skillName] = (newSkills[skillName] || 0) + Number(gain);
        }
        return newSkills;
    }, [skillsWithBonuses, careerSkillGains, careerApplied]);

    const totalAdvancementsSpent = useMemo(() => Object.values(bonusSkillAdvancementsSpent).reduce((sum: number, count: number) => sum + Number(count), 0), [bonusSkillAdvancementsSpent]);
    const availableAdvancements = (selectedProfession?.bonusSkillAdvancements || 0) - totalAdvancementsSpent;
    
    // --- END SKILL CALCULATION ---

    const characterConcept = selectedProfession?.name || 'Agent';

    const ai = useAIGeneration(
        characterConcept,
        selectedProfession,
        selectedDepartment,
        attributes,
        setToastMessage,
        aggregatedData,
        baseSkills,
        skillPackage,
        damagedVeteranOption,
        assignedDisorder
    );

    useEffect(() => {
        if (ai.simResult?.isDeceased) {
            setIsDeceased(true);
        }
    }, [ai.simResult]);

    useEffect(() => {
        if (terminalConsequence === "Firing and/or prosecution") {
            setIsDeceased(true);
        }
    }, [terminalConsequence]);

    const fullResetCareer = useCallback(() => {
        setCareerApplied(false);
        setCareerAttributeChanges({});
        setCareerSkillGains({});
        setCareerSanChange(0);
        setCareerBondChange(0);
        setCareerMaxHpChange(0);
    }, []);

    const setEquipmentKit = useCallback((kitName: string | null, forceSet: boolean = false) => {
        const oldKitName = activeKitName;
        const newKitName = forceSet ? kitName : (oldKitName === kitName ? null : kitName);
    
        if (oldKitName === newKitName) return;
    
        const oldKit = oldKitName ? EQUIPMENT_KITS.find(k => k.name === oldKitName) : null;
        const newKit = newKitName ? EQUIPMENT_KITS.find(k => k.name === newKitName) : null;
    
        const oldKitItemNames = new Set(oldKit ? oldKit.items : []);
        const newKitItemNames = new Set(newKit ? newKit.items : []);
    
        setInventory(prevInventory => {
            const manuallyAddedItems = prevInventory.filter(item => !oldKitItemNames.has(item.name));
            const newKitItems = newKit ? ITEMS.filter(item => newKitItemNames.has(item.name)) : [];
            const combined = [...manuallyAddedItems];
            newKitItems.forEach(kitItem => {
                if (!combined.some(invItem => invItem.name === kitItem.name)) {
                    combined.push(kitItem);
                }
            });
            return combined;
        });
    
        setOwnedItems(prevOwned => {
            const newOwned = new Set(prevOwned);
            oldKitItemNames.forEach(name => newOwned.delete(name));
            newKitItemNames.forEach(name => newOwned.add(name));
            return newOwned;
        });
    
        setActiveKitName(newKitName);
    
        if (newKitName && newKitName !== oldKitName) {
            setToastMessage(`'${newKitName}' kit equipped.`, 'success');
        } else if (!newKitName && oldKitName) {
            setToastMessage(`'${oldKitName}' kit unequipped.`, 'success');
        }
    }, [activeKitName, setToastMessage]);

    const resetInventory = useCallback(() => {
        setInventory([]);
        setOwnedItems(new Set());
        setFindFailedItems(new Set());
        setRequisitionFailedItems(new Set());
        setIsUnderReview(false);
        setTerminalConsequence(null);
        setActiveKitName(null);
    }, []);
    
    const resetSkills = useCallback(() => {
        setSelectedChoiceSkills({});
        setBonusSkillAdvancementsSpent({});
        setUserCreatedSkills([]);
        setConsumedGenericSkills(new Set());
        setSkillPackage(null);
        setSelectedSpecialTrainings(new Set());
        setSpecializationInheritedValues({});
    }, []);

    const resetVeteranState = useCallback(() => {
        _setDamagedVeteranOption(null);
        setHardExperienceSkills([]);
        setHardExperienceBondToRemove(null);
        setAssignedDisorder(null);
        setForbiddenKnowledgeDisorder(null);
    }, []);

    const handleRoll = useCallback(() => {
        if (baseAttributes) setRollHistory(prev => [baseAttributes, ...prev].slice(0, 9));
        const newAttributes: AttributeSet = {
            STR: roll3d6(), CON: roll3d6(), DEX: roll3d6(),
            INT: roll3d6(), POW: roll3d6(), CHA: roll3d6(),
        };
        setBaseAttributes(newAttributes);
        setSelectedProfession(null);
        setSelectedDepartment(null);
        resetSkills();
        fullResetCareer();
        resetInventory();
        resetVeteranState();
        setIsDeceased(false);
        setBonds([]);
        ai.reset();
        ai.onGenerateRandomNationality();
    }, [ai, baseAttributes, fullResetCareer, resetSkills, resetInventory, resetVeteranState]);

    const handleRestoreRoll = useCallback((rollToRestore: AttributeSet) => {
        setBaseAttributes(rollToRestore);
        setSelectedProfession(null);
        setSelectedDepartment(null);
        resetSkills();
        fullResetCareer();
        resetInventory();
        resetVeteranState();
        setIsDeceased(false);
        setBonds([]);
        ai.reset();
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setToastMessage("Restored previous attribute roll.", 'success');
    }, [ai, setToastMessage, fullResetCareer, resetSkills, resetInventory, resetVeteranState]);

    const setProfession = useCallback((professionName: string) => {
        const profession = aggregatedData.PROFESSIONS.find(p => p.name === professionName) || null;
        
        setSelectedProfession(profession);
        setSelectedDepartment(null);
        resetSkills();
        fullResetCareer();
        resetInventory();
        resetVeteranState();
        setBonds([]);
        ai.reset();
    
        const kitNameToSet = (profession?.equipmentKit && profession.equipmentKit.length > 0) ? profession.equipmentKit[0] : null;
        setEquipmentKit(kitNameToSet, true); // Force set the kit
    
    }, [aggregatedData.PROFESSIONS, fullResetCareer, ai, resetSkills, resetInventory, resetVeteranState, setEquipmentKit]);
    
    const setDepartment = useCallback((departmentStub: string) => {
        const department = aggregatedData.DEPARTMENTS.find(d => d.stub === departmentStub) || null;
        setSelectedDepartment(department);
    
        let kitNameToSet: string | null = null;
        // Department kit takes precedence
        if (department?.equipmentKit && department.equipmentKit.length > 0) {
            kitNameToSet = department.equipmentKit[0];
        } 
        // Otherwise, fall back to the profession's kit
        else if (selectedProfession?.equipmentKit && selectedProfession.equipmentKit.length > 0) {
            kitNameToSet = selectedProfession.equipmentKit[0];
        }
        
        setEquipmentKit(kitNameToSet, true); // Force set the kit
    
    }, [aggregatedData.DEPARTMENTS, selectedProfession, setEquipmentKit]);

    const selectDepartmentOrSpecialProfession = useCallback((stub: string) => {
        // Find if the stub matches a special profession's name
        const specialProfession = aggregatedData.PROFESSIONS.find(p => p.isDepartment && p.name === stub);
        if (specialProfession) {
            // It's a profession acting as a department. Set it as the main profession.
            // setProfession already handles clearing department, skills, etc.
            setProfession(specialProfession.name);
            return 'profession_changed';
        } else {
            // It's a regular department.
            setDepartment(stub);
            return 'department_changed';
        }
    }, [aggregatedData.PROFESSIONS, setProfession, setDepartment]);

    const applyCareerConsequences = useCallback((simResult: SimResult) => {
        setCareerAttributeChanges(simResult.attributeChanges);
        setCareerSkillGains(simResult.skills);
        setCareerSanChange(simResult.sanChange);
        setCareerBondChange(simResult.bondChange);
        setCareerMaxHpChange(simResult.maxHpChange);
        setCareerApplied(true);
        setToastMessage("Career consequences applied.", 'success');
    }, [setToastMessage]);

    const handleChoiceSkillToggle = useCallback((groupIndex: number, skill: SkillValue) => {
        setSelectedChoiceSkills(prev => {
            const newChoices = { ...prev };
            const groupChoices = newChoices[groupIndex] ? [...newChoices[groupIndex]] : [];
            const profession = selectedProfession!;
            const choiceGroup = profession.choiceGroups[groupIndex];
            
            const existingIndex = groupChoices.findIndex(s => s.name === skill.name && s.value === skill.value);

            if (existingIndex > -1) {
                // Deselect
                groupChoices.splice(existingIndex, 1);
            } else {
                // Select, if not full
                if (groupChoices.length < choiceGroup.count) {
                    groupChoices.push(skill);
                } else {
                    setToastMessage(`You can only select ${choiceGroup.count} skill(s) from this group.`, 'warning');
                }
            }
            newChoices[groupIndex] = groupChoices;
            return newChoices;
        });
    }, [selectedProfession, setToastMessage]);

    const handleBonusSkillAdd = useCallback((skillName: string) => {
        if (availableAdvancements <= 0) {
            setToastMessage("No more bonus advancements remaining.", 'warning');
            return;
        }
        const currentVal = skillsWithBonuses[skillName] || 0;
        if (currentVal >= 80) {
            setToastMessage("Cannot raise a skill to 80% or higher during creation.", 'warning');
            return;
        }
        setBonusSkillAdvancementsSpent(prev => ({
            ...prev,
            [skillName]: (prev[skillName] || 0) + 1
        }));
    }, [availableAdvancements, setToastMessage, skillsWithBonuses]);

    const handleBonusSkillRemove = useCallback((skillName: string) => {
        setBonusSkillAdvancementsSpent(prev => {
            if (!prev[skillName] || prev[skillName] <= 0) {
                return prev;
            }
            const newAdvancements = { ...prev };
            newAdvancements[skillName]--;
            if (newAdvancements[skillName] === 0) {
                delete newAdvancements[skillName];
            }
            return newAdvancements;
        });
    }, []);

    const handleBonusSkillsReset = useCallback(() => {
        setBonusSkillAdvancementsSpent({});
        setSkillPackage(null);
        setToastMessage("Bonus skill advancements have been reset.", 'success');
    }, [setToastMessage]);

    const handleSetSkillPackage = useCallback((pkg: SkillPackage) => {
        if (!selectedProfession) {
            setToastMessage("Select a profession before applying a skill package.", 'warning');
            return;
        }
        
        const newAdvancements: Record<string, number> = {};
        const pointsToSpend = selectedProfession.bonusSkillAdvancements;
        const skillsInPackage = pkg.skills.length > pointsToSpend ? pkg.skills.slice(0, pointsToSpend) : pkg.skills;

        for (const skillName of skillsInPackage) {
            newAdvancements[skillName] = (newAdvancements[skillName] || 0) + 1;
        }
        
        setBonusSkillAdvancementsSpent(newAdvancements);
        setSkillPackage(pkg);
        setToastMessage(`Applied the '${pkg.name}' skill package.`, 'success');
    }, [selectedProfession, setToastMessage]);
    
    const handleAddSpecialization = useCallback((displayName: string, specializationBase: string, subType: string, valueToInherit: number) => {
        const newSkillName = `${specializationBase} (${subType})`;
        if (userCreatedSkills.includes(newSkillName)) {
            setToastMessage("This specialization already exists.", 'warning');
            return;
        }

        const advancementsOnGeneric = bonusSkillAdvancementsSpent[displayName] || 0;
        const valueWithoutBonus = valueToInherit - (advancementsOnGeneric * 20);
        setSpecializationInheritedValues(prev => ({ ...prev, [newSkillName]: valueWithoutBonus }));

        setUserCreatedSkills(prev => [...prev, newSkillName]);
        setConsumedGenericSkills(prev => new Set(prev).add(displayName));
    
        setBonusSkillAdvancementsSpent(prev => {
            const advancementsToTransfer = prev[displayName] || 0;
            if (advancementsToTransfer > 0) {
                const newSpent = { ...prev };
                delete newSpent[displayName];
                newSpent[newSkillName] = (newSpent[newSkillName] || 0) + advancementsToTransfer;
                return newSpent;
            }
            return prev;
        });
    }, [userCreatedSkills, setToastMessage, bonusSkillAdvancementsSpent]);
    
    const skillStubToDisplayMap = useMemo(() => {
        const map: Record<string, string> = {};
        aggregatedData.SKILLS.forEach(skill => {
            if (skill.stub) {
                map[skill.stub] = skill.name;
            }
        });
        return map;
    }, [aggregatedData.SKILLS]);

    const handleDeleteSpecialization = useCallback((skillNameToDelete: string) => {
        setSpecializationInheritedValues(prev => {
            const newState = {...prev};
            delete newState[skillNameToDelete];
            return newState;
        });
        
        setUserCreatedSkills(prevSkills => {
            const match = skillNameToDelete.match(/(.*) \((.*)\)/);
            if (match) {
                const specializationBase = match[1]; // e.g. 'Language'
                const displayName = skillStubToDisplayMap[specializationBase] || specializationBase; // e.g. 'Foreign Language'

                const otherSpecializationsExist = prevSkills.some(s => s.startsWith(`${specializationBase} (`) && s !== skillNameToDelete);
                if (!otherSpecializationsExist) {
                    setConsumedGenericSkills(prevConsumed => {
                        const newConsumed = new Set(prevConsumed);
                        newConsumed.delete(displayName);
                        return newConsumed;
                    });
                }
            }
            return prevSkills.filter(s => s !== skillNameToDelete);
        });
        
        setBonusSkillAdvancementsSpent(prev => {
            const newSpent = {...prev};
            const advancementsToReturn = newSpent[skillNameToDelete] || 0;
            delete newSpent[skillNameToDelete];
            
            const match = skillNameToDelete.match(/(.*) \((.*)\)/);
            if (match && advancementsToReturn > 0) {
                const specializationBase = match[1];
                const displayName = skillStubToDisplayMap[specializationBase] || specializationBase;
                newSpent[displayName] = (newSpent[displayName] || 0) + advancementsToReturn;
            }
            
            return newSpent;
        });
    
        setToastMessage(`Specialization '${skillNameToDelete}' removed.`, 'success');
    }, [setToastMessage, skillStubToDisplayMap]);

    useEffect(() => {
        setBonds(prevBonds => {
            return prevBonds.map((bond, index) => ({
                ...bond,
                scoreModifier: veteranChanges.bondScoreModifier,
                terminated: veteranChanges.bondToRemove === index
            }));
        });
    }, [veteranChanges.bondScoreModifier, veteranChanges.bondToRemove]);

    const handleCreateBond = useCallback(async (bondType: BondType) => {
        if (!selectedProfession || !derivedStats || bonds.length >= derivedStats.Bonds) {
            setToastMessage("Maximum number of Bonds reached for this profession.", 'warning');
            return;
        }
        if (!attributes) {
            setToastMessage("Attributes must be rolled first.", 'warning');
            return;
        }

        const roll = Math.floor(Math.random() * 100) + 1;
        const success = roll <= attributes.CHA * 5;
    
        const result = await ai.onGenerateBond(bondType, attributes.CHA, success);
    
        if (result) {
            const newBond: Bond = {
                type: bondType.name,
                name: result.name,
                description: result.description,
                score: attributes.CHA,
                scoreModifier: veteranChanges.bondScoreModifier,
            };
            setBonds(prev => [...prev, newBond]);
        }
    }, [selectedProfession, bonds, ai, attributes, setToastMessage, veteranChanges.bondScoreModifier, derivedStats]);
    
    const handleDeleteBond = useCallback((bondIndex: number) => {
        setBonds(prev => prev.filter((_, index) => index !== bondIndex));
    }, []);

    // --- NEW INVENTORY HANDLERS ---
    const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        try {
            const itemJSON = e.dataTransfer.getData("application/json");
            const item = JSON.parse(itemJSON) as DGItem;
            if (item.isRestricted && isUnderReview) {
                setToastMessage("Cannot acquire restricted items while under review.", 'warning');
                return;
            }

            const shouldAutoAcquire = (item.expense === 'None') || (item.expense === 'Incidental' && !item.isRestricted);

            setInventory(prev => {
                if (!prev.find(invItem => invItem.name === item.name)) {
                    if (shouldAutoAcquire) {
                        setOwnedItems(prevOwned => new Set(prevOwned).add(item.name));
                    }
                    return [item, ...prev];
                }
                return prev;
            });

        } catch (error) {
            console.error("Failed to handle drop:", error);
        }
    }, [isUnderReview, setToastMessage]);
    
    const handleDeleteItem = useCallback((itemName: string) => {
        setInventory(prev => prev.filter(i => i.name !== itemName));
        setOwnedItems(prev => { const newSet = new Set(prev); newSet.delete(itemName); return newSet; });
        setFindFailedItems(prev => { const newSet = new Set(prev); newSet.delete(itemName); return newSet; });
        setRequisitionFailedItems(prev => { const newSet = new Set(prev); newSet.delete(itemName); return newSet; });
    }, []);

    const handleAcquisitionRoll = useCallback((item: DGItem, type: 'Get' | 'Requisition', isRisky: boolean = false): { success: boolean; roll: number; target: number } => {
        if ((type === 'Get' || type === 'Requisition') && (!attributes || !skills)) {
            setToastMessage("Attributes/Skills not loaded.", 'error');
            return { success: false, roll: 0, target: 0 };
        }
    
        let target = 0;
        if (type === 'Get') {
            if (item.isRestricted) {
                setToastMessage("Restricted items cannot be acquired through unofficial channels.", 'error');
                return { success: false, roll: 0, target: 0 };
            }
            const modifier = getExpenseModifier(item.expense);
            target = Math.max((attributes!.INT * 5), 50) + modifier;
        } else { // Requisition
            const modifier = getExpenseModifier(item.expense);
            target = Math.max((skills!['Bureaucracy'] || 0) + modifier, (skills!['Military Science'] || 0) + modifier);
            if (isRisky) {
                target += 20;
            }
        }
    
        const roll = Math.floor(Math.random() * 100) + 1;
        const success = roll <= target;
    
        if (success) {
            setOwnedItems(prev => new Set(prev).add(item.name));
            setToastMessage(`Success! (${roll} vs ${target}) ${item.name} acquired.`, 'success');
        } else {
            if (type === 'Get') {
                setFindFailedItems(prev => new Set(prev).add(item.name));
            } else {
                setRequisitionFailedItems(prev => new Set(prev).add(item.name));
            }
            setToastMessage(`Failure! (${roll} vs ${target}) Failed to acquire ${item.name}.`, 'error');
    
            if (item.isRestricted && type === 'Requisition') {
                if (isRisky) {
                    const chaRoll = Math.floor(Math.random() * 100) + 1;
                    const chaTarget = attributes!.CHA * 5;
                    if (chaRoll > chaTarget) {
                        setToastMessage(`CHA check failed! (${chaRoll} vs ${chaTarget}). Severe consequences enacted.`, 'error');
                        setIsUnderReview(true);
                        if (item.expense === 'Major') setTerminalConsequence("Suspension and/or Transfer");
                        else if (item.expense === 'Extreme') setTerminalConsequence("Firing and/or prosecution");
                        else setTerminalConsequence("Reprimand");
                    } else {
                        setToastMessage(`CHA check succeeded (${chaRoll} vs ${chaTarget}). Consequences lessened, but you're still on the hook.`, 'warning');
                        setIsUnderReview(true);
                    }
                } else { // Normal failure
                    if (item.expense === 'Major') {
                        setIsUnderReview(true);
                        setToastMessage("Your failed requisition for a major item has put you under review.", 'warning');
                    } else if (item.expense === 'Extreme') {
                        setIsUnderReview(true);
                        setTerminalConsequence("Reprimand");
                        setToastMessage("Your failed requisition for an extreme item has earned you a formal reprimand and placed you under review.", 'warning');
                    }
                }
            }
        }
        return { success, roll, target };
    }, [attributes, skills, setToastMessage]);

    const handleAiSkillDistribution = useCallback(async (
        description: string,
        onStageChange?: (stage: 'analyzing' | 'distributing' | null) => void,
    ) => {
        if (!selectedProfession) {
            throw new Error('Select a profession before using AI Distribution.');
        }
        if (availableAdvancements <= 0) {
            throw new Error('No bonus advancements remain to distribute.');
        }

        const distributableSkills = Object.entries(skillsWithBonuses)
            .filter(([skillName]) => skillName !== 'Unnatural')
            .map(([skillName, current]) => {
                const room = Math.max(0, Math.floor((80 - current) / 20));
                return {
                    name: skillName,
                    current,
                    isProfessional: selectedProfession.professionalSkills.some((skill) => skill.name === skillName)
                        || Object.values(selectedChoiceSkills).flat().some((skill) => skill.name === skillName),
                    isSuggested: selectedDepartment?.suggested_bonus_skills.includes(skillName) || false,
                    maxAdditionalAdvancements: room,
                };
            })
            .filter((skill) => skill.maxAdditionalAdvancements > 0)
            .sort((left, right) => left.name.localeCompare(right.name));

        if (distributableSkills.length === 0) {
            throw new Error('No legal skills remain for AI distribution.');
        }

        setIsAiDistributionRunning(true);
        setPendingAiDistribution(null);
        onStageChange?.('analyzing');
        const payload = {
            profession: {
                name: selectedProfession.name,
                description: selectedProfession.description,
                group: selectedProfession.group,
            },
            department: selectedDepartment ? {
                name: selectedDepartment.name,
                description: selectedDepartment.description,
                suggestedBonusSkills: selectedDepartment.suggested_bonus_skills,
            } : null,
            description,
            availableAdvancements,
            specialTrainings: Array.from(selectedSpecialTrainings),
            damagedVeteranOption,
            skills: distributableSkills,
        };

        try {
            onStageChange?.('distributing');
            const rawReview = normalizeDgSkillDistributionReview(
                await generateText({
                    prompt: buildDgSkillDistributionPrompt(payload),
                    json: true,
                    purpose: 'creative',
                }),
            );
            const { review, remaining } = reconcileDgSkillDistributionReview(rawReview, payload);
            if (remaining > 0) {
                review.analysis.cautions = [...review.analysis.cautions, `${remaining} advancement(s) could not be legally assigned and were left unspent.`];
            }
            setPendingAiDistribution(review);
        } finally {
            setIsAiDistributionRunning(false);
            onStageChange?.(null);
        }
    }, [availableAdvancements, damagedVeteranOption, generateText, selectedChoiceSkills, selectedDepartment, selectedProfession, selectedSpecialTrainings, skillsWithBonuses]);

    const applyPendingAiDistribution = useCallback(() => {
        if (!pendingAiDistribution) return;
        const additions = [...pendingAiDistribution.coreSkills, ...pendingAiDistribution.supplementalSkills, ...pendingAiDistribution.personalInterests];
        setBonusSkillAdvancementsSpent((prev) => {
            const next = { ...prev };
            additions.forEach((item) => {
                next[item.skill] = (next[item.skill] || 0) + item.improvements;
            });
            return next;
        });
        setSkillPackage(null);
        setPendingAiDistribution(null);
        setToastMessage('AI distribution applied.', 'success');
    }, [pendingAiDistribution, setToastMessage]);

    const clearPendingAiDistribution = useCallback(() => {
        setPendingAiDistribution(null);
    }, []);

    const loadFromSaveData = useCallback((data: CharacterSaveData) => {
        const saved = (data.characterData || {}) as Record<string, any>;
        isHydratingRef.current = true;
        setBaseAttributes(saved.baseAttributes || saved.attributes || null);
        setSelectedProfession(saved.selectedProfession || null);
        setSelectedDepartment(saved.selectedDepartment || null);
        setBonds(saved.bonds || []);
        setSelectedChoiceSkills(saved.selectedChoiceSkills || {});
        setBonusSkillAdvancementsSpent(saved.bonusSkillAdvancementsSpent || {});
        setUserCreatedSkills(saved.userCreatedSkills || []);
        setConsumedGenericSkills(new Set(saved.consumedGenericSkills || []));
        setSkillPackage(saved.skillPackage || null);
        setSpecializationInheritedValues(saved.specializationInheritedValues || {});
        setRollHistory(saved.rollHistory || []);
        setCareerApplied(Boolean(saved.careerApplied));
        setCareerAttributeChanges(saved.careerAttributeChanges || {});
        setCareerSkillGains(saved.careerSkillGains || {});
        setCareerSanChange(saved.careerSanChange || 0);
        setCareerBondChange(saved.careerBondChange || 0);
        setCareerMaxHpChange(saved.careerMaxHpChange || 0);
        setIsDeceased(Boolean(saved.isDeceased));
        _setDamagedVeteranOption(saved.damagedVeteranOption || null);
        setHardExperienceSkills(saved.hardExperienceSkills || []);
        setHardExperienceBondToRemove(saved.hardExperienceBondToRemove ?? null);
        setAssignedDisorder(saved.assignedDisorder || null);
        setForbiddenKnowledgeDisorder(saved.forbiddenKnowledgeDisorder || null);
        setInventory(saved.inventory || []);
        setOwnedItems(new Set(saved.ownedItems || []));
        setFindFailedItems(new Set(saved.findFailedItems || []));
        setRequisitionFailedItems(new Set(saved.requisitionFailedItems || []));
        setIsUnderReview(Boolean(saved.isUnderReview));
        setTerminalConsequence(saved.terminalConsequence || null);
        setActiveKitName(saved.activeKitName || null);
        setSelectedSpecialTrainings(new Set(saved.selectedSpecialTrainings || []));
        setPendingAiDistribution(saved.pendingAiDistribution || null);
        ai.hydrate(saved.ai || null);
        setToastMessage('Character loaded.', 'success');
    }, [ai, setToastMessage]);


    return {
        attributes,
        baseAttributes,
        derivedStats,
        selectedProfession,
        setProfession,
        selectedDepartment,
        setDepartment,
        selectDepartmentOrSpecialProfession,
        skills,
        skillsWithBonuses,
        baseSkills,
        handleBonusSkillAdd,
        handleBonusSkillRemove,
        handleBonusSkillsReset,
        handleSetSkillPackage,
        availableAdvancements,
        bonusSkillAdvancementsSpent,
        selectedChoiceSkills,
        handleChoiceSkillToggle,
        ai,
        handleRoll,
        rollHistory,
        handleRestoreRoll,
        aggregatedData,
        careerApplied,
        careerAttributeChanges,
        careerSkillGains,
        applyCareerConsequences,
        ignoreConsequences: () => setCareerApplied(false),
        isDeceased,
        userCreatedSkills,
        handleAddSpecialization,
        handleDeleteSpecialization,
        bonds,
        handleCreateBond,
        handleDeleteBond,
        kitInventory,
        inventory,
        ownedItems,
        findFailedItems,
        requisitionFailedItems,
        fullyFailedItems,
        isUnderReview,
        terminalConsequence,
        setEquipmentKit,
        handleDrop,
        handleDeleteItem,
        handleAcquisitionRoll,
        setToastMessage,
        damagedVeteranOption,
        setDamagedVeteranOption,
        hardExperienceSkills,
        setHardExperienceSkills,
        hardExperienceBondToRemove,
        setHardExperienceBondToRemove,
        veteranChanges,
        adaptedToViolence: damagedVeteranOption === 'Extreme Violence',
        adaptedToHelplessness: damagedVeteranOption === 'Captivity or Imprisonment',
        assignedDisorder,
        activeKitName,
        selectedSpecialTrainings,
        handleToggleSpecialTraining,
        pendingAiDistribution,
        isAiDistributionRunning,
        handleAiSkillDistribution,
        applyPendingAiDistribution,
        clearPendingAiDistribution,
        loadFromSaveData,
    };
};
