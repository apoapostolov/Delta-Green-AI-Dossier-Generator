import type { DGItem } from '../types';

export const breakingAndEntering: DGItem[] = [
  {
    section: 'Breaking & Entering',
    name: 'Lockpick Kit',
    expense: 'Incidental',
    description: 'Requires special training (DEX).',
    isRestricted: false,
    sourceType: 'core'
  },
  {
    section: 'Breaking & Entering',
    name: 'Multi-Tool',
    expense: 'Incidental',
    description: 'A compact tool with pliers, screwdrivers, a knife, etc. Can be used for simple Craft tests.',
    isRestricted: false,
    sourceType: 'ai'
  },
  {
    section: 'Breaking & Entering',
    name: 'Halligan Forcible-Entry Tool',
    expense: 'Standard',
    description: 'Allows a STR test to get through a hard barrier.',
    isRestricted: false,
    sourceType: 'core'
  },
  {
    section: 'Breaking & Entering',
    name: 'Lockpick Gun',
    expense: 'Standard',
    description: 'Works only on simple tumbler locks.',
    isRestricted: false,
    sourceType: 'core'
  },
];
