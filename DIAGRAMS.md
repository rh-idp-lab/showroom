# Architecture Diagrams (Mermaid Format)

This file contains Mermaid diagrams for use in GitHub, GitLab, or other Markdown-rendering platforms that support Mermaid.

## Complete Platform Architecture

```mermaid
graph TB
    subgraph "Developer Interface"
        DEV[Developers<br/>Web Browser]
    end

    subgraph "Layer 5: Developer Portal"
        RHDH[Red Hat Developer Hub<br/>Backstage<br/>- Service Catalog<br/>- Software Templates<br/>- Plugins]
    end

    subgraph "Layer 4: Developer Tools"
        DEVSPACES[OpenShift Dev Spaces<br/>Cloud IDE]
        TAS[Trusted Artifact Signer<br/>Sigstore]
    end

    subgraph "Layer 3: Registry & GitOps"
        QUAY[Red Hat Quay<br/>Container Registry]
        ARGOCD_APPS[ArgoCD rhdh-gitops<br/>Application Deployments]
    end

    subgraph "Layer 2: CI/CD & Secrets"
        PIPELINES[OpenShift Pipelines<br/>Tekton]
        ESO[External Secrets Operator<br/>Vault Integration]
    end

    subgraph "Layer 1: Platform GitOps"
        ARGOCD[OpenShift GitOps<br/>ArgoCD<br/>Platform Components]
    end

    subgraph "Layer 0: Pre-installed Foundation"
        GITLAB[GitLab<br/>SCM + OAuth]
        VAULT[HashiCorp Vault<br/>Secrets Store]
        KEYCLOAK[Keycloak RHBK<br/>SSO & Identity]
        NOOBAA[NooBaa<br/>S3 Storage]
        OCP[OpenShift Container Platform]
    end

    DEV -->|HTTPS + SSO| RHDH
    RHDH --> DEVSPACES
    RHDH --> GITLAB
    RHDH --> ARGOCD_APPS
    GITLAB -->|Git Push| PIPELINES
    PIPELINES --> TAS
    PIPELINES --> QUAY
    PIPELINES -->|Deploy| OCP
    ARGOCD_APPS -->|Deploy Apps| OCP
    ESO -->|Sync Secrets| VAULT
    ESO -->|Create K8s Secrets| OCP
    ARGOCD -->|Deploy Platform| PIPELINES
    ARGOCD -->|Deploy Platform| ESO
    ARGOCD -->|Deploy Platform| QUAY
    ARGOCD -->|Deploy Platform| ARGOCD_APPS
    ARGOCD -->|Deploy Platform| DEVSPACES
    ARGOCD -->|Deploy Platform| TAS
    ARGOCD -->|Deploy Platform| RHDH
    KEYCLOAK -->|SSO| RHDH
    KEYCLOAK -->|SSO| GITLAB
    KEYCLOAK -->|SSO| ARGOCD

    style RHDH fill:#e0f2f1,stroke:#004d40,stroke-width:3px
    style ARGOCD fill:#f3e5f5,stroke:#4a148c,stroke-width:3px
    style KEYCLOAK fill:#e1f5fe,stroke:#01579b,stroke-width:2px
```

## GitOps Deployment Flow

```mermaid
sequenceDiagram
    participant PT as Platform Team
    participant GL as GitLab<br/>(Helm Charts)
    participant AC as ArgoCD<br/>(openshift-gitops)
    participant OCP as OpenShift<br/>Cluster
    participant UI as ArgoCD UI

    PT->>GL: 1. Update Helm chart<br/>(git push)
    GL->>AC: 2. Webhook / Poll trigger
    AC->>AC: 3. Render Helm chart<br/>(helm template)
    AC->>OCP: 4. Apply manifests<br/>(kubectl apply)
    OCP->>OCP: 5. Create/Update resources<br/>(Operators, Pods, Services)
    OCP->>AC: 6. Report resource status
    AC->>UI: 7. Display sync status<br/>(Healthy/Synced)
    UI->>PT: 8. Platform team verifies<br/>deployment
```

