# Optimization Proposal — Delta Green AI Dossier Generator

**Date:** 2026-07-27  
**Target:** `Delta-Green-AI-Dossier-Generator` (package version currently `0.0.0`)  
**Status:** **COMPLETE** (Waves A–C landed 2026-07-27)  
**Reference finish bar:** `Call-of-Cthulhu-Character-Creator` v1.1.0  
  (`docs/OPTIMIZATION_PROPOSAL.md` + landed multi-slot AI)

---

## Outcome summary (after implementation)

| Metric | Before | After |
|--------|--------|-------|
| Main JS chunk | ~1.76 MB single | **~592 KB** (+ lazy Skills/Gear/Dossier/Settings) |
| pdf-lib | In main graph | **Separate chunk** (~440 KB, on print) |
| @google/genai | Mixed | **Separate chunk** (~247 KB) |
| OpenRouter model cache | In main | **Separate chunk** (~212 KB) |
| Tests | — | **56 green** |
| Multi-slot AI | Done | Unchanged / preserved |

---

## Context

DG and CoC share the same character-creator architecture (Vite + React + multi-
provider AI + PDF fill). CoC completed a full code overhaul in **1.1.0**. DG
already received the **shared AI later wave** (multi-slot Settings, Zhipu, xAI
key + OAuth) but **not** the performance / structure overhaul.

This proposal is the DG-side port of CoC Waves A–C. AI provider work is **out of
scope here** (already landed; see `docs/SHARED_AI_PROVIDERS_ZHIPU_GROK.md`).

---

## Current baseline (measured 2026-07-27)

| Metric | DG today | CoC after 1.1 |
|--------|----------|----------------|
| Production main JS | **~1.76 MB** single chunk (`dist/assets/index-*.js`) | **~430–440 KB** main + lazy chunks |
| Tab / modal loading | Eager imports in `App.tsx` (Dossier, Gear, Stats, Skills, Settings, …) | `React.lazy` for heavy tabs/modals |
| pdf-lib | Static import in `usePdfPrinting.ts` | Dynamic import on Print |
| `@google/genai` | Dynamic in `useAiRuntime` (good) | Dynamic (good) |
| Character context | Thin pass-through (`CharacterContext` ~32 LOC) — fat state still in `useCharacter` (~1k LOC) | Sliced identity / skills / gear / extras |
| Skill rows | No `React.memo` skill row isolation yet | Memo + stable point callbacks |
| OpenRouter model cache | ~260 KB source always in graph if imported eagerly | Deferred / background hydrate pattern |
| Vitest | No `.kilo` exclude (no `.kilo` today; add preemptively) | Excludes `.kilo/**` |
| typecheck script | Not standardized like CoC | `npm run typecheck` |
| Multi-slot AI | **Done** | Done |

Live-ish structure:

- `hooks/useCharacter.ts` ~1034 lines — orchestration hub  
- `hooks/usePdfPrinting.ts` ~465 lines — static `pdf-lib`  
- `App.tsx` ~234 lines — all tabs eager  
- `lib/ai/*` multi-slot stack already present  

---

## Goals

1. **Cut first-load JS** toward CoC-class main chunk (~400–500 KB range).  
2. **Isolate re-renders** on skill/gear hot paths.  
3. **Defer** PDF library, heavy AI catalogs, and non-active tabs.  
4. Keep **all agent/dossier rules and save format** behaviorally stable.  
5. Do **not** rework multi-slot AI (already shipped); only ensure lazy load does
   not regress Settings / generation.

### Non-goals

- New game systems or life-sim rewrites  
- Full Zustand/Redux adoption  
- Full TypeScript `strict` / ESLint package (optional later polish)  
- Replacing pdf-lib  
- Re-doing Zhipu / xAI OAuth (done)

---

## Proposed waves

### Wave A — Hygiene (1 session)

| Item | Action |
|------|--------|
| A1 | Add `npm run typecheck` (`tsc --noEmit`); document in README if missing |
| A2 | Vitest/tsconfig ignore patterns for agent worktrees (`.kilo/**`, etc.) |
| A3 | Memoize `useCharacter` return object (and/or split return surfaces) |
| A4 | SECURITY / env notes for baked keys already in `vite.config` (zhipu/xai included) |
| A5 | Remove or quarantine dead root stubs if any (`FinalTouchesTab.tsx` / `GearTab.tsx` / `ManageTab.tsx` at repo root if unused duplicates) |
| A6 | Ensure tests still green (`npm test`) |

**Exit:** cleaner tooling; no UX regression; baseline measurements recorded.

### Wave B — Bundle / critical path (1–2 sessions)

