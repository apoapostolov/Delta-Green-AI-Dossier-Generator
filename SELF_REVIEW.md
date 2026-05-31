# SELF_REVIEW

Shared template for maintaining a running review of mistakes, better defaults,
and reusable lessons learned during implementation work.

Copy this file into a project when the workspace needs its own self-review
memory. Keep entries short, dated, and actionable.

## Review Template

### 2026-01-01 - Review title

- Task:
- Mistake:
- What I missed:
- Better approach:
- Signals it was wrong:
- Validation:
- Reusable rule:
- Related files:

## Recurring Mistakes

- None recorded yet.

## Reliable Heuristics

- None recorded yet.

## Process Upgrades

- 2026-05-08 - Prefer one template source
  - Why: keeping one authoritative example block reduced drift in TODO
    templates.
  - Result: future copies can focus on filling fields instead of reconciling
    repeated guidance.
- 2026-05-09 - Treat provider body errors as first-class failures
  - Why: the transport layer can succeed while the API body still signals an
    auth or validation error.
  - Result: error messages stay specific enough for the user to act on.
