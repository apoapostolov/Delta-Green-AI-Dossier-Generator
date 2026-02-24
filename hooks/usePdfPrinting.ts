import { useState, useCallback } from 'react';
import { PDFDocument } from 'pdf-lib';
import type { AggregatedData } from './useAggregatedData';
import { useSheetContext } from '../context/SheetContext';
import type { useCharacter } from './useCharacter';
import type { ToastType, DGItem, SpecialTraining, Attribute } from '../types';

type CharacterSheetData = ReturnType<typeof useCharacter> & { pdfPortrait: string | null };

// Per user request, this function is restored for potential future use,
// even though the current implementation prefers the `shortName` property on items.
const shortenWeaponName = (name: string): string => {
    return name.length > 20 ? name.substring(0, 19) + '…' : name;
};


const getCharacterSheetFields = (data: CharacterSheetData, PDF_FIELD_MAP: any, aggregatedData: AggregatedData): { [key: string]: any } => {
  const fields: { [key: string]: any } = {};
  const { attributes, derivedStats, selectedProfession, selectedDepartment, ai, skills, bonds, inventory, kitInventory, selectedSpecialTrainings } = data;
  if (!attributes || !derivedStats || !selectedProfession) return fields;

  // 1. Name
  let fullName = ai.characterName || '';
  if (fullName && ai.codename) {
    fullName = `${fullName}, ${ai.codename}`;
  }
  fields[PDF_FIELD_MAP.characterName] = fullName;

  // 2. Profession/Rank (Occupation for field 7)
  let occupation = selectedProfession.name;
  if (ai.simResult?.summary.finalRank) {
      occupation = ai.simResult.summary.finalRank;
  } else {
      const rankList = (selectedDepartment?.ranks?.[selectedProfession.name] || selectedProfession.ranks);
      if (rankList && rankList.length > 0) {
          occupation = rankList[0];
      }
  }
  fields[PDF_FIELD_MAP.profession] = occupation;

  // 3. Employer
  fields[PDF_FIELD_MAP.employer] = selectedDepartment?.agency || '';

  // 4. Nationality
  fields[PDF_FIELD_MAP.nationality] = selectedDepartment?.country || '';
  
  // 6. Age and DOB
  let dobForPdf = '';
  if (ai.dob && ai.dob.includes('-')) { // ai.dob is 'YYYY-MM-DD'
      const [y, m, d] = ai.dob.split('-');
      dobForPdf = `${m}/${d}/${y}`;
  }
  const ageAndDob = (ai.age && dobForPdf) ? `${ai.age} / ${dobForPdf}` : '';
  fields[PDF_FIELD_MAP.ageAndDob] = ageAndDob;

  // 7. Education and Occupation
  const education = ai.education === 'Details pending career simulation.' ? '' : (ai.education || '');
  fields[PDF_FIELD_MAP.educationAndOccupation] = [education, occupation].filter(Boolean).join(' / ');

  // 10. Physical Description
  fields[PDF_FIELD_MAP.physicalDescription] = ai.physicalDescription || '';

  // Wounds and Ailments (New)
  if (ai.injuryShortDescription && ai.injuryMechanics) {
    const combinedInjuryText = `${ai.injuryShortDescription} (${ai.injuryMechanics})`;
    fields[PDF_FIELD_MAP.woundsAndAilments_2] = combinedInjuryText;
  }

  // Distinguishing Features
  if (ai.distinguishingFeatures) {
    fields[PDF_FIELD_MAP.strDistinguishingFeatures] = ai.distinguishingFeatures.STR || '';
    fields[PDF_FIELD_MAP.conDistinguishingFeatures] = ai.distinguishingFeatures.CON || '';
    fields[PDF_FIELD_MAP.dexDistinguishingFeatures] = ai.distinguishingFeatures.DEX || '';
    fields[PDF_FIELD_MAP.intDistinguishingFeatures] = ai.distinguishingFeatures.INT || '';
    fields[PDF_FIELD_MAP.powDistinguishingFeatures] = ai.distinguishingFeatures.POW || '';
    fields[PDF_FIELD_MAP.chaDistinguishingFeatures] = ai.distinguishingFeatures.CHA || '';
  }

  // Attributes
  fields[PDF_FIELD_MAP.strScore] = attributes.STR;
  fields[PDF_FIELD_MAP.strPercent] = attributes.STR * 5;
  fields[PDF_FIELD_MAP.conScore] = attributes.CON;
  fields[PDF_FIELD_MAP.conPercent] = attributes.CON * 5;
  fields[PDF_FIELD_MAP.dexScore] = attributes.DEX;
  fields[PDF_FIELD_MAP.dexPercent] = attributes.DEX * 5;
  fields[PDF_FIELD_MAP.intScore] = attributes.INT;
  fields[PDF_FIELD_MAP.intPercent] = attributes.INT * 5;
  fields[PDF_FIELD_MAP.powScore] = attributes.POW;
  fields[PDF_FIELD_MAP.powPercent] = attributes.POW * 5;
  fields[PDF_FIELD_MAP.chaScore] = attributes.CHA;
  fields[PDF_FIELD_MAP.chaPercent] = attributes.CHA * 5;
  
  // Derived Stats
  fields[PDF_FIELD_MAP.maxHp] = derivedStats.HP;
  fields[PDF_FIELD_MAP.maxSan] = derivedStats.SAN;
  fields[PDF_FIELD_MAP.maxWp] = derivedStats.WP;
  fields[PDF_FIELD_MAP.currentBp] = derivedStats.BP;

  // Bonds
  if (bonds) {
    bonds.slice(0, 6).forEach((bond, index) => {
      const bondNumber = index + 1;
      const finalScore = bond.score + (bond.scoreModifier || 0);
      
      let bondTypeString = bond.terminated ? `TERMINATED: ${bond.type}` : bond.type;
      if (bond.name && !bond.terminated) {
        const cleanName = bond.name.replace(/\*\*/g, '');
        if (cleanName) {
            bondTypeString += ` (${cleanName})`;
        }
      }

      fields[PDF_FIELD_MAP[`bond${bondNumber}Type`]] = bondTypeString;
      fields[PDF_FIELD_MAP[`bond${bondNumber}Score`]] = bond.terminated ? '—' : finalScore;
    });
  }

  // Skills
  if (skills) {
      // 1. Group all specializations by their base skill name, including their scores
      const specializations: Record<string, { name: string; score: number }[]> = {};
      const specializationRegex = /(.*) \((.*)\)/;
      const skillStubMap = new Map<string, string>(); // maps stub name to display name
      aggregatedData.SKILLS.forEach(s => { if (s.stub) skillStubMap.set(s.stub, s.name); });

      for (const skillName in skills) {
          const match = skillName.match(specializationRegex);
          if (match) {
              const baseSkillStub = match[1];
              const specializationName = match[2];
              const baseSkillName = skillStubMap.get(baseSkillStub) || (aggregatedData.SKILLS.find(s => s.name === baseSkillStub) ? baseSkillStub : null);
              
              if (baseSkillName) {
                  if (!specializations[baseSkillName]) {
                      specializations[baseSkillName] = [];
                  }
                  specializations[baseSkillName].push({ name: specializationName, score: skills[skillName] });
              }
          }
      }

      // 2. Handle skills with dedicated PDF specialization fields
      const dedicatedSpecSkills = new Set(['Art', 'Military Science', 'Pilot', 'Science', 'Craft']);
      for (const baseSkillName of Array.from(dedicatedSpecSkills)) {
          const specs = specializations[baseSkillName];
          if (specs && specs.length > 0) {
              // Rule 1: Set base skill score to the highest specialization score
              const maxScore = Math.max(...specs.map(s => s.score));
              if (PDF_FIELD_MAP[baseSkillName]) {
                  fields[PDF_FIELD_MAP[baseSkillName]] = maxScore;
              }

              // Rule 2: Create formatted list of specializations with scores
              const specializationList = specs.map(s => `${s.name} (${s.score}%)`).join(', ');
              const specializationFieldName = `${baseSkillName}_specializations`;
              if (PDF_FIELD_MAP[specializationFieldName]) {
                  fields[PDF_FIELD_MAP[specializationFieldName]] = specializationList;
              }
          } else if (skills[baseSkillName] !== undefined && skills[baseSkillName] !== null) {
              // The skill can be specialized but hasn't been, so use its regular value.
              // This handles the case where the skill value is 0.
              if (PDF_FIELD_MAP[baseSkillName]) {
                  fields[PDF_FIELD_MAP[baseSkillName]] = skills[baseSkillName];
              }
          }
      }

      // 3. Populate standard, non-specialized skills
      for (const skillName in skills) {
          const isSpecialization = specializationRegex.test(skillName);
          const skillDef = aggregatedData.SKILLS.find(s => s.name === skillName);
          // If it's a normal skill (not a specialization itself, and not a base for specializations we already handled)
          if (!isSpecialization && skillDef && !skillDef.specialty) {
              if (PDF_FIELD_MAP[skillName]) {
                  fields[PDF_FIELD_MAP[skillName]] = skills[skillName];
              }
          }
      }

      // 4. Populate "Foreign Languages and Other Skills" section (which should now just be Languages)
      const otherSkills = [];
      if (specializations['Foreign Language']) {
          otherSkills.push(...specializations['Foreign Language']);
      }
      
      otherSkills.sort((a, b) => a.name.localeCompare(b.name));

      otherSkills.slice(0, 6).forEach((skill, index) => {
          const skillNumber = index + 1;
          fields[PDF_FIELD_MAP[`otherSkill${skillNumber}Name`]] = skill.name;
          fields[PDF_FIELD_MAP[`otherSkill${skillNumber}Score`]] = skill.score;
      });
  }

    // Special Trainings
    const calculateTrainingValue = (training: SpecialTraining): number => {
        if (!attributes || !skills) return 0;
        const basedOn = training.basedOn;
    
        if (['STR', 'CON', 'DEX', 'INT', 'POW', 'CHA'].includes(basedOn)) {
            return attributes[basedOn as Attribute] * 5;
        }
    
        const baseValue = skills[basedOn] || 0;
        
        const specializationValues = Object.keys(skills)
            .filter(skillName => skillName.startsWith(`${basedOn} (`))
            .map(skillName => skills[skillName]);
            
        return Math.max(baseValue, ...specializationValues);
    };

    if (selectedSpecialTrainings && selectedSpecialTrainings.size > 0) {
        const sortedTrainings = Array.from(selectedSpecialTrainings).sort();
        const topTrainings = sortedTrainings.slice(0, 6);
        const suffixes = ['a', 'b', 'c', 'd', 'e', 'f'];
  
        topTrainings.forEach((trainingName: string, index) => {
            const trainingDef = aggregatedData.SPECIAL_TRAININGS.find(t => t.name === trainingName);
            if (trainingDef) {
                const suffix = suffixes[index];
                const truncatedName = trainingName.length > 20 ? trainingName.substring(0, 20) : trainingName;
                const value = calculateTrainingValue(trainingDef);
                const statString = `${trainingDef.basedOn || ''} (${value}%)`;
                
                fields[PDF_FIELD_MAP[`specialTraining_${suffix}_name`]] = truncatedName;
                fields[PDF_FIELD_MAP[`specialTraining_${suffix}_stat`]] = statString;
            }
        });
    }

    // Weapons
    const weaponSections = new Set([
        'Hand-to-Hand Weapons', 'Firearms', 'Heavy Weapons',
        'Tear Gas and Pepper Spray', 'Stun Grenades', 'Electroshock Weapons',
        'Demolitions', 'Artillery'
    ]);

    const unarmedAttackItem = aggregatedData.ITEMS.find(item => item.name === 'Unarmed Attack');
    if (!unarmedAttackItem) {
        console.error("Critical error: 'Unarmed Attack' item definition not found.");
        return fields;
    }

    const allEquippedItems = [...inventory, ...kitInventory];
    const uniqueEquippedItems = Array.from(new Map(allEquippedItems.map(item => [item.name, item])).values());
    const equippedWeapons = uniqueEquippedItems.filter(item =>
        weaponSections.has(item.section) && item.name !== 'Unarmed Attack'
    );

    const isRanged = (item: DGItem): boolean => !!(item.baseRange || item.lethality || item.radius);
    const getDamageValue = (damage?: string): number => {
        if (!damage || damage === 'special' || damage === 'N/A') return 0;
        const cleaned = damage.replace(/\*/g, '');
        const parts = cleaned.match(/(\d+)[dD](\d+)([+-]\d+)?/);
        if (!parts) return 0.1;
        const numDice = parseInt(parts[1], 10);
        const dieSize = parseInt(parts[2], 10);
        const modifier = parts[3] ? parseInt(parts[3], 10) : 0;
        return numDice * ((dieSize + 1) / 2) + modifier;
    };
    const getLethalityValue = (lethality?: string): number => {
        if (!lethality || lethality === 'N/A') return 0;
        return parseInt(lethality, 10) || 0;
    };

    const sortWeapons = (a: DGItem, b: DGItem): number => {
        const aIsRanged = isRanged(a);
        const bIsRanged = isRanged(b);
        if (aIsRanged && !bIsRanged) return -1;
        if (!aIsRanged && bIsRanged) return 1;
        if (aIsRanged && bIsRanged) {
            return getLethalityValue(b.lethality) - getLethalityValue(a.lethality);
        }
        return getDamageValue(b.damage) - getDamageValue(a.damage);
    };
    
    const sortedEquippedWeapons = equippedWeapons.sort(sortWeapons);
    const topWeapons = sortedEquippedWeapons.slice(0, 5);
    const finalWeaponsList = [...topWeapons, unarmedAttackItem];

    const skillShortNameMap = new Map<string, string>();
    aggregatedData.SKILLS.forEach(skill => {
        if (skill.shortName) {
            skillShortNameMap.set(skill.name, skill.shortName);
        }
    });

    const getShortSkillName = (skillName: string): string => {
        if (!skillName) return '';
        if (skillName.endsWith('x5')) return skillName; // Handle STRx5, DEXx5 etc.
        const baseSkillName = skillName.split('(')[0].trim();
        const shortName = skillShortNameMap.get(baseSkillName);
        return shortName || skillName.substring(0, 4);
    };

    const suffixes = ['a', 'b', 'c', 'd', 'e', 'f'];
    finalWeaponsList.forEach((weapon, index) => {
        const suffix = suffixes[index];
        fields[PDF_FIELD_MAP[`weapon_${suffix}`]] = weapon.shortName || weapon.name || '';
        fields[PDF_FIELD_MAP[`skill_${suffix}`]] = getShortSkillName(weapon.skill || '');
        fields[PDF_FIELD_MAP[`baseRange_${suffix}`]] = isRanged(weapon) ? (weapon.baseRange || weapon.range || '') : 'Near';
        fields[PDF_FIELD_MAP[`damage_${suffix}`]] = weapon.damage || '';
        fields[PDF_FIELD_MAP[`armorPiercing_${suffix}`]] = weapon.armorPiercing || 'N/A';
        fields[PDF_FIELD_MAP[`killDamage_${suffix}`]] = weapon.lethality || '';
        fields[PDF_FIELD_MAP[`killRadius_${suffix}`]] = weapon.killRadius || '';
        fields[PDF_FIELD_MAP[`ammo_${suffix}`]] = weapon.ammoCapacity || '';
    });

    // Armor and Gear
    const itemsToPrint = uniqueEquippedItems.filter(item => item.name !== 'Unarmed Attack');

    const getCategoryPriority = (item: DGItem): number => {
        const section = item.section;
        if (['Firearms', 'Heavy Weapons', 'Artillery', 'Tear Gas and Pepper Spray', 'Stun Grenades', 'Electroshock Weapons'].includes(section)) return 1; // Ranged weapons
        if (['Hand-to-Hand Weapons'].includes(section)) return 2; // Melee weapons
        if (['Body Armor'].includes(section)) return 3; // Armor
        return 4; // Other gear
    };

    itemsToPrint.sort((a, b) => {
        const priorityA = getCategoryPriority(a);
        const priorityB = getCategoryPriority(b);
        if (priorityA !== priorityB) {
            return priorityA - priorityB;
        }
        return a.name.localeCompare(b.name);
    });

    const formattedGearList = itemsToPrint.map(item => {
        const details = [];
        const isWeapon = item.damage || (item.lethality && item.lethality !== 'N/A' && !['Body Armor', 'Ground Vehicles', 'Water Vehicles', 'Air Vehicles'].includes(item.section));

        if (isWeapon) {
            if (item.damage && item.damage !== 'special' && item.damage !== 'N/A') {
                details.push(item.damage);
            }
            if (item.lethality && item.lethality !== 'N/A') {
                details.push(item.lethality);
            }
        } else if (item.uses) {
            details.push(`${item.uses} uses`);
        }
        
        if (details.length > 0) {
            return `${item.name} (${details.join(', ')})`;
        }
        return item.name;
    }).join(', ');

    fields[PDF_FIELD_MAP.armorAndGear] = formattedGearList;

  return fields;
};


