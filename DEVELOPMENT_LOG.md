# DEVELOPMENT_LOG.md

## 2026-02-24 - Initial project scaffolding

Project imported from existing worktree and standard management docs added.

- Added `AGENTS.md` with runtime and workflow guidelines.
- Added initial `DEVELOPMENT_LOG.md` and `TODO.md`.
- Confirmed repo initialization and commit.

## 2026-05-31 - Reorganize data modules and move the dev server to 3002

- Context: the Delta Green repo still kept a large set of root-level data files
  and launcher scripts pointed at the old dev port.
- Root cause: the project had not yet been brought up to the cleaner
  folder-based organization used in the richer Call of Cthulhu project, and
  several local docs still reflected the old launch path.
- Files changed:
  - `data/`, `config/`, `prompts/`: relocated the live data, config, and
    prompt modules out of the repo root.
  - `third-party/manifest.ts`, `hooks/`, `components/`: updated import paths to
    match the new module layout.
  - `vite.config.ts`, `run_project.sh`, `run_project.bat`,
    `run_service_3002.sh`, `run_service_3002.bat`: moved the dev workflow to
    port `3002`.
  - `AGENTS.md`, `README.md`, `CHANGELOG.md`, `DEVELOPMENT_PLAN.md`,
    `DEV_SERVER_WORKFLOW.md`, `TODO.md`, `GITHUB_MANAGEMENT.md`, and the
    newly copied defaults docs: refreshed the local documentation set.
- Validation: `npm install`; `npm run dev`; `curl -I http://localhost:3002/`;
  `ss -ltnp | rg ':3002'`; `npm test` (passed 31 tests, 6 failures remain in
  `tests/useSaveSystem.test.ts` around save naming and export/import behavior).
- Follow-up risk: the repo still has pre-existing save-system test failures in
  an unrelated area, and the newly added documentation templates may need
  further local wording adjustments later.

## 2026-05-31 - Backport provider-aware AI runtime and DG skill distribution

- Context: the Delta Green branch was still using Gemini-only direct calls,
  placeholder save loading, and older gear/prompt UX while the richer Call of
  Cthulhu branch had already moved to provider-aware AI settings and stronger
  persistence patterns.
- Root cause: Delta Green had not yet inherited the newer backend/runtime layer
  and the DG-specific skill advancement rules had no AI distribution path.
- Files changed:
  - `App.tsx`, `components/SettingsModal.tsx`, `context/AiSettingsContext.tsx`,
    `hooks/useAiRuntime.ts`, `lib/ai/`, `.env.example`, `.env.local`,
    `.gitignore`, and `vite.config.ts`: wired the COC-style AI provider/model
    settings into the DG app shell and environment handling.
  - `hooks/ai/useNameGeneration.ts`,
    `hooks/ai/useBackstoryGeneration.ts`,
    `hooks/ai/useBondGeneration.ts`,
    `hooks/ai/useTraitsGeneration.ts`,
    `hooks/ai/usePortraitGeneration.ts`,
    `hooks/useCareerSimulation.ts`, and `components/GearTab.tsx`: replaced
    Gemini-only direct calls with the shared provider-aware runtime.
  - `lib/ai/dg-skill-distribution.ts`,
    `components/skills/AiDistributionModal.tsx`,
    `components/SkillsTab.tsx`,
    `components/skills/SkillsHeader.tsx`, and `hooks/useCharacter.ts`: added a
    DG-specific AI distribution flow that assigns legal `+20%` advancements
    while respecting the `80%` creation cap and remaining advancement pool.
  - `components/PromptInfoModal.tsx`, `components/GearTab.tsx`,
    `components/gear/EquipmentPacks.tsx`, and
    `data/equipment-pack-data.ts`: changed the AI item prompt viewer to use
    prompt tabs with an `80vh` cap and added archetype equipment packs to the
    gear workflow.
  - `hooks/useSaveSystem.ts`, `hooks/useCharacter.ts`, `hooks/useAIGeneration.ts`,
    and the AI sub-hooks: implemented real save/load hydration for the expanded
    DG state, including AI state, gear state, special trainings, and pending AI
    distributions.
  - `tests/useSaveSystem.test.ts`, `tests/dgSkillDistribution.test.ts`, and
    `tests/promptInfoModal.test.tsx`: added regression/smoke coverage for save
    restoration, DG AI distribution validation, and the prompt-tab modal.
  - `README.md` and `CHANGELOG.md`: documented the provider-aware runtime,
    environment file usage, gear additions, and shipped feature changes.
- Validation: `npm run build`; `npm test` (38 passing tests);
  `curl -I http://localhost:3002/`; `ss -ltnp | rg ':3002'`.
- Follow-up risk: the new AI distribution prompt is DG-specific and legal by
  current code/rule assumptions, but it would benefit from a later UX pass if
  we want richer manual review controls such as per-skill editing before apply.

## 2026-05-31 - Import and repair The Complex profession set for Tab 1

- Context: the Delta Green app still exposed only the smaller core profession
  set in Tab 1, while the OCR-exported `delta-green-the-complex` material had
  not yet been converted into reusable profession data or dossier content.
- Root cause: The Complex role writeups were stranded in raw markdown dumps
  with OCR corruption, inconsistent formatting, and no structured import path
  into the DG profession picker or profession info modal.
- Files changed:
  - `data/complex-professions.ts`: added a dedicated repaired content source
    for The Complex professions that generates both profession entries and
    Markdown dossier content from one normalized dataset.
  - `data/profession-data.ts`: appended the imported Complex roles into the
    live Tab 1 profession list without replacing the existing base professions.
  - `data/information-data.ts`: registered the repaired profession dossiers so
    every imported role can use the second tab in the profession `(?)` modal.
  - `CHANGELOG.md`: recorded the shipped import under `Unreleased`.
- Validation: `npm run build`; `npm test` (38 passing tests).
- Follow-up risk: this pass focuses on complete profession coverage and clean
  dossier repair first; several roles with heavily interleaved OCR custom skill
  blocks may merit a later manual mechanics pass if we want every imported role
  to diverge from its base profession chassis in the summary tab as well.
