# Architecture Diagrams - Testing Checklist

Use this checklist to verify all diagrams render correctly across different platforms.

## ✅ Pre-Deployment Testing

### 1. AsciiDoc / ditaa Diagrams (Antora)

- [ ] **Start local Antora preview**
  ```bash
  cd /Users/slallema/GIT/github.com/rh-idp-lab/showroom
  podman run --rm --name antora -v $PWD:/antora -p 8080:8080 -i -t ghcr.io/juliaaano/antora-viewer
  ```

- [ ] **Access in browser**: http://localhost:8080

- [ ] **Navigate to "Architecture Diagrams" page**
  - Check left navigation menu contains "Architecture Diagrams"
  - Click to open the page

- [ ] **Verify all diagrams render**:
  - [ ] Platform Overview (Visual) - SVG image displays
  - [ ] Complete Platform Architecture - ditaa diagram renders
  - [ ] GitOps Deployment Flow - ditaa diagram renders
  - [ ] Developer Self-Service Flow - ditaa diagram renders
  - [ ] Network & Service Communication - ditaa diagram renders
  - [ ] Component Dependencies - ditaa diagram renders
  - [ ] Data Flow: Secret Management - ditaa diagram renders
  - [ ] Module Progression - ditaa diagram renders

- [ ] **Check cross-references work**:
  - From index.adoc → Architecture Diagrams
  - From env.adoc → Architecture Diagrams
  - From m1/intro.adoc → GitOps Deployment Flow section
  - From demo/guide.adoc → Platform Overview Visual

- [ ] **Verify navigation**:
  - Back button works
  - Forward navigation to next pages works
  - Menu navigation remains functional

---

### 2. SVG Diagram

- [ ] **Direct browser test**
  ```bash
  open content/modules/ROOT/assets/images/idp-architecture.svg
  # Or on Linux: xdg-open content/modules/ROOT/assets/images/idp-architecture.svg
  ```

- [ ] **Verify rendering**:
  - [ ] All 6 layers visible with correct colors
  - [ ] Text is readable (not cut off or overlapping)
  - [ ] Arrows point to correct targets
  - [ ] Title and legend display correctly
  - [ ] No broken or missing elements

- [ ] **Test scaling**:
  - [ ] Zoom in (200%) - text remains crisp
  - [ ] Zoom out (50%) - still readable
  - [ ] Print preview - looks professional

- [ ] **Embedded in Antora**:
  - [ ] SVG displays on Architecture Diagrams page
  - [ ] Correct size (not too large, not too small)
  - [ ] Centers properly on page

---

### 3. Mermaid Diagrams

- [ ] **GitHub/GitLab rendering test**
  - If using Git hosting:
    ```bash
    git add DIAGRAMS.md
    git commit -m "Add Mermaid architecture diagrams"
    git push
    ```
  - [ ] Open DIAGRAMS.md on GitHub/GitLab web interface
  - [ ] Verify all 7 diagrams render automatically

- [ ] **VS Code test** (if using VS Code):
  - [ ] Install "Markdown Preview Mermaid Support" extension
  - [ ] Open DIAGRAMS.md
  - [ ] Click "Open Preview to the Side" (Ctrl+K V)
  - [ ] All diagrams render correctly

- [ ] **Mermaid Live Editor test**:
  - [ ] Go to https://mermaid.live
  - [ ] Copy each diagram code block from DIAGRAMS.md
  - [ ] Paste and verify rendering
  - [ ] Check for syntax errors

- [ ] **Verify all diagrams**:
  - [ ] Complete Platform Architecture
  - [ ] GitOps Deployment Flow
  - [ ] Developer Self-Service Flow
  - [ ] Secret Management Flow
  - [ ] Module Progression
  - [ ] Component Dependencies
  - [ ] Network Communication

---

### 4. ASCII Art Diagram

- [ ] **Terminal rendering**
  ```bash
  cat README.adoc | grep -A 50 "Platform Architecture Overview"
  ```

- [ ] **Verify**:
  - [ ] Boxes align correctly
  - [ ] Text is readable in terminal
  - [ ] No broken characters or encoding issues

- [ ] **GitHub/GitLab rendering**:
  - [ ] Open README.adoc in web interface
  - [ ] ASCII diagram displays in monospace font
  - [ ] Structure is preserved

---

### 5. Documentation Links

- [ ] **README.adoc**:
  - [ ] Link to `architecture-diagrams.adoc` works
  - [ ] ASCII diagram displays correctly

- [ ] **index.adoc**:
  - [ ] TIP box visible with xref link
  - [ ] Link to architecture-diagrams.adoc works

- [ ] **env.adoc**:
  - [ ] TIP box visible with xref link
  - [ ] Link to architecture-diagrams.adoc works

- [ ] **m1/intro.adoc**:
  - [ ] TIP box visible with xref link
  - [ ] Anchor link to GitOps section works

- [ ] **demo/guide.adoc**:
  - [ ] TIP box visible with xref link
  - [ ] Anchor link to Platform Overview works

- [ ] **nav.adoc**:
  - [ ] "Architecture Diagrams" appears in navigation
  - [ ] Positioned correctly (after Introduction)

---

## ✅ Content Accuracy Testing

### 1. Component Count Verification

Verify diagrams show all **8 deployed components**:
- [ ] OpenShift GitOps (ArgoCD - Platform)
- [ ] OpenShift Pipelines (Tekton)
- [ ] External Secrets Operator
- [ ] Red Hat Quay
- [ ] ArgoCD (rhdh-gitops - Applications)
- [ ] OpenShift Dev Spaces
- [ ] Trusted Artifact Signer
- [ ] Red Hat Developer Hub (Backstage)

