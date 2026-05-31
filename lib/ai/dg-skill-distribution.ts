import { parseJsonLike } from './json';

export interface DgSkillDistributionSkill {
    name: string;
    current: number;
    isProfessional: boolean;
    isSuggested: boolean;
    maxAdditionalAdvancements: number;
}

export interface DgSkillDistributionPayload {
    profession: {
        name: string;
        description: string;
        group: string;
    };
    department?: {
        name: string;
        description: string;
        suggestedBonusSkills: string[];
    } | null;
    description: string;
    availableAdvancements: number;
    specialTrainings: string[];
    damagedVeteranOption?: string | null;
    skills: DgSkillDistributionSkill[];
}

export interface DgSkillDistributionAllocation {
    skill: string;
    improvements: number;
}

export interface DgSkillDistributionAnalysis {
    summary: string;
    themes: string[];
    likelyCoreSkills: string[];
    likelySupportSkills: string[];
    cautions: string[];
}

export interface DgSkillDistributionReview {
    analysis: DgSkillDistributionAnalysis;
    rationale?: string;
    coreSkills: DgSkillDistributionAllocation[];
    supplementalSkills: DgSkillDistributionAllocation[];
    personalInterests: DgSkillDistributionAllocation[];
}

const asStringArray = (value: unknown) => Array.isArray(value)
    ? value.map((entry) => String(entry).trim()).filter(Boolean)
    : [];

const sanitizeImprovements = (value: unknown) => {
    const num = Number(value);
    if (!Number.isFinite(num) || num <= 0) return 0;
    return Math.floor(num);
};

const normalizeAllocations = (value: unknown): DgSkillDistributionAllocation[] => {
    if (!Array.isArray(value)) return [];
    return value
        .map((item: any) => ({
            skill: String(item?.skill || item?.name || '').trim(),
            improvements: sanitizeImprovements(item?.improvements ?? item?.blocks ?? item?.amount ?? item?.value),
        }))
        .filter((item) => Boolean(item.skill) && item.improvements > 0);
};

export const normalizeDgSkillDistributionReview = (value: unknown): DgSkillDistributionReview => {
    const parsed: any = parseJsonLike(value) || {};
    return {
        analysis: {
            summary: typeof parsed?.analysis?.summary === 'string' ? parsed.analysis.summary.trim() : '',
            themes: asStringArray(parsed?.analysis?.themes),
            likelyCoreSkills: asStringArray(parsed?.analysis?.likelyCoreSkills),
            likelySupportSkills: asStringArray(parsed?.analysis?.likelySupportSkills),
            cautions: asStringArray(parsed?.analysis?.cautions),
        },
        rationale: typeof parsed?.rationale === 'string' ? parsed.rationale.trim() : '',
        coreSkills: normalizeAllocations(parsed?.coreSkills),
        supplementalSkills: normalizeAllocations(parsed?.supplementalSkills),
        personalInterests: normalizeAllocations(parsed?.personalInterests),
    };
};

const allocationToPromptLine = (skill: DgSkillDistributionSkill) => (
    `- ${skill.name}: current ${skill.current}%, professional ${skill.isProfessional ? 'yes' : 'no'}, department-suggested ${skill.isSuggested ? 'yes' : 'no'}, remaining legal +20 blocks ${skill.maxAdditionalAdvancements}`
);

