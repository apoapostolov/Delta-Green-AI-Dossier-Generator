import type { DGItem } from '../types';

export const weaponAccessories: DGItem[] = [
  {
    section: 'Weapon Accessories',
    name: 'Holographic Sight',
    expense: 'Standard',
    description: 'Gives a +20% bonus to hit as long as your Agent has taken no damage since his or her last action.',
    isRestricted: false,
    sourceType: 'core'
  },
  {
    section: 'Weapon Accessories',
    name: 'Night Vision Sight',
    expense: 'Standard',
    description: 'Allows aiming in reduced light conditions such as starlight. Useful to 400 m. Runs for 100 hours. Doubles a firearm’s base range at night if your Agent spends the previous turn taking the Aim action.',
    isRestricted: false,
    sourceType: 'core'
  },
  {
    section: 'Weapon Accessories',
    name: 'Sound Suppressor',
    expense: 'Standard',
    description: 'RESTRICTED. Requires an Alertness test to hear from beyond a wall or a door. An especially quiet suppressed shot, such as a light pistol, incurs a –20% penalty.',
    isRestricted: true,
    sourceType: 'core'
  },
  {
    section: 'Weapon Accessories',
    name: 'Targeting Laser',
    expense: 'Standard',
    description: 'Gives a +20% bonus to hit as long as your Agent has taken no damage since his or her last action. Does not require your Agent to raise the gun to his or her eyes. Useful to 200 m. Runs for 100 hours. Also available as an Unusual expense with an infrared (IR) mode that can only be seen with NVGs or night-vision sights.',
    isRestricted: false,
    sourceType: 'core'
  },
  {
    section: 'Weapon Accessories',
    name: 'Telescopic Sight',
    expense: 'Standard',
    description: 'Doubles a firearm’s base range if your Agent spent the previous turn taking the Aim action.',
    isRestricted: false,
    sourceType: 'core'
  },
  {
    section: 'Weapon Accessories',
    name: 'Advanced Combat Optical Gunsight (ACOG)',
    expense: 'Unusual',
    description: 'Combines the effects of a holographic sight and a telescopic sight.',
    isRestricted: false,
    sourceType: 'core'
  },
  {
    section: 'Weapon Accessories',
    name: 'Thermal Weapon Sight (TWS)',
    expense: 'Unusual',
    description: 'Allows aiming in complete darkness. Useful to 400 m. Runs for two hours. Doubles a firearm’s base range if you spent the previous turn taking the Aim action.',
    isRestricted: false,
    sourceType: 'core'
  },
  {
    section: 'Weapon Accessories',
    name: '“Ghost Gun” Machine (heavy-duty desktop 3D printer with software)',
    expense: 'Major',
    description: 'Can mill a block of aluminum into the lower receiver for a firearm. Other gun parts can be bought without licensing as an Unusual expense. Firearm assembly requires an INT×5 test with special training, or a Craft (Gunsmithing) test. If the test fails, the gun is unreliable; see JUNK on page 93.',
    isRestricted: false,
    sourceType: 'core'
  },
];
