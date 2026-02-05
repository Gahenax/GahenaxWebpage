# ANTIGRAVITY UX REFACTOR - BASELINE ANALYSIS

**Date:** 2026-02-05 17:52 UTC  
**Target:** https://gahenaxaisolutions.com  
**Mission:** Clarity + Hierarchy + CTA Flow  
**Mode:** Conservative refactor (no redesign)  

---

## PHASE 0.1 — BASELINE CAPTURED

### Current Site Analysis (Code-Based)

**Browser screenshots not available** (system environment issue)  
**Fallback:** Analyzing HTML/CSS structure from codebase

---

## 🔍 BASELINE OBSERVATIONS

### HERO SECTION (Current State)

**HTML Structure:**
```html
<section class="hero">
  <h1>Auditoría técnica y operativa<br>para equipos que no pueden decidir</h1>
  <p class="hero-description">
    Identificamos dónde se paraliza la toma de decisiones en tu empresa,
    diseñamos el marco para recuperar velocidad y entregamos un plan
    de 90 días con acciones medibles. Sin frameworks genéricos, sin PDFs
    que nadie implementa.
  </p>
  <a href="#contacto" class="btn btn-primary">Solicitar evaluación — Respuesta en 48 horas</a>
</section>
```

**Issues Found:**
- ❌ **Hero text is LONG** (3 lines description)
- ❌ **Value prop not instantly clear** (buried in paragraph)
- ⚠️ **CTA text verbose** ("Solicitar evaluación — Respuesta en 48 horas")
- ⚠️ **Max-width not constrained** (hero text can stretch wide)
- ✅ **Only ONE CTA above fold** (good)

**Hierarchy Problems:**
- H1 is clear but description dilutes impact
- Too much text to process in <7 seconds
- No visual separation between value prop and details

---

### SERVICES/QUÉ RECIBES SECTION

**Current HTML:**
```html
<h2 class="section-title">Qué recibes</h2>
<p class="section-subtitle">
  Entregables concretos, no promesas abstractas. Cada proyecto incluye:
</p>
<div class="grid-3">
  <div class="card hover-lift">
    <h3>Auditoría Decisional (2-3 semanas)</h3>
    <p class="card-body">
      <strong>Recibes:</strong> Doc de 30-50 páginas con:<br>
      • Mapa de decisiones críticas...<br>
      • Análisis de dónde se genera fricción...<br>
      • Evaluación de riesgo...<br>
      • 3-4 hallazgos críticos priorizados
    </p>
  </div>
  <!-- More cards -->
</div>
```

**Issues Found:**
- ⚠️ **Cards have bullet lists** (dense, not scannable)
- ⚠️ **No icons** (purely text-based)
- ⚠️ **Long card bodies** (>4 lines each)
- ✅ **Grid layout exists** (good foundation)
- ❌ **Problem -> Solution -> Result** pattern unclear

**Hierarchy Problems:**
- Cards are wall-of-text blocks
- User has to read everything to understand offerings
- No quick-scan visual cues (icons missing)

---

### METHOD SECTION

**Current HTML:**
```html
<h2 class="section-title">Método</h2>
<p class="section-subtitle">
  Cada intervención sigue una secuencia cerrada. Sin saltos. Sin humo.
</p>
<div class="process grid-4">
  <div class="step">
    <span class="step-number">01</span>
    <h3 class="step-title">Lectura del sistema</h3>
    <p class="step-description">
      Mapeamos estructura, decisiones clave, puntos de fricción y control.
    </p>
  </div>
  <!-- Steps 02-04 -->
</div>
```

**Issues Found:**
- ✅ **Step numbers present** (01-04)
- ✅ **Grid-4 layout** (likely horizontal desktop, stacked mobile)
- ⚠️ **Step descriptions are 1-liner** (borderline, could be clearer)
- ❌ **No visual timeline connector** (steps feel disconnected)
- ⚠️ **No "tangible output" line** per step

**Hierarchy Problems:**
- Steps are presented but don't flow visually
- User doesn't see "inputs -> actions -> outputs" per step
- Could benefit from visual connectors (arrows/lines)

---

### CONTACT/FOOTER

**Current HTML:**
```html
<footer id="contacto" class="footer">
  <div class="footer-brand">Gahenax AI Solutions</div>
  <p>Ingeniería cognitiva aplicada a sistemas reales.</p>
  <div class="footer-contact">
    <div>contacto@gahenax.ai</div>
    <div>+34 XXX XXX XXX</div>
  </div>
</footer>
```

**Issues Found:**
- ❌ **NO CONTACT FORM** (Jules task CONTACT-001 pending)
- ❌ **Only email/phone** (high friction)
- ❌ **No trust cues** ("Sin spam", "Respuesta en X horas")
- ⚠️ **Footer doubled as contact section** (confusing)

