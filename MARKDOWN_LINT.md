# Markdown Lint

This repository uses [markdownlint-cli2](https://github.com/DavidAnson/markdownlint-cli2) for consistent markdown quality.

## Quick Commands

```sh
# Check everything
npx -y markdownlint-cli2 "**/*.md"

# Auto-fix what can be fixed
npx -y markdownlint-cli2 --fix "**/*.md"
```

If you have the local package installed:

```sh
npm run lint:md
npm run lint:md:fix
```

## Configuration

The rules for this repo are defined in [`.markdownlint.json`](.markdownlint.json).

We deliberately relax several notoriously noisy rules while keeping the ones that actually improve readability and maintainability.

## Commonly Annoying Rules (and How We Handle Them)

These rules frequently produce false positives or excessive noise in real
documentation, especially in AI-assisted workflows with long explanations,
tables, code examples, and templates.

### MD013 — line-length (The Worst Offender)

**Default:** 80 characters. Extremely painful for technical prose.

**Why it hurts:**

- Long URLs, file paths, and inline code make natural sentences exceed 80
  chars easily.
- Tables and code blocks become unreadable when hard-wrapped.
- It fights against good explanatory writing more than it helps.

**Our setting in this repo:**

- `line_length`: 120
- `code_blocks`: false
- `tables`: false
- `headings`: false

**Recommendation for most projects:**
Use 100–120 and disable for code blocks + tables. Only enable `headings: true` if you have a very strict style guide.

### Table Formatting Rules (MD055, MD056, MD058, MD060)

These rules are obsessively strict about table alignment, spacing, and column counts.

**Common complaints:**

- They break perfectly readable tables during editing.
- Placeholder tables (very common in templates like `VIBECHECK.md`) trigger
  constant errors.
- Different contributors have different opinions on "correct" table formatting.

**Our recommendation:**
Disable `MD055`, `MD056`, `MD058`, and `MD060` in documentation-heavy or template-heavy repositories.

Only enable them if you have a dedicated technical writer who enjoys fighting with table formatting.

### MD032 — blanks-around-lists

Requires blank lines before and after lists.

**When it annoys:**

- Lists that immediately follow a colon or short sentence (very natural in
  technical writing).
- Nested content inside list items.
- Certain documentation styles that use tight lists.

**Our approach:**
We fix the clear cases but do not treat every instance as a hard failure.
Consider disabling if your writing style uses many "definition list" patterns.

### MD040 — fenced-code-language

Requires a language identifier on every fenced code block (````js`, ```text`, etc.).

**This one is usually worth keeping.**

It improves syntax highlighting and forces you to think about whether a block is code, shell, or plain text.

**When it becomes annoying:**

- ASCII diagrams
- Placeholder content
- Very generic output examples

**Recommendation:** Keep it enabled. Use `text` for non-code blocks.

### Other Rules That Sometimes Need Relaxation

| Rule | Common Trigger | Recommendation |
|------|----------------|----------------|
| **MD024** (no-duplicate-headings) | Repeated "Notes", "Examples", or "Context" sections across a long document | Set `siblings_only: true` |
| **MD036** (emphasis used as heading) | `**Important Note**` style callouts | Usually safe to leave on, or disable if you like bold lead-ins |
| **MD041** (first line must be a heading) | Template files, partial includes, changelog fragments | Disable in most projects |
| **MD007** (list indentation) | Deeply nested lists or mixed task lists | Relax only if you have complex nested structures |
| **MD012** (multiple blank lines) | Intentional visual separation in long docs | Usually fine to leave on |

## Recommended Baseline Configs

### 1. Humane Documentation Repo (What This Repo Uses)

Good default for agent instructions, process docs, templates, and long-form technical writing.

```json
{
  "default": true,
  "MD013": {
    "line_length": 120,
    "code_blocks": false,
    "tables": false,
    "headings": false
  },
  "MD024": { "siblings_only": true },
  "MD041": false,
  "MD055": false,
  "MD056": false,
  "MD058": false,
  "MD060": false,
  "MD033": false
}
```

### 2. Strict Technical Writing

For projects that want very clean, publishable documentation (books, official guides, etc.).

```json
{
  "default": true,
  "MD013": { "line_length": 100 },
  "MD024": { "siblings_only": true },
  "MD041": true
}
```

### 3. Minimal / Low Ceremony

When you mostly want basic hygiene without fighting the linter.

```json
{
  "default": true,
  "MD013": false,
  "MD024": false,
  "MD041": false,
  "MD055": false,
  "MD056": false,
  "MD060": false
}
```

## Adding Enforcement to Your Projects

### Option A: Just Use npx (Recommended for Most Projects)

Add this to your `AGENTS.md` or `CONTRIBUTING.md`:

```sh
# After editing any markdown
npx -y markdownlint-cli2 --fix "**/*.md"
```

### Option B: npm Scripts (Better DX)

Add a `package.json` (even in a mostly non-JS repo):

```json
{
  "scripts": {
    "lint:md": "markdownlint-cli2 \"**/*.md\"",
    "lint:md:fix": "markdownlint-cli2 --fix \"**/*.md\""
  },
  "devDependencies": {
    "markdownlint-cli2": "^0.22.0"
  }
}
```

### Option C: Pre-commit Hook

Using [pre-commit](https://pre-commit.com/):

```yaml
repos:
  - repo: https://github.com/igorshubovych/markdownlint-cli
    rev: v0.42.0
    hooks:
      - id: markdownlint
        args: ["--config", ".markdownlint.json"]
```

Or with husky + lint-staged for npm projects.

### Option D: GitHub Action

```yaml
- name: Lint Markdown
  run: npx markdownlint-cli2 "**/*.md"
```

## Ignoring Specific Files or Rules

- Create a `.markdownlintignore` file (same syntax as `.gitignore`)
- Use front-matter in individual files to override rules locally:

```markdown
---
markdownlint:
  MD013: false
---

# This file is exempt from line length
```

## Philosophy

Markdown linting should **help** readers and writers, not become a source of
constant low-value busywork.

Prioritize rules that catch real problems (bad headings, broken links in spirit,
inconsistent structure) over rules that mostly punish natural writing.

When in doubt, relax the rule and document why in this file.

---

**Related files:**

- [`.markdownlint.json`](.markdownlint.json) — active rules for this repository
- [README.md](README.md) — how to use these defaults
- [AGENTS.md](AGENTS.md) — general documentation quality guidance
