# HARD_PROBLEMS

Shared template for recording issues that repeatedly stalled progress, required
multiple attempts, or exposed a non-obvious root cause.

Copy this file into a project when the workspace needs its own hard-problem
memory. Keep entries dated and factual.

## Entry Template

### 2026-01-01 - Problem title

- Problem:
- Context:
- Symptoms:
- Attempts that failed:
  - attempt 1
  - attempt 2
  - attempt 3
- Root cause:
- Winning fix:
- Why this fix works:
- Validation:
- Residual risk:
- Reusable rule:

## Current Open Problems

- None recorded yet.

## Recent Resolutions

- 2026-05-08 - Markdown template drift
  - Problem: repeated guidance in the TODO template made it harder to know
    which section to update.
  - Context: shared defaults used across multiple project planners.
  - Symptoms: new entries kept rephrasing the same rules in two places.
  - Attempts that failed: keep both sections and "just remember" which one is
    authoritative.
  - Root cause: the template duplicated policy in both the prose rules and the
    example block.
  - Winning fix: keep the rules in one place and treat the example block as the
    only structural reference.
  - Why this fix works: there is now a single source to update when the format
    changes.
  - Validation: markdown lint and manual review of the template structure.
  - Residual risk: future edits could reintroduce duplication if the example is
    expanded without pruning the prose.
  - Reusable rule: one canonical instruction section beats two near-identical
    ones.
- 2026-05-09 - Body-level auth failures hidden by success-only checks
  - Problem: a provider returned `code: 401` in a JSON body while the HTTP
    response still looked successful, so the client reported a missing task id
    instead of the real auth failure.
  - Context: a submit helper assumed any `ok` response was a valid success
    payload.
  - Symptoms: the UI surfaced "missing taskId" and users could not tell that
    the API key or headers were the real problem.
  - Attempts that failed:
    - check only `response.ok`
    - extract `taskId` first and infer failure later
  - Root cause: provider errors were encoded in the JSON body rather than in the
    transport status.
  - Winning fix: inspect provider error codes and messages before extracting
    ids.
  - Why this fix works: it preserves the actual failure mode instead of
    collapsing everything into a generic wrapper error.
  - Validation: unit test a 401 JSON payload and confirm the auth message is
    surfaced directly.
  - Residual risk: if the provider changes its error schema, the extraction
    helper will need another update.
  - Reusable rule: never assume a body with JSON fields is successful just
    because the HTTP request itself succeeded.
