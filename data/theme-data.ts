import type { ThemeConfig } from '../types';

// This file is repurposed to provide the AI prompt configuration for Delta Green.
// In the new structure, there is only one theme.
export const THEMES: Record<string, ThemeConfig> = {
  'delta-green': {
    displayName: 'Delta Green',
    portrait: {
      theme: "modern conspiracy horror, clandestine operations",
      setting: "a sterile government facility, a dimly lit safe house, or a grim urban environment under surveillance",
      atmosphere: "tense, paranoid, and weary. A sense of psychological decay and the crushing weight of forbidden knowledge.",
      visualStyle: "Hyper-realistic, gritty, cinematic digital painting. Emulate the look of a modern thriller film. Use a desaturated color palette with high contrast and harsh, dramatic lighting (e.g., top-down fluorescent lights, Venetian blind shadows).",
      additionalDetails: "Characters should appear as plausible professionals (agents, scholars, soldiers) who are subtly 'wrong'—showing signs of extreme stress, lack of sleep, and the thousand-yard stare of someone who has seen too much. Their gear should be modern, practical, and government-issue.",
    },
    name: {
      promptDescription: "for a modern-day professional in a clandestine setting."
    },
  }
};
