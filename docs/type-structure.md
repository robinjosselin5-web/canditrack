# Type Structure

## Rule

- `src/types/` contains global frontend-only types.
- `src/features/<feature>/types/` contains frontend types specific to one feature.
- `src/server/types/` contains internal backend types.
- `src/shared/types/` should be reserved for DTOs or API contracts that are truly shared by both frontend and backend.

## Current Decision

No type was moved to `src/shared/types/` in this pass.

The current codebase does not expose a clearly identical contract that is safe to centralize without changing meaning or coupling unrelated layers.

## Examples Kept Separate

- `src/types/api.ts` stays frontend-only for the HTTP client contract used by the UI.
- `src/types/auth.ts` stays frontend-only because it mixes UI auth state and form payloads.
- `src/types/user.ts` stays frontend-only because it models the UI-authenticated user shape.
- `src/server/types/api.types.ts` stays backend-only because it models the server response envelope.
- `src/server/types/user.types.ts` stays backend-only because it models backend user/session internals.
- `src/features/companies/types/company.types.ts` stays feature-local because it mixes front form payloads and feature view models.
- `src/features/resumes/types/candidateResume.types.ts` stays feature-local because it is a resume UI contract.

## Next Step

If a DTO becomes identical on both sides, move only that one type into `src/shared/types/` and update imports explicitly.
