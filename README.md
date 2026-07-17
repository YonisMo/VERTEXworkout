# VERTEXworkout

## Project Overview

VERTEXworkout is a fitness ecosystem covering a Phase 1 store, exercise library, VERTEX Academy, and client profile, with coach, admin, and mobile capabilities planned for later phases. This repository handoff contains the consolidated official documentation only; it contains no application implementation.

## Vision, Goals, and Scope

The product vision, target audience, functional scope, roadmap, non-functional requirements, and success metrics are authoritative in [docs/PRD.md](docs/PRD.md). Phase 1 is the current delivery scope; Phase 2–4 content remains explicitly deferred as documented there.

## Architecture Overview

The approved direction is a Turborepo/pnpm monorepo, Next.js 14 App Router frontend, Supabase database/backend, Zustand client state, and TanStack Query server state. The authoritative decision record is [docs/adr/ADRs.md](docs/adr/ADRs.md); the structural reference is [docs/architecture/project-structure.md](docs/architecture/project-structure.md).

## Documentation Guide

Start with [docs/INDEX.md](docs/INDEX.md), then [docs/MASTER_ARCHITECTURE.md](docs/MASTER_ARCHITECTURE.md). Each subject folder has one responsibility and retains the complete, canonical source content.

## Development Workflow and Contributions

Follow the workflow, naming, testing, and quality conventions in the frontend, testing, security, deployment, and documentation strategy documents. Proposed architecture changes must be recorded through the ADR process described in the ADR and documentation strategy documents.

## Roadmap and Current Status

The roadmap is maintained in the PRD. This documentation package is ready for development preparation, with four architecture items requiring tracked implementation/documentation follow-through; see [docs/ARCHITECTURE_REVIEW.md](docs/ARCHITECTURE_REVIEW.md).

## Production Readiness

See [docs/PRODUCTION_READINESS_REPORT.md](docs/PRODUCTION_READINESS_REPORT.md). The documentation is consolidated, but production-documentation readiness requires review because the reported architecture items have not been incorporated into their owning source documents.
