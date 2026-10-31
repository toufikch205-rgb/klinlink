# KLINLINK

KLINLINK is a healthcare platform for patients and healthcare professionals.

## Active development
The active web application is in `apps/web`, built with React, TypeScript, and Vite. The original root-level HTML prototype is intentionally preserved as a design and behavior reference.

## Run the web application locally

```bash
cd apps/web
npm install
npm run dev
```

Create a production build:

```bash
npm run build
npm run preview
```

## Technology direction
- Current: React + TypeScript + Vite (web).
- Backend: Supabase + PostgreSQL, after data model and access-control review.
- Future: React Native + Expo for Android and iOS, reusing domain logic and service contracts where practical.

## Engineering and security
See:
- `docs/ENGINEERING_STANDARDS.md`
- `docs/ARCHITECTURE_PLAN.md`
- `docs/SECURITY_BASELINE.md`
- `docs/QUALITY_PLAN.md`

Standards are engineering references and target practices; this repository does not claim formal certification or regulatory compliance.

## Prototype safety
The existing root-level prototype uses demo data and browser-local behavior. Do not enter real patient or medical information. The new React web app currently uses static demonstration doctor data and is not connected to a production backend.