## Developer Self-Service Flow

```mermaid
sequenceDiagram
    participant DEV as Developer
    participant RHDH as Developer Hub
    participant KC as Keycloak
    participant GL as GitLab
    participant AC as ArgoCD<br/>(rhdh-gitops)
    participant TK as Tekton
    participant Q as Quay
    participant OCP as OpenShift

    DEV->>RHDH: 1. Access portal
    RHDH->>KC: 2. Authenticate (SSO)
    KC-->>RHDH: 3. Token
    DEV->>RHDH: 4. Select template<br/>("Quarkus App")
    DEV->>RHDH: 5. Fill form<br/>(name, owner, etc.)
    RHDH->>GL: 6. Create repository<br/>(scaffolded code)
    RHDH->>AC: 7. Create ArgoCD<br/>Application
    RHDH->>RHDH: 8. Register component<br/>in catalog
    DEV->>GL: 9. Git push<br/>(code changes)
    GL->>TK: 10. Trigger pipeline
    TK->>TK: 11. Build image
    TK->>Q: 12. Push image<br/>(signed via TAS)
    AC->>OCP: 13. Deploy app<br/>(new image detected)
    OCP-->>RHDH: 14. Status update<br/>(ArgoCD plugin)
    RHDH-->>DEV: 15. View deployed app<br/>in catalog
```

## Secret Management Flow

```mermaid
graph LR
    subgraph "1. Store"
        V[Vault KV Store<br/>kv/secrets/rhdh/*]
    end

    subgraph "2. Configure"
        SS[SecretStore<br/>CRD<br/>Points to Vault]
        ES[ExternalSecret<br/>CRD<br/>Defines mapping]
    end

    subgraph "3. Sync"
        ESO[External Secrets<br/>Operator<br/>Controller]
    end

    subgraph "4. Consume"
        K8S[Kubernetes Secret<br/>in namespace]
        POD[Application Pod<br/>Env vars / Volumes]
    end

    V -->|Auth via ServiceAccount| ESO
    SS -.->|Reference| V
    ES -.->|Reference| SS
    ESO -->|Reads| V
    ESO -->|Creates/Updates| K8S
    K8S -->|Mounted| POD

    style V fill:#fff3e0,stroke:#e65100
    style ESO fill:#e8f5e9,stroke:#1b5e20
    style K8S fill:#e1f5fe,stroke:#01579b
    style POD fill:#f3e5f5,stroke:#4a148c
```

## Module Progression

```mermaid
graph TD
    M0[Pre-requisite:<br/>OpenShift + GitLab<br/>+ Vault + Keycloak + NooBaa]
    M1[Module 1:<br/>Explore Foundation<br/>20 min]
    M2[Module 2:<br/>Build CI/CD Layer<br/>30 min]
    M3[Module 3:<br/>Identity & Secrets<br/>15 min]
    M4[Module 4:<br/>Cloud IDE<br/>15 min]
    M5[Module 5:<br/>Supply Chain Security<br/>10 min]
    M6[Module 6:<br/>Developer Portal<br/>25 min]
    M7[Module 7:<br/>Developer Test Drive<br/>15 min]

    M0 --> M1
    M1 --> M2
    M2 --> M3
    M3 --> M4
    M4 --> M5
    M5 --> M6
    M6 --> M7

    style M0 fill:#e1f5fe,stroke:#01579b,stroke-width:2px
    style M1 fill:#f3e5f5,stroke:#4a148c
    style M2 fill:#e8f5e9,stroke:#1b5e20
    style M3 fill:#fff3e0,stroke:#e65100
    style M4 fill:#fce4ec,stroke:#880e4f
    style M5 fill:#f1f8e9,stroke:#33691e
    style M6 fill:#e0f2f1,stroke:#004d40,stroke-width:3px
    style M7 fill:#ede7f6,stroke:#311b92
```

## Component Dependencies

