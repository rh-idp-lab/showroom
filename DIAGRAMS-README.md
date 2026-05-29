# Architecture Diagrams - Usage Guide

This directory contains multiple visual representations of the Internal Developer Platform architecture in different formats.

## 📁 Available Diagrams

### 1. **AsciiDoc Diagrams** (for Antora documentation)
**Location**: `content/modules/ROOT/pages/architecture-diagrams.adoc`

**Format**: AsciiDoc with ditaa diagrams (text-based)

**Best for**:
- Integration with Antora documentation site
- In-browser rendering via the showroom interface
- Printable documentation

**Includes**:
- Complete platform architecture
- GitOps deployment flow
- Developer self-service flow
- Network & service communication
- Component dependencies
- Secret management data flow
- Module progression

**How to view**:
```bash
# Preview locally with Antora
podman run --rm --name antora -v $PWD:/antora -p 8080:8080 -i -t ghcr.io/juliaaano/antora-viewer
# Then open http://localhost:8080
```

---

### 2. **SVG Diagram** (vector graphic)
**Location**: `content/modules/ROOT/assets/images/idp-architecture.svg`

**Format**: SVG (Scalable Vector Graphics)

**Best for**:
- High-quality presentations
- Embedding in documentation
- Printing without quality loss
- Direct browser viewing

**How to view**:
```bash
# Open directly in browser
open content/modules/ROOT/assets/images/idp-architecture.svg

# Or embed in HTML/Markdown
<img src="path/to/idp-architecture.svg" alt="IDP Architecture">
```

---

### 3. **Mermaid Diagrams** (interactive)
**Location**: `DIAGRAMS.md`

**Format**: Mermaid markdown (text-based, renders to SVG)

**Best for**:
- GitHub/GitLab repositories (auto-rendering)
- Interactive diagrams
- Easy editing and version control
- Export to multiple formats

**Includes**:
- Complete platform architecture (graph)
- GitOps deployment flow (sequence diagram)
- Developer self-service flow (sequence diagram)
- Secret management flow (graph)
- Module progression (flowchart)
- Component dependencies (graph)
- Network communication (graph)

**How to view**:
- **GitHub/GitLab**: Just open `DIAGRAMS.md` (auto-renders)
- **VS Code**: Install "Markdown Preview Mermaid Support" extension
- **Export to image**:
  ```bash
  npm install -g @mermaid-js/mermaid-cli
  mmdc -i DIAGRAMS.md -o diagrams-output/
  ```

---

### 4. **ASCII Art Diagram** (README)
**Location**: `README.adoc`

**Format**: Plain text ASCII art

**Best for**:
- Quick terminal viewing
- Plain text environments
- Email/chat sharing
- No dependencies

**How to view**:
```bash
cat README.adoc | grep -A 50 "Platform Architecture Overview"
```

---

## 🎯 Which Diagram Should I Use?

| Use Case | Recommended Format | Location |
|----------|-------------------|----------|
| **Lab documentation** (in-browser) | AsciiDoc (ditaa) | `architecture-diagrams.adoc` |
| **Presentations** (PowerPoint, Keynote) | SVG | `idp-architecture.svg` |
| **GitHub/GitLab README** | Mermaid | `DIAGRAMS.md` |
| **Printed handouts** | SVG (export to PDF/PNG) | `idp-architecture.svg` |
| **Email/Slack** | ASCII art | `README.adoc` excerpt |
| **Interactive documentation** | Mermaid | `DIAGRAMS.md` |
| **Conference talk slides** | SVG | `idp-architecture.svg` |

---

## 🖼️ Exporting Diagrams

### Export Mermaid to PNG/PDF:
```bash
# Install mermaid-cli
npm install -g @mermaid-js/mermaid-cli

# Export specific diagram
mmdc -i DIAGRAMS.md -o architecture.png --theme default

# Export all diagrams
mmdc -i DIAGRAMS.md -o diagrams-output/ --theme default
```

### Export SVG to PNG:
```bash
# Using ImageMagick
convert idp-architecture.svg idp-architecture.png

# Using Inkscape (better quality)
inkscape idp-architecture.svg --export-filename=idp-architecture.png --export-dpi=300
```

