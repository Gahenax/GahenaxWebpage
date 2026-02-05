# INSTITUTIONAL REDESIGN - SPECIFICATION FOR JULES

**Task ID:** REDESIGN-001  
**Priority:** 🔥🔥🔥 CRITICAL  
**Assigned to:** Jules (Google AI Agent)  
**Estimated Time:** 19-30 hours  
**Branch:** `feature/institutional-redesign`  
**Status:** TODO  

---

## 🎯 OBJECTIVE

Transform Gahenax AI Solutions website to institutional-grade design parity with provided reference image.

**Reference Image:** Located in project root (visual showing dark, analytical, authoritative design)

**Anti-Patterns to Avoid:**
- ❌ Startup vibes
- ❌ Over-marketing copy
- ❌ Bright playful colors
- ❌ Low-contrast UI
- ❌ Generic SaaS components

---

## 🔒 DESIGN LOCK (NO DEVIATIONS)

### Color Palette (EXACT MATCH REQUIRED)
```css
--bg-primary: #0B0F1A;
--bg-secondary: #121826;
--accent: #4FD1C5;
--text-primary: #E5E7EB;
--text-secondary: #9CA3AF;
--border: #1F2937;
```

### Typography (LOCKED)
```css
Font: Inter, system-ui, sans-serif
H1: 48px / 700
H2: 32px / 600
H3: 20px / 600
Body: 16px / 400
Caption: 13px / 400
```

### Layout Constraints
- Max-width: 1280px
- 12-column grid
- 8px base unit for spacing
- Border-radius: MAX 6px
- Shadows: Soft, low elevation only

---

## 📋 EXECUTION PHASES

### PHASE 0 - Design Lock (1h)
**File:** `public/assets/css/00-tokens.css`

**Task:** Replace entire color system with institutional palette

```css
:root {
  /* Backgrounds */
  --bg-primary: #0B0F1A;
  --bg-secondary: #121826;
  --bg-tertiary: #1F2937;
  
  /* Accent */
  --accent: #4FD1C5;
  --accent-hover: #38B2AC;
  
  /* Text */
  --text-primary: #E5E7EB;
  --text-secondary: #9CA3AF;
  
  /* Borders */
  --border: #1F2937;
  
  /* Typography */
  --font-primary: Inter, system-ui, sans-serif;
  --text-h1: 48px;
  --text-h2: 32px;
  --text-h3: 20px;
  --text-body: 16px;
  
  /* Spacing (8px base) */
  --space-1: 8px;
  --space-2: 16px;
  --space-3: 24px;
  --space-4: 32px;
  --space-6: 48px;
  --space-8: 64px;
  
  /* Radius (MAX 6px) */
  --radius-sm: 4px;
  --radius-md: 6px;
  
  /* Layout */
  --container-max: 1280px;
}
```

**Verification:**
- [ ] All old color variables removed
- [ ] New institutional palette active
- [ ] Typography scale exact
- [ ] No deviations from spec

---

### PHASE 1 - Layout Reconstruction (4-6h)

**Files:**
- `public/assets/css/03-layout.css`
- `index.html` (hero section)

**Tasks:**

1. **Implement 12-column grid**
```css
.container {
  max-width: var(--container-max);
  margin: 0 auto;
  padding: 0 var(--space-3);
}

.grid-12 {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: var(--space-3);
}
```

2. **Global vertical rhythm**
```css
section {
  padding: var(--space-16) 0;
}

* + * {
  margin-top: var(--space-1); /* 8px base */
}
```

3. **Remove center-aligned hero**
- Current hero is center-aligned ❌
- Must be split layout (text left, visual right) ✅

**Verification:**
- [ ] Grid system responsive
- [ ] Max-width 1280px enforced
- [ ] Vertical rhythm consistent (8px multiples)
- [ ] Hero NOT center-aligned

---

### PHASE 2 - Hero Section (2-3h)

**File:** `index.html` (lines ~118-130)

**Current (BAD):**
```html
<section class="hero">
  <h1>Auditoría técnica y operativa para equipos que no pueden decidir</h1>
  <!-- Center-aligned, no visual -->
</section>
```

**Target (GOOD):**
```html
<section class="hero">
  <div class="container">
    <div class="hero-split">
      <div class="hero-content">
        <h1>Inteligencia aplicada para decisiones críticas.</h1>
        <p>Soluciones avanzadas en IA para los desafíos reales de su negocio.</p>
        <div class="hero-cta">
          <a href="#soluciones" class="btn-primary">Ver Soluciones</a>
          <a href="#contacto" class="btn-secondary">Agendar Consulta</a>
        </div>
      </div>
      <div class="hero-visual">
        <!-- Placeholder for analytical graphic -->
        <div class="analytical-placeholder">
          <svg><!-- Neural network / graph visual --></svg>
        </div>
      </div>
    </div>
  </div>
</section>
```

