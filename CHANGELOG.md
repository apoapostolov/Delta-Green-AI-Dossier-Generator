# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Changed

-   Reorganized the flat data, prompt, and configuration modules into `data/`,
    `prompts/`, and `config/` folders so the project root stays cleaner.
-   Updated the Vite dev server and launcher scripts to use port `3002`.
-   Backported the provider-aware AI runtime from the richer Call of Cthulhu
    project so DG now supports Settings-based provider/model selection, `.env`
    loading, AI skill distribution for DG bonus advancements, and restored
    save/load coverage for the new state.

### Added

-   **1950s Era**: Extended the selectable operational eras back to the 1950s, with thematic prompts for the Red Scare period.
-   **Enhanced Dossier Prompt**: The dossier generation prompt now includes the agent's era, nationality, profession, rank, reporting structure, and top three skills for a more context-aware narrative.
-   **Historical Context in Dossier**: The AI is now instructed to ground the agent's dossier in real-world political, geopolitical, or clandestine events from a specific year within their operational era.
-   **Dossier Prompt Preview**: The AI prompt for the Career Dossier can now be viewed in the UI before the career is simulated.
-   **The Complex Profession Import**: Added a first-pass backport of The Complex profession set as selectable Tab 1 professions, with repaired Markdown dossier text sourced from the OCR dumps and exposed through the profession `(?)` modal.

### Changed

-   **Finalized Dossier Generation**: The "Regenerate Dossier" button has been removed. Once generated, an agent's dossier is final.
-   **Rebalanced Promotion System**: Promotion chance is now more challenging at higher ranks. The base chance starts at 3% per year and is reduced by 20% for each subsequent rank, emphasizing performance-based advancement for senior agents.
-   **Updated Weird Event Mechanics**: The sanity impact of "Weird Events" has been re-tuned:
    -   **Success**: 0 SAN loss (previously -1).
    -   **Failure**: -1 SAN loss (previously -1d4).
    -   **Critical Success**: +1 SAN gain (new).
    -   **Critical Failure**: -1d4 SAN loss (new).

## [1.0.0] - 2024-06-01

### Added

-   **Massive Career Simulation Expansion**: Increased the number of possible career and personal life events by over 4x for all professions.
-   **"Weird Events" System**: Implemented a new mechanic where agents have an annual, SAN-draining chance to experience a strange, unsettling event. The probability is tied to their Unnatural skill.
-   **Realistic Promotion System**: Added a 6-rank career ladder for every profession with researched, real-world titles. Promotion chance is now dynamically calculated based on time-in-grade and performance.
-   **Career Danger Levels**: Categorized all professions as `casual`, `risky`, or `deadly`, with corresponding annual risks for permanent injury or death.
-   **AI-Generated Medical Reports**: When an agent suffers a permanent injury, the AI now generates a clinical, in-universe medical report detailing the long-term consequences.
-   **Career Progression UI**: Added a new visual panel on the Dossier tab to display the full rank ladder for the agent's profession, showing achieved, current, and unachieved ranks.
-   **Critical Success/Failure Mechanics**: Implemented critical successes (on rolls of 01 or doubles) and fumbles (on a roll of 100) for career checks, with unique mechanical and visual outcomes.
-   **Failed Promotion Tracking**: The simulation now tracks failed promotion attempts, and the UI displays this information on the Career Progression panel.
-   **Positive Sanity Events**: Added events (e.g., childbirth, commendations) that can restore small amounts of SAN, capped at the agent's starting maximum.

### Changed

-   **Refactored AI Hooks**: Broke down the monolithic `useAIGeneration` hook into a smaller orchestrator and a new, dedicated `useCareerSimulation` hook for better modularity and separation of concerns.
-   **UI Polish for Stat Changes**: Redesigned the "pills" that indicate career-related changes to attributes and derived stats to be more visually appealing and integrated into their parent containers.
-   **Improved AI Prompts**: Significantly updated the AI prompts for career narratives to enforce a first-person perspective and provide better historical context, resulting in higher-quality "memories".
-   **Promotion Balancing**: Promotions are now less frequent and require a `Bureaucracy` skill check to succeed, making them feel more earned and challenging.
-   **Rebalanced Career Risks**: Adjusted the probabilities for catastrophic events in "deadly" careers to a 2% chance of permanent injury and a 1% chance of death annually.
-   **Tooltip Information**: Enhanced tooltips for attributes, stats, and skills to show the specific modifiers from each career event.
-   **Relocated Career Summary**: Moved the Career Progression panel from the Attributes tab to the Dossier tab for better contextual relevance.

### Fixed

-   **Simulation Worker Errors**: Corrected multiple syntax and logic errors within the inlined simulation worker code that were causing crashes.
-   **SAN Gain Styling**: Ensured that positive SAN changes in the career timeline are correctly styled in green with a `+` prefix.
-   **Data Consistency**: Resolved a bug where SAN loss could be calculated inconsistently between the event log and the final summary.
-   **Promotion Event Display**: Removed old, generic "Promotion" events to ensure all promotions are handled by the dynamic system and correctly display the change in rank and title.
-   **TypeScript Errors**: Corrected various TypeScript type errors across multiple files, including `sim/worker.ts` and `components/draft/CareerTimeline.tsx`.
