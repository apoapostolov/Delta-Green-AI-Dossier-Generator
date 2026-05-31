export const isCriticalThreshold = (value: number): boolean => {
    return value > 0 && value < 100 && value % 11 === 0;
};
  
export const pointsToNextCritical = (value: number): string => {
    if (value >= 99) return "Max critical threshold reached.";
    const nextCritical = Math.floor(value / 11) * 11 + 11;
    const pointsNeeded = nextCritical - value;
    return `${pointsNeeded} point${pointsNeeded > 1 ? 's' : ''} to next critical threshold (${nextCritical}%).`;
};

export const normalizeEventKind = (kind: string): string => {
    if (kind === 'KIA') return 'KIA';
    return kind.replace(/(?<=[a-z])(?=[A-Z])/g, ' ');
};

export const SKILL_GROUPS: { name: string; skills: string[] }[] = [
    { name: 'Investigation & Espionage', skills: ['Alertness', 'Computer Science', 'Criminology', 'Forensics', 'HUMINT', 'Search', 'SIGINT'] },
    { name: 'Social & Influence', skills: ['Bureaucracy', 'Persuade', 'Psychotherapy'] },
    { name: 'Combat & Tactics', skills: ['Artillery', 'Demolitions', 'Dodge', 'Firearms', 'Heavy Weapons', 'Melee Weapons', 'Military Science', 'Unarmed Combat'] },
    { name: 'Physical & Maneuver', skills: ['Athletics', 'Drive', 'Navigate', 'Pilot', 'Ride', 'Stealth', 'Survival', 'Swim'] },
    { name: 'Academic & Medical', skills: ['Anthropology', 'Archaeology', 'History', 'Law', 'Medicine', 'Occult', 'Pharmacy', 'Science', 'Surgery'] },
    { name: 'Technical & Craft', skills: ['Accounting', 'Art', 'Craft', 'Disguise', 'First Aid', 'Heavy Machinery', 'Foreign Language'] },
    { name: 'Special', skills: ['Unnatural'] }
];