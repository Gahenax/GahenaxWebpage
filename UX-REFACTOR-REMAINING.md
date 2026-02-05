# UX CLARITY REFACTOR - REMAINING PHASES FOR JULES

**Task ID:** UX-REFACTOR-001  
**Branch:** `feature/ux-clarity-refactor`  
**Priority:** 🔥 HIGH  
**Status:** PHASE 1.1 COMPLETE → Continue from Phase 1.2  
**Estimate:** 3-5 hours remaining  

---

## ✅ COMPLETED (By Antigravity)

**PHASE 1.1 - Hero Restructure:**
- Hero simplified (3 lines → 2 lines)
- CTA text shortened
- Max-width constraint added (720px)
- `.hero-subhead` class created

**Files Already Modified:**
- `index.html` (hero section)
- `public/assets/css/04-components.css` (+hero clarity styles)

**Commit:** `166a641`

---

## 📋 REMAINING PHASES (For Jules)

Continue from **Phase 1.2** in same branch (`feature/ux-clarity-refactor`).

---

### PHASE 1.2 — Typography & Readability System (1h)

**Objective:** Define clean type scale and improve scannability

**File:** `public/assets/css/02-base.css`

**Tasks:**

1. **Enforce consistent type scale:**
```css
/* Add to 02-base.css */
h1 {
  font-size: clamp(32px, 4.5vw, 54px);
  font-weight: 700;
  line-height: 1.1;
  letter-spacing: -0.02em;
}

h2 {
  font-size: clamp(24px, 3vw, 36px);
  font-weight: 600;
  line-height: 1.2;
  letter-spacing: -0.01em;
}

h3 {
  font-size: clamp(18px, 2vw, 24px);
  font-weight: 600;
  line-height: 1.3;
}

p {
  line-height: 1.7; /* Increase from 1.6 */
  max-width: 65ch; /

* Enforce readability */
}
```

2. **Split any paragraph > 4 lines into bullets or blocks**

Check these sections in `index.html`:
- Problems section (lines ~170-190)
- Services/Deliverables cards (lines ~195-230)
- Authority section use cases (lines ~280-320)

If any paragraph exceeds 4 lines, either:
- Convert to bullet list (`<ul>`)
- Split into 2 smaller `<p>` tags
- Use line breaks (`<br>`) sparingly

3. **Add section spacing tokens**

File: `public/assets/css/03-layout.css`

```css
/* Add consistent section spacing */
section {
  padding: clamp(60px, 10vw, 120px) 0;
}

section + section {
  margin-top: 0; /* Prevent double spacing */
}
```

**Verification:**
- [ ] Headings have clear hierarchy (H1 > H2 > H3)
- [ ] No paragraph exceeds 4 lines
- [ ] Sections have consistent vertical spacing
- [ ] Line-height >= 1.7 for body text

---

### PHASE 2.1 — Service Cards Scannability (1-2h)

**Objective:** Convert dense service cards into scannable format

**File:** `index.html` (Services section, lines ~195-230)

**Current Problem:**
Cards have bullet lists inside, making them dense and text-heavy.

**Target:**
Each card should be:
- Icon (placeholder SVG OK)
- Title (short, <10 words)
- Description (1-2 lines MAX, no bullets)

**Implementation:**

Find this section:
```html
<h2 class="section-title">Qué recibes</h2>
<div class="grid-3">
  <div class="card hover-lift">
    <h3>Auditoría Decisional (2-3 semanas)</h3>
    <p class="card-body">
      <strong>Recibes:</strong> Doc de 30-50 páginas con:<br>
      • Mapa de decisiones críticas...<br>
      • Análisis de dónde se genera fricción...<br>
      ...
    </p>
  </div>
  <!-- More cards -->
</div>
```