**CSS Required:**
```css
.hero-split {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-8);
  align-items: center;
}

.hero-content h1 {
  font-size: var(--text-h1);
  font-weight: 700;
  line-height: 1.2;
  color: var(--text-primary);
  margin-bottom: var(--space-3);
}

.hero-content p {
  font-size: var(--text-body);
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: var(--space-4);
}

.hero-cta {
  display: flex;
  gap: var(--space-2);
}

.btn-primary {
  background: var(--accent);
  color: var(--bg-primary);
  padding: 12px 24px;
  border-radius: var(--radius-sm);
  font-weight: 600;
  transition: all 0.2s ease;
}

.btn-secondary {
  background: transparent;
  border: 1px solid var(--border);
  color: var(--text-primary);
  padding: 12px 24px;
  border-radius: var(--radius-sm);
}
```

**Visual Placeholder:**
For now, use a simple SVG placeholder. In Phase 6 we'll replace with proper analytical graphic.

```html
<svg viewBox="0 0 500 400" xmlns="http://www.w3.org/2000/svg">
  <!-- Simple grid pattern as placeholder -->
  <rect width="500" height="400" fill="var(--bg-secondary)"/>
  <g stroke="var(--accent)" opacity="0.2">
    <line x1="0" y1="100" x2="500" y2="100"/>
    <line x1="0" y1="200" x2="500" y2="200"/>
    <line x1="0" y1="300" x2="500" y2="300"/>
  </g>
  <text x="250" y="200" text-anchor="middle" fill="var(--text-secondary)" font-size="14">
    Analytical Visual Placeholder
  </text>
</svg>
```

**Verification:**
- [ ] Split layout working
- [ ] Text left-aligned
- [ ] Visual area populated (placeholder OK)
- [ ] CTAs styled correctly
- [ ] Responsive on mobile (stack vertically)

---

### PHASE 3 - Card System (3-4h)

**Files:**
- `public/assets/css/04-components.css`
- `index.html` (services/capabilities sections)

**Reference Card Structure:**
```html
<div class="capability-grid">
  <div class="capability-card">
    <div class="card-icon">
      <svg><!-- Line icon --></svg>
    </div>
    <h3>Análisis Predictivo</h3>
    <p>Modelos de predicción y optimización</p>
  </div>
  <!-- Repeat for each capability -->
</div>
```

**CSS Spec:**
```css
.capability-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: var(--space-3);
}

.capability-card {
  background: var(--bg-secondary);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  padding: var(--space-3);
  transition: all 0.2s ease;
}

.capability-card:hover {
  border-color: var(--accent);
  box-shadow: 0 4px 12px rgba(79, 209, 197, 0.1);
  transform: translateY(-2px);
}

.card-icon {
  width: 40px;
  height: 40px;
  color: var(--accent);
  margin-bottom: var(--space-2);
}

.capability-card h3 {
  font-size: var(--text-h3);
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: var(--space-1);
}

.capability-card p {
  font-size: var(--text-caption);
  color: var(--text-secondary);
  line-height: 1.6;
}
```

