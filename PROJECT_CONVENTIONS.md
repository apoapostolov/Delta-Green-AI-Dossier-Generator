# Project Conventions

## Naming Conventions

Pick a convention per file type and apply it consistently across the project.
The examples below are illustrative — follow the dominant convention of your
language and framework when they differ.

- **Source files** — Prefer kebab-case for project files when the ecosystem
  allows it (`user-profile.tsx`, `api-client.ts`, `style-guide.css`,
  `user-profile.py`). Kebab-case avoids case-sensitivity issues across
  operating systems and is URL-safe. Use the language's conventional form when
  required (e.g., `user_profile.py`, `UserProfile.go`).
- **Components / Classes / Major Types** — Use PascalCase (or the language
  equivalent) for the public name, matching the primary export or definition
  (`UserProfile.tsx`, `ApiClientProvider.tsx`, `UserProfile` class in Python
  or Go). The filename should make the symbol easy to find.
- **Functions and variables** — Use camelCase in TypeScript/JavaScript
  (`getUserProfile`, `apiClient`). Use snake_case when the language or
  framework convention requires it (Python, Ruby, database columns, etc.).
- **Directories** — Use kebab-case for all directories when possible
  (`src/components/user-profile/`, `docs/api/`, `internal/user-profile/`).
  Avoid PascalCase or camelCase in directory names unless the platform
  strongly prefers it.
- **Config files** — Use the tool's or framework's default name whenever
  possible (`vite.config.ts`, `tsconfig.json`, `package.json`, `pyproject.toml`,
  `Cargo.toml`). Only rename when you have multiple config variants.

## Directory Structure

Organize by feature or domain first, not by technical file type. This keeps
related code together and makes ownership clearer.

**General pattern** (adapt names and layout to your language/ecosystem):

```text
src/ (or app/, internal/, pkg/, etc.)
  features/ (or domains/, modules/)
    user-profile/ (or user_profile/, userprofile/)
      user-profile.tsx   (or user_profile.py, userprofile.go)
      user-profile.test.tsx
      userProfileService.ts
      userProfileTypes.ts
  shared/ (or common/, core/, lib/)
    components/ (or ui/, views/)
    hooks/ (or composables/, utilities/)
    utils/ (or helpers/, shared/)
```

The exact top-level folders and nesting will vary:

- React/TS projects often use `src/features/...`
- Python projects commonly use `src/mypackage/subpackage/...` or a flat
  `mypackage/` layout under the project root
- Go projects typically follow `cmd/`, `internal/`, and `pkg/`

**Core principle (language-agnostic):** Do not create flat `components/`,
`utils/`, or equivalent directories at the top level that mix unrelated
domains. Group by business/technical domain first, then by role within that
domain.

## Structural Rules

- **Keep file/module size manageable.** Large single files become hard to
  reason about, review, and generate into. In JavaScript/TypeScript this often
  becomes painful above ~2,000–3,000 lines. In other languages the threshold
  varies (Python modules, Go files, etc.). When a file grows too large for
  comfortable work, propose splitting it into focused modules. Ask the user
  before major restructuring.
- **Keep depth manageable.** Prefer 3–4 levels of nesting from project root.
  Deeper than 5 levels suggests a reorganization is needed.
- **One clear home per concern.** A module should belong to exactly one
  directory. Do not split a feature across multiple top-level folders.
- **Keep tests close to code.** Place test files alongside the source they
  test (`user-profile.test.tsx` next to `user-profile.tsx`), not in a distant
  `__tests__/` directory.
- **Separate generated output.** Put generated files in their own directory
  (`dist/`, `build/`, `generated/`) and add it to `.gitignore` unless the
  project requires committed output (see
  [`GENERATED_FILES.md`](GENERATED_FILES.md)).

## Documentation Directory

All project documentation must live in a top-level `docs/` directory, organized
by subdirectory by type of documentation (e.g., `docs/architecture/`,
`docs/api/`, `docs/guides/`, `docs/decisions/`). Do not scatter documentation
across the project root or into source code directories. The only exceptions are
`README.md`, `CHANGELOG.md`, `CONTRIBUTING.md`, `SECURITY.md`, and the
project-local `AGENTS.md` — these live at the project root because they are the
project's entry-point files.