export const buildDgSkillDistributionPrompt = (payload: DgSkillDistributionPayload) => `You are assigning Delta Green Agent creation bonus skill advancements. Return JSON only.

Character brief:
${payload.description}

Profession:
- Name: ${payload.profession.name}
- Group: ${payload.profession.group}
- Description: ${payload.profession.description}

Department:
- Name: ${payload.department?.name || 'None'}
- Description: ${payload.department?.description || 'None'}
- Suggested bonus skills: ${payload.department?.suggestedBonusSkills.join(', ') || 'None'}

Extra context:
- Remaining bonus advancements to assign: ${payload.availableAdvancements}
- Each advancement is exactly +20% to one skill.
- No skill can be raised above 80% during character creation.
- Do not assign any advancements to Unnatural.
- Prefer professional skills and department-fit skills unless the concept strongly suggests personal expertise elsewhere.
- A strong, focused specialist is better than a flat spread, but avoid over-specializing beyond the concept.
- If the agent has special trainings or veteran scars, let that affect the spread.
- Special trainings: ${payload.specialTrainings.join(', ') || 'None'}
- Damaged veteran option: ${payload.damagedVeteranOption || 'None'}

Allowed skills and how many +20 blocks each can still legally take:
${payload.skills.map(allocationToPromptLine).join('\n')}

Return JSON in exactly this shape:
{
  "analysis": {
    "summary": "short read of the concept",
    "themes": ["theme"],
    "likelyCoreSkills": ["skill"],
    "likelySupportSkills": ["skill"],
    "cautions": ["warning"]
  },
  "rationale": "one short paragraph explaining the spread",
  "coreSkills": [{ "skill": "Alertness", "improvements": 2 }],
  "supplementalSkills": [{ "skill": "Bureaucracy", "improvements": 1 }],
  "personalInterests": [{ "skill": "Artillery", "improvements": 1 }]
}

Rules:
- The total improvements across all three lists must equal ${payload.availableAdvancements}.
- Use only the skill names from the allowed list.
- Never assign more improvements to a skill than its listed legal maximum.
- Keep the answer compact and do not include markdown.`;

const flattenReview = (review: DgSkillDistributionReview) => ([
    ...review.coreSkills.map((item) => ({ ...item, bucket: 'coreSkills' as const })),
    ...review.supplementalSkills.map((item) => ({ ...item, bucket: 'supplementalSkills' as const })),
    ...review.personalInterests.map((item) => ({ ...item, bucket: 'personalInterests' as const })),
]);

export const reconcileDgSkillDistributionReview = (
    rawReview: DgSkillDistributionReview,
    payload: DgSkillDistributionPayload,
) => {
    const skillMap = new Map(payload.skills.map((skill) => [skill.name, skill]));
    const buckets: Record<'coreSkills' | 'supplementalSkills' | 'personalInterests', DgSkillDistributionAllocation[]> = {
        coreSkills: [],
        supplementalSkills: [],
        personalInterests: [],
    };
    const applied = new Map<string, number>();
    let remaining = payload.availableAdvancements;

    for (const item of flattenReview(rawReview)) {
        if (remaining <= 0) break;
        const skill = skillMap.get(item.skill);
        if (!skill) continue;
        const alreadyApplied = applied.get(item.skill) || 0;
        const legalRemaining = Math.max(0, skill.maxAdditionalAdvancements - alreadyApplied);
        const usable = Math.min(item.improvements, legalRemaining, remaining);
        if (usable <= 0) continue;
        buckets[item.bucket].push({ skill: item.skill, improvements: usable });
        applied.set(item.skill, alreadyApplied + usable);
        remaining -= usable;
    }

    if (remaining > 0) {
        const fallbackSkills = [...payload.skills].sort((left, right) => {
            const score = (skill: DgSkillDistributionSkill) => (skill.isSuggested ? 2 : 0) + (skill.isProfessional ? 1 : 0);
            return score(right) - score(left) || right.current - left.current || left.name.localeCompare(right.name);
        });

        for (const skill of fallbackSkills) {
            if (remaining <= 0) break;
            const alreadyApplied = applied.get(skill.name) || 0;
            const legalRemaining = Math.max(0, skill.maxAdditionalAdvancements - alreadyApplied);
            if (legalRemaining <= 0) continue;
            const usable = Math.min(legalRemaining, remaining);
            buckets.supplementalSkills.push({ skill: skill.name, improvements: usable });
            applied.set(skill.name, alreadyApplied + usable);
            remaining -= usable;
        }
    }

    return {
        review: {
            analysis: rawReview.analysis,
            rationale: rawReview.rationale,
            coreSkills: buckets.coreSkills,
            supplementalSkills: buckets.supplementalSkills,
            personalInterests: buckets.personalInterests,
        },
        remaining,
    };
};