**Replace with:**
```html
<h2 class="section-title">Qué recibes</h2>
<div class="grid-3">
  <div class="card hover-lift">
    <div class="card-icon">
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <!-- TrendingUp icon from Lucide -->
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
        <polyline points="17 6 23 6 23 12"></polyline>
      </svg>
    </div>
    <h3 class="card-title">Auditoría Decisional</h3>
    <p class="card-description">
      Documento de 30-50 páginas mapeando decisiones críticas, fricción operativa y riesgos priorizados. 
      Entrega en 2-3 semanas.
    </p>
  </div>
  
  <div class="card hover-lift">
    <div class="card-icon">
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <!-- Calendar icon -->
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
        <line x1="16" y1="2" x2="16" y2="6"></line>
        <line x1="8" y1="2" x2="8" y2="6"></line>
        <line x1="3" y1="10" x2="21" y2="10"></line>
      </svg>
    </div>
    <h3 class="card-title">Plan de Ejecución (90 días)</h3>
    <p class="card-description">
      Roadmap implementable con acciones semanales, responsables y métricas. 
      Checkpoints de validación cada 2 semanas.
    </p>
  </div>
  
  <div class="card hover-lift">
    <div class="card-icon">
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <!-- Code icon -->
        <polyline points="16 18 22 12 16 6"></polyline>
        <polyline points="8 6 2 12 8 18"></polyline>
      </svg>
    </div>
    <h3 class="card-title">Implementación Auditable</h3>
    <p class="card-description">
      Código/modelo documentado con explicaciones por decisión. Training para tu equipo 
      y monitoreo activo 60-90 días.
    </p>
  </div>
</div>
```

**Add CSS** (File: `public/assets/css/04-components.css`):

```css
/* Service Card Icons */
.card-icon {
  width: 48px;
  height: 48px;
  margin-bottom: var(--s-3);
  color: var(--accent);
}

.card-icon svg {
  width: 100%;
  height: 100%;
}

.card-title {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: var(--s-2);
  color: var(--text);
}

.card-description {
  font-size: 15px;
  line-height: 1.6;
  color: var(--muted);
  margin: 0;
}
```

**Verification:**
- [ ] Each card has icon
- [ ] Card description <= 2 lines (3 max in edge case)
- [ ] No bullet lists inside cards
- [ ] Icons use accent color
- [ ] Cards are scannable in <5 seconds

---

### PHASE 2.2 — Method Step Timeline (1h)

**Objective:** Make Method section more visual with step flow

**File:** `index.html` (Method section, lines ~228-260)

**Current:**
Steps exist but lack visual flow/connectors.

**Target:**
- Visual step numbers (larger, more prominent)
- Tangible "output" line per step
- Optional: Step connectors (arrows) for desktop

**Implementation:**

Find Method section:
```html
<section id="metodo">
  <h2>Método</h2>
  <div class="process grid-4">
    <div class="step">
      <span class="step-number">01</span>
      <h3>Lectura del sistema</h3>
      <p>Mapeamos estructura, decisiones clave...</p>
    </div>
    <!-- Steps 02-04 -->
  </div>
</section>
```

**Add "output" line per step:**
```html
<div class="step">
  <span class="step-number">01</span>
  <h3 class="step-title">Lectura del sistema</h3>
  <p class="step-description">
    Mapeamos estructura, decisiones clave, puntos de fricción y control.
  </p>
  <p class="step-output">
    <strong>Entrega:</strong> Mapa de sistema actual
  </p>
</div>

<div class="step">
  <span class="step-number">02</span>
  <h3 class="step-title">Reducción de ruido</h3>
  <p class="step-description">
    Identificamos variables ruidosas, decisiones reversibles y señales falsas.
  </p>
  <p class="step-output">
    <strong>Entrega:</strong> Lista de fricción priorizada
  </p>
</div>

<!-- Steps 03-04 similar pattern -->
```

**Update CSS** (File: `public/assets/css/04-components.css`):

```css
/* Method Step Enhancements */
.step-number {
  font-size: 20px; /* Larger from 12px */
  font-weight: 700;
  color: var(--accent);
  display: block;
  margin-bottom: var(--s-2);
}

.step-output {
  margin-top: var(--s-3);
  font-size: 13px;
  color: var(--muted);
  padding-top: var(--s-2);
  border-top: 1px solid var(--border);
}

.step-output strong {
  color: var(--text);
  font-weight: 600;
}
```

**Verification:**
- [ ] Step numbers prominent (20px, bold)
- [ ] Each step has "Entrega:" line
- [ ] Visual separation between steps
- [ ] User understands process flow

---

### PHASE 3.1 — Navbar Clarity (30min)

**Objective:** Improve nav labels and ensure sticky behavior

**File:** `index.html` (header/nav section, lines ~104-115)

**Current:**
```html
<nav class="nav-links">
  <a href="#servicios">Servicios</a>
  <a href="#metodo">Método</a>
  <a href="#contacto">Contacto</a>
</nav>
```

