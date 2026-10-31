# KLINLINK Architecture Plan

## Product targets
- Patient experience: discover healthcare professionals, view profiles, and book/manage appointments.
- Professional experience: independent dashboard, schedule, appointments, and patient administration.
- Shared platform: multi-tenant architecture with strict data isolation.
- Current delivery target: web application.
- Future target: Android and iOS applications, reusing domain logic and service contracts where practical.

## Current web architecture
The active implementation is a React + TypeScript web application built with Vite in `apps/web`. The legacy HTML/CSS/JavaScript prototype at the repository root remains untouched as a visual and functional reference.

```text
apps/
  web/
    src/
      App.tsx
      main.tsx
      styles.css
      components/
      features/
        authentication/
        doctors/
        appointments/
        patient/
        professional/
      services/
        supabase/
      hooks/
      constants/
      theme/
      types/
      utils/
    index.html
    package.json
    tsconfig.json
    vite.config.ts
  mobile/                 # future React Native + Expo app

docs/
  ARCHITECTURE_PLAN.md
  ENGINEERING_STANDARDS.md
  SECURITY_BASELINE.md
  QUALITY_PLAN.md
```

## Architecture boundaries
- Pages and components render UI and collect user input.
- Feature modules contain use cases and domain rules.
- Services are the only layer that communicates with Supabase or external providers.
- Types define shared data contracts.
- Platform-specific code is isolated behind small adapters.
- Authorization and tenant isolation are enforced by PostgreSQL RLS and trusted server-side logic.
- Keep business rules independent of browser APIs to improve future mobile reuse.

## Delivery and migration strategy
1. Keep the current root-level prototype intact as a reference.
2. Develop the web product in `apps/web`; do not replace the root prototype during early development.
3. Establish routing, design tokens, shared components, typed service boundaries, and automated checks.
4. Rebuild and approve the patient home screen to match the supplied reference.
5. Add patient booking and profile flows, then the professional dashboard.
6. Connect Supabase only after the data model, roles, and RLS policies have been reviewed.
7. Add web accessibility, responsive, security, and end-to-end testing.
8. In a future phase, create a React Native + Expo mobile app and reuse shared domain logic, types, validation, and API/service contracts. Native UI will be implemented for Android and iOS as needed.

## Important constraints
- The current web app is not yet connected to Supabase; demo doctor data are static.
- A future native app will require platform-specific UI and testing; web UI components are not automatically portable to React Native.
- Native capabilities such as push notifications, camera access, and secure storage require platform-specific implementation.
- iOS builds and distribution require access to Apple's supported build/signing workflow.
