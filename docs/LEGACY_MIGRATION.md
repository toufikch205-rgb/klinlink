# Legacy Web Migration Register

## Goal
Retire the root-level legacy HTML/CSS/JavaScript implementation gradually, without losing pages, visual design, behavior, or browser-stored demo data. The React application in `apps/web` is the intended destination.

## Safety rules
- Do not delete, rename, or disable root-level legacy files until the corresponding React feature has passed its parity gate.
- Keep the current GitHub Pages production entry point unchanged during the migration baseline phase.
- Migrate one feature slice at a time; build and test after each slice.
- Compare desktop and mobile layouts, and verify English, Arabic (RTL), and French (LTR).
- Preserve existing localStorage keys and provide a migration path before changing their formats.
- Demo data only. Do not enter real patient or medical information.
- A successful TypeScript build alone is not proof of feature parity.

## Current implementation map

| Legacy source | Existing behavior / UI | React destination | Status |
|---|---|---|---|
| `index.html` | Main patient shell, greeting, doctor search, specialty categories, doctor cards, navigation, appointment modal, booking confirmation, appointment list, messages, settings, language selector | `App.tsx`, `features/home`, `features/doctors`, `features/appointments`, `features/messages`, `features/patients`, shared components | Partial; React pages are not yet behavior-equivalent |
| `patient-features.js` | Patient shortcuts, doctor profile detail, favorites, profile sharing, queue estimate, patient profile editor | `features/patients`, `features/doctors`, `features/appointments` | Favorites and patient profile storage/UI migrated in React; sharing and shortcuts still need parity review |
| `language.js` | Legacy DOM translation, persisted language, Arabic RTL and French LTR, dynamic content translation | `shared/i18n` | React localization exists; needs full-page and dynamic-content verification |
| `styles.css` | Legacy mobile-first design, doctor cards, modal, bottom navigation, settings and booking styles | `styles/` | React has its own design system; visual parity not yet established |

## Known parity gaps (must be closed before cutover)
1. React appointments page is an empty-state placeholder; legacy supports booking and rendering saved appointments.
2. React doctor selection opens a profile modal, but booking currently displays a demo alert instead of completing the legacy booking flow.
3. Favorites now persist using the legacy key and are surfaced on the React home page; dedicated shortcuts and profile sharing still need parity review.
4. Demo queue estimate is now represented in the React appointments list; its display is explicitly illustrative and not connected to live clinic queue data.
5. Patient profile editing and browser persistence now use the legacy `klinlink-patient` key; manual UI and cross-language acceptance remain.
6. React messages/settings are placeholders compared with legacy behavior.
7. The React UI has not yet been verified against the legacy mobile and desktop layouts.
8. Language switching must be checked across every React page, modal, validation message, and dynamically rendered state.

## Incremental migration sequence

### Phase 0 — Baseline (current)
- Preserve the legacy implementation untouched.
- Record behavior and visual parity requirements.
- Keep React CI (type-check, unit tests, production build) green.

### Phase 1 — Doctor profile and booking
- Implement the complete doctor profile and booking flow in React.
- Extract booking domain logic, types, and persistence into feature-scoped modules.
- Add unit tests for validation, booking creation, and persistence.
- Verify profile open/close, date constraints, time selection, confirmation, and navigation to appointments.

### Phase 2 — Appointments and queue estimate
- Implement persisted appointment list, empty state, booking details, and demo queue estimate.
- Test reload persistence and malformed/empty localStorage handling.

### Phase 3 — Favorites and patient profile
- Implement favorites, profile editing, and shareable doctor profile behavior.
- Preserve or explicitly migrate the legacy localStorage keys:
  - `klinlink-bookings`
  - `klinlink-favorites`
  - `klinlink-patient`
- Add tests before changing storage formats.

### Phase 4 — Messages, settings, and localization
- Migrate each remaining interaction and verify all three languages.
- Verify Arabic direction, layout, labels, accessibility text, and dynamically displayed messages.

### Phase 5 — Visual and functional acceptance
- Compare legacy and React screenshots at phone and desktop widths.
- Run the complete manual regression checklist and automated tests.
- Verify navigation, modals, forms, empty states, reload behavior, and all persisted demo flows.

### Phase 6 — Controlled production cutover
- Only after all gates pass, update the deployment entry point to React.
- Keep the legacy implementation archived in the repository for rollback.
- Verify the live GitHub Pages deployment on mobile and desktop.
- Remove the legacy runtime files only in a later, separately reviewed change after the rollback window.

## Per-phase release gate
A phase is accepted only when:
- its feature has equivalent user-visible behavior;
- no existing route, page, or interaction is lost;
- responsive layout is checked at phone and desktop sizes;
- English, Arabic, and French are checked where applicable;
- unit tests, type-check, and production build pass;
- the GitHub Actions run for the exact commit completes successfully;
- the legacy production site remains available until the final cutover is approved.

## First implementation slice
Start with **Phase 1: doctor profile and booking**. Do not change the current production entry point or delete any legacy file during this slice.
