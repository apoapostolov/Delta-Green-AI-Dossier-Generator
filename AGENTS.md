# AGENTS.md

## Runtime Requirement

Use Node.js 22 (workspace default) for this project.

## Agent Rule

Automated agents must:

1. Check `node -v` before running any commands.
2. Install dependencies with `npm install` when required.

## Code Comment Standards (Mandatory)

Never reference `TODO.md` planning labels (P0, P1, P2, P3, P0-1, P1.5, or any `PX`/`PX-X` variant) in source code comments, CSS, or any file compiled or served.

### Why

`TODO.md` is a living planning document whose sections are reshuffled frequently; labels in code become meaningless quickly.

### What to write instead

Describe **what** the code does, not which planning ticket it belongs to.

## Strict Server Startup Procedure (Mandatory)

1. Verify Node version: `node -v`
2. Start the dev server: `npm run dev` (Vite default port 3002)
3. Confirm it's listening:
   - `curl -I http://localhost:3002/`
   - `netstat -ano | findstr :3002`

## Documentation Workflow (Mandatory)

**DEVELOPMENT_LOG.md must be updated as the final step of every response changing code, UX, or behaviour.**

1. Add an entry with a date header (`## YYYY-MM-DD - Title`), root cause if fixing a bug, and bullet list of changed files.
2. If a user-requested feature ships, note it under `Unreleased` in `CHANGELOG.md`.

## TODO.md Hygiene (Mandatory)

1. Keep TODO.md full of actionable `- [ ]` items only; no prose or specs.
2. Use `docs/` for design documents.
3. Remove a section when its last checkbox is checked.

## Workspace Sanitation (Playtesting)

When asked to reset:
1. Delete `dist/`.
2. Remove `node_modules/.vite`.
3. Truncate any `server.log`.

## Dependency & Documentation Sync (Mandatory)

Whenever npm packages change, update concurrently:
1. `package.json`
2. `README.md` (dependency tables/descriptions)
3. `DEVELOPMENT_LOG.md`
