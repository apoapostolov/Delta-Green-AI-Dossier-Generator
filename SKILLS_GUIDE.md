# Skills Guide

Skills are the AI's long-term memory for reusable knowledge. The agent must
actively capture skills during development and research — not as an afterthought
but as part of the work itself.

## When To Write A Skill

Write a skill whenever you encounter information that will save time in future
sessions. Think of it as: *"If another agent asks me about this tomorrow, what
would I want them to know?"*

Write a skill when:

- You research an external API and learn its authentication flow, rate limits,
  error codes, or undocumented behavior.
- You discover a reusable code snippet or pattern that applies to multiple
  features.
- The user approves or rejects a design choice (button style, icon set, spinner
  type, pill vs. dropdown, emoji usage, color palette, layout preference).
- You solve a hard problem that took multiple attempts — capture the winning
  approach and the attempts that failed.
- You find a workaround for a tool, library, or framework bug.
- You learn a project-specific convention that isn't documented (deployment
  steps, environment setup, local dev quirks).
- You optimize a workflow (build scripts, dev server config, lint rules).
- You debug a repeatable dev-server quirk such as stale Vite bundles, port
  confusion, or browser state that survives a restart.

Do not write a skill for:

- One-off facts that will change next session (current git branch, today's TODO
  status).
- Information already in `README.md`, `AGENTS.md`, or project docs.
- Generic programming knowledge the model already has.

## Skill Categories

Organize skills by type so they are easy to find and reuse:

| Category | Folder | Examples |
|----------|--------|----------|
| **API Knowledge** | `skills/api/` | Auth flow for Suno API, Stripe webhook gotchas, OpenAI rate limits |
| **Code Snippets** | `skills/snippets/` | React form validation pattern, Prisma pagination helper, Tailwind card component |
| **User Preferences** | `skills/preferences/` | Design choices, component styles, emoji palette, approved UX patterns |
| **Tools & Workflows** | `skills/tools/` | Vite dev server quirks, Docker compose for this project, deployment script |
| **Patterns & Arch** | `skills/patterns/` | Error boundary pattern used here, auth middleware convention, state management approach |
| **Gotchas** | `skills/gotchas/` | npx cache issues on Windows, Python venv path gotchas, MSSQL collation bug |

## Skill Format (SKILL.md)

Skills must follow a strict file layout and format so they can be automatically
discovered and loaded by Claude, OpenAI agents, and other systems.

### Directory Structure

```text
skills/<category>/<skill-name>/SKILL.md
```

Examples:

- `skills/patterns/subagent-delegation/SKILL.md`
- `skills/api/suno-auth-errors/SKILL.md`
- `skills/gotchas/mssql-dev-connection/SKILL.md`

**Never** put skills directly as flat `.md` files.

### Required Frontmatter

Every `SKILL.md` **must** start with this YAML block:

```yaml
---
name: subagent-delegation
description: |
  Use when breaking down complex tasks, delegating work to subagents,
  deciding team size and role splits, or coordinating multi-agent work.
  Triggered by requests involving large features, parallel exploration,
  or any situation where multiple agents would be more effective than
  sequential work in the main thread.
---
```

- `name`: kebab-case identifier (lowercase, hyphens only)
- `description`: Detailed, trigger-oriented text. Start with "Use when..." or
  "Use for...". Describe the situations that should cause an agent to load
  this skill. Be specific about the kinds of requests that activate it.

### Content Structure

After the frontmatter:

```markdown
# Human Readable Title

[Main content here]
```

A good skill typically includes:

- Clear **Core Rules** or principles
- **When to use / When not to use** guidance
- Concrete **templates**, **workflows**, or **checklists**
- **Common failure modes** (very valuable)
- Links to related files or other skills

Use the `skill-creator` skill when writing or revising any skill.

## Promotion Pathway

```text
Project /skills/<category>/<skill-name>/SKILL.md
         │
         ▼ (if generally useful)
Global .agents/skills/<category>/<skill-name>/SKILL.md
```

Skills are created inside a project under `skills/<category>/<skill-slug>/SKILL.md`.
When a skill proves useful across many projects, copy the entire folder to the
global `.agents/skills/` directory so other agent instances (Claude Code,
Codex, OpenCode, etc.) can load it automatically.

## Active Mining Rule

While developing or researching, **constantly ask**: *"Will I or another agent
need this information again?"* If yes, draft a skill immediately while the
context is fresh. Do not wait until the end of the session — the best skills
are written in the moment, then refined at session end.

Examples of mining in action:

- *"The Suno API returns `code: 401` inside a 200 OK body"* → create
  `skills/api/suno-auth-errors/SKILL.md`
- *"User prefers outlined buttons for secondary actions, filled for primary"*
  → create `skills/preferences/button-styles/SKILL.md`
- *"This MSSQL connection requires `trustServerCertificate: true` in dev"*
  → create `skills/gotchas/mssql-dev-connection/SKILL.md`
- *"Vite keeps showing stale UI after a refactor"* → document the cache
  recovery steps locally and turn them into a reusable skill if this repo
  starts maintaining `skills/`
- *"User uses � and ✅ for status; never 🔴 for errors"* → create
  `skills/preferences/emoji-palette/SKILL.md`

## Cross-References

- [`AGENTS.md`](AGENTS.md) — Learning Artifacts section: maintain `skills/`
  notes, use `skill-creator`, share agnostic skills globally.
- [`VIBECHECK.md`](VIBECHECK.md) — User preferences discovered through
  interaction patterns belong in skills.
- [`HARD_PROBLEMS.md`](HARD_PROBLEMS.md) — Problems that took multiple attempts
  to solve should also become skills.
