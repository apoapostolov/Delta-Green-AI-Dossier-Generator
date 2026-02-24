import type { DGItem } from '../types';

export const lightingAndVision: DGItem[] = [
  {
    section: 'Lighting and Vision',
    name: 'Large Flashlight',
    expense: 'Incidental',
    description: 'Useful to 100 m. Runs for 10 hours.',
    isRestricted: false,
    sourceType: 'core'
  },
  {
    section: 'Lighting and Vision',
    name: 'Tactical Light or Weapon Light',
    expense: 'Incidental',
    description: "Useful to 50 m. Runs for 1 hour. Available with optional infrared (IR) or ultraviolet (UV) filters. IR can only be seen with night vision goggles or sights. UV will make 'invisible' evidence visible, such as bodily fluids and special inks.",
    isRestricted: false,
    sourceType: 'core'
  },
  {
    section: 'Lighting and Vision',
    name: 'Ordinary Binoculars',
    expense: 'Incidental',
    description: '×10 magnification; allows Alertness tests at greater distance.',
    isRestricted: false,
    sourceType: 'core'
  },
  {
    section: 'Lighting and Vision',
    name: 'Tinted Goggles',
    expense: 'Incidental',
    description: 'Protects eyes from sun, dust, and debris.',
    isRestricted: false,
    sourceType: 'ai'
  },
  {
    section: 'Lighting and Vision',
    name: 'Civilian Night Vision Goggles (NVG)',
    expense: 'Standard',
    description: 'Allows operating in reduced light. Runs for 100 hours. Most skill tests such as Driving, Pilot, and ranged attack rolls are at a –20% penalty. The attack penalty can be avoided if NVGs are used with a targeting laser in IR mode.',
    isRestricted: false,
    sourceType: 'core'
  },
  {
    section: 'Lighting and Vision',
    name: 'Advanced Binoculars or Telescope',
    expense: 'Standard',
    description: '×20 magnification; allows Alertness tests at greater distance.',
    isRestricted: false,
    sourceType: 'core'
  },
  {
    section: 'Lighting and Vision',
    name: 'Powerful Telescope',
    expense: 'Unusual',
    description: '×50 magnification; allows Alertness tests at greater distance.',
    isRestricted: false,
    sourceType: 'core'
  },
  {
    section: 'Lighting and Vision',
    name: 'Military-Grade Night Vision Goggles',
    expense: 'Major',
    description: 'RESTRICTED. Allows operating in reduced light conditions. Most skills are at no penalty. If finely detailed perception is required then a –20% penalty applies.',
    isRestricted: true,
    sourceType: 'core'
  },
];
