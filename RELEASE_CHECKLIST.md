# Release Checklist

Use this before publishing, tagging, or syncing a release.

## Preflight

- [ ] Read the current `DEVELOPMENT_PLAN.md` and `DEVELOPMENT_LOG.md`
- [ ] Confirm the changelog reflects the user-visible outcome, not the code churn
- [ ] Run the narrowest relevant validation command
- [ ] Run the broader build or test command if the change touches behavior
- [ ] Check for unrelated working tree changes
- [ ] Confirm secrets, credentials, and private files are excluded
- [ ] Confirm all [Definition of Done](AGENTS.md#definition-of-done) items were
      met since the last release (changelog deduplication, public/private
      boundaries, generated artifact regeneration)

## Publish

- [ ] Update version or release metadata if the project uses it
- [ ] Regenerate derived outputs instead of editing them by hand
- [ ] Commit only the related files
- [ ] Tag or push only if the project policy allows it

## Post-Release

- [ ] Record the final validation result in the development log
- [ ] Backfill any missing changelog notes while the work is fresh
- [ ] Note residual risk or follow-up work

## Notes

- Keep this list short enough that it is used.
- If a project has stricter steps, copy this file and extend the local version.
