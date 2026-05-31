import type { DGItem } from '../types';

export const demolitions: DGItem[] = [
  {
    section: 'Demolitions',
    name: 'ANFO Explosive',
    shortName: 'ANFO Explosive',
    skill: 'Demolitions',
    armorPiercing: 'N/A',
    expense: 'Incidental',
    radius: '20 m',
    lethality: '30%',
    killRadius: '20 m',
    description: 'Ammonium nitrate fuel oil — diesel fuel and fertilizer; requires Science (Chemistry) and Demolitions skills.',
    isRestricted: false,
    sourceType: 'core'
  },
  {
    section: 'Demolitions',
    name: 'C4 Plastic Explosive Block (570 g)',
    shortName: 'C4 Block (570g)',
    skill: 'Demolitions',
    armorPiercing: 'N/A',
    expense: 'Incidental',
    radius: '2 m',
    lethality: '30%',
    killRadius: '2 m',
    description: 'RESTRICTED. Example: M112.',
    isRestricted: true,
    sourceType: 'core'
  },
  {
    section: 'Demolitions',
    name: 'Improvised Explosive Device (IED)',
    shortName: 'IED',
    skill: 'Demolitions',
    armorPiercing: 'N/A',
    expense: 'Incidental',
    radius: '10 m',
    lethality: '15%',
    killRadius: '10 m',
    description: 'RESTRICTED, though the ingredients usually are not. Example: Pipe bomb. A larger one (a bomb vest) has 30% lethality and 20 m Kill Radius.',
    isRestricted: true,
    sourceType: 'core'
  },
  {
    section: 'Demolitions',
    name: 'Large IED',
    shortName: 'Large IED',
    skill: 'Demolitions',
    armorPiercing: 'N/A',
    expense: 'Standard',
    radius: '75 m',
    lethality: '60%',
    killRadius: '75 m',
    description: 'RESTRICTED, though the ingredients usually are not. Example: Car bomb.',
    isRestricted: true,
    sourceType: 'core'
  },
  {
    section: 'Demolitions',
    name: 'Explosively-Formed Penetrator Mine',
    shortName: 'EFP Mine',
    skill: 'Demolitions',
    armorPiercing: '20',
    expense: 'Standard',
    radius: '10 m',
    lethality: '25%',
    killRadius: '10 m',
    description: 'RESTRICTED. Example: M21.',
    isRestricted: true,
    sourceType: 'core'
  },
];
