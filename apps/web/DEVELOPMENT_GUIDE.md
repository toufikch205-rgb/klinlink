# KLINLINK Web Development Guide

## Local setup

Requirements: Node.js 20 or newer and npm.

```bash
cd apps/web
npm install
npm run dev
```

## Verification before committing

```bash
npm run typecheck
npm run build
npm run preview
```

A GitHub Actions workflow runs type-checking and a production build for changes under `apps/web`.

## Where changes belong

| Change | Location |
| --- | --- |
| App composition and global state | `src/App.tsx` |
| Reusable header/navigation | `src/shared/components/` |
| Shared non-UI helpers | `src/shared/lib/` |
| Doctor data/types/search/profile UI | `src/features/doctors/` |
| Patient discovery/home page | `src/features/home/` |
| Appointment workflows | `src/features/appointments/` |
| Patient/provider messaging | `src/features/messages/` |
| Patient profile/settings | `src/features/patients/` |
| Global design tokens | `src/styles/tokens.css` |
| Header and app shell layout | `src/styles/layout.css` |
| Home and discovery styling | `src/styles/home.css` |
| Doctor cards and dialogs | `src/styles/doctors.css` |
| Breakpoints and responsive rules | `src/styles/responsive.css` |

## Rules that prevent regressions

- Make focused changes in the owning feature; do not place all workflows in `App.tsx`.
- Keep shared components generic. Feature-specific behavior belongs in its feature.
- Keep API and persistence access in `src/services/`, not directly in visual components.
- Keep demo data clearly marked and never use real patient data in demos or tests.
- Do not add production secrets to Vite environment variables; all `VITE_*` values are public in the browser.
- Do not connect a production database until the schema, authentication, tenant isolation and row-level security policies have been reviewed.
- Preserve the root-level HTML/CSS/JS prototype as a reference.
- Verify type-check and production build before merging.
- Prefer small feature branches and review each change before merging into the default branch.

## Current limitations

This is a modularized web prototype. Appointment booking, messaging, account settings, authentication and persistence are placeholders or demo behavior. No production backend or real patient records are connected. Automated CI is configured, but its result must be checked in the Actions tab after GitHub runs it.
