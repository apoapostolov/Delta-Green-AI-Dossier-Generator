import type { DGItem } from '../types';

export const surveillance: DGItem[] = [
  {
    section: 'Surveillance',
    name: 'Simple Directional Microphone',
    expense: 'Incidental',
    description: '10 m range in typical urban conditions.',
    isRestricted: false,
    sourceType: 'core'
  },
  {
    section: 'Surveillance',
    name: 'Bug Detector',
    expense: 'Standard',
    isRestricted: false,
    sourceType: 'core'
  },
  {
    section: 'Surveillance',
    name: 'Fiber Optic Scope',
    expense: 'Standard',
    isRestricted: false,
    sourceType: 'core'
  },
  {
    section: 'Surveillance',
    name: 'GPS Jammer',
    expense: 'Standard',
    isRestricted: false,
    sourceType: 'core'
  },
  {
    section: 'Surveillance',
    name: 'Voice-Activated Recorder',
    expense: 'Standard',
    isRestricted: false,
    sourceType: 'core'
  },
  {
    section: 'Surveillance',
    name: 'Directional Microphone & Acoustic Software',
    expense: 'Standard',
    description: '20 m range in typical urban conditions. Advanced versions have 50 m range as an Unusual expense.',
    isRestricted: false,
    sourceType: 'core'
  },
  {
    section: 'Surveillance',
    name: 'Basic, Open-Market Drone',
    expense: 'Standard',
    description: 'Requires special training (DEX).',
    isRestricted: false,
    sourceType: 'core'
  },
  {
    section: 'Surveillance',
    name: 'Audio Jammer (RF/cellular)',
    expense: 'Unusual',
    isRestricted: false,
    sourceType: 'core'
  },
  {
    section: 'Surveillance',
    name: 'GPS Tracking Device',
    expense: 'Unusual',
    isRestricted: false,
    sourceType: 'core'
  },
  {
    section: 'Surveillance',
    name: 'Advanced Drone',
    expense: 'Unusual',
    description: 'Requires Pilot (Drone) skill.',
    isRestricted: false,
    sourceType: 'core'
  },
  {
    section: 'Surveillance',
    name: 'Ground-Penetrating Radar',
    expense: 'Major',
    description: 'About the size of a lawn mower; requires special training (INT).',
    isRestricted: false,
    sourceType: 'core'
  },
    {
    section: 'Surveillance',
    name: 'Sewer Camera',
    expense: 'Standard',
    description: 'A waterproof camera on a long, flexible cable for inspecting pipes and other confined spaces.',
    isRestricted: false,
    sourceType: 'ai'
  },
  {
    section: 'Surveillance',
    name: 'Military-Grade Drone',
    expense: 'Extreme',
    description: 'Requires Pilot (Drone) skill; can carry weapons.',
    isRestricted: false,
    sourceType: 'core'
  },
  {
    section: 'Surveillance',
    name: 'DSLR Camera',
    expense: 'Standard',
    description: 'A high-quality digital single-lens reflex camera with various lenses for photography and video.',
    isRestricted: false,
    sourceType: 'ai'
  },
  {
    section: 'Surveillance',
    name: 'Covert Comm Device',
    expense: 'Unusual',
    description: 'A nearly invisible earpiece and microphone for clandestine communication.',
    isRestricted: true,
    sourceType: 'ai'
  },
  {
    section: 'Surveillance',
    name: 'Covert Surveillance Kit',
    expense: 'Unusual',
    description: 'A kit containing miniature cameras, microphones ("bugs"), and receivers.',
    isRestricted: true,
    sourceType: 'ai'
  },
];
