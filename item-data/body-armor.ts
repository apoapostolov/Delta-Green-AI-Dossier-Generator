import type { DGItem } from '../types';

export const bodyArmor: DGItem[] = [
  {
    section: 'Body Armor',
    name: 'Riot Helmet',
    expense: 'Standard',
    lethality: '+1',
    description: 'Adds its Armor Rating to any other armor. Effective only against melee weapons, thrown weapons, and unarmed attacks. Cannot be concealed.',
    isRestricted: false,
    sourceType: 'core'
  },
  {
    section: 'Body Armor',
    name: 'Kevlar Helmet',
    expense: 'Standard',
    lethality: '+1',
    description: 'Adds its Armor Rating to any other armor. Cannot be concealed.',
    isRestricted: false,
    sourceType: 'core'
  },
  {
    section: 'Body Armor',
    name: 'Kevlar Vest',
    expense: 'Standard',
    lethality: '3',
    description: 'If worn below outer garments, noticing it requires an Alertness test.',
    isRestricted: false,
    sourceType: 'core'
  },
  {
    section: 'Body Armor',
    name: 'Reinforced Kevlar Vest',
    expense: 'Unusual',
    lethality: '4',
    description: 'If worn below outer garments, noticing it requires an Alertness test at +20%.',
    isRestricted: false,
    sourceType: 'core'
  },
  {
    section: 'Body Armor',
    name: 'Tactical Body Armor',
    expense: 'Unusual',
    lethality: '5',
    description: 'Cannot be concealed.',
    isRestricted: false,
    sourceType: 'core'
  },
  {
    section: 'Body Armor',
    name: 'Ballistic Shield',
    expense: 'Unusual',
    lethality: '6',
    description: 'Provides 6 points of Armor to the user, but occupies one hand. Cannot be concealed.',
    isRestricted: false,
    sourceType: 'ai'
  },
  {
    section: 'Body Armor',
    name: 'Bomb Suit',
    expense: 'Extreme',
    lethality: '10',
    description: 'Already includes a helmet. Cannot be concealed.',
    isRestricted: false,
    sourceType: 'core'
  },
];