**Target (clearer verbs):**
```html
<nav class="nav-links">
  <a href="#servicios">Qué hacemos</a>
  <a href="#metodo">Cómo trabajamos</a>
  <a href="#contacto">Hablemos</a>
</nav>
```

**Verification:**
- [ ] Nav labels are action-oriented
- [ ] Nav is sticky (already exists in header/.nav CSS)
- [ ] Background visible on scroll (already has backdrop-filter)

**Note:** Active section indicator (scrollspy) requires JS. Skip unless trivial to add.

---

### PHASE 3.2 — CTA System Unification (30min)

**Objective:** Ensure ONE primary CTA style, consistent secondary

**Files:** 
- `index.html` (verify only 1 primary CTA above fold)
- `public/assets/css/04-components.css` (verify .btn-primary is distinct)

**Tasks:**

1. **Verify primary CTA uniqueness**
   - Only `.btn-primary` in hero section above fold ✓
   - Any other CTAs should be `.btn-secondary` or text links

2. **Check button contrast**

Current `.btn-primary`:
```css
.btn-primary {
    border-color: rgba(100, 255, 143, 0.35);
    background: linear-gradient(180deg, rgba(100, 255, 143, 0.14), rgba(100, 255, 143, 0.06));
}
```

This is already distinct. ✅ No changes needed unless visual review shows otherwise.

**Verification:**
- [ ] Only 1 primary CTA above fold
- [ ] Primary CTA visually distinct from secondary
- [ ] CTA hierarchy clear (primary = high contrast, secondary = subtle)

---

### PHASE 4.1 — Mobile UX Pass (1h)

**Objective:** Ensure mobile comfort (tap sizes, spacing, stack order)

**File:** `public/assets/css/04-components.css` (mobile media queries)

**Tasks:**

1. **Verify tap target sizes >= 44px**

Check all buttons have min height:
```css
@media (max-width: 480px) {
  .btn {
    min-height: 44px; /* Ensure tap target */
    padding: 14px 20px;
  }
}
```

2. **Card spacing on mobile**

```css
@media (max-width: 900px) {
  .grid-3,
  .grid-4 {
    grid-template-columns: 1fr;
    gap: var(--s-4); /* Increase spacing between stacked cards */
  }
  
  .card {
    padding: var(--s-4); /* Comfortable padding on small screens */
  }
}
```

3. **Hero stack order**

Verify hero-grid stacks correctly:
```css
@media (max-width: 900px) {
  .hero-grid {
    grid-template-columns: 1fr; /* Stack on mobile */
  }
  
  .hero-content-wrapper {
    max-width: 100%; /* Remove constraint on mobile */
  }
}
```

**Verification:**
- [ ] All buttons >= 44px height on mobile
- [ ] Cards stack with comfortable spacing
- [ ] Hero text not constrained on narrow screens
- [ ] No horizontal scroll

---

### PHASE 5.1 — Trust Microcopy (30min)

**Objective:** Add minimal trust cue near contact CTA

**File:** `index.html` (footer/contact section, lines ~330-340)

**Current:**
```html
<footer id="contacto" class="footer">
  <div class="footer-brand">Gahenax AI Solutions</div>
  <p>Ingeniería cognitiva aplicada a sistemas reales.</p>
  <div class="footer-contact">
    <div>contacto@gahenax.ai</div>
  </div>
</footer>
```

**Add trust microcopy:**
```html
<footer id="contacto" class="footer">
  <div class="footer-brand">Gahenax AI Solutions</div>
  <p>Ingeniería cognitiva aplicada a sistemas reales.</p>
  
  <div class="footer-contact">
    <div>contacto@gahenax.ai</div>
    <p class="trust-cue">Respuesta en 24-48 horas laborales. Sin spam.</p>
  </div>
</footer>
```

**Add CSS:**
```css
.trust-cue {
  font-size: 13px;
  color: var(--muted);
  margin-top: var(--s-2);
  font-style: italic;
}
```

**Verification:**
- [ ] Trust cue visible near contact email
- [ ] Copy is conservative (no promissory language)
- [ ] Reduces friction for contacting

---

### PHASE 6 — Final QA & Evidence (1h)

**Objective:** Verify all changes, document evidence

**Tasks:**

1. **Manual UX Script**

Open `index.html` in browser (locally or via live server).

