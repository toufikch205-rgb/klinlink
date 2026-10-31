# KLINLINK Mobile & Cross-platform App

This directory is reserved for the new React Native + Expo application targeting Android, iOS, and web.

The existing HTML/CSS/JavaScript prototype at the repository root is intentionally preserved as a reference. Do not overwrite or delete it during the migration.

## Planned stack
- React Native
- Expo
- TypeScript
- Expo Router
- Supabase (introduced after security and data-model review)

## Local scaffold
From the repository root, create the Expo app in this directory using the current official Expo starter:

```bash
npx create-expo-app@latest apps/mobile
```

If the directory already contains this README, move or temporarily copy the README outside the target directory before running the scaffold, then restore it inside the generated project.

After scaffolding:

```bash
cd apps/mobile
npx expo start
```

Use the Expo terminal shortcuts to open the web preview or run on a connected Android/iOS device or simulator. Native builds and iOS distribution require the relevant platform tooling and credentials.

Before adding backend connectivity, review the repository's `docs/ENGINEERING_STANDARDS.md`, `docs/ARCHITECTURE_PLAN.md`, and `docs/SECURITY_BASELINE.md`.
