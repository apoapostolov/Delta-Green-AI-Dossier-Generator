# DEVELOPMENT LOG

## 2026-07-27 - Release v1.2.0

- Version **1.2.0** (from changelog line 1.1.0 / package was 0.0.0).
- Multi-slot AI (Zhipu, xAI key + OAuth) + optimization Waves A–C.
- Tag `v1.2.0` + GitHub release after test/build green.

## 2026-07-27 - Optimization Waves A–C complete

- Code overhaul per `docs/OPTIMIZATION_PROPOSAL.md` (CoC 1.1 pattern).
- Wave A: typecheck script, `.kilo` excludes, memoized `useCharacter`, deleted
  root orphan tabs.
- Wave B: lazy Skills/Gear/Dossier/Settings/modals; dynamic pdf-lib;
  manualChunks; WSL polling HMR.
- Wave C: sliced CharacterContext + SkillRow memo; hot consumers on narrow hooks.
- Outcome: main chunk ~1.76 MB → **~592 KB**; tests 56 green.
- Dark-theme global scrollbars in `index.html` (shared with OSE).

## 2026-07-27 - Multi-slot AI + Zhipu + xAI OAuth (port from CoC)

- Context: shared later-wave from CoC optimization proposal
  (`docs/SHARED_AI_PROVIDERS_ZHIPU_GROK.md`).
- Changes: `lib/ai/ai-slots.ts`, `load-provider-models.ts`, `zhipu.ts`, `xai.ts`,
  `xai-oauth.ts`, caches; multi-slot `AiSettingsContext`; Settings four slot
  blocks with OAuth device UI; slot-routed `useAiRuntime`; Vite
  `/__xai_oauth` proxy; tests.
- Validation: `tests/zhipu-xai.test.ts` + `providers.test.ts` (23 green);
  no AI-related tsc errors introduced.
- Follow-up: optional browser smoke for mixed providers.

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

# 2026-05-31 - Reworked release-note voice

- Rewrote the 1.0.0 and 1.1.0 changelog sections to emphasize user value, new capabilities, and product impact instead of implementation detail.
- Kept the release history accurate while making the language more approachable and marketing-friendly.
- Updated files:
  - CHANGELOG.md
  - DEVELOPMENT_LOG.md

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

## 2026-05-31 - Clean up Complex dossier wording

- Context: the initial Complex dossier output still exposed import-process
  language and generic repair notes in the modal, which made the second tab
  read like tooling output instead of an in-world Delta Green reference entry.
- Root cause: the generated Markdown template still carried OCR-specific note
  text and inherited the base profession page reference without being rewritten
  into agency-facing dossier language.
- Files changed:
  - `data/complex-profession-dossiers.ts`: rewrote the dossier template to use
    professional in-world prose, removed OCR and repair wording, and stopped
    inheriting the base-book page reference for these Complex entries.
  - `CHANGELOG.md`: documented the dossier wording cleanup under `Unreleased`.
- Validation: `npm run build`; `npm test` (38 passing tests); `curl -I
  http://localhost:3002/` returned `200 OK` after a clean Vite restart.

## 2026-05-31 - Expand Complex dossiers with organization primers

- Context: the Complex dossier tab was still reading like a short metadata card
  even after the OCR/import wording had been removed.
- Root cause: the dossier generator only rendered a brief role summary, skill
  list, and equipment line, so it was not reusing the richer descriptive and
  educational content from the Complex chapter.
- Files changed:
  - `data/complex-org-dossiers.ts`: added reusable organization primers for
    each Complex agency and contractor family.
  - `data/complex-profession-dossiers.ts`: rewrote the dossier generator to
    incorporate organization overview, operational reality, friction, culture,
    and role-focus sections for each profession.
  - `CHANGELOG.md`: recorded the dossier expansion under `Unreleased`.
- Validation: `npm run build`; `npm test` (38 passing tests); `npm run dev`
  relaunched cleanly on port `3002`, and `curl -I http://localhost:3002/`
  returned `200 OK`.

## 2026-05-31 - Add educational dossiers for core professions

- Context: the main Agent's Handbook professions still lacked full educational
  dossier tabs, even though the Complex content had already been upgraded to a
  richer reference style.
- Root cause: the base profession entries were only carrying mechanical data
  and short descriptions, so the `(?)` modal did not yet explain how each role
  actually works in Delta Green terms.
- Files changed:
  - `data/core-profession-dossiers.ts`: added a reusable dossier generator and
    info-id map for all main-book professions.
  - `data/profession-data.ts`: attached the new dossier ids to the core
    professions and exported the generated profession dossier map.
  - `data/information-data.ts`: merged the core profession dossiers into the
    existing modal information registry.
  - `CHANGELOG.md`: recorded the shipped dossier expansion under `Unreleased`.