Ask 3 questions simulating first-time visitor in <15 seconds:
- ❓ What does this site offer?
- ❓ How does it work?
- ❓ What should I do next?

**Expected Answers:**
- ✅ "Audits and plans for teams with decision paralysis"
- ✅ "4-step method (01-04)"
- ✅ "Contact them via email or form"

If any answer is unclear, note it as remaining debt.

2. **Responsive Check**

Test at these widths:
- 1440px (desktop)
- 768px (tablet)
- 390px (mobile)

Verify:
- [ ] No horizontal scroll
- [ ] Cards stack properly
- [ ] Tap targets >= 44px
- [ ] Text readable without zoom

3. **Optional: Lighthouse Quick Check**

Run Lighthouse (Chrome DevTools) on local preview:
- Don't chase perfect score
- Only fix if Performance < 80 or Accessibility < 90
- Note score for baseline

4. **Capture Evidence**

**Since browser tool unavailable**, document via code inspection:
- Create `EVIDENCE.md` listing all changes made
- Describe expected visual impact per change
- Note any remaining issues

**Example EVIDENCE.md:**
```markdown
# UX REFACTOR EVIDENCE

## PHASE 1 - Hero
- Shortened description (3 lines → 2 lines)
- Expected impact: Faster comprehension (<10s vs <15s)

## PHASE 2 - Service Cards
- Added icons (visual anchors)
- Removed bullet lists (scannable descriptions)
- Expected impact: User can list services without reading paragraphs

## PHASE 3 - Navigation
- Renamed labels ("Servicios" → "Qué hacemos")
- Expected impact: More intuitive navigation

## PHASE 4 - Mobile
- Ensured tap targets >= 44px
- Expected impact: Comfortable one-hand usage

## PHASE 5 - Trust
- Added "Respuesta en 24-48h. Sin spam."
- Expected impact: Reduced contact friction

## Remaining Debt:
- Contact form still pending (CONTACT-001 task)
- Scrollspy/active section indicator (requires JS)
- Analytical visuals for hero (future enhancement)
```

**Verification:**
- [ ] Manual UX script passed
- [ ] Responsive check passed
- [ ] Evidence documented in EVIDENCE.md
- [ ] No critical regressions

---

## 📁 FILES TO MODIFY SUMMARY

```
M index.html
  - Services cards (add icons, shorten text)
  - Method steps (add output lines)
  - Nav labels (rename to verbs)
  - Footer (add trust cue)

M public/assets/css/02-base.css
  - Typography scale (H1/H2/H3)
  - Paragraph line-height (1.7)

M public/assets/css/03-layout.css
  - Section spacing tokens

M public/assets/css/04-components.css
  - .card-icon, .card-title, .card-description
  - .step-number (larger), .step-output
  - .trust-cue
  - Mobile media queries (tap sizes, spacing)

+ EVIDENCE.md (new file)
```

---

## ✅ DEFINITION OF DONE

- [ ] All Phases 1.2-6 tasks complete
- [ ] Manual UX script passed (<15s comprehension)
- [ ] Responsive check passed (1440px, 768px, 390px)
- [ ] EVIDENCE.md created with all changes documented
- [ ] No critical regressions (layout breaks, missing content)
- [ ] Committed to `feature/ux-clarity-refactor` branch
- [ ] Ready for PR review

---

## 🎯 COORDINATION

**Branch:** `feature/ux-clarity-refactor` (already created)  
**Base Commit:** `166a641` (Phase 1.1 complete)  

**When Complete:**
1. Commit all changes with message:
   ```
   refactor: UX Clarity Phases 1.2-6 Complete
   
   - Phase 1.2: Typography system
   - Phase 2.1: Service cards (icons + scannable)
   - Phase 2.2: Method steps (visual flow + outputs)
   - Phase 3.1: Nav labels (verb-oriented)
   - Phase 3.2: CTA system verified
   - Phase 4.1: Mobile UX (tap sizes, spacing)
   - Phase 5.1: Trust microcopy
   - Phase 6: QA + evidence
   
   All changes conservative (refactor, not redesign).
   Evidence in EVIDENCE.md.
   ```

2. Push to GitHub
3. Update `JULES-ASSIGNMENT.md` with checkmark for UX-REFACTOR-001

---

**STATUS:** IN PROGRESS  
**PRIORITY:** 🔥 HIGH  
**ESTIMATE:** 3-5 hours  
**START WHEN READY, JULES!**