**Hierarchy Problems:**
- Contact is buried in footer
- No secondary CTA near end of content
- Friction too high (manual email composition)

---

### NAVIGATION

**Current HTML:**
```html
<header class="header">
  <div class="brand">Gahenax <span class="brand-highlight">AI</span></div>
  <nav class="nav-links">
    <a href="#servicios">Servicios</a>
    <a href="#metodo">Método</a>
    <a href="#contacto">Contacto</a>
  </nav>
</header>
```

**Issues Found:**
- ⚠️ **Generic labels** ("Servicios" vs "Qué hacemos")
- ❌ **Not sticky** (disappears on scroll)
- ❌ **No active section indicator** (scrollspy missing)
- ✅ **Simple, clean structure** (good foundation)

**Hierarchy Problems:**
- User loses navigation when scrolling
- Can't tell which section they're in
- Labels are nouns, not verbs (less action-oriented)

---

## 📐 CSS ARCHITECTURE BASELINE

**Font System:**
```css
--font-sans: "Inter", system-ui, sans-serif;
H1: clamp(32px, 4vw, 54px)
P: line-height: 1.6
Card body: line-height: 1.6
```

**Spacing System:**
```css
Inconsistent - uses raw px values
Some CSS variables in 00-tokens.css
No systematic 8px base unit enforcement
```

**CTA Buttons:**
```css
.btn-primary: Linear gradient background
Border-radius: 8px (too rounded for institutional)
Padding: Likely 16px 32px
```

**Section Spacing:**
```css
Section padding: Likely 80-120px (varies)
No consistent vertical rhythm
```

---

## 🎯 PRIORITY ISSUES IDENTIFIED

### P0 (Critical - Hierarchy & Mobile)

1. **HERO TOO WORDY**
   - Description is 3 lines + details
   - Value prop buried in prose
   - Needs: 3-layer structure (H1 → subhead → CTA)

2. **SERVICE CARDS TOO DENSE**
   - Bullet lists inside cards
   - No icons for quick scanning
   - Needs: Icons + Title + 1-2 lines max

3. **MOBILE UNKNOWN** (No baseline screenshots)
   - Cannot verify tap sizes
   - Cannot verify spacing
   - Cannot verify stack order
   - **Risk:** Mobile UX may already be broken

4. **NAVBAR NOT STICKY**
   - Disappears on scroll
   - No way to navigate once scrolled
   - Needs: Sticky + background on scroll

### P1 (Important - Flow & Trust)

5. **METHOD STEPS NOT VISUAL**
   - No timeline connectors
   - No tangible outputs per step
   - Needs: Visual flow indicators

6. **CONTACT HAS HIGH FRICTION**
   - No form (CONTACT-001 pending with Jules)
   - No trust cues
   - Needs: Wait for Jules OR add minimal cues

7. **CTA SYSTEM NOT UNIFIED**
   - CTA text too verbose
   - No secondary CTA pattern
   - Needs: Simplified primary + consistent secondary

---

## 📋 MINIMAL EDIT PLAN

### Files to Modify (Conservative)

1. **index.html**
   - Hero: Shorten description, add max-width wrapper
   - Services: Add icon placeholders, shorten card text
   - Method: Add visual step indicators
   - Navbar: Add `sticky` class

2. **public/assets/css/04-components.css**
   - Add `.hero-content-wrapper` (max-width: 720px)
   - Add `.card-icon` styles
   - Add `.step-icon` or `.step-connector` styles
   - Add `.navbar-sticky` behavior

3. **public/assets/css/02-base.css** (Typography)
   - Increase H1/H2 contrast
   - Enforce line-height consistency
   - Add paragraph max-width tokens

4. **public/assets/css/05-utilities.css** (Spacing)
   - Add consistent section spacing classes
   - Add vertical rhythm utilities

### Expected File Changes:
```
M index.html (hero, services, method structure)
M public/assets/css/02-base.css (typography scale)
M public/assets/css/04-components.css (hero wrapper, cards, navbar)
M public/assets/css/05-utilities.css (spacing tokens)
```

**Lines Changed Estimate:** ~100-150 lines total

---

## ✅ PHASE 0.2 COMPLETE

**CSS Architecture Identified:**
- Inter font ✅
- Inconsistent spacing system ⚠️
- No systematic type scale ⚠️
- CTA buttons exist but need refinement ✅

**Baseline Captured:** Code-based analysis complete  
**Screenshot Limitation:** Browser unavailable, will verify via local file preview  

---

## 🎯 READY FOR PHASE 1

**Next:** PHASE 1 — Visual Hierarchy (Hero Restructure + Typography System)

**Estimated Time:** 1-2 hours  
**Risk:** Low (conservative refactor, not redesign)  
**Verification:** Local file preview + code review

---

**STATUS:** PHASE 0 COMPLETE ✅  
**NEXT:** Execute Phase 1.1 (Hero Restructure)