- Validation: `npm run build`; `npm test` (38 passing tests).

## 2026-05-31 - Require Vite restarts for stale bundle validation

- Context: Vite hot reload has been serving stale bundles in this workspace,
  which has repeatedly caused UI changes to appear missing even after the
  source files were updated.
- Root cause: the local dev loop is not reliable enough to use hot reload as
  the sole validation path for this project.
- Files changed:
  - `AGENTS.md`: added a mandatory Vite reload reliability rule instructing
    agents to restart the dev server after code, style, or generated-data
    changes before validating.
- Validation: `npm run dev` relaunched cleanly on port `3002`, and `curl -I
  http://localhost:3002/` returned `200 OK` after the restart.

## 2026-05-31 - Add separate profession and department filters

- Context: the Profession and Department lists had grown large enough that
  browsing them manually was becoming slow and error-prone.
- Root cause: the stats selector UI did not yet include instant text filtering,
  and any filter state would have been shared implicitly across the two tab
  groups.
- Files changed:
  - `components/StatsTab.tsx`: added independent live filter fields for the
    Profession and Department views, with separate preserved text state for
    each subtab.
  - `CHANGELOG.md`: recorded the new filtering behavior under `Unreleased`.
- Validation: `npm run dev` was restarted cleanly on port `3002`, `curl -I
  http://localhost:3002/` returned `200 OK`, and `npm test` passed with 38/38
  tests.

## 2026-05-31 - Remove redundant equipment packs from the Equipment tab

- Context: the Equipment tab still exposed separate Equipment Packs even
  though Delta Green already has the native Tools of the Trade kit workflow,
  which makes the pack UI redundant and confusing.
- Root cause: a backported Equipment Packs block and its data source remained
  visible in the tab even after the project had standardized on Tools of the
  Trade for kit selection.
- Files changed:
  - `components/GearTab.tsx`: removed the Equipment Packs block from both the
    desktop and mobile layouts and deleted its add-pack handler.
  - `components/gear/EquipmentPacks.tsx`: deleted the redundant pack UI
    component.
  - `data/equipment-pack-data.ts`: deleted the unused equipment pack data.
  - `CHANGELOG.md`: recorded the removal under `Unreleased`.
- Validation: `npm run dev` was restarted cleanly on port `3002`, `curl -I
  http://localhost:3002/` returned `200 OK`, `npm test` passed with 38/38
  tests, and `npm run build` completed successfully.

## 2026-05-31 - Remove the profession filter caption

- Context: the live filter under the Profession/Department header still showed
  a visible "Filter professions" caption, which made the control feel heavier
  than necessary.
- Root cause: the filter input was wrapped in a label that duplicated the
  intent already made clear by the surrounding tab header and placeholder
  text.
- Files changed:
  - `components/StatsTab.tsx`: removed the label above the filter field while
    keeping the separate profession and department filter state intact.
- Validation: `npm run dev` was restarted cleanly on port `3002`, `curl -I
  http://localhost:3002/` returned `200 OK`, and `npm test` passed with 38/38
  tests.

## 2026-05-31 - Move AI Distribution beside Quick Assign

- Context: the AI Distribution action in the Skills tab was visually separated
  from the other skill-automation controls, making the workflow feel a bit
  scattered.
- Root cause: the button lived in the header controls instead of the main
  action row where Quick Assign already sits.
- Files changed:
  - `components/SkillsTab.tsx`: moved the AI Distribution button into the
    action row immediately before Quick Assign and styled it blue.
  - `components/skills/SkillsHeader.tsx`: removed the AI Distribution prop and
    button from the header so the header only handles grouping and reset.
  - `CHANGELOG.md`: recorded the UI move under `Unreleased`.
- Validation: `npm run dev` was restarted cleanly on port `3002`, `curl -I
  http://localhost:3002/` returned `200 OK`, `npm run build` completed
  successfully, and `npm test` passed with 38/38 tests.

## 2026-05-31 - Improve AI item prompt previews

- Context: the AI Item Generation prompts were still labeled generically and
  showed placeholder helper text until an item had been generated once.
- Root cause: the prompt modal was only receiving generated prompt strings,
  so its fallback content was not useful for previewing the workflow ahead of
  time.
- Files changed:
  - `components/GearTab.tsx`: renamed the two prompt tabs to descriptive
    labels and added live preview prompt content with placeholder adlibs even
    before any item has been generated.
  - `CHANGELOG.md`: recorded the prompt viewer improvement under `Unreleased`.
- Validation: `npm run dev` was restarted cleanly on port `3002`, `curl -I
  http://localhost:3002/` returned `200 OK`, `npm run build` completed
  successfully, and `npm test` passed with 38/38 tests.

