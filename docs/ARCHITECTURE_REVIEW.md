# Architecture Review

## Audit Result

The supplied documentation identifies four genuine architecture/documentation issues in [architecture/architecture-review-v1.md](architecture/architecture-review-v1.md). They are not automatically changed by this consolidation.

| File and section | Conflict or gap | Reason | Newest decision | Suggested resolution |
|---|---|---|---|---|
| Security Architecture parts 1 §8 and 2 §12 | JWT `role` claim is used by RLS while the database defines many-to-many roles that must be checked live. | Cached single-role authorization conflicts with dynamic RBAC and the security rule against cached permissions. | The review specifies a live `has_role(required_role)` PostgreSQL function over `user_roles`/`roles`; JWT carries user identity only. | Update the RLS/JWT examples and add the approved helper function through the database migration process. |
| Database Schema | `webhook_events` is referenced by API and Security but absent from the schema. | Idempotency/replay protection has no declared persistence model. | Additive `webhook_events` with provider/event unique key, payload, processing fields, and no soft delete. | Add the table and index to the schema/migration documentation. |
| Frontend project tree | The final tree omits `packages/lib` files cited by API and Security. | The tree and referenced implementation responsibilities diverge. | The review lists `env`, `rate-limit`, `cors`, `csp`, `sanitize`, `errors`, `with-error-handler`, and `api-response` in addition to the existing files. | Reconcile the authoritative project-tree document with that list. |
| Deployment Strategy §12 | The storage location of deployment audit logs is unspecified. | Operational logs need a declared data boundary and access model. | `ops.deployment_logs`, separated from business data; CI/CD service role writes, admin read-only. | Add the schema/location and access control to deployment and database documentation. |

## Consolidation Notes

- Exact duplicate source copies removed: 6.
- Superseded deployment fragments removed: 2; the final deployment strategy is retained as the sole deployment reference.
- Four prose path references were normalized to the delivered tree.
- No Markdown link syntax existed in the source archive, so no syntactic Markdown links were broken.

## Recommendation

Treat the four findings as required review items before treating the source documents themselves as internally consistent. Their newest decisions are captured in the supplied review; this report does not independently alter them.
