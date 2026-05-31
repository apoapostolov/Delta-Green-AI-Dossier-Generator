# DEVELOPMENT PLAN

## Current Focus

- finish the Delta Green doc refresh and folder cleanup started in this pass
- keep the root focused on core app code while data, prompts, and config live
  in their own folders
- keep the local dev server and launcher scripts aligned on port `3002`

## Scope And Boundaries

- what this pass owns: local Delta Green implementation, docs, and launcher
  updates
- what this pass explicitly does not own: the richer Call of Cthulhu repo

## Working Rules

- Keep the plan focused on the next executable work.
- Update the plan when scope, sequencing, or ownership changes.
- Keep the plan concise enough to guide an executor without hidden context.
- Use absolute dates in any decision notes or revisions.

## Near-Term Tasks

- [ ] Verify the Vite dev server starts on port `3002`.
- [ ] Sweep for any remaining stale root-level data imports or doc references.
- [ ] Confirm the new documentation defaults are complete enough for local use.

## Risks And Blockers

- no active blockers
- residual risk: future data or prompt files may drift back into the root if
  new modules are added without a folder placement rule
