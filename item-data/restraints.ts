import type { DGItem } from '../types';

export const restraints: DGItem[] = [
  {
    section: 'Restraints',
    name: 'Flexible Cuffs',
    expense: 'Incidental',
    description: 'Requires a blade or scissors to cut open. A zip-tie used as makeshift cuffs can be broken open with a STRx5 test at +20%.',
    isRestricted: false,
    sourceType: 'core'
  },
  {
    section: 'Restraints',
    name: 'Handcuffs',
    expense: 'Incidental',
    description: 'Require a cuff key, special training with lockpicks, or Craft (Locksmith) to open; or a DEXx5 test at -20% to wriggle out.',
    isRestricted: false,
    sourceType: 'core'
  },
];
