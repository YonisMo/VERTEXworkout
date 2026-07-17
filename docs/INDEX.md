# Documentation Index

The source of truth for each topic is indicated by its folder and this table. The review and summary files navigate to source material; they do not replace it.

| Filename | Purpose | Phase | Dependencies | Related documents | Description |
|---|---|---|---|---|---|
| `../README.md` | Repository entry point | All | INDEX, PRD | MASTER_ARCHITECTURE | Project overview and documentation entry point. |
| `PRD.md` | Product source of truth | 1–4 | None | UX, architecture | Vision, requirements, scope, roadmap, stack, metrics. |
| `MASTER_ARCHITECTURE.md` | Architecture navigation summary | All | PRD, ADRs | All domains | Cross-domain system map without duplicating details. |
| `ARCHITECTURE_REVIEW.md` | Consolidation audit | All | Review v1 | Production report | Registry of four unresolved findings. |
| `PRODUCTION_READINESS_REPORT.md` | Readiness assessment | All | Architecture review | Launch, deployment | Documentation-quality metrics and conclusion. |
| `MISSING_DOCUMENTS.md` | Proposed-document register | All | Documentation strategy | INDEX | Non-authoritative recommended additions. |
| `CHANGELOG.md` | Consolidation history | All | Audit | README | Changes made to this documentation package. |
| `adr/ADRs.md` | Decision source of truth | Architecture | PRD | Project structure | ADR-0001 through ADR-0005. |
| `architecture/project-structure.md` | Repository and layer structure | 1 | ADRs | Frontend project tree | Monorepo, packages, apps, environment conventions. |
| `architecture/architecture-review-v1.md` | Original architecture review | Pre-development | All design docs | Final review | Authoritative detail for four findings and newest decisions. |
| `architecture/final-architecture-review-production-readiness.md` | Original final design review | 18 | All design docs | Production report | Design-stage validation, risks, and final gate. |
| `database/schema.md` | Data-model source of truth | 2 | PRD, ADRs | API, security | Tables, relations, RLS-related model, indexes. |
| `api/api-design-part-1.md` | API foundations | 9 | Database, security | API parts 2–4 | Architecture, REST rules, authentication, CORS, limits. |
| `api/api-design-part-2.md` | API conventions | 9 | Part 1 | API parts 3–4 | Envelope, validation, errors, pagination, caching, logging. |
| `api/api-design-part-3.md` | Endpoint catalog | 9 | Parts 1–2, database | Frontend, testing | Auth, store, programs, content, profile, search endpoints. |
| `api/api-design-part-4.md` | API operations | 9 | Parts 1–3, security | Deployment, testing | Uploads, webhooks, versioning, OpenAPI, testing. |
| `frontend/frontend-architecture-part-1.md` | Frontend foundations | 8 | ADRs, design system | Parts 2–3, project tree | App structure, providers, components, state, API layer. |
| `frontend/frontend-architecture-part-2.md` | Frontend runtime and SEO | 8 | Part 1 | SEO, performance | Rendering, forms, auth, optimization, metadata. |
| `frontend/frontend-architecture-part-3.md` | Frontend engineering workflow | 8 | Parts 1–2 | Testing, deployment | i18n, quality tools, testing, CI, standards. |
| `frontend/project-tree.md` | Detailed frontend tree | 8 | Project structure | Frontend parts 1–3 | Full proposed repository tree. |
| `frontend/user-flow.md` | UX flow source | 3 | PRD | Sitemap, wireframes | Personas, onboarding, purchase, RBAC, locale flows. |
| `frontend/wireframes-part-1.md` | Core public-page wireframes | 5 | User flow, design system | Wireframes 2–3 | Shared navigation and primary public pages. |
| `frontend/wireframes-part-2.md` | Commerce/account wireframes | 5 | User flow, design system | Wireframes 1, 3 | Store, product, auth, cart, checkout. |
| `frontend/wireframes-part-3.md` | Supplemental wireframes | 5 | User flow, design system | Wireframes 1–2 | Search, profile, wishlist, empty/loading states. |
| `design-system/design-system.md` | UI-system source of truth | 6 | PRD | Frontend, wireframes | Brand, tokens, components, accessibility, responsive rules. |
| `security/security-architecture-part-1.md` | Security foundations | 10 | Database, API | Security parts 2–4 | Threat model, auth, sessions, JWT, CSRF, XSS. |
| `security/security-architecture-part-2.md` | Application/data security | 10 | Part 1 | API, database | RLS, uploads, CORS, CSP, headers, secrets. |
| `security/security-architecture-part-3.md` | Security operations | 10 | Parts 1–2 | Monitoring, deployment | Encryption, webhooks, abuse, logging, backups, DR. |
| `security/security-architecture-part-4.md` | Security assurance | 10 | Parts 1–3 | Testing, documentation | Incident response, hardening, testing, supply chain. |
| `performance/performance-strategy-part-1.md` | Rendering and delivery performance | 11 | Frontend, API | Parts 2–3 | Rendering, React, caching, CDN, image/font work. |
| `performance/performance-strategy-part-2.md` | Runtime and data performance | 11 | Part 1 | API, database | Bundles, queries, search, edge, streaming, jobs. |
| `performance/performance-strategy-part-3.md` | Performance verification | 11 | Parts 1–2 | Testing, monitoring | CWV targets, load/stress tests, budgets, checklist. |
| `seo/seo-strategy-part-1.md` | Technical SEO foundation | 12 | Frontend, sitemap | SEO part 2 | Metadata, canonical URLs, robots, structured data. |
| `seo/seo-strategy-part-2.md` | Content and operational SEO | 12 | Part 1 | Performance, monitoring | Linking, media, locale, indexing, monitoring. |
| `seo/sitemap.md` | Route/IA source of truth | 4 | PRD, user flow | Frontend, SEO | Domains, routes, navigation graph, route groups. |
| `testing/testing-strategy-part-1.md` | Test foundation | 13 | Frontend, API | Testing parts 2–3 | Pyramid, unit, integration, E2E, visual testing. |
| `testing/testing-strategy-part-2.md` | Test operations | 13 | Part 1 | CI, security | Accessibility, data, mocks, CI, coverage, QA. |
| `testing/testing-strategy-part-3.md` | Advanced/release testing | 13 | Parts 1–2 | Deployment, monitoring | Contract, migration, payment, DR, smoke verification. |
| `deployment/deployment-strategy.md` | Deployment source of truth | 14 | Testing, security | Monitoring, launch | Environments, CI/CD, rollback, backups, release operations. |
| `monitoring/monitoring-observability-part-1.md` | Observability foundations | 15 | API, deployment | Part 2 | Logs, correlation IDs, tool stack, SLOs/SLIs. |
| `monitoring/monitoring-observability-part-2.md` | Observability operations | 15 | Part 1 | Launch, runbooks | Dashboards, alerts, incidents, metrics, retention. |
| `documentation/documentation-strategy-part-1.md` | Documentation governance | 16 | All docs | Part 2, ADRs | Architecture, audiences, ADR policy, payment runbook. |
| `documentation/documentation-strategy-part-2.md` | Documentation practice | 16 | Part 1 | Onboarding, guides | Onboarding, style, versioning, diagrams, checklist. |
| `operations/launch-go-live-strategy.md` | Go-live source of truth | 17 | Deployment, monitoring, testing | Production report | Phased launch, go/no-go, communications, stabilization. |

## Reserved Subject Folders

`backend/`, `runbooks/`, `guides/`, `onboarding/`, and `appendix/` are intentionally present for the structure requested for future documentation. No source Markdown in the supplied archive has a single responsibility that belongs in those folders. The proposed additions are listed in [MISSING_DOCUMENTS.md](MISSING_DOCUMENTS.md).
