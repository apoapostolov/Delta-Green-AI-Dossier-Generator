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
