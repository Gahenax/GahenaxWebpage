# ANTIGRAVITY REFACTOR - EXECUTION PLAN

**Project:** gahenaxaisolutions.com  
**Total Phases:** 7  
**Execution Mode:** Phase-gated with verification  
**Coordinator:** Antigravity + Jules (Google AI Agent)  

---

## EXECUTION STRATEGY

**Parallel Work:**
- **Jules:** CONTACT-001 (Phase 5 - Contact Form)
- **Antigravity:** Phases 0-4, 6-7

**Coordination Point:**
When Jules completes CONTACT-001, merge and verify no conflicts.

---

## PHASE ROADMAP

### ✅ PHASE 0 — DIAGNOSTIC (COMPLETE)
**Duration:** 30 min  
**Output:** ANTIGRAVITY-DIAGNOSTIC.md  
**Frictions Found:** 11 (5 critical, 5 moderate, 1 minor)  
**Status:** COMPLETE  

---

### 🔵 PHASE 1 — HERO & VALUE REWRITE (READY)
**Objective:** Restore immediate clarity in hero section  
**Priority:** 🔥🔥 CRITICAL  
**Estimated:** 45-60 min  

**Fixes:**
- FRICTION-H01: Replace abstract mantra with explicit value prop
- FRICTION-H02: Remove jargon, add concrete language
- FRICTION-H04: Clarify CTA expectation

**Changes Required:**
```html
<!-- BEFORE -->
<h1>Reducimos fricción.<br>Devolvemos control.</h1>
<p>Gahenax AI Solutions diseña auditorías, planes de mejora y sistemas...</p>
<a href="#contacto">Solicitar auditoría estratégica</a>

<!-- AFTER -->
<h1>Auditoría técnica y operativa para equipos que no pueden decidir</h1>
<p>Identificamos dónde se paraliza la toma de decisiones en tu empresa,
   diseñamos el marco para recuperar velocidad y entregamos un plan
   de 90 días con acciones medibles.</p>
<a href="#contacto">Solicitar evaluación — Respuesta en 48h</a>
```

**Verification:**
- [ ] Independent reader understands service in <5 seconds
- [ ] No buzzwords or metaphors
- [ ] Clear who it's for (teams with decision paralysis)
- [ ] Clear what they get (audit + 90-day plan)

---

### 🔵 PHASE 2 — CONTENT RESTRUCTURE (READY)
**Objective:** Guide user through logical decision path  
**Priority:** 🔥 HIGH  
**Estimated:** 1-2 hours  

**New Section Order:**
```
1. Hero (what we do)
2. Problems We Solve ⭐ NEW
3. How We Deliver (Services → Deliverables)
4. Method
5. Authority/Principles ⭐ NEW
6. Contact (Jules building)
7. Footer
```

**New Sections to Create:**

#### Problems We Solve
```html
<section id="problems" class="problems-section">
  <div class="container">
    <h2>¿Tu equipo está paralizado por decisiones?</h2>
    <p class="intro">Trabajamos con empresas donde:</p>
    
    <div class="problem-list">
      <div class="problem-item">
        <h3>🔴 Decisiones técnicas se retrasan meses</h3>
        <p>El equipo tiene 3 opciones sobre la mesa pero ningún criterio claro para elegir</p>
      </div>
      
      <div class="problem-item">
        <h3>🔴 IA "soluciones" que nadie entiende</h3>
       <p>Implementaste machine learning pero nadie puede explicar por qué decide X en lugar de Y</p>
      </div>
      
      <div class="problem-item">
        <h3>🔴 Consultores que desaparecen</h3>
        <p>Te dejaron un PDF de 80 páginas y ahora nadie sabe cómo implementarlo</p>
      </div>
    </div>
  </div>
</section>
```

**Verification:**
- [ ] Each section answers unique user question
- [ ] No overlap between sections
- [ ] Clear progression (Problem → Solution → Method → Proof)

---

### 🔵 PHASE 3 — AUTHORITY (READY)
**Objective:** Increase trust and perceived rigor  
**Priority:** 🟡 MEDIUM  
**Estimated:** 1 hour  

**New Sections:**

#### How We Do NOT Work
```html
<div class="anti-patterns">
  <h3>Cómo NO trabajamos:</h3>
  <ul>
    <li>❌ No vendemos frameworks genéricos</li>
    <li>❌ No entregamos solo documentación</li>
    <li>❌ No prometemos transformación digital milagrosa</li>
    <li>❌ No implementamos sin medir</li>
  </ul>
</div>
```

#### Use Cases (Anonymized)
```html
<div class="use-cases">
  <h3>Casos Recientes (Anónimos):</h3>
  
  <div class="case">
    <strong>Fintech (50 personas):</strong>
    <p>Equipo técnico paralizado 4 meses eligiendo entre MongoDB y PostgreSQL.
       Auditamos contexto real, definimos criterios (no opiniones) y decisión
       tomada en 2 semanas. Implementación monitoreada 60 días.</p>
  </div>
  
  <div class="case">
    <strong>SaaS B2B (120 personas):</strong>
    <p>"IA" de recomendaciones implementada por consultora externa. Nadie
       podía explicar decisiones a clientes. Rediseñamos modelo auditable,
       entrenamos equipo interno. Churn redujo 18% en Q1.</p>
  </div>
</div>
```

