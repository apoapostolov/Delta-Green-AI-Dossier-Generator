# Generated File Rules

This document defines how to handle generated (derived) files across all
projects: which files are generated, when to regenerate vs. hand-edit, and how
to detect staleness.

## What Counts As A Generated File

Generated files are any output produced from a source file by a tool. Common
examples:

| Source | Generator | Generated output |
|--------|-----------|-----------------|
| TypeScript / JSX | `tsc`, `vite build`, `esbuild` | `.js`, `.d.ts`, `.js.map` |
| CSS preprocessor | Sass, PostCSS, Tailwind CLI | `.css` |
| GraphQL schema | `graphql-codegen` | `generated.ts`, `fragmentTypes.json` |
| OpenAPI spec | `openapi-generator` | API client stubs, types |
| Prisma schema | `prisma generate` | Prisma client |
| Protobuf / Thrift | `protoc`, `buf generate` | language bindings |
| Markdown | docs generator | HTML, API reference |
| Lockfiles | `npm install`, `pip install` | `package-lock.json`, `poetry.lock` |
| i18n | extraction tool | translation JSON files |

If a file is checked into the repo but is never hand-edited — it is only
produced by running a command — it is a generated file.

## Core Rule: Source Over Output

**Always edit the source, then regenerate.** Never hand-edit a generated file.

Hand-editing a generated file creates two problems:

1. The edit is lost on the next regeneration.
2. The source no longer matches the output, which misleads reviewers, linters,
   and other tooling.

The only exception is **emergency patching** when the generator is unavailable
and the output must be fixed immediately. In that case:

- Document the emergency in the commit message.
- Create a follow-up TODO to fix the source and regenerate before the next
  build.

## Detecting Staleness

A generated file is **stale** when the source has changed but the output has
not been regenerated. Detect staleness with these methods:

### Method 1: Run The Generator

The most reliable approach. If the generator produces no diff, the output is
current. Always prefer this when practical.

```sh
# Example: regenerate Prisma client
npx prisma generate

# Example: regenerate GraphQL types
npx graphql-codegen
```

### Method 2: Compare Timestamps

If the source file's modification time is newer than the generated file's, the
output is likely stale. Not foolproof (clock skew, git checkout behavior) but
useful as a quick check.

```sh
# Check if source is newer than output
stat -c %Y src/schema.prisma   # source timestamp
stat -c %Y node_modules/.prisma/client/index.js  # output timestamp
```

### Method 3: Check Git Status

If the source has uncommitted changes and the generated file is clean, the
output may be stale. But this does not detect the reverse case (source was
committed without regeneration).

```sh
# Check for source changes without corresponding output changes
git diff --name-only src/schema.prisma
git diff --name-only node_modules/.prisma/client/index.js
```

### Method 4: Checksum The Source

For CI or pre-commit hooks, checksum the source file and compare against a
stored checksum from the last regeneration. If they differ, the output is
stale.

```sh
# Store checksum alongside generated output
sha256sum src/schema.prisma > .generated/schema.checksum

# Verify on next build
sha256sum -c .generated/schema.checksum
```

## When To Regenerate

| Trigger | Action |
|---------|--------|
| After editing a source file | Regenerate the corresponding output immediately |
| Before opening a PR | Regenerate all outputs to confirm consistency |
| Before running tests | Regenerate if the test depends on generated artifacts |
| After merging from upstream | Regenerate outputs that may depend on changed sources |
| Before tagging a release | Regenerate all outputs, commit source + output together |
| When staleness is suspected | Run the generator and check for diffs |

## What To Commit

| Scenario | Commit source? | Commit generated output? |
|----------|---------------|-------------------------|
| CI builds from source | Yes | No (add to `.gitignore`) |
| Downstream consumers need output | Yes | Yes, but only after regeneration |
| Lockfiles | Yes (source = manifest) | Yes (lockfile *is* the generated file) |
| Documentation | Yes | Yes, if published from the repo |

When committing generated output, always commit the **source change** and the
**regenerated output** in the same commit so the tree is consistent at every
point in history.

## Adding A New Generator

When introducing a new code generation tool to a project:

1. Document the generator command and its source → output mapping in
   `README.md` or a `CONTRIBUTING.md`.
2. Add the generated output directory to `.gitignore` if CI builds from source,
   or add a regeneration checklist item to the project's `RELEASE_CHECKLIST.md`.
3. Add a pre-commit hook or CI check that detects staleness (Method 4 above)
   if stale output causes silent failures.

## Cross-References

- [`AGENTS.md`](AGENTS.md) — Operating Principles: "Regenerate derived files
  instead of hand-editing generated output."
- [`AGENTS.md`](AGENTS.md#commit-quality) — Commit Quality: "Do not commit
  generated outputs without the source changes that produced them."
- [`RELEASE_CHECKLIST.md`](RELEASE_CHECKLIST.md) — Preflight: regenerating
  derived outputs.
