# KLINLINK Security Baseline

## Data classification
Treat the following as sensitive: patient identity/contact details, appointment history, clinical notes, uploaded documents, and any health-related information. Collect only what is necessary for a documented purpose.

## Identity and access
- Use Supabase Auth or another reviewed identity provider; never implement password storage ourselves.
- Define explicit roles and permissions for patients, professionals, receptionists, and platform administrators.
- Require server/database authorization for every sensitive read and write.
- Apply PostgreSQL RLS to every tenant-scoped table and test both allowed and denied access.
- A professional must not access another professional's patients or records unless an explicit, audited sharing relationship permits it.
- A patient must not access another patient's data.

## Secrets and sessions
- Never commit service-role keys, private keys, access tokens, or production credentials.
- Client-side environment variables are public; do not place secrets in Expo public environment variables.
- Use secure platform storage for session material where appropriate.
- Define session expiry, revocation, and account recovery behavior before production.

## Application security
Use OWASP ASVS/MASVS and OWASP Top 10 as review checklists. Validate input at trust boundaries, protect against injection and broken access control, rate-limit sensitive endpoints, keep dependencies updated, and avoid exposing internal errors or personal data in logs.

## Health-data safety
- Use synthetic data in development and automated tests.
- Minimize collection, retention, and disclosure of health information.
- Log security-relevant events without logging passwords, tokens, or unnecessary clinical details.
- Define backup, restore, incident response, and breach-handling procedures before production.
- AI features must not autonomously diagnose or make clinical decisions; clinical outputs require qualified professional oversight.

## Initial security gates
Before connecting real patient data:
1. Approve the data model and data classification.
2. Review all RLS policies and test cross-tenant denial.
3. Review authentication, role assignment, and account recovery.
4. Confirm secrets are server-side only.
5. Establish audit logging, backup, and restore procedures.
6. Complete a threat model and security review.

This document is a development baseline, not a certification or legal compliance assessment.
