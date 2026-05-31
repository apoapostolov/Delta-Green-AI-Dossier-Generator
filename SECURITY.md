# Security Defaults

Use this file as the starting point for repository security guidance in
AI-assisted projects.

## Goals

- keep secrets out of the repository
- make automation predictable and minimal
- surface security issues early
- keep the repo easy to audit

## Repository Defaults

- Keep API keys, tokens, service passwords, and private URLs out of source
  files, docs, prompts, and changelogs.
- Prefer environment variables or local-only configuration for secrets.
- Add `SECURITY.md` to any project that accepts external contributors or
  exposes public release artifacts.
- Enable secret scanning and push protection where the GitHub plan supports
  them.
- Review dependency and workflow changes like code, not just configuration.

## GitHub Actions Defaults

- Set the default `GITHUB_TOKEN` permission to `read` unless a workflow needs
  more.
- Grant write permissions only to the specific job that needs them.
- Avoid broad repository write tokens in workflows.
- Pin third-party actions to commit SHAs when practical.
- Treat workflow changes as privileged changes and require review.

## If A Secret Leaks

1. Revoke or rotate the secret immediately.
2. Remove the secret from the repository and its history if needed.
3. Verify whether GitHub secret scanning or push protection caught it.
4. Record the incident in the development log if the project keeps one.

## Notes

- For public repositories, GitHub can run secret scanning for free.
- For private repositories, plan-specific secret protection may be required.
- Pair this file with a branch-protection or CODEOWNERS policy for stronger
  review control.
