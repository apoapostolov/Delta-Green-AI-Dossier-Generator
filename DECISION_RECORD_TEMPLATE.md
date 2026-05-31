# Decision Record

## Title

- short decision name

## Status

- proposed | accepted | superseded

## Date

- YYYY-MM-DD

## Context

- why this decision needed to be made

## Decision

- the chosen approach

## Alternatives Considered

- option 1 and why it was not chosen
- option 2 and why it was not chosen

## Consequences

- what becomes simpler
- what becomes harder

## Validation

- how to verify the decision was sound

## Follow-Up

- any future trigger for revisiting this decision

## Example

### Suno submit errors should surface body-level auth failures

- Status: accepted
- Date: 2026-05-09
- Context: the API returned a JSON `code: 401` while still responding with
  HTTP 200, which made the client report a missing task id instead of the real
  auth problem.
- Decision: inspect the JSON body for provider-level error codes before
  treating the response as a successful task submission.
- Alternatives considered:
  - trust `response.ok` alone, which hid the real failure
  - keep the old behavior, which forced users to guess at the problem
- Consequences:
  - auth failures are now readable
  - success handling is slightly stricter
- Validation: add a test that submits a 401 body and asserts the auth message
  is surfaced directly.
- Follow-Up: if the provider changes its error schema, update the body-level
  error extraction helpers.
