# AGENTS.md

## Cursor Cloud specific instructions

This is a **Next.js 15 portfolio site** (single app, no backend, no database, no env vars).

### Quick Reference

| Action | Command |
|--------|---------|
| Install deps | `pnpm install` |
| Dev server | `pnpm dev` (runs on port 3000, uses Turbopack) |
| Build | `pnpm build` |
| Lint | `pnpm lint` |
| Typecheck | `pnpm typecheck` |
| Format check | `pnpm format:check` |
| Format fix | `pnpm format:write` |

### Notes

- The project uses **pnpm** (lockfile: `pnpm-lock.yaml`). A `package-lock.json` also exists but pnpm is the canonical package manager.
- ESLint config is in `eslint.config.mjs` (flat config using `@eslint/eslintrc` compat layer with `next/core-web-vitals` + `next/typescript`).
- There are pre-existing lint errors (unused imports/variables in several files) — these are in the repo baseline, not regressions.
- No environment variables or secrets are required. All data is hardcoded.
- `pnpm install` may warn about ignored build scripts for `sharp` and `unrs-resolver`. This is expected and does not affect functionality.
- The contact form on `/contact` is fully commented out — no working form handler exists.