export const usePdfPrinting = (aggregatedData: AggregatedData, showToast: (msg: string, type?: ToastType) => void) => {
    const [isPrinting, setIsPrinting] = useState<boolean>(false);
    const [pdfError, setPdfError] = useState<string | null>(null);
    const { getSheetPath, sourceType, externalUrls } = useSheetContext();

    const printSheet = useCallback(async (data: CharacterSheetData) => {
        setIsPrinting(true);
        setPdfError(null);
    
        try {
            if (!data.selectedProfession?.sourceId) {
                throw new Error("Character data is incomplete for printing.");
            }
            const sourceId = data.selectedProfession.sourceId;
            const sheetConfig = aggregatedData.sheetConfigs[sourceId];
            const PDF_FIELD_MAP = aggregatedData.PDF_FIELD_MAPS[sourceId];

            if (!sheetConfig || !PDF_FIELD_MAP) {
                throw new Error(`PDF configuration for source '${sourceId}' is missing.`);
            }
            
            // For Delta Green, there's no spellcaster distinction.
            const isSpellcaster = false;
            const templatePath = getSheetPath(sourceId, isSpellcaster, sheetConfig);

            let existingPdfBytes;
            const initialResponse = await fetch(templatePath);

            if (!initialResponse.ok && sourceType === 'internal') {
                showToast("Local sheet not found. Falling back to external URL.", "warning");
                
                const fallbackUrl = externalUrls[sourceId]?.defaultSheet;
                if (!fallbackUrl) {
                    throw new Error(`Internal sheet failed to load and no external fallback URL is configured for source '${sourceId}'.`);
                }

                const fallbackResponse = await fetch(fallbackUrl);
                if (!fallbackResponse.ok) {
                    throw new Error(`Failed to fetch both internal sheet (${initialResponse.status}) and external fallback (${fallbackResponse.status}).`);
                }
                existingPdfBytes = await fallbackResponse.arrayBuffer();
            } else if (!initialResponse.ok) {
                throw new Error(`Failed to fetch PDF template at ${templatePath}. Status: ${initialResponse.status}`);
            } else {
                existingPdfBytes = await initialResponse.arrayBuffer();
            }

            const pdfDoc = await PDFDocument.load(existingPdfBytes);
            const form = pdfDoc.getForm();
    
            if (data.pdfPortrait) {
                try {
                    const pngImage = await pdfDoc.embedPng(data.pdfPortrait.split(',')[1]);
                    if (PDF_FIELD_MAP.portrait) {
                        form.getButton(PDF_FIELD_MAP.portrait).setImage(pngImage);
                    }
                } catch (e) {
                    console.error("Failed to embed portrait image:", e);
                }
            }

            const fieldsToFill = getCharacterSheetFields(data, PDF_FIELD_MAP, aggregatedData);
            for (const [fieldName, value] of Object.entries(fieldsToFill)) {
                try {
                    form.getTextField(fieldName).setText(String(value));
                } catch (e) { 
                    // Silently ignore missing or non-text fields
                }
            }
            
            // Handle checkboxes
            try {
                if (data.ai.gender === 'male' && PDF_FIELD_MAP.genderMale) form.getCheckBox(PDF_FIELD_MAP.genderMale).check();
                if (data.ai.gender === 'female' && PDF_FIELD_MAP.genderFemale) form.getCheckBox(PDF_FIELD_MAP.genderFemale).check();
                
                if (data.adaptedToViolence) {
                    if (PDF_FIELD_MAP.adaptedToViolence1) form.getCheckBox(PDF_FIELD_MAP.adaptedToViolence1).check();
                    if (PDF_FIELD_MAP.adaptedToViolence2) form.getCheckBox(PDF_FIELD_MAP.adaptedToViolence2).check();
                    if (PDF_FIELD_MAP.adaptedToViolence3) form.getCheckBox(PDF_FIELD_MAP.adaptedToViolence3).check();
                }
                if (data.adaptedToHelplessness) {
                    if (PDF_FIELD_MAP.adaptedToHelplessness1) form.getCheckBox(PDF_FIELD_MAP.adaptedToHelplessness1).check();
                    if (PDF_FIELD_MAP.adaptedToHelplessness2) form.getCheckBox(PDF_FIELD_MAP.adaptedToHelplessness2).check();
                    if (PDF_FIELD_MAP.adaptedToHelplessness3) form.getCheckBox(PDF_FIELD_MAP.adaptedToHelplessness3).check();
                }

            } catch (e) {
                console.warn("Could not set one or more checkboxes.", e);
            }

            form.flatten();
    
            const pdfBytes = await pdfDoc.save();
            const blob = new Blob([pdfBytes], { type: 'application/pdf' });
            const url = URL.createObjectURL(blob);
            window.open(url, '_blank');
            URL.revokeObjectURL(url);
    
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'An unexpected printing error occurred.';
            console.error('Failed to fill PDF form:', error);
            setPdfError(`Error: ${errorMessage}`);
            showToast(errorMessage, 'error');
        } finally {
            setIsPrinting(false);
        }
    }, [aggregatedData, getSheetPath, sourceType, externalUrls, showToast]);

    return { isPrinting, pdfError, setPdfError, printSheet };
};