### Export ditaa to PNG:
```bash
# Using ditaa CLI
ditaa architecture-diagrams.adoc architecture.png

# Or use the Antora-rendered HTML and screenshot it
```

---

## 📝 Editing Diagrams

### AsciiDoc (ditaa)
Edit `content/modules/ROOT/pages/architecture-diagrams.adoc` with any text editor.

**Syntax reference**: https://ditaa.sourceforge.net/

### SVG
Edit `content/modules/ROOT/assets/images/idp-architecture.svg` with:
- **Inkscape** (free, open-source)
- **Adobe Illustrator**
- **Figma** (import SVG, edit, export)
- Any text editor (it's XML)

### Mermaid
Edit `DIAGRAMS.md` with any text editor.

**Syntax reference**: https://mermaid.js.org/

**Live editor**: https://mermaid.live/

---

## 🎨 Diagram Themes

### Color Scheme
All diagrams use a consistent color palette:

| Layer | Color | Hex |
|-------|-------|-----|
| Layer 0 (Foundation) | Light Blue | `#e1f5fe` |
| Layer 1 (Platform GitOps) | Light Purple | `#f3e5f5` |
| Layer 2 (CI/CD & Secrets) | Light Green | `#e8f5e9` |
| Layer 3 (Registry & GitOps) | Light Orange | `#fff3e0` |
| Layer 4 (Developer Tools) | Light Pink | `#fce4ec` |
| Layer 5 (Developer Portal) | Light Teal | `#e0f2f1` |

---

## 📚 Diagram Content

All diagrams illustrate the same platform with these components:

**Pre-installed (Layer 0)**:
- OpenShift Container Platform
- GitLab
- HashiCorp Vault
- Keycloak (RHBK)
- NooBaa (S3)

**Deployed via GitOps (Layers 1-5)**:
- OpenShift GitOps (ArgoCD) - Platform
- OpenShift Pipelines (Tekton)
- External Secrets Operator
- Red Hat Quay
- ArgoCD (rhdh-gitops) - Applications
- OpenShift Dev Spaces
- Trusted Artifact Signer
- Red Hat Developer Hub (Backstage)

---

## 🔄 Keeping Diagrams in Sync

When you update the platform architecture:

1. **Update Mermaid first** (`DIAGRAMS.md`)
   - Easiest to edit
   - Use mermaid.live for live preview
   
2. **Export to SVG** (`idp-architecture.svg`)
   - Use `mmdc` CLI or manual re-creation
   
3. **Update ditaa** (`architecture-diagrams.adoc`)
   - Text-based, manual updates
   
4. **Update ASCII art** (`README.adoc`)
   - Keep it simple and high-level

---

## 🆘 Troubleshooting

### Mermaid not rendering on GitHub?
- Check GitHub's Mermaid support status
- Try wrapping in triple backticks: ` ```mermaid `
- Ensure proper syntax (validate on mermaid.live)

### SVG not displaying correctly?
- Check file permissions
- Validate SVG syntax (use W3C validator)
- Try opening in different browsers

### ditaa diagrams not rendering in Antora?
- Ensure Antora ditaa extension is enabled
- Check diagram syntax (boxes must be closed)
- Verify indentation is correct

---

## 📖 References

- **Antora**: https://antora.org/
- **ditaa**: https://ditaa.sourceforge.net/
- **Mermaid**: https://mermaid.js.org/
- **SVG**: https://developer.mozilla.org/en-US/docs/Web/SVG
- **ASCII Art**: https://en.wikipedia.org/wiki/ASCII_art

---

## 💡 Tips for Presenters

1. **Use SVG for slides** - scales perfectly at any resolution
2. **Use Mermaid for live demos** - edit and render in real-time on mermaid.live
3. **Use ASCII for terminal demos** - shows platform complexity in a CLI context
4. **Print SVG as handouts** - export to PDF first for best results
5. **Share Mermaid code** - recipients can render and edit themselves

---

**Last Updated**: 2026-05-29  
**Maintainer**: Red Hat IDP Lab Team  
**License**: Same as parent repository
