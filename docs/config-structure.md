# Config Structure

## Rule

- `src/config/` contains global frontend configuration shared across features.
- `src/server/config/` contains global backend configuration.
- `src/features/<feature>/config/` contains configuration specific to that feature only.

## Current State

The current layout already matches this rule:

- `src/config/navigation.ts` is global frontend navigation config.
- `src/server/config/env.ts` and `src/server/config/prisma.ts` are global backend configuration.
- `src/features/companies/config/companyDetailsTabs.ts` is feature-local configuration.

## Notes

- Do not move feature-specific constants into shared config unless they are truly cross-feature.
- Keep UI, domain, and infrastructure configuration separate.
- Prefer adding a feature-local `config/` folder only when the feature actually needs it.
