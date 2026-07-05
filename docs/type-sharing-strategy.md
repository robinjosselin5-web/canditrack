# Type Sharing Strategy

## Principle

Keep front and back types separate by default.

- `src/features/**/types` stays focused on UI state, form values, and feature-local view models.
- `src/server/**/types` stays focused on domain types, DTOs, and API contracts.
- Do not merge Prisma models, API payloads, and UI form types into one shared layer.

## When To Share

Use `src/shared/types/` only for truly neutral types that are identical on both sides and do not encode transport or UI concerns.

Good candidates would be:

- a small cross-cutting enum-like value object
- a low-level date or pagination shape with no UI-specific fields

## What Not To Share

- form values that differ from API payloads
- API response wrappers
- Prisma-derived types
- feature-specific status unions that only look similar

## Current Project Decision

No type was moved to `src/shared/types/` in this pass.

The obvious near-matches are intentionally left separate:

- `features/companies/types/company.types.ts` and `server/types/company.types.ts`
- `features/resumes/types/candidateResume.types.ts` and `server/types/candidateCv.types.ts`
- `features/auth/types/*` and `server/types/user.types.ts`

They look similar, but they serve different layers and should stay decoupled until a real shared contract exists.

## Next Step

If type duplication starts to grow, prefer generating contracts later from a single source of truth such as OpenAPI, Zod, or Prisma rather than hand-sharing many files.
