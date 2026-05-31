// attribute-descriptors.ts
import { Attribute } from '../types';

export interface AttributeScoreDescriptor {
  min: number;
  max: number;
  description: string;
}

export const ATTRIBUTE_SCORE_DESCRIPTORS: Record<Attribute, AttributeScoreDescriptor[]> = {
  STR: [
    { min: 1, max: 3, description: 'visibly frail, with a gaunt and emaciated frame' },
    { min: 4, max: 5, description: 'a slight, wiry build, showing clear physical strain under load' },
    { min: 6, max: 7, description: 'a lean build with little muscle definition' },
    { min: 8, max: 9, description: 'an average, unremarkable physique' },
    { min: 10, max: 11, description: 'looks capable, with a reasonably fit body' },
    { min: 12, max: 13, description: 'a solid, well-toned build, suggesting regular physical activity' },
    { min: 14, max: 15, description: 'broad-shouldered and athletic, with visible muscle' },
    { min: 16, max: 17, description: 'a powerful, imposing build, with a strong grip and confident posture' },
    { min: 18, max: 20, description: 'an intensely muscular, almost intimidating physique, like a professional athlete or soldier' },
  ],
  CON: [
    { min: 1, max: 3, description: 'a sickly, fragile appearance, with shallow breathing and pale skin' },
    { min: 4, max: 5, description: 'looks perpetually exhausted, with dark circles under their eyes' },
    { min: 6, max: 7, description: 'a thin, vulnerable look, often appearing winded or tired' },
    { min: 8, max: 9, description: 'seems to have low stamina, easily flushed or out of breath' },
    { min: 10, max: 11, description: 'appears to be in average health, with normal vitality' },
    { min: 12, max: 13, description: 'a hardy, resilient appearance, quick to recover' },
    { min: 14, max: 15, description: 'a robust and energetic presence, with steady stamina' },
    { min: 16, max: 17, description: 'an unyielding, tough-as-nails look, showing great endurance' },
    { min: 18, max: 20, description: 'an aura of incredible vitality, seemingly tireless and immune to hardship' },
  ],
  DEX: [
    { min: 1, max: 3, description: 'stiff, awkward, and clumsy movements' },
    { min: 4, max: 5, description: 'fidgety and uncoordinated, with a slight tremor in their hands' },
    { min: 6, max: 7, description: 'a bit heavy-footed, lacking in grace' },
    { min: 8, max: 9, description: 'moves with average coordination' },
    { min: 10, max: 11, description: 'steady hands and a balanced, controlled posture' },
    { min: 12, max: 13, description: 'quick, efficient movements and a poised stance' },
    { min: 14, max: 15, description: 'light on their feet, with excellent reflexes and a sense of coiled readiness' },
    { min: 16, max: 17, description: 'agile and precise, with an almost dancer-like grace' },
    { min: 18, max: 20, description: 'moves with fluid, economical grace; a blur of controlled motion' },
  ],
  INT: [
    { min: 1, max: 3, description: 'a dull, vacant expression, slow to react' },
    { min: 4, max: 5, description: 'a confused, unfocused gaze, often missing details' },
    { min: 6, max: 7, description: 'a plain, simple expression, seems to be a follower' },
    { min: 8, max: 9, description: 'a practical, grounded look, but not intellectually curious' },
    { min: 10, max: 11, description: 'an alert, observant expression, taking in their surroundings' },
    { min: 12, max: 13, description: 'a thoughtful, calculating gaze, clearly analyzing the situation' },
    { min: 14, max: 15, description: 'sharp, perceptive eyes that miss nothing' },
    { min: 16, max: 17, description: 'a scholarly, analytical demeanor, with an intense focus' },
    { min: 18, max: 20, description: 'a piercing, genius-level gaze that seems to see right through things' },
  ],
  POW: [
    { min: 1, max: 3, description: 'a broken, haunted look; completely detached and unresponsive' },
    { min: 4, max: 5, description: 'nervous, shifty eyes; looks easily startled and overwhelmed' },
    { min: 6, max: 7, description: 'a weak, uncertain presence; seems hesitant and lacking in confidence' },
    { min: 8, max: 9, description: 'appears stressed and mentally fatigued' },
    { min: 10, max: 11, description: 'a calm, steady demeanor; mentally composed' },
    { min: 12, max: 13, description: 'a focused, determined expression; not easily shaken' },
    { min: 14, max: 15, description: 'an unflinching, resolute gaze; exudes a quiet confidence' },
    { min: 16, max: 17, description: 'an aura of intense mental fortitude; seems unshakable under pressure' },
    { min: 18, max: 20, description: 'a commanding, almost palpable willpower; an intimidatingly strong presence' },
  ],
  CHA: [
    { min: 1, max: 3, description: 'an unsettling, repellent aura; inspires immediate distrust' },
    { min: 4, max: 5, description: 'awkward and withdrawn, avoids eye contact and social interaction' },
    { min: 6, max: 7, description: 'an unremarkable, forgettable face and a bland personality' },
    { min: 8, max: 9, description: 'seems reserved and difficult to get to know' },
    { min: 10, max: 11, description: 'a polite, professional demeanor; approachable but not memorable' },
    { min: 12, max: 13, description: 'an engaging and friendly expression; easily makes conversation' },
    { min: 14, max: 15, description: 'a confident, trustworthy smile; naturally puts people at ease' },
    { min: 16, max: 17, description: 'a commanding presence that naturally draws attention and respect' },
    { min: 18, max: 20, description: 'an exceptionally charismatic and persuasive aura; a natural leader who inspires loyalty' },
  ],
};

export const BOND_STRENGTH_DESCRIPTORS: AttributeScoreDescriptor[] = [
    { min: 3, max: 5, description: "This bond is fraught with weakness and insecurity. The agent feels a sense of guilt, fear, or helplessness. The description should reflect a deeply troubled or fragile connection." },
    { min: 6, max: 8, description: "This bond is strained. There are underlying issues of doubt and unspoken resentment. The description should hint at instability and emotional distance." },
    { min: 9, max: 12, description: "This is a standard, stable bond. It is a source of comfort for the agent, but it is not without its everyday challenges. The description should feel grounded and real." },
    { min: 13, max: 15, description: "This is a strong, healthy bond. It is a source of genuine strength and hope for the agent. The description should be positive and reflect mutual trust and support." },
    { min: 16, max: 18, description: "This is an exceptionally powerful bond. It is an anchor for the agent's sanity, a beacon of optimism and control in their chaotic life. The description should be inspiring and deeply affirmative." },
];
