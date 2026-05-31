import { describe, expect, it } from 'vitest';
import {
    normalizeDgSkillDistributionReview,
    reconcileDgSkillDistributionReview,
    type DgSkillDistributionPayload,
} from '../lib/ai/dg-skill-distribution';

const payload: DgSkillDistributionPayload = {
    profession: {
        name: 'Federal Agent',
        description: 'Investigative federal law enforcement operative.',
        group: 'Federal Agent',
    },
    department: {
        name: 'FBI',
        description: 'Domestic law enforcement and counterintelligence.',
        suggestedBonusSkills: ['Alertness', 'Search'],
    },
    description: 'A methodical surveillance-heavy case agent with a forensics side interest.',
    availableAdvancements: 4,
    specialTrainings: ['HALO'],
    damagedVeteranOption: null,
    skills: [
        { name: 'Alertness', current: 40, isProfessional: true, isSuggested: true, maxAdditionalAdvancements: 2 },
        { name: 'Search', current: 60, isProfessional: true, isSuggested: true, maxAdditionalAdvancements: 1 },
        { name: 'Forensics', current: 30, isProfessional: true, isSuggested: false, maxAdditionalAdvancements: 2 },
        { name: 'Persuade', current: 20, isProfessional: false, isSuggested: false, maxAdditionalAdvancements: 3 },
    ],
};

describe('dg skill distribution helpers', () => {
    it('normalizes JSON-like AI responses', () => {
        const review = normalizeDgSkillDistributionReview(`{
          "analysis": {
            "summary": "Focused investigator",
            "themes": ["surveillance", "evidence"],
            "likelyCoreSkills": ["Alertness"],
            "likelySupportSkills": ["Forensics"],
            "cautions": ["Do not over-invest in combat."]
          },
          "rationale": "Keep the agent observant and technically capable.",
          "coreSkills": [{"skill": "Alertness", "improvements": 2}],
          "supplementalSkills": [{"skill": "Forensics", "improvements": 1}],
          "personalInterests": [{"skill": "Persuade", "improvements": 1}]
        }`);

        expect(review.analysis.summary).toBe('Focused investigator');
        expect(review.coreSkills).toEqual([{ skill: 'Alertness', improvements: 2 }]);
        expect(review.personalInterests).toEqual([{ skill: 'Persuade', improvements: 1 }]);
    });

    it('reconciles illegal or incomplete AI distributions back into a legal DG spread', () => {
        const raw = normalizeDgSkillDistributionReview({
            analysis: { summary: 'test', themes: [], likelyCoreSkills: [], likelySupportSkills: [], cautions: [] },
            rationale: 'test',
            coreSkills: [
                { skill: 'Alertness', improvements: 4 },
                { skill: 'Unnatural', improvements: 1 },
            ],
            supplementalSkills: [
                { skill: 'Search', improvements: 2 },
            ],
            personalInterests: [],
        });

        const { review, remaining } = reconcileDgSkillDistributionReview(raw, payload);
        const total = [...review.coreSkills, ...review.supplementalSkills, ...review.personalInterests]
            .reduce((sum, item) => sum + item.improvements, 0);

        expect(remaining).toBe(0);
        expect(total).toBe(4);
        expect(review.coreSkills).toEqual([{ skill: 'Alertness', improvements: 2 }]);
        expect(review.supplementalSkills.some((item) => item.skill === 'Search')).toBe(true);
        expect(review.coreSkills.some((item) => item.skill === 'Unnatural')).toBe(false);
    });
});
