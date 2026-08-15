# Delta Green A.I. Agent Dossier Generator

*Build a playable agent, simulate a dangerous career, and turn it into a
classified dossier.*

[![Version 1.2.0](https://img.shields.io/badge/version-1.2.0-blue)](./CHANGELOG.md)
[![React](https://img.shields.io/badge/React-18-61DAFB)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6)](https://www.typescriptlang.org/)
[![Issues](https://img.shields.io/github/issues/apoapostolov/Delta-Green-AI-Dossier-Generator)](https://github.com/apoapostolov/Delta-Green-AI-Dossier-Generator/issues)

This browser app combines Delta Green character creation with a year-by-year
career simulator. Choose the agent's attributes, profession, skills, and gear;
then let promotions, injuries, relationships, psychological damage, and the
Unnatural shape a history worth bringing to the table. AI is optional and adds
names, portraits, memories, medical reports, custom gear, and the final dossier.

<!-- Product proof needed: capture the finished Dossier tab with portrait,
career timeline, and classified report visible. -->

## What's New in 1.2.0

- Assign separate AI providers and models to creative text, simple text,
  vision, and image work.
- Use OpenAI, Anthropic, Gemini, OpenRouter, xAI Grok, Z.ai GLM, DeepSeek,
  or OpenCode Go.
- Sign in to SuperGrok through device OAuth when running the local
  development server.
- Load heavy tabs only when needed and reduce the main production bundle
  from roughly 1.8 MB to 0.6 MB.
- Import, export, and recover saved agents more reliably.

See the full [changelog](./CHANGELOG.md).

## What You Can Do

- **Create a complete Delta Green agent.** Roll attributes, choose from a
  broad profession roster, distribute legal skill advances, and equip the
  character.
- **Simulate an entire career.** Move year by year through promotions,
  transfers, personal milestones, injuries, trauma, and death.
- **Watch the Unnatural leave a mark.** Career danger, weird events, failed
  checks, and difficult successes change SAN and the final agent.
- **Generate a case-ready identity.** Create era-appropriate names, codenames,
  portraits, headshots, and emotional variations.
- **Turn mechanics into lived history.** Ask AI to write first-person memories
  and a final classified assessment grounded in the simulated events.
- **Build the right operational kit.** Start with Tools of the Trade, add
  focused equipment packs, or generate a custom item.
- **Mix AI providers by task.** Use one model for prose, another for vision,
  and a dedicated image provider without changing the rest of the app.
- **Keep agents on your machine.** Save five characters in the browser and
  import or export portable JSON backups.

## How It Works

1. **Attributes:** roll a set, compare previous rolls, and choose a profession.
2. **Skills:** distribute profession and personal advances in legal `+20%` blocks.
3. **Gear:** choose individual items or add packs for surveillance, entry,
   medicine, forensics, wilderness work, and covert case handling.
4. **Dossier:** choose era, nationality, gender, identity, and experience; then
   simulate the career, accept its consequences, and generate the final report.

The final dossier is treated as the settled record for that agent. Review the
career and mechanical consequences before generating it.

## Career Simulation

The procedural engine runs independently of AI. It models:

- profession-specific rank ladders and promotion difficulty;
- career transitions, skill growth, and personal events;
- casual, risky, and deadly profession profiles;
- injuries, medical retirement, and death in service;
- sanity erosion and encounters with the Unnatural;
- operational eras from the 1950s through the 2020s.

AI then receives the resulting history and turns it into narrative material. It
does not invent the underlying rolls or career outcomes.

## AI Setup and Privacy

Open **Settings** to choose a provider, model, and key for each task slot. Keys
are remembered locally in the browser for convenience. Use only providers whose
data handling you accept; generated prompts may contain the agent details you
entered or simulated.

The non-AI character creator and career simulation still work without any API
key. SuperGrok device login works best through `npm run dev` because it uses the
local Vite proxy.

## Save, Share, and Recover

- Keep up to five named save slots in browser storage.
- Preserve attributes, skills, bonds, profession, gear, portraits, career
  results, disorders, trainings, and generated text.
- Export an agent as JSON for backup or sharing, then import it from a file or
  the clipboard.

Browser storage is convenient day to day. Treat it as temporary and export any
agent you would be unhappy to lose.

## Quick Start

Requirements: a current Node.js release and an API key only for the AI features
you plan to use.

```bash
npm install
npm run dev
```

The app opens at `http://localhost:3002/`. Copy `.env.example` to `.env.local`
if you prefer environment keys over entering them in Settings.

## Development

```bash
npm test
npm run typecheck
npm run build
```

More testing detail lives in [`tests/README.md`](./tests/README.md) and
[`docs/QUICK_TEST_REFERENCE.md`](./docs/QUICK_TEST_REFERENCE.md).

## Disclaimer

This is an unofficial fan project. It is not affiliated with Arc Dream
Publishing. Generated material is intended for personal, non-commercial
tabletop role-playing use.