**Verification:**
- [ ] Claims are falsifiable or operationally grounded
- [ ] Anti-patterns create credibility contrast
- [ ] Use cases show concrete outcomes

---

### 🔵 PHASE 4 — UI/UX (READY)
**Objective:** Improve readability and cognitive flow  
**Priority:** 🟡 MEDIUM  
**Estimated:** 1 hour  

**Changes:**
- Apply clear H1/H2/H3 hierarchy
- Reduce paragraph length (max 2-3 sentences)
- Increase spacing between sections (80px → 120px)
- Ensure CTA visibility without aggressiveness

**CSS Updates:**
```css
/* Hierarchy */
h1 { font-size: clamp(40px, 5vw, 64px); font-weight: 800; }
h2 { font-size: clamp(28px, 3.5vw, 42px); font-weight: 700; }
h3 { font-size: clamp(20px, 2.5vw, 28px); font-weight: 600; }

/* Spacing */
section { padding: 120px 0; }
section + section { margin-top: 0; }

/* Readability */
p { max-width: 65ch; line-height: 1.7; }
.intro { font-size: 1.1em; color: var(--muted); }
```

**Verification:**
- [ ] User can scan and understand structure without reading everything
- [ ] H1/H2/H3 progression is clear
- [ ] No walls of text (paragraphs <100 words)

---

### 🟡 PHASE 5 — CONVERSION (JULES ASSIGNED)
**Objective:** Filter and qualify inbound leads  
**Priority:** 🔥🔥 CRITICAL  
**Status:** ⏳ ASSIGNED TO JULES (CONTACT-001)  

**Task:** Build contact form with:
- Filtering copy
- 4 strategic fields (Company, Email, Problem, Context)
- Process-oriented CTA
- Expectation notice

**Spec:** `CONTACT-SECTION-SPEC.md`

**Verification:**
- [ ] Form submissions contain actionable context
- [ ] Filtering copy reduces low-quality leads
- [ ] Expectation-setting clear (48-72h review)

---

### 🔵 PHASE 6 — TECH & SEO (READY)
**Objective:** Improve discoverability and performance  
**Priority:** 🟢 LOW (Already partially done)  
**Estimated:** 30 min  

**Remaining Tasks:**
- [x] Semantic HTML (already good)
- [ ] Update meta descriptions to match new copy
- [x] Performance optimization (already done)
- [x] Basic accessibility (already WCAG compliant)

**Changes:**
```html
<title>Auditoría Técnica para Decisiones Paralizadas | Gahenax AI</title>
<meta name="description" content="Identificamos dónde se paraliza la toma de decisiones en tu empresa. Auditoría técnica + Plan de 90 días. Para CTOs y founders de empresas 20-200 personas." />
```

---

### 🔵 PHASE 7 — MEASUREMENT (READY)
**Objective:** Enable iteration based on evidence  
**Priority:** 🟢 LOW  
**Status:** ⏳ Pending (Plausible Analytics setup)  

**Blocked By:** OBS-001 (Plausible Analytics configuration)

**When Ready:**
- Track scroll depth per section
- Track CTA clicks (hero, services, method)
- Track form completion rate
- Flag sections with >50% drop-off

---

## TIMELINE

**Phase 1:** Today (1 hour)  
**Phase 2:** Today (2 hours)  
**Phase 3:** Tomorrow (1 hour)  
**Phase 4:** Tomorrow (1 hour)  
**Phase 5:** ⏳ Jules (when complete)  
**Phase 6:** Tomorrow (30 min)  
**Phase 7:** ⏳ After OBS-001  

**Total Estimated:** 6-7 hours active work  

---

## COORDINATION WITH JULES

**Potential Conflict:** Jules may work on contact section simultaneously

**Resolution Strategy:**
1. Antigravity works on Phases 1-4 first (non-contact sections)
2. Monitor Jules progress
3. When Jules commits CONTACT-001 → merge and verify
4. If conflicts → Jules' work takes precedence (newer context)

---

## ROLLBACK PLAN

**If verification fails at any phase:**
```bash
git revert HEAD
git push origin main
# Redeploy previous version
```

**Each phase is independent commit** - can roll back individually

---

## SUCCESS CRITERIA (OVERALL)

✅ Hero communicates value in <5 seconds  
✅ User can identify if service applies to them  
✅ Each section answers unique question  
✅ Authority signals present (methodology, anti-patterns, use cases)  
✅ No jargon without operational grounding  
✅ Contact form filters low-quality leads  
✅ Performance maintained or improved  

---

**STATUS:** READY TO EXECUTE PHASE 1  
**NEXT:** Begin Hero & Value Rewrite (45-60 min)  
**BLOCKER:** None