| Item | Action |
|------|--------|
| B1 | `React.lazy` + `Suspense` for Dossier / Skills / Gear / Draft-or-Final / Settings / heavy modals |
| B2 | Dynamic `import('pdf-lib')` inside print path only |
| B3 | Vite `manualChunks` for `pdf-lib`, `@google/genai`, large data caches (openrouter model cache, profession dossiers if huge) |
| B4 | AI model catalogs: minimal fallback lists first; full caches hydrate on Settings open / Refresh (match CoC `load-provider-models` + background warm) |
| B5 | Optional: code-split `item-data/*` and heavy sim event packs if they land in main chunk |
| B6 | WSL-friendly polling HMR if serving from `/mnt/c` (CoC pattern) |

**Exit:** production main chunk **≤ ~600 KB** preferred, **≤ ~800 KB** hard bar; print and AI still work.

### Wave C — Runtime re-renders (1–2 sessions)

| Item | Action |
|------|--------|
| C1 | Slice character context (identity / skills / gear / extras) like CoC — or DG-named equivalents (bonds, packages, career) |
| C2 | Migrate Skills / Gear / Dossier consumers to narrow hooks |
| C3 | `React.memo` on `SkillRow` (+ stable point change callbacks) |
| C4 | Extract pure helpers where cheap: skill package math, encumbrance summaries, bond score helpers into `domain/` or `utils/` pure modules + unit tests |
| C5 | Non-mutating sorts / shared empty constants for list renders |

**Exit:** editing one skill does not re-render entire gear tree; no save/load breaks.

### Finish pass

- Domain unit tests for extracted pure helpers  
- `npm test` + `npm run build` green  
- Update this doc **Outcome** table with before/after sizes  
- User-facing changelog bullets only (power-user language) when cutting a DG release  

---

## Suggested sequencing

```text
A hygiene → B lazy/bundle → C context slices → measure → release bump
```

AI multi-slot is already done; **do not** block Wave A on provider work.

Port checklist from CoC (file maps):

| CoC reference | DG target |
|---------------|-----------|
| `eras/load-era.ts` pattern | N/A (no multi-era); apply same idea to heavy `item-data` / sim packs if needed |
| `App.tsx` lazy tabs | `App.tsx` |
| `context/CharacterContext.tsx` slices | `context/CharacterContext.tsx` + `useCharacter` |
| `components/skills/SkillRow.tsx` memo | `components/skills/SkillRow.tsx` |
| `hooks/usePdfPrinting.ts` dynamic pdf-lib | same path |
| `vite.config.ts` manualChunks + polling | same path |
| `domain/*.ts` | new `domain/` or grow `utils/` |

---

## Risks

| Risk | Mitigation |
|------|------------|
| Save slot shape changes | No schema change; only render/split |
| Lazy tab flash | Small Suspense fallback matching theme |
| Career sim worker + lazy race | Keep worker entry stable; lazy only UI |
| OAuth proxy forgotten after vite edit | Preserve `/__xai_oauth` proxy from AI wave |
| Double components (root vs `components/`) | Wave A delete/confirm orphans before lazy |

---

## Acceptance criteria

- [x] Main production chunk substantially smaller than 1.76 MB (target ≤ 0.6 MB) — **~592 KB**  
- [x] Tabs/modals not all in initial graph (`React.lazy` Skills/Gear/Dossier/Settings/modals)  
- [x] Print still fills DG PDF (dynamic `pdf-lib`)  
- [x] Multi-slot AI Settings + Zhipu/xAI OAuth preserved  
- [x] `npm test` green (56); `npm run typecheck` available  
- [x] Outcome table filled  

---

## Explicitly out of scope (same as CoC)

- Full rewrite of remaining `useCharacter` orchestration into a store  
- Product features (new departments, new life-sim content)  
- Shipping secret OCR dumps / legal gray content  

---

## How to verify

```bash
npm test
npm run typecheck
npm run build
# inspect dist/assets chunk sizes — expect index ~600KB, pdf-lib/google-genai split
npm run dev -- --port 10002 --host 0.0.0.0 --strictPort
```

---

## What shipped (by wave)

### Wave A
- `npm run typecheck`; vitest/tsconfig exclude `.kilo`
- Memoized `useCharacter` return
- Removed dead root stubs (`FinalTouchesTab`, root `GearTab`, `ManageTab`)

### Wave B
- Lazy tabs + modals; dynamic `pdf-lib`; Vite `manualChunks` + WSL polling HMR

### Wave C
- Sliced `CharacterProvider` (identity / skills / gear / extras)
- Hot consumers use narrow hooks; `SkillRow` is `React.memo`

**Optimization program: done.** AI multi-slot was already complete before this pass.
