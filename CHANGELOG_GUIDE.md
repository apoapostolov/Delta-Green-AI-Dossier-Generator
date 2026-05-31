# Changelog Guide

`CHANGELOG.md` is for power users, not developers.

The reader is assumed to understand the product well, but not the codebase.
Write about what they can now do, what changed in behavior, what got fixed, and
what was removed.

## Template

Copy [`CHANGELOG_TEMPLATE.md`](CHANGELOG_TEMPLATE.md) as the starting point for
a new project. It contains only the clean structure with no embedded instructions.

The expected shape looks like this:

```markdown
# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

### Changed

### Fixed

### Removed

## [2025-01-15] - v1.0.0

### Added
- ...

### Changed
- ...

### Fixed
- ...

### Removed
- ...
```

All maintenance rules (overwrite-first, scope, writing style, release curation)
are documented below. Do not add instructional content to `CHANGELOG.md` itself.

## Overwrite-First Principle

The default action when editing the `Unreleased` section is to **overwrite** an
existing entry, not to append a new one. Treat each user-visible change as a
single living bullet that gets refined until the feature ships.

Apply this priority when deciding whether to overwrite or add:

1. **Same behavior, same entry** — If the `Unreleased` section already has a
   bullet describing the same user-facing behavior, overwrite that bullet with
   the refined description.
2. **Same feature, extended scope** — If the new work extends, refines, or fixes
   a feature that already has an unreleased entry, merge the new information
   into the existing `Added` bullet. The feature stays under `Added` only — the
   user has never seen it, so there is nothing to "change" from their
   perspective.
3. **Same feature, pre-release bug fix** — If the new work fixes a bug in a
   feature that has not shipped yet, **do not add any changelog entry**. The
   user has never encountered this bug and never needs to know about it. If the
   fix also affects an older released version, add a `Fixed` entry only for
   that released version (the unreleased feature gets no entry for the fix).
4. **Disjoint behavior** — Only add a new bullet when the change introduces
   independent, disjoint user-visible behavior with no existing representation
   in the `Unreleased` section.
5. **When in doubt** — Add a new bullet and merge during release curation
   (see [Release Curation](#release-curation)).

This principle applies within a single release cycle. Once a release is cut,
each subsequent release gets its own entries.

## Changelog Scope

Add changelog entries for:

- new user workflows
- visible behavior changes
- fixed bugs users could notice
- import/export format changes
- settings, compatibility, migration, or deployment changes that affect usage
- performance or reliability improvements users can feel
- security or privacy changes with user-facing impact

Do not add entries for:

- internal refactors
- tests
- code comments
- linting
- build metadata
- agent instruction changes
- README-only edits
- development log updates
- changes to features that have not shipped yet, unless they alter the
  upcoming release description
- bugs or bug fixes in features that have not shipped yet (the user has never
  seen the bug, so there is nothing to document)
- rewrites, expansions, or refinements of unreleased features — expand the
  existing `Added` description instead; the user has never seen a previous
  version, so there is nothing to "change"

## Changelog Maintenance Procedure

Before editing `CHANGELOG.md`:

- Read the current `Unreleased` section.
- Read recent `DEVELOPMENT_LOG.md` entries since the last represented change.
- Identify the user-visible story across those entries.
- Check whether any existing unreleased bullet already covers the same or
  related behavior. If so, **overwrite** that bullet (see
  [Overwrite-First Principle](#overwrite-first-principle)).
- Remove bullets that describe implementation churn rather than user outcomes.
- Keep the section ordered by user impact, not by commit order.

When a feature is expanded before release:

- Apply the [Overwrite-First Principle](#overwrite-first-principle): rewrite
  the existing bullet to include the expanded behavior instead of adding a
  second bullet.
- Before adding a new bullet, confirm the change is independently meaningful
  to a user and has no existing representation in the `Unreleased` section.
- If in doubt, ask whether a user scanning the changelog would benefit from the
  item standing alone.

When a feature is first introduced in the same release:

- Put it under `Added`.
- Do not list pre-release polish for that feature under `Changed` or `Fixed`.
- Treat refinements before the first release as part of the final shipped
  feature.
- If the feature already has an unreleased `Added` entry, overwrite it with
  the refined description rather than adding a duplicate.
- **Unreleased features belong under `Added` only.** Never use `Changed`,
  `Fixed`, or `Removed` for behavior the user has never seen in a shipped
  release. The user has no reference point, so there is nothing to "change",
  "fix", or "remove" from their perspective.

## Changelog Categories

Use Keep a Changelog style categories when a project has no stronger local
standard:

- `Added`: new capabilities or workflows
- `Changed`: changed behavior users already had
- `Fixed`: defects in previously released behavior
- `Removed`: removed capabilities or compatibility
- `Security`: user-facing security or privacy fixes, if relevant

## Changelog Writing Style

- **Assume a power-user reader.** Write for someone who understands the product
  well but not the codebase. They know what they want to do; tell them whether
  this release helps them do it.
- **Lead with the user-visible result.** Describe what the user can now see, do,
  or control. For backend fixes, keep the description brief and technical — the
  power user needs to know the problem was resolved, not the full implementation
  story.
- **Use a soft marketing tone.** Write to excite — emphasize capability,
  convenience, and outcome. Prefer "You can now..." or "Generate..." over dry
  feature listings. Avoid hype or hyperbole; the excitement comes from the
  genuine capability, not the adjectives.
- **Frontend > backend in detail.** User-facing features get detailed,
  capability-oriented prose. Backend fixes get one-line technical descriptions
  under `Fixed` — enough to confirm the issue is resolved, not enough to read
  like a developer journal.
- **Prefer one strong bullet over several thin bullets.** Merge related
  capabilities into a single statement rather than scattering them.
- **Include important constraints, defaults, and migration notes** when they
  affect how the feature works.
- **Avoid implementation names** (library, class, internal module) unless the
  user has to interact with them.
- **Avoid commit-message language** like "refactor", "wire up", "plumb",
  "cleanup", or "fix edge case" unless the product behavior is named.

Good — user-facing feature with power-user tone:

- `Added a reusable Suno export workflow that keeps lyrics, style notes, model
  metadata, and provider job status together for each generated song. Now you
  can export everything you need in one step, without rebuilding context
  between sessions.`

Good — backend fix, brief and technical:

- `Fixed an issue where task submissions with expired credentials returned a
  misleading "missing task ID" error instead of surfacing the real 401 auth
  failure from the API body.`

Bad:

- `Added API endpoint and UI state for export.`
- `Fixed generated song thing.`
- `Updated docs.`
- `Refactored the export provider to use the new job-queue abstraction.`

## Release Curation

Before cutting a release:

- Re-read all `Unreleased` entries as one story.
- Deduplicate and combine related bullets.
- Move details that only developers need into `DEVELOPMENT_LOG.md`.
- Confirm all shipped user-visible work is represented.
- Confirm no unreleased internal experiments are described as shipped.
- Create or update release notes from the curated changelog, not from raw git
  history.
