import { describe, expect, it } from 'vitest';
import { PROFESSIONS } from '../data/profession-data';
import { INFORMATION_DATA } from '../data/information-data';

describe('profession metadata coverage', () => {
  it('provides the minimum metadata required for Career History and dossier rendering', () => {
    const missingInfoIds = PROFESSIONS.filter((profession) => {
      if (!profession.infoId) return true;
      return !INFORMATION_DATA[profession.infoId];
    }).map((profession) => profession.name);

    const missingRanks = PROFESSIONS.filter((profession) => !profession.ranks || profession.ranks.length === 0).map((profession) => profession.name);
    const missingSources = PROFESSIONS.filter((profession) => !profession.source).map((profession) => profession.name);
    const missingSkills = PROFESSIONS.filter((profession) => !profession.professionalSkills || profession.professionalSkills.length === 0).map((profession) => profession.name);
    const missingAdvancements = PROFESSIONS.filter((profession) => !profession.bonusSkillAdvancements).map((profession) => profession.name);

    expect(missingInfoIds, `Missing dossier info for: ${missingInfoIds.join(', ') || 'none'}`).toEqual([]);
    expect(missingRanks, `Missing career ranks for: ${missingRanks.join(', ') || 'none'}`).toEqual([]);
    expect(missingSources, `Missing source labels for: ${missingSources.join(', ') || 'none'}`).toEqual([]);
    expect(missingSkills, `Missing professional skills for: ${missingSkills.join(', ') || 'none'}`).toEqual([]);
    expect(missingAdvancements, `Missing bonus skill advancement counts for: ${missingAdvancements.join(', ') || 'none'}`).toEqual([]);
  });
});
