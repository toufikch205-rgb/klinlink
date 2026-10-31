# KLINLINK Architecture Plan

## Product targets
- Patient experience: discover healthcare professionals, view profiles, and book/manage appointments.
- Professional experience: independent dashboard, schedule, appointments, and patient administration.
- Shared platform: multi-tenant architecture with strict data isolation.
- Platforms: Android, iOS, and web.

## Planned application structure
The following is the target structure for the Expo application. It is a plan, not a statement that these files already exist.

```text
apps/
  mobile/
    app/
      (auth)/
      (patient)/
      (professional)/
      _layout.tsx
    src/
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
    assets/
    app.json
    package.json
    tsconfig.json

docs/
  ARCHITECTURE_PLAN.md
  ENGINEERING_STANDARDS.md
  SECURITY_BASELINE.md
  QUALITY_PLAN.md
```

## Architecture boundaries
- Screens and components render UI and collect user input.
- Feature modules contain use cases and domain rules.
- Services are the only layer that communicates with Supabase or external providers.
- Types define shared data contracts.
- Platform-specific code is isolated behind small adapters.
- Authorization and tenant isolation are enforced by PostgreSQL RLS and trusted server-side logic.

## Migration strategy
1. Keep the current root-level HTML prototype intact as a reference.
2. Create the Expo application in `apps/mobile`, separate from the current static prototype.
3. Establish app navigation, theme tokens, shared components, and typed service boundaries.
4. Rebuild the patient home screen to match the approved reference design.
5. Add patient booking and profile flows, then the professional dashboard.
6. Connect Supabase only after the data model, roles, and RLS policies have been reviewed.
7. Test Android, iOS, and web behavior independently before release.

## Important constraints
- Expo Web does not guarantee every native feature behaves identically in a browser.
- Native capabilities such as push notifications, camera access, and some secure-storage flows require platform-specific configuration and testing.
- iOS builds and distribution require access to Apple's supported build/signing workflow.
