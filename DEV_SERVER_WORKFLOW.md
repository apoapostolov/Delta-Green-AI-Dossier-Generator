# Dev Server Workflow

This document defines the development-server lifecycle for projects that use
Vite, Next.js, webpack-dev-server, esbuild, or any HMR / live-reload capable
development server. The goal is to ensure the user (and the AI) never work
against stale in-memory state during active development sessions.

## Core Rules

### Always Start A Dev Server

After orienting (reading `AGENTS.md`, `TODO.md`, etc.) but before writing any
code, start the project's development server with HMR or live reload enabled.

Typical commands (use whatever the project actually defines):

```sh
npm run dev
# or
pnpm dev
# or
yarn dev
# or language-specific equivalents (e.g. `go run`, `python manage.py runserver`, etc.)
```

Do not start a production build during active development. Use the dev server
so that file changes appear quickly without a full rebuild cycle.

### Restart After Every Development Prompt

A **development prompt** is any prompt that modifies code files — additions,
edits, refactors, renames, or deletions of source, styles, templates, or
configuration.

At the **end** of every development prompt, restart the dev server so the user
never interacts with stale state:

```sh
# Kill the running server (Ctrl+C or equivalent), then restart it using the
# project's normal dev command.
```

Do **not** skip the restart because "nothing visible changed." The server may
have cached module state, resolved paths, compiled artifacts, or plugin data
that no longer matches the filesystem. A clean restart guarantees the user sees
the actual result of the changes.

If the UI still looks stale after the restart, treat it as a Vite state issue
rather than a code-review problem and follow the local cache-recovery sequence:

- confirm the page source includes `"/@vite/client"`
- clear `node_modules/.vite` after major refactors or manifest changes
- restart the dev service again after clearing cache
- hard refresh the browser
- clear any app-local storage that can restore old UI state
- verify the browser is on the live dev port, not a static build or older tab

### What Is Not A Development Prompt

These prompt types do **not** require a server restart:

- **Audit prompts** — reading files, analyzing structure, reviewing code
- **Plan prompts** — writing TODO entries, design docs, specifications
- **Check prompts** — verifying output, confirming diagnostics, reading logs
- **Config-scope prompts** — changing only `AGENTS.md`, `README.md`,
  `CHANGELOG.md`, `TODO.md`, or similar non-build documentation

If a prompt mixed planning with code changes (e.g., "read the component and
then add a prop"), it is a development prompt — restart after completing it.

When the same stale-UI report repeats, use the Vite-management skill as the
canonical recovery sequence instead of improvising a new workflow each time.

### Do Not Build for Production Prematurely

Do **not** run the production build command (e.g. `npm run build`, `vite build`,
`next build`, `go build`, etc.) during active development unless the user
explicitly requests it.

Run a production build only when the user asks for one of:

- commit and push of a release candidate
- tag creation or release preparation
- preview of the final production bundle

Building for production during development wastes time, produces artifacts that
will be stale by the next prompt, and invites review of an unfinished state.
Wait until the work is complete and the user confirms intent to ship.

## Quick Reference

| Trigger | Action |
|---------|--------|
| After orient, before coding | Start the project's dev server with HMR |
| After every code-modifying prompt | Kill old server → restart dev server |
| Non-code prompts (audit, plan, docs) | No action needed |
| User says "commit and push" or "release" | Run production build first, then ship |
| User says "preview production build" | Run production build + preview command |

## Integration With AGENTS.md

This file is referenced from the [Standard Work Loop](AGENTS.md#standard-work-loop)
in `AGENTS.md`. Any project that runs a long-lived development server with
hot-reloading or live-reload during AI coding sessions should include a copy
of this file (or equivalent rules in the project-local `AGENTS.md`).
