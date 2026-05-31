# Code Review Checklist

Use this checklist when reviewing AI-generated or human code changes before
merging. Not every item applies to every change — use judgment for the
appropriate scope.

## Structural Review

- [ ] **Architectural fit** — Does the change belong in the layer or module it
      touches? Does it introduce coupling that should be avoided?
- [ ] **Abstraction boundary** — Are internal helpers, types, or state exposed
      that should stay private? Are public APIs justified by an external caller?
- [ ] **Diff scope** — Does the change include unrelated formatting, linting, or
      renames that should be in a separate commit?
- [ ] **Duplicate work** — Could existing utilities, patterns, or types replace
      the new code?

## Correctness Review

- [ ] **Edge cases** — What happens with empty input, null/undefined values,
      boundary conditions, or network errors? Are these handled?
- [ ] **Error paths** — Are errors surfaced at the right level? Are they logged
      without leaking internal state? Is there a fallback or retry where
      appropriate?
- [ ] **State mutations** — Does the change modify shared state safely? Are
      there race conditions, stale references, or inconsistent intermediate
      states?
- [ ] **Async correctness** — Are promises awaited? Are error boundaries in
      async chains intact (`.catch()`, try/catch, error boundaries)?
- [ ] **Type safety** — Are there implicit `any`, unsafe casts, or assumptions
      about runtime types that TypeScript or the type checker cannot verify?

## Security Review

- [ ] **Input sanitization** — Are user-supplied values validated, escaped, or
      sanitized before use in queries, templates, or shell commands?
- [ ] **Secret exposure** — Are API keys, tokens, passwords, or private URLs
      hardcoded or logged? Could they leak through error messages?
- [ ] **Permission model** — Does the change respect the principle of least
      privilege? Are scopes, roles, or access checks correct?
- [ ] **Injection vectors** — Could the change introduce XSS, SQL injection,
      command injection, or prototype pollution?

## Testing Review

- [ ] **Coverage of the new path** — Are the key branches, error paths, and
      edge cases tested? Are the tests readable and deterministic?
- [ ] **Regression risk** — Does the change break existing behavior that isn't
      covered by tests? Should existing tests be updated?
- [ ] **Test quality** — Do tests assert meaningful outcomes rather than
      implementation details? Are mocks scoped and realistic?

## Documentation Review

- [ ] **Changelog entry** — Is there a user-visible changelog entry in the
      correct category? Does it follow the overwrite-first and unreleased-feature
      rules? (See [`AGENTS.md`](AGENTS.md#changelog-governance).)
- [ ] **API docs** — Are new public functions, types, or endpoints documented?
      Are parameter descriptions accurate?
- [ ] **Inline comments** — Do comments explain *why*, not *what*? Are there
      TODO or FIXME comments that should be addressed or tracked?

## Operational Review

- [ ] **Configuration** — Are new environment variables, feature flags, or
      settings documented and given sensible defaults?
- [ ] **Migration** — Does the change require a database migration, data
      transform, or cache invalidation? Is the migration reversible?
- [ ] **Observability** — Are new failure modes logged or metrics added so
      operations can detect issues?
- [ ] **Rollback** — Can this change be reverted cleanly? If not, is the
      rollback procedure documented?

## Notes

- Run the checklist in order: structural issues invalidate correctness checks,
  security issues block everything, and so on.
- If a review item is intentionally skipped, note the reason in the PR
  comments so the decision is preserved.
- Treat this checklist as a living document — add items when recurring issues
  are discovered in reviews.
