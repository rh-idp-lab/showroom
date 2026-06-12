# showroom — Agent Guide

Red Hat Showroom lab documentation: "How to create your Internal Developer Platform in 2 hours".
Built with Antora. Source content is in AsciiDoc.

## Structure

```
content/
  antora.yml              Module config + AsciiDoc attribute definitions
  modules/ROOT/
    nav.adoc              Navigation sidebar (must list every new page)
    pages/
      index.adoc          Landing page
      env.adoc            Environment info for participants
      platform-overview.adoc  Conclusion page: Red Hat product coverage
      c1/ … c9/           One folder per lab challenge
        <service>.adoc    Lab instructions for that challenge
      demo/               Presenter demo modules
```

## AsciiDoc conventions

### Antora attributes (defined in `antora.yml`)

Use these for all environment-specific values — never hardcode URLs or passwords:

| Attribute | Example value |
|-----------|--------------|
| `{openshift_cluster_ingress_domain}` | `apps.cluster-xxx.sandboxNNN.opentlc.com` |
| `{common_password}` | `changeme` |
| `{helm_repo}` | GitLab helm repo git URL |
| `{helm_repo_browse}` | GitLab helm repo HTTP URL |
| `{helm_repo_tag}` | `main` |

Reference in adoc: `{attribute_name}`, e.g. `https://sso.{openshift_cluster_ingress_domain}`.

For bash code blocks requiring attribute substitution: `[source,bash,subs="attributes"]`

For blocks requiring both special chars and attributes: `[source,bash,subs="specialcharacters,attributes"]`

### Tables

Always use `|===` (never `||===`). Multi-line cell values use `+` continuation or `a|` (asciidoc cell).

### Navigation

Every new page must be added to `modules/ROOT/nav.adoc`:
```
* xref:new-page.adoc[Page Title]
```

### Available skills

- `showroom-create-lab` — Create a new challenge module from scratch
- `showroom-verify-content` — Quality-check an existing module
- `showroom-create-demo` — Create a presenter demo module

## Lab structure

Each challenge (`c1` to `c9`) maps to one platform service:

| Challenge | Service |
|-----------|---------|
| c1 | Keycloak (SSO) |
| c2–c5 | GitOps / ArgoCD / Pipelines |
| c6 | Dev Spaces |
| c7 | RHTAS (Trusted Artifact Signer) |
| c8 | Red Hat Developer Hub |
| c9 | (TBD) |

## Writing style

- Instructions are written for lab participants (platform engineers).
- Each challenge starts with a "challenge framing" NOTE block explaining the business problem.
- Use `TIP`, `NOTE`, `IMPORTANT`, `WARNING` callouts appropriately.
- Verify links use `{openshift_cluster_ingress_domain}` with `[Link text^]` (external, opens new tab).
- Platform Engineering Principles sidebars (`****`) explain the "why" behind each step.
