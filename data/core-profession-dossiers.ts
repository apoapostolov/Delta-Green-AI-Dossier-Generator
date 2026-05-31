import type { Profession } from '../types';

const CORE_PROFESSION_INFO_IDS: Record<string, string> = {
  'Anthropologist or Historian': 'core_profession_anthropologist_or_historian',
  'Computer Scientist or Engineer': 'core_profession_computer_scientist_or_engineer',
  'Federal Agent': 'core_profession_federal_agent',
  'Physician': 'core_profession_physician',
  'Scientist': 'core_profession_scientist',
  'Special Operator': 'core_profession_special_operator',
  'Criminal': 'core_profession_criminal',
  'Firefighter': 'core_profession_firefighter',
  'Foreign Service Officer': 'core_profession_foreign_service_officer',
  'Intelligence Analyst': 'core_profession_intelligence_analyst',
  'Intelligence Case Officer': 'core_profession_intelligence_case_officer',
  'Lawyer or Business Executive': 'core_profession_lawyer_or_business_executive',
  'Media Specialist': 'core_profession_media_specialist',
  'Nurse or Paramedic': 'core_profession_nurse_or_paramedic',
  'Pilot or Sailor': 'core_profession_pilot_or_sailor',
  'Police Officer': 'core_profession_police_officer',
  'Program Manager': 'core_profession_program_manager',
  'Soldier or Marine': 'core_profession_soldier_or_marine',
};

const GROUP_BRIEFS: Record<string, {
  focus: string;
  tempo: string;
  deltaGreen: string;
}> = {
  'Academic Expert': {
    focus: 'research, interpretation, and the patient recovery of meaning from damaged or buried information',
    tempo: 'usually slow and deliberate until a discovery forces the work into the field',
    deltaGreen: 'helps the team understand old sites, strange symbols, historical gaps, and the people who can explain them',
  },
  'Civilian Specialist': {
    focus: 'specialized technical work inside a normal civilian career structure',
    tempo: 'often office-bound, but capable of moving into the field when the job demands it',
    deltaGreen: 'brings a real-world professional identity that still functions when the supernatural complicates everything',
  },
  'Federal Agent': {
    focus: 'investigation, authority, evidence, and the practical use of federal power',
    tempo: 'fast, procedural, and usually tied to warrants, interviews, and interagency coordination',
    deltaGreen: 'is the classic fit for operations that need a badge, a cover, and the ability to make decisions under pressure',
  },
  'Military': {
    focus: 'discipline, deployment, weapons competence, and teamwork under extreme conditions',
    tempo: 'structured, mission-driven, and often tied to training cycles or deployment schedules',
    deltaGreen: 'supplies people who can survive hostile terrain and still act like professionals when the world goes sideways',
  },
};

const buildSkillLine = (skills: Profession['professionalSkills']) =>
  skills.map((skill) => `${skill.name} ${skill.value}%`).join(', ');

const buildChoiceLine = (groups: Profession['choiceGroups']) =>
  groups
    .map((group, index) => {
      const options = group.options.map((option) => `${option.name} ${option.value}%`).join(', ');
      return `Choice ${index + 1} (${group.count}): ${options}`;
    })
    .join('\n');

const buildShort = (profession: Profession): string => {
  const groupBrief = GROUP_BRIEFS[profession.group];
  const stats = profession.recommendedStats.length > 0 ? profession.recommendedStats.join(', ') : 'no single dominant stat';
  return `${profession.name} is a ${profession.group.toLowerCase()} profile built around ${profession.description.toLowerCase()} It rewards ${stats} and a working understanding of ${groupBrief.focus}.`;
};

const buildLong = (profession: Profession): string => {
  const groupBrief = GROUP_BRIEFS[profession.group];
  const lines = [
    `## ${profession.name}`,
    '',
    `**Role Summary:** ${profession.description}`,
    '',
    `**Career Type:** ${profession.group}. This profile usually leans into ${groupBrief.focus}. In play, it tends to move at a pace that is ${groupBrief.tempo}.`,
    '',
    `**Why Delta Green Uses It:** ${groupBrief.deltaGreen}.`,
    '',
    `**Recommended Stats:** ${profession.recommendedStats.join(', ')}.`,
    '',
    `**Starting Bonds:** ${profession.bonds}.`,
    '',
    `**Bonus Skill Advancements:** ${profession.bonusSkillAdvancements}. Each advancement is a +20% increase during creation, so this role rewards careful planning.`,
    '',
    `**Professional Skills:** ${buildSkillLine(profession.professionalSkills)}.`,
  ];

  if (profession.choiceGroups.length > 0) {
    lines.push('', '**Flexible Training:**');
    for (const group of profession.choiceGroups) {
      lines.push(`- Choose ${group.count}: ${group.options.map((option) => `${option.name} ${option.value}%`).join(', ')}`);
    }
  }

  if (profession.ranks && profession.ranks.length > 0) {
    lines.push('', '**Career Arc:**');
    for (const rank of profession.ranks) {
      lines.push(`- ${rank}`);
    }
  }

  if (profession.archetypicalClothing) {
    lines.push('', `**Typical Appearance:** ${profession.archetypicalClothing}`);
  }

  if (profession.equipmentKit && profession.equipmentKit.length > 0) {
    lines.push('', `**Equipment Kit:** ${profession.equipmentKit.join(', ')}.`);
  }

  if (profession.specialTrainings && profession.specialTrainings.length > 0) {
    lines.push('', '**Special Training:**');
    for (const training of profession.specialTrainings) {
      lines.push(`- ${training}`);
    }
  }

  lines.push('', '**Table Use:**');
  lines.push(`- This role works best when the Handler wants an agent who already belongs in a real institution or profession.`);
  lines.push(`- It is strongest when the mission can be framed through ${profession.group.toLowerCase()} expectations and then bent toward the unnatural.`);
  lines.push(`- The role’s real value is often less about raw numbers than about believable access, credibility, and habits under stress.`);

  return lines.join('\n');
};

export function attachCoreProfessionInfoIds(professions: Profession[]): Profession[] {
  return professions.map((profession) => ({
    ...profession,
    infoId: profession.infoId ?? CORE_PROFESSION_INFO_IDS[profession.name],
  }));
}

export function buildCoreProfessionInformation(professions: Profession[]): Record<string, { short: string; long: string }> {
  return Object.fromEntries(
    professions.map((profession) => [
      CORE_PROFESSION_INFO_IDS[profession.name],
      {
        short: buildShort(profession),
        long: buildLong(profession),
      },
    ])
  );
}

export { CORE_PROFESSION_INFO_IDS };