```mermaid
graph TB
    subgraph "Layer 0: Pre-installed"
        L0A[OpenShift Cluster]
        L0B[GitLab]
        L0C[Vault]
        L0D[NooBaa]
        L0E[Keycloak]
    end

    subgraph "Layer 1: Platform GitOps"
        L1[OpenShift GitOps<br/>ArgoCD]
    end

    subgraph "Layer 2: CI/CD & Secrets"
        L2A[OpenShift Pipelines]
        L2B[External Secrets<br/>Operator]
    end

    subgraph "Layer 3: Registry & App GitOps"
        L3A[Red Hat Quay]
        L3B[ArgoCD<br/>rhdh-gitops]
    end

    subgraph "Layer 4: Developer Tools"
        L4A[Dev Spaces]
        L4B[Trusted Artifact<br/>Signer]
    end

    subgraph "Layer 5: Developer Portal"
        L5[Red Hat<br/>Developer Hub]
    end

    L0A --> L1
    L0B --> L1
    L0C --> L1
    L0E --> L1
    L1 --> L2A
    L1 --> L2B
    L2A --> L3A
    L2B --> L3A
    L1 --> L3B
    L3A --> L4A
    L3A --> L4B
    L4A --> L5
    L4B --> L5
    L0B -.-> L5
    L0C -.-> L5
    L0E -.-> L5
    L3B -.-> L5

    style L0A fill:#e1f5fe,stroke:#01579b
    style L1 fill:#f3e5f5,stroke:#4a148c,stroke-width:2px
    style L2A fill:#e8f5e9,stroke:#1b5e20
    style L2B fill:#e8f5e9,stroke:#1b5e20
    style L3A fill:#fff3e0,stroke:#e65100
    style L3B fill:#fff3e0,stroke:#e65100
    style L4A fill:#fce4ec,stroke:#880e4f
    style L4B fill:#fce4ec,stroke:#880e4f
    style L5 fill:#e0f2f1,stroke:#004d40,stroke-width:3px
```

## Network Communication (Simplified)

```mermaid
graph TB
    subgraph "External Access"
        USER[Users]
    end

    subgraph "Ingress Layer"
        ROUTES[OpenShift Routes<br/>*.apps.cluster-domain]
    end

    subgraph "Application Layer"
        RHDH_SVC[backstage-rhdh<br/>Service]
        GL_SVC[gitlab<br/>Service]
        SSO_SVC[keycloak<br/>Service]
        AC_SVC[argocd-server<br/>Service]
        Q_SVC[quay<br/>Service]
    end

    subgraph "Data Layer"
        GL_DB[(GitLab<br/>PostgreSQL)]
        SSO_DB[(Keycloak<br/>PostgreSQL)]
        V_DATA[(Vault<br/>Storage)]
        NB_DATA[(NooBaa<br/>S3)]
    end

    USER -->|HTTPS| ROUTES
    ROUTES --> RHDH_SVC
    ROUTES --> GL_SVC
    ROUTES --> SSO_SVC
    ROUTES --> AC_SVC
    ROUTES --> Q_SVC

    RHDH_SVC -->|API| GL_SVC
    RHDH_SVC -->|OIDC| SSO_SVC
    RHDH_SVC -->|API| AC_SVC
    GL_SVC --> GL_DB
    SSO_SVC --> SSO_DB
    GL_SVC -->|S3| NB_DATA

    style USER fill:#e1f5fe,stroke:#01579b,stroke-width:2px
    style ROUTES fill:#f3e5f5,stroke:#4a148c
    style RHDH_SVC fill:#e0f2f1,stroke:#004d40,stroke-width:2px
    style SSO_SVC fill:#fff3e0,stroke:#e65100
```

## Usage

These diagrams can be rendered in:
- **GitHub**: Automatic rendering in `.md` files
- **GitLab**: Automatic rendering in `.md` files
- **VS Code**: With Mermaid extension
- **Documentation sites**: Many static site generators support Mermaid
- **Presentations**: Copy to tools like Marp, Slidev, or reveal.js

To convert to images:
```bash
# Using mermaid-cli
npm install -g @mermaid-js/mermaid-cli
mmdc -i DIAGRAMS.md -o diagrams-output/
```