## 2026-05-31 - Auto-pick a non-generic nationality on new rolls

- Context: a fresh Bio roll could still leave the Nationality field on the
  default generic value, which made the Dossier tab feel incomplete.
- Root cause: the automatic nationality picker still considered the generic
  American placeholder a valid weighted outcome, so a new character could
  legitimately land on the default-looking entry.
- Files changed:
  - `hooks/useAIGeneration.ts`: added an option for the random nationality
    picker to exclude the generic placeholder and keep that behavior for the
    automatic roll path.
  - `hooks/useCharacter.ts`: updated the attribute-roll flow to invoke the
    non-generic nationality picker after rolling a new set of characteristics.
  - `CHANGELOG.md`: recorded the Bio nationality behavior change under
    `Unreleased`.
- Validation: `npm run dev` was restarted cleanly on port `3002`, `curl -I
  http://localhost:3002/` returned `200 OK`, `npm run build` completed
  successfully, and `npm test` passed with 38/38 tests.

## 2026-05-31 - Replace identity reroll icons with AI stars

- Context: the identity detail buttons for generating name and codename still
  used the old reroll icon, which made them feel like generic refresh actions
  instead of AI-assisted generation.
- Root cause: the buttons were wired to the refresh glyph even though the rest
  of the app already uses AI-themed iconography for generation actions.
- Files changed:
  - `components/icons/AIStarsIcon.tsx`: added a dedicated AI-stars icon
    component for the identity generation buttons.
  - `components/draft/CharacterDetailsColumn.tsx`: swapped the refresh icon
    out for the AI-stars icon in both green identity buttons.
  - `CHANGELOG.md`: recorded the icon swap under `Unreleased`.
- Validation: `npm run dev` was restarted cleanly on port `3002`, `curl -I
  http://localhost:3002/` returned `200 OK`, `npm run build` completed
  successfully, and `npm test` passed with 38/38 tests.

## 2026-05-31 - Audit profession metadata for Career History

- Context: the expanded Complex profession set needed a metadata audit to make
  sure Career History and the Dossier tab still had complete coverage after the
  import.
- Root cause: two CIA SAD professions were present in the profession list, but
  their dossier info and rank ladders were not fully wired into the metadata
  registry, causing the dossier lookup regression test to fail.
- Files changed:
  - `data/information-data.ts`: added a dedicated `agency_cia` dossier entry
    so the CIA SAD roles can resolve their dossier content.
  - `data/profession-data.ts`: added rank ladders for `CIA SAD/SOG Operator`
    and `CIA SAD/PAG Officer` so Career History can display progression for
    both roles.
  - `tests/professionMetadata.test.ts`: added a regression test covering the
    minimum metadata required for Career History and dossier rendering.
  - `CHANGELOG.md`: recorded the metadata coverage fix under `Unreleased`.
- Validation: `npm run dev` was restarted cleanly on port `3002`, `curl -I
  http://localhost:3002/` returned `200 OK`, `npm run build` completed
  successfully, and `npm test` passed with 39/39 tests.

## 2026-05-31 - Route AI prompts by complexity

- Context: the app was still sending several cheap, high-volume prompts to the
  creative model by default, which is unnecessary cost for deterministic or
  procedural tasks.
- Root cause: prompt call sites were not consistently triaged by complexity,
  so some low-risk prompts shared the same model tier as the narrative-heavy
  generation flows.
- Files changed:
  - `hooks/useCareerSimulation.ts`: moved injury reporting, injury summaries,
    and career-history narrative generation to the simple model lane.
  - `CHANGELOG.md`: documented the new prompt-routing split under
    `Unreleased`.
- Validation: `npm run dev` was restarted cleanly on port `3002`, and the app
  continued to answer `200 OK` on `http://localhost:3002/` after the restart.

## 2026-05-31 - Prepare release 1.1.0

- Context: the project is ready for a versioned release centered on The
  Complex expansion and the broader AI/runtime integration work.
- Root cause: the release notes still used the working `Unreleased` heading,
  and the top-level changelog copy did not yet present the Complex expansion as
  a formal 1.1.0 release with marketing-oriented feature bullets.
- Files changed:
  - `CHANGELOG.md`: promoted the release notes to `1.1.0`, added a marketing
    summary for The Complex's 82 professions, and reframed the feature bullets
    to describe what is now available.
- Validation: changelog review only; no code path changed in this step.

## 2026-05-31 - Reworked release-note voice

- Rewrote the 1.0.0 and 1.1.0 changelog sections to emphasize user value, new capabilities, and product impact instead of implementation detail.
- Kept the release history accurate while making the language more approachable and marketing-friendly.
- Updated files:
  - CHANGELOG.md
  - DEVELOPMENT_LOG.md