Verify diagrams show all **5 pre-installed services**:
- [ ] OpenShift Container Platform
- [ ] GitLab
- [ ] HashiCorp Vault
- [ ] Keycloak (RHBK)
- [ ] NooBaa (S3)

---

### 2. Flow Accuracy

- [ ] **GitOps Flow**:
  1. Platform Team updates Helm chart
  2. ArgoCD polls/webhook from GitLab
  3. ArgoCD renders Helm chart
  4. ArgoCD applies to cluster
  5. Status syncs back to UI

- [ ] **Developer Flow**:
  1. Developer accesses RHDH
  2. Authenticates via Keycloak
  3. Selects software template
  4. RHDH creates GitLab repo
  5. RHDH creates ArgoCD Application
  6. Developer pushes code
  7. Tekton pipeline builds
  8. Image pushed to Quay
  9. ArgoCD deploys to OpenShift

- [ ] **Secret Flow**:
  1. Secret stored in Vault
  2. SecretStore CRD points to Vault
  3. ExternalSecret CRD defines mapping
  4. ESO reads from Vault
  5. ESO creates K8s Secret
  6. Pod mounts secret

---

### 3. Color Coding Consistency

Verify color scheme matches across all diagram types:
- [ ] Layer 0 (Foundation): Light Blue `#e1f5fe`
- [ ] Layer 1 (Platform GitOps): Light Purple `#f3e5f5`
- [ ] Layer 2 (CI/CD & Secrets): Light Green `#e8f5e9`
- [ ] Layer 3 (Registry & GitOps): Light Orange `#fff3e0`
- [ ] Layer 4 (Developer Tools): Light Pink `#fce4ec`
- [ ] Layer 5 (Developer Portal): Light Teal `#e0f2f1`

---

## ✅ Export Testing

### 1. Mermaid to PNG

```bash
# Install mermaid-cli if not already installed
npm install -g @mermaid-js/mermaid-cli

# Export all diagrams
mmdc -i DIAGRAMS.md -o test-output/
```

- [ ] All PNG files generated
- [ ] Images are clear and readable
- [ ] No rendering artifacts

---

### 2. SVG to PNG (for presentations)

```bash
# Using ImageMagick
convert content/modules/ROOT/assets/images/idp-architecture.svg test-output/idp-architecture.png

# Or using Inkscape (higher quality)
inkscape content/modules/ROOT/assets/images/idp-architecture.svg \
  --export-filename=test-output/idp-architecture.png \
  --export-dpi=300
```

- [ ] PNG generated successfully
- [ ] High resolution (suitable for printing)
- [ ] Text remains readable

---

## ✅ Accessibility Testing

- [ ] **Alt text present**: SVG image has descriptive alt text
- [ ] **Text diagrams**: ditaa/ASCII readable by screen readers
- [ ] **Color contrast**: All text readable against backgrounds
- [ ] **Semantic markup**: Proper heading hierarchy in AsciiDoc

---

## ✅ Mobile/Responsive Testing

If the lab is accessed on tablets/mobile:

- [ ] **Antora page**:
  - Diagrams scale to fit mobile screen
  - Text remains readable when zoomed
  - Navigation menu still accessible

- [ ] **SVG diagram**:
  - Scales properly on mobile viewport
  - Pinch-to-zoom works
  - Text doesn't overlap on small screens

---

## ✅ Performance Testing

- [ ] **Page load time**: Architecture Diagrams page loads in < 3 seconds
- [ ] **SVG file size**: < 200KB (check: `ls -lh idp-architecture.svg`)
- [ ] **No console errors**: Open browser dev tools, check for errors
- [ ] **No 404s**: All image/xref links resolve

---

## ✅ Cross-Browser Testing

Test in multiple browsers:

- [ ] **Chrome/Chromium**: All diagrams render correctly
- [ ] **Firefox**: All diagrams render correctly
- [ ] **Safari** (macOS): All diagrams render correctly
- [ ] **Edge**: All diagrams render correctly

---

## ✅ Print Testing

- [ ] **Print preview** of Architecture Diagrams page:
  - Diagrams don't get cut off across pages
  - Colors print well (or work in grayscale)
  - Text remains readable when printed

---

## 🐛 Known Issues / Troubleshooting

### Issue: ditaa diagrams not rendering in Antora
**Solution**: Check Antora configuration includes ditaa extension

### Issue: Mermaid not rendering on GitHub
**Solution**: Ensure code blocks use triple backticks with `mermaid` language tag

### Issue: SVG text appears blurry
**Solution**: Check if browser has hardware acceleration enabled

### Issue: Cross-references broken
**Solution**: Verify anchor IDs match in xref links

---

## 📝 Testing Notes

| Date | Tester | Platform | Issues Found | Status |
|------|--------|----------|--------------|--------|
| YYYY-MM-DD | Name | Browser/OS | Description | ✅ / ⚠️ / ❌ |
|  |  |  |  |  |
|  |  |  |  |  |

---

## ✅ Sign-Off

- [ ] All diagrams render correctly across platforms
- [ ] All links and cross-references work
- [ ] Content is accurate and up-to-date
- [ ] Export functionality tested
- [ ] Documentation is accessible

**Tested by**: _________________  
**Date**: _________________  
**Approved for deployment**: ☐ Yes  ☐ No  

---

**Next Steps After Testing**:
1. Fix any issues found
2. Re-test failed items
3. Commit changes to version control
4. Deploy to production environment
5. Monitor for user feedback
