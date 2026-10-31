# Web application structure

The active product is the React + TypeScript + Vite application in this directory. The legacy HTML/CSS/JS prototype remains in the repository root as a reference and is not imported by this application.

## Source map

- `src/app/`: application bootstrap and app-level composition (reserved for providers and routing).
- `src/shared/components/`: reusable layout and UI components shared across features.
- `src/shared/hooks/`: cross-feature hooks.
- `src/shared/lib/`: framework-independent helpers and utilities.
- `src/features/doctors/`: doctor directory domain, types, demo repository, search hook, categories and doctor UI.
- `src/features/home/`: patient home and discovery experience.
- `src/features/appointments/`: appointment pages and future booking workflows.
- `src/features/messages/`: patient/provider conversations.
- `src/features/patients/`: patient profile and settings.
- `src/services/`: API adapters; add backend integrations here only after contracts and security rules are reviewed.
- `src/styles.css`: global design tokens, reset, responsive layout and current shared styling.

## Change boundaries

1. Keep feature-specific UI and logic inside its feature folder.
2. Put genuinely reusable components in `shared/components`; avoid putting product workflows there.
3. Keep domain types separate from React components.
4. Keep API access in service modules, not inside page components.
5. Do not place credentials or service-role keys in browser code.
6. Do not connect production patient data until the data model, authentication, tenant boundaries and database row-level security are reviewed.
7. Run `npm run typecheck` and `npm run build` after each meaningful change.
8. Add tests alongside the feature as the test framework is introduced.
9. Keep the root prototype unchanged unless a task explicitly targets it.

## Current implementation status

The web shell, patient home, doctor directory demo, appointment placeholder, messages placeholder and patient settings placeholder are separated into feature/shared modules. Demo data remains local and no backend or real patient records are connected.
