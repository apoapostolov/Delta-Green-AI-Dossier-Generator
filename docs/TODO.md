# Project Roadmap & TODO List

This document outlines potential future features, improvements, and technical tasks for the AI Character Creator Template.

## High-Priority Features

- [ ] **Character Save/Load**: Implement a system using browser `localStorage` to save a character's state, allowing users to close the tab and resume their session later.
- [ ] **Custom Item Entry**: Allow users to add their own custom items with custom names, costs, and weights in the equipment management section.
- [ ] **Advanced Spell/Ability Management**: For classes with special abilities, create a dedicated interface to manage them beyond just initial creation, such as preparing spells for the day.

## Medium-Priority Features

- [ ] **Theme Expansion**: Add more generic campaign setting themes (e.g., Sci-Fi, Cyberpunk, Modern) with example language lists and AI prompt adjustments.
- [ ] **Advanced Hireling Management**: Create a generic system for creating and managing multiple hirelings, tracking their stats and loyalty.

## UI/UX Improvements

- [ ] **Mobile Layout Optimization**: Further refine the layout for a better experience on small mobile screens, particularly in the `ManageTab`.
- [ ] **Accessibility Review**: Conduct a full accessibility audit (ARIA attributes, keyboard navigation, color contrast) to ensure the app is usable for everyone.
- [ ] **Subtle Animations**: Add more animations and transitions (e.g., when cards appear/disappear) to make the interface feel more dynamic.
- [ ] **Loading Skeletons**: Replace some spinners with skeleton loaders for a better perceived performance during data fetching/generation.

## Technical Debt & Code Quality

- [ ] **Unit & Integration Testing**: Write unit tests for critical utility functions and integration tests for major user flows (like AI generation).
- [ ] **Component Styling Consolidation**: Review components for inline styles and move them to a more organized CSS-in-JS or modular CSS solution.
- [ ] **Dependency Audit**: Periodically review the `importmap` dependencies for available updates and security vulnerabilities.
- [ ] **Error Handling**: Improve user-facing error messages from the AI API to be more specific (e.g., distinguishing between a network error and a content safety block).
