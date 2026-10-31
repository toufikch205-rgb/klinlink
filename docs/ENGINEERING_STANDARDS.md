# KLINLINK Engineering Standards

## Purpose
KLINLINK is a multi-tenant healthcare platform. The product is planned for web, Android, and iOS, with patient and healthcare-professional experiences. The existing HTML/CSS/JavaScript prototype remains preserved as a visual and functional reference during the migration.

## Approved technology direction
- React Native + Expo for shared Android/iOS application development.
- Expo Web for the web experience where platform behavior permits.
- TypeScript for application code.
- Expo Router for navigation and route organization.
- Supabase with PostgreSQL for backend services, authentication, and data storage.
- PostgreSQL Row Level Security (RLS) for tenant and patient-data access boundaries.
- Git and GitHub for version control, review, and traceability.
- Visual Studio Code as the primary development environment.

## Standards and guidance
These are engineering references and target practices, not claims of certification or formal compliance:
- IEEE software engineering practices: requirements, architecture descriptions, design, verification, and documentation.
- OWASP Application Security Verification Standard (ASVS), Mobile Application Security Verification Standard (MASVS), and OWASP Top 10 guidance as applicable.
- NIST Cybersecurity Framework and relevant NIST privacy/security guidance for risk management.
- ISO/IEC 27001 for information-security management principles.
- ISO/IEC 27701 for privacy-information management principles.
- ISO 9001 for quality-management principles.
- ISO/IEC/IEEE 12207 for software life-cycle processes.
- ISO 27799 for health-information security guidance.

## Non-negotiable engineering rules
1. Preserve the existing prototype until the replacement screens are reviewed and accepted.
2. Migrate screen-by-screen; do not rewrite unrelated features in the same change.
3. Separate presentation, business logic, data access, and platform-specific integrations.
4. Enforce authorization on the server/database; never rely only on hidden UI controls.
5. Apply least privilege and deny-by-default access to sensitive health information.
6. Keep service-role keys, private API keys, and secrets out of client apps and Git.
7. Use synthetic/demo data during development; do not place real patient records in test fixtures.
8. Add tests for authentication, authorization, tenant isolation, and critical booking flows.
9. Review dependencies and security-sensitive changes before merging.
10. Document important architecture and security decisions.

## Git workflow
- `main`: stable, reviewed baseline.
- `develop`: integration branch when team workflow requires it.
- `feature/<short-name>`: isolated feature work.
- `fix/<short-name>`: isolated bug fixes.
- Keep commits focused and descriptive.
- Do not merge untested changes into the stable branch.
- Tag known-good milestones and keep changes reviewable.

## Definition of done
A change is complete only when its expected behavior is documented, relevant tests/checks pass, access control is reviewed where data is involved, no secrets are exposed, and the change is committed with a clear message.
