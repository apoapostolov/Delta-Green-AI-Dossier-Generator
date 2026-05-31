import type { DGItem } from '../types';

export const handToHandWeapons: DGItem[] = [
  {
    section: 'Hand-to-Hand Weapons',
    name: 'Unarmed Attack',
    shortName: 'Unarmed Attack',
    skill: 'Unarmed Combat',
    damage: '1D4-1',
    armorPiercing: 'N/A',
    expense: 'None',
    isRestricted: false,
    sourceType: 'core'
  },
  {
    section: 'Hand-to-Hand Weapons',
    name: 'Garrote',
    shortName: 'Garrote',
    skill: 'Unarmed Combat',
    damage: 'special',
    armorPiercing: 'N/A',
    expense: 'Incidental',
    description: "Works only from surprise. If it succeeds, the target is pinned and cannot make a sound; does 1D6 damage per round until escape or death. A Kevlar garrote can cut flexible cuffs.",
    isRestricted: false,
    sourceType: 'core'
  },
  {
    section: 'Hand-to-Hand Weapons',
    name: 'Brass Knuckles / Heavy Flashlight / Steel-Toe Boots',
    shortName: 'Brass Knuckles/etc.',
    skill: 'Unarmed Combat',
    damage: '1D4',
    armorPiercing: 'N/A',
    expense: 'Incidental',
    isRestricted: false,
    sourceType: 'core'
  },
  {
    section: 'Hand-to-Hand Weapons',
    name: 'Hammer and Wrench',
    shortName: 'Hammer and Wrench',
    skill: 'Melee Weapons',
    damage: '1D4',
    armorPiercing: 'N/A',
    expense: 'Incidental',
    description: "A set of basic hand tools.",
    isRestricted: false,
    sourceType: 'ai'
  },
  {
    section: 'Hand-to-Hand Weapons',
    name: 'Knife',
    shortName: 'Knife',
    skill: 'Melee Weapons',
    damage: '1D4',
    armorPiercing: '3',
    expense: 'Incidental',
    isRestricted: false,
    sourceType: 'core'
  },
  {
    section: 'Hand-to-Hand Weapons',
    name: 'Hatchet',
    shortName: 'Hatchet',
    skill: 'Melee Weapons',
    damage: '1D4',
    armorPiercing: 'N/A',
    expense: 'Incidental',
    isRestricted: false,
    sourceType: 'core'
  },
  {
    section: 'Hand-to-Hand Weapons',
    name: 'Large Knife or Combat Dagger',
    shortName: 'Lg Knife/Dagger',
    skill: 'Melee Weapons',
    damage: '1D6',
    armorPiercing: '3',
    expense: 'Incidental',
    isRestricted: false,
    sourceType: 'core'
  },
  {
    section: 'Hand-to-Hand Weapons',
    name: 'Club / Nightstick / Baton / Collapsible Baton',
    shortName: 'Club/Baton',
    skill: 'Melee Weapons',
    damage: '1D6',
    armorPiercing: 'N/A',
    expense: 'Incidental',
    isRestricted: false,
    sourceType: 'core'
  },
    {
    section: 'Hand-to-Hand Weapons',
    name: 'Crowbar',
    shortName: 'Crowbar',
    skill: 'Melee Weapons',
    damage: '1D6',
    armorPiercing: 'N/A',
    expense: 'Incidental',
    description: "Allows a STR test at +10% to pry open doors or containers.",
    isRestricted: false,
    sourceType: 'ai'
  },
  {
    section: 'Hand-to-Hand Weapons',
    name: 'Baseball Bat or Rifle Butt',
    shortName: 'Baseball Bat/R. Butt',
    skill: 'Melee Weapons',
    damage: '1D6',
    armorPiercing: 'N/A',
    expense: 'Incidental',
    isRestricted: false,
    sourceType: 'core'
  },
  {
    section: 'Hand-to-Hand Weapons',
    name: 'Machete / Tomahawk / Sword',
    shortName: 'Machete/Tomahawk',
    skill: 'Melee Weapons',
    damage: '1D8',
    armorPiercing: 'N/A',
    expense: 'Incidental',
    isRestricted: false,
    sourceType: 'core'
  },
  {
    section: 'Hand-to-Hand Weapons',
    name: 'Spear or Fixed Bayonet',
    shortName: 'Spear/Bayonet',
    skill: 'Melee Weapons',
    damage: '1D8',
    armorPiercing: '3',
    expense: 'Incidental',
    isRestricted: false,
    sourceType: 'core'
  },
  {
    section: 'Hand-to-Hand Weapons',
    name: 'Wood Axe',
    shortName: 'Wood Axe',
    skill: 'Melee Weapons',
    damage: '1D10',
    armorPiercing: 'N/A',
    expense: 'Incidental',
    isRestricted: false,
    sourceType: 'core'
  },
  {
    section: 'Hand-to-Hand Weapons',
    name: 'Battering Ram',
    shortName: 'Battering Ram',
    skill: 'Melee Weapons',
    damage: '1D10',
    expense: 'Unusual',
    description: 'Requires two people. Allows a STR test at +20% to breach a standard door.',
    isRestricted: false,
    sourceType: 'ai'
  },
  {
    section: 'Hand-to-Hand Weapons',
    name: 'Large Sword',
    shortName: 'Large Sword',
    skill: 'Melee Weapons',
    damage: '1D10',
    armorPiercing: 'N/A',
    expense: 'Standard',
    isRestricted: false,
    sourceType: 'core'
  },
  {
    section: 'Hand-to-Hand Weapons',
    name: 'Two-Handed Sword',
    shortName: 'Two-Handed Sword',
    skill: 'Melee Weapons',
    damage: '1D12',
    armorPiercing: 'N/A',
    expense: 'Standard',
    description: 'Requires special training.',
    isRestricted: false,
    sourceType: 'core'
  },
];