**Icons Needed:**
Use [Lucide Icons](https://lucide.dev/) (line variants):
- Análisis Predictivo: `TrendingUp`
- Procesamiento de Datos: `Database`
- Seguridad & Compliance: `Shield`
- Finanzas: `DollarSign`
- Salud: `Heart`
- Manufactura: `Factory`
- Energía: `Zap`

**Implementation:**
```html
<div class="card-icon">
  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
    <polyline points="17 6 23 6 23 12"></polyline>
  </svg>
</div>
```

**Verification:**
- [ ] Grid responsive
- [ ] Cards have exact styling (bg, border, radius ≤ 6px)
- [ ] Hover effects working
- [ ] Icons monochrome, accent color
- [ ] No decorative icons

---

### PHASE 4 - Navigation & Footer (2h)

**Navigation HTML:**
```html
<nav class="main-nav">
  <div class="container nav-container">
    <div class="nav-brand">
      <svg width="32" height="32"><!-- Logo --></svg>
      <span class="brand-text">GAHENAX <span class="brand-sub">AI SOLUTIONS</span></span>
    </div>
    <div class="nav-links">
      <a href="#soluciones">Soluciones</a>
      <a href="#sectores">Sectores</a>
      <a href="#investigacion">Investigación</a>
      <a href="#nosotros">Nosotros</a>
    </div>
    <div class="nav-actions">
      <span class="lang-switch">ES | EN</span>
      <a href="#blog" class="nav-cta">Blog</a>
    </div>
  </div>
</nav>
```

**Nav CSS:**
```css
.main-nav {
  position: fixed;
  top: 0;
  width: 100%;
  background: var(--bg-primary);
  border-bottom: 1px solid var(--border);
  z-index: var(--z-nav);
}

.nav-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--space-2) var(--space-3);
}

.nav-links a {
  color: var(--text-secondary);
  margin: 0 var(--space-2);
  font-size: 14px;
  font-weight: 500;
  transition: color 0.2s ease;
}

.nav-links a:hover {
  color: var(--accent);
}
```

**Footer HTML:**
```html
<footer class="main-footer">
  <div class="container">
    <div class="footer-grid">
      <div class="footer-col">
        <h4>Soluciones</h4>
        <ul>
          <li><a href="#">Análisis Predictivo</a></li>
          <li><a href="#">Procesamiento de Datos</a></li>
          <li><a href="#">Seguridad</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>Sectores</h4>
        <ul>
          <li><a href="#">Finanzas</a></li>
          <li><a href="#">Salud</a></li>
          <li><a href="#">Manufactura</a></li>
          <li><a href="#">Energía</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>Investigación</h4>
        <ul>
          <li><a href="#">Publicaciones</a></li>
          <li><a href="#">Casos de Éxito</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>Nosotros</h4>
        <p>info@gahenax.com</p>
        <p>+34 900 000 000</p>
      </div>
    </div>
    <div class="footer-legal">
      <span>© 2022 Gahenax AI Solutions. Todos los derechos reservados.</span>
      <div class="legal-links">
        <a href="#">Privacidad</a>
        <a href="#">Términos</a>
        <a href="#">Aviso Legal</a>
      </div>
      <div class="social-links">
        <a href="#"><i>LinkedIn</i></a>
        <a href="#"><i>Twitter</i></a>
      </div>
    </div>
  </div>
</footer>
```

**Footer CSS:**
```css
.main-footer {
  background: var(--bg-secondary);
  border-top: 1px solid var(--border);
  padding: var(--space-8) 0 var(--space-4);
}

.footer-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--space-6);
  margin-bottom: var(--space-6);
}

.footer-col h4 {
  font-size: 14px;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: var(--space-2);
}

.footer-col ul {
  list-style: none;
  padding: 0;
}

.footer-col li {
  margin-bottom: var(--space-1);
}

.footer-col a {
  color: var(--text-secondary);
  font-size: 14px;
  transition: color 0.2s ease;
}

.footer-col a:hover {
  color: var(--accent);
}

.footer-legal {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: var(--space-4);
  border-top: 1px solid var(--border);
  font-size: 13px;
  color: var(--text-muted);
}
```

**Verification:**
- [ ] Nav fixed, dark background
- [ ] Footer high-density, grid-based
- [ ] Links styled correctly
- [ ] Responsive (mobile: stack columns)

---

### PHASE 5 - Copy Filtering (1-2h)

**Anti-Marketing Rules:**

Replace ALL promise/hype language with capability statements.

**REMOVE:**
```
❌ "Transformamos datos en decisiones seguras y efectivas"
❌ "¿Tu equipo está paralizado por decisiones?"
❌ "Sin frameworks genéricos, sin PDFs que nadie implementa"
❌ "Devolvemos control"
❌ "Recuperar velocidad"
```

**REPLACE WITH:**
```
✅ "Inteligencia aplicada para decisiones críticas."
✅ "Soluciones avanzadas en IA para los desafíos reales de su negocio."
✅ "Modelos de predicción y optimización"
✅ "Integración y análisis de información"
✅ "Monitoreo y gestión de riesgos"
✅ "Control ultrasensible y configuraciones inteligentes"
```

**Copy Philosophy:**
- State capabilities, not outcomes
- Process > results
- No exclamation marks
- No question marks
- Every sentence earns its space
- Technical, not emotional

**Files to Edit:**
- `index.html` (all text content)

**Verification:**
- [ ] No promise language remaining
- [ ] No hype words
- [ ] All copy is capability-focused
- [ ] Professional, institutional tone

---

### PHASE 6 - Analytical Visuals (4-6h)

**Required Graphics:**

1. **Hero Visual** (Priority 1)
   - Neural network graph OR
   - System architecture diagram OR
   - Data flow visualization
   
   **Options:**
   - Create with D3.js
   - Use Canvas API
   - Generate SVG programmatically
   - Source from design tool (Figma export)

2. **Section Backgrounds** (Priority 2)
   - Subtle grid patterns
   - Data visualization textures
   - Low opacity, non-distracting

3. **Report Cards**
   - Chart thumbnails for "AI en Finanzas 2022"
   - Graph preview for "Casos de Éxito"

**If Unable to Generate:**
- Use high-quality placeholders
- Document what's needed
- Mark as TODO for final review

**Verification:**
- [ ] Hero has analytical visual (not decorative)
- [ ] Visuals are monochrome + accent
- [ ] SVG format preferred
- [ ] Performance maintained

---

### PHASE 7 - QA & Visual Audit (2h)

**Verification Checklist:**

```markdown
## UI AUTHORITY CHECK
- [ ] Does it feel intimidating (in a good way)?
- [ ] Would a CTO trust this immediately?
- [ ] Is there visual silence (intentional whitespace)?
- [ ] Is hierarchy instantly obvious?
- [ ] Does it feel like a decision system, not a landing page?

## COLOR CHECK
- [ ] Background exactly #0B0F1A
- [ ] Accent exactly #4FD1C5
- [ ] No bright greens (#64ff8f) remaining
- [ ] No purple (#7b5cff) remaining

## TYPOGRAPHY CHECK
- [ ] H1 = 48px / 700
- [ ] H2 = 32px / 600
- [ ] H3 = 20px / 600
- [ ] Body = 16px / 400
- [ ] Font = Inter

## COMPONENT CHECK
- [ ] Border radius ≤ 6px everywhere
- [ ] No decorative gradients
- [ ] Icons are line-based, monochrome
- [ ] Shadows are soft, low elevation

## COPY CHECK
- [ ] No promise language
- [ ] No hype words
- [ ] Every paragraph justified
- [ ] Capability > marketing

## ACCESSIBILITY
- [ ] Contrast ratio AA minimum (#E5E7EB on #0B0F1A = 14.3:1 ✅)
- [ ] Focus states visible
- [ ] Semantic HTML
- [ ] Keyboard navigation works

## RESPONSIVE
- [ ] Mobile: Stacked layout
- [ ] Tablet: Adjusted grid
- [ ] Desktop: Full 12-column grid
```

**If ANY check fails:** Fix before proceeding to deployment review.

---

## 📁 FILES TO CREATE/MODIFY

### New Files:
```
/public/assets/css/09-institutional.css (new phase CSS)
/public/assets/icons/ (lucide icon set)
/docs/INSTITUTIONAL-REDESIGN.md (documentation)
```

### Files to Modify:
```
index.html (complete restructure)
public/assets/css/00-tokens.css (color system)
public/assets/css/02-base.css (typography)
public/assets/css/03-layout.css (grid system)
public/assets/css/04-components.css (cards, buttons, nav, footer)
public/assets/css/main.css (import new CSS)
```

---

## ⚠️ CRITICAL CONSTRAINTS

**DO NOT:**
- Deviate from color palette (#0B0F1A, #4FD1C5, etc.)
- Use border-radius > 6px
- Add decorative elements
- Use marketing language
- Center-align hero
- Skip any verification checklist

**DO:**
- Follow reference image exactly
- Match typography scale precisely
- Use 8px base unit for all spacing
- Keep high information density
- Maintain visual authority

---

## 🔗 COORDINATION

**Parallel Work:**
- You (Jules): REDESIGN-001 (institutional redesign)
- Also Assigned: CONTACT-001 (contact form)

**Priority:**
REDESIGN-001 > CONTACT-001

**Reason:** Redesign establishes the foundation. Contact form should match new design system.

**When Complete:**
1. Commit all changes to `feature/institutional-redesign` branch
2. Push to GitHub
3. Update JULES-ASSIGNMENT.md with checkmarks
4. Notify in commit message: "REDESIGN-001 Complete - Ready for Review"

---

## ✅ DEFINITION OF DONE

- [ ] All 7 phases complete
- [ ] QA checklist 100% passed
- [ ] Visual parity with reference image
- [ ] No console errors
- [ ] Responsive on all breakpoints
- [ ] Committed to feature branch
- [ ] Documented in INSTITUTIONAL-REDESIGN.md

---

**STATUS:** TODO → IN PROGRESS → DONE  
**BRANCH:** `feature/institutional-redesign`  
**ESTIMATED:** 19-30 hours  
**PRIORITY:** 🔥🔥🔥 CRITICAL  

**START WHENEVER READY, JULES!**
