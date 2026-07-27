# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.2.0] - 2026-07-27

Theme: **faster app** + **multi-provider AI control** (aligned with CoC 1.1).

### Added

- **Per-task AI setup in Settings.** Creative writing, simple writing, vision,
  and image generation each pick their own provider, remembered API key, and
  model — mix vendors freely across use cases.
- **Z.ai GLM (Coding Plan).** Coding Plan keys for text generation on the
  Coding endpoint.
- **xAI Grok (API key).** Point any slot at Grok with a standard xAI key.
- **xAI Grok (SuperGrok / OAuth).** Device-code login with browser approval —
  no API key field. Optional advanced token paste if you already have a session.
- Keys stay remembered per provider when you switch slots or reopen Settings.

### Improved

- **Much faster first load.** Heavy tabs (Skills, Gear, Dossier) and Settings
  load when you open them; print tooling loads only when you print.
- **Snappier skill editing.** Changing one skill’s advances no longer thrash
  the whole sheet; gear and dossier stay calmer while you allocate.
- **Save drawer reliability.** Correct AI name on slots, import from file or
  clipboard, load errors surface, export can download JSON, and the drawer
  handle dims while modals are open.
- **Dark-theme scrollbars** that match the black-ops UI.
- Leaner production bundle (main chunk roughly **1.8 MB → ~0.6 MB**).

### Notes for power users

- SuperGrok OAuth works best via `npm run dev` (device login needs the Vite proxy).
- Optional env keys: `VITE_ZHIPU_API_KEY` / `VITE_ZAI_API_KEY`, `VITE_XAI_API_KEY`
  (plus existing Gemini / OpenRouter / OpenAI / Anthropic / DeepSeek keys).
- Engineering notes: `docs/OPTIMIZATION_PROPOSAL.md`,
  `docs/SHARED_AI_PROVIDERS_ZHIPU_GROK.md`.

## [1.1.0] - 2026-05-31

### Added

   - **The Complex Profession Suite**: Added 82 new professions across law enforcement, intelligence, defense, research, treasury, public safety, and private-sector careers.
   - **Book-Style Dossiers**: Every new profession now includes readable, educational dossier text that explains how the role works, how it fits its organization, and what kind of agent it produces.
   - **Career History Ready**: The new professions ship with rank ladders, starting bonds, bonus advancements, equipment expectations, and special trainings so they flow naturally into the Dossier and Career History views.
   - **Broader Character Variety**: The roster now covers many more kinds of agents, from field operators and analysts to specialists, investigators, and support personnel.
   - **Deeper Historical Play**: Operational eras now reach back to the 1950s, making Red Scare-era characters and settings available for the first time.
   - **Smarter Dossier Generation**: Career dossiers now have enough context to reflect era, nationality, profession, rank, reporting structure, and top skills in a more grounded way.
   - **Cleaner AI Workflow**: AI-assisted generation now includes provider and model selection, better prompt routing, and a more reliable settings flow for players who use it.
   - **Improved Search and Filtering**: The Profession and Department lists now keep their own search text, making the expanded roster easier to navigate.
   - **Tighter Core UI**: The equipment, skills, identity, and item-creation workflows were refined so the app feels more coherent and easier to use.

### Changed

   - **Finalized Dossier Generation**: Once a dossier is generated, it becomes the settled record for that agent.
   - **More Meaningful Promotion Pace**: Higher ranks are now harder to reach, making advancement feel more earned and less automatic.
   - **Refined Weird Events**: Strange career events now land with cleaner outcomes, clearer reward states, and a more dramatic failure curve.

## [1.0.0] - 2024-06-01

### Added

   - **A Much Richer Career Simulation**: Expanded the number of possible career and personal life outcomes so professions feel more varied, more surprising, and more alive.
   - **Weird Career Incidents**: Added unsettling annual events that can chip away at an agent's sanity and make long-term careers feel dangerous in a very Delta Green way.
   - **Real Promotion Ladders**: Every profession now has a full rank progression with grounded titles and a more believable path upward.
   - **Career Risk Profiles**: Professions are now grouped by danger level so the simulation can better reflect how hard, risky, or lethal a career really is.
   - **Medical Fallout**: Permanent injuries now come with in-universe medical reporting so consequences feel concrete and memorable.
   - **Career Progression Panel**: The Dossier tab now shows the full rank ladder, making it easy to see where an agent has been and where they can still go.
   - **High-Stakes Career Checks**: Extreme successes and failures now create more dramatic outcomes during the simulation.
   - **Promotion Tracking**: Failed promotion attempts are tracked and shown, giving players a clearer sense of how a career has unfolded.
   - **Positive Life Events**: Not every major life event is a setback; some milestones can restore a bit of sanity and feel like real human wins.

### Changed

   - **Cleaner Simulation Architecture**: The career engine was split into smaller systems so the codebase could support more content without becoming harder to maintain.
   - **Clearer Stat Feedback**: Career-related changes to attributes and derived stats were made easier to read and understand at a glance.
   - **Better Narrative Output**: Career memories now read more like lived history, with stronger context and a more grounded voice.
   - **More Meaningful Promotions**: Career advancement became harder to earn, which makes each promotion feel more important.
   - **Balanced Career Hazards**: Dangerous professions now feel dangerous without becoming random chaos.
   - **More Useful Tooltips**: Attribute, stat, and skill tooltips now explain the effect of each career outcome more clearly.
   - **Improved Dossier Layout**: Career Progression now lives in the Dossier tab, where it fits naturally with the rest of an agent's story.

### Fixed

   - **Simulation Stability**: Fixed several worker-level syntax and logic issues that could crash the career simulator.
   - **Readable SAN Changes**: Positive sanity changes now display cleanly with the right styling and sign.
   - **Consistent Event Summaries**: Event logs and final summaries now agree on sanity loss and other core outcomes.
   - **Promotion Display Cleanup**: Generic promotion entries were removed so rank changes now display in a clearer, more specific way.
   - **Type Safety Repairs**: TypeScript issues across the simulation and timeline layers were corrected.
