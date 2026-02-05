# ANTIGRAVITY REFACTOR - DIAGNOSTIC REPORT

**Project:** gahenaxaisolutions.com  
**Mission:** Correct clarity, UX, authority and conversion issues  
**Mode:** Deterministic refactor with evidence-based validation  
**Date:** 2026-02-05 12:27 UTC  
**Auditor:** An

tigravity Senior UX/Authority Engineer  

---

## PHASE 0 — DIAGNOSTIC

### Current Site Structure

**Sections Identified:**
1. Hero (Lines 118-145)
2. Value Props Cards (Lines 148-167)
3. Servicios (Lines 172-203)
4. Método (Lines 205-230)
5. Footer/Contacto (Lines 233-248)

---

### FRICTION ANALYSIS PER SECTION

#### 1. HERO SECTION (CRITICAL ISSUES)

**Current Copy:**
```
H1: "Reducimos fricción. Devolvemos control."
P: "Gahenax AI Solutions diseña auditorías, planes de mejora y sistemas de inteligencia
    artificial a medida para organizaciones que necesitan claridad decisional,
    no promesas vacías."
CTA: "Solicitar auditoría estratégica"
```

**Frictions Identified:**

🔴 **FRICTION-H01: Abstract Mantra Without Context**
- **Issue:** "Reducimos fricción. Devolvemos control." doesn't answer WHAT or FOR WHOM
- **Impact:** User doesn't know what service this is in <3 seconds
- **Evidence:** Mantra requires cognitive translation (friction ≠ what kind?)
- **Fix Required:** Replace with explicit value proposition

🔴 **FRICTION-H02: Jargon-Heavy Description**
-  **Issue:** "claridad decisional", "fricción decisional" are consultant-speak
- **Impact:** Non-specialist founders/CTOs need to pause to parse meaning
- **Evidence:** Technical jargon without operational grounding
- **Fix Required:** Use concrete language (e.g., "when your team can't decide X because Y")

🟡 **FRICTION-H03: Mission/Vision Blocks in Hero**
- **Issue:** Mission/Vision statements dilute hero message
- **Impact:** User has to read 100+ words before understanding value
- **Evidence:** Corporate fluff competes with core proposition
- **Fix Required:** Move to "About" section or remove entirely

🟡 **FRICTION-H04: Vague CTA**
- **Issue:** "Solicitar auditoría estratégica" doesn't set expectations
- **Impact:** User doesn't know what happens next (call? form? quote?)
- **Evidence:** Process-oriented but not transparent
- **Fix Required:** Add context ("Solicitar evaluación — 48h response")

---

#### 2. VALUE PROPS CARDS (MODERATE ISSUES)

**Current Cards:**
```
- Decisiones con criterio
- IA sin cajas negras
- Impacto medible
- Acompañamiento real
```

**Frictions Identified:**

🟡 **FRICTION-V01: Features vs Benefits**
- **Issue:** Cards describe features ("IA sin cajas negras"), not client outcomes
- **Impact:** User can't map to their problem
- **Evidence:** "Comprensibles, auditables" answers HOW, not WHAT RESULT
- **Fix Required:** Reframe as problems solved

🟡 **FRICTION-V02: No Hierarchy**
- **Issue:** 4 equal-weight cards, no prioritization
- **Impact:** User doesn't know which is most relevant
- **Evidence:** Visual parity suggests equal importance
- **Fix Required:** Lead with primary pain point

---

#### 3. SERVICIOS SECTION (CRITICAL ISSUES)

**Current Services:**
```
- Auditoría Estratégica
- Plan de Mejora
- IA a Medida
```

**Frictions Identified:**

🔴 **FRICTION-S01: Service Names Without Context**
- **Issue:** "Auditoría Estratégica" requires user to infer WHAT is audited
- **Impact:** Founder doesn't know if this applies to their situation
- **Evidence:** "diagnóstico profundo" is vague (deep diagnosis of what?)
- **Fix Required:** Add explicit scope ("Auditoría de Decisiones Técnicas y Operativas")

🔴 **FRICTION-S02: No Deliverables Mentioned**
- **Issue:** User doesn't know WHAT they receive (report? roadmap? implementation?)
- **Impact:** Can't evaluate ROI or feasibility
- **Evidence:** "traducción del diagnóstico en acciones" is abstract
- **Fix Required:** List concrete outputs (e.g., "48-page decision audit + 90-day roadmap")

🟡 **FRICTION-S03: No Price Anchoring**
- **Issue:** No indication of investment scale (€5k? €50k? €500k?)
- **Impact:** Unqualified leads (too small or too large) apply
- **Evidence:** Zero filtering on budget/fit
- **Fix Required:** Add investment range or qualifying language

---

#### 4. MÉTODO SECTION (MINOR ISSUES)

**Current Method:**
```
01. Lectura del sistema
02. Reducción de ruido
03. Diseño de control
04. Monitoreo
```

**Frictions Identified:**

🟢 **FRICTION-M01: Steps Too Abstract**
- **Issue:** "Reducción de ruido" doesn't explain HOW
- **Impact:** Client can't visualize process
- **Evidence:** Each step one sentence, no operational detail
- **Fix Required:** Add 1-2 sentence explanation per step

---

#### 5. CONTACT SECTION (CRITICAL — ALREADY FLAGGED)

**Current State:**
```html
<footer id="contacto">
  <div>contacto@gahenax.ai</div>
</footer>
```

**Frictions Identified:**

🔴 **FRICTION-C01: No Form (Jules is building this)**
- **Issue:** Email-only contact requires user to compose message
- **Impact:** Low conversion, unqualified leads
- **Evidence:** No filtering or expectation-setting
- **Fix Required:** ✅ ASSIGNED TO JULES (CONTACT-001)

---

## DECLARED PRIMARY ICP

**Based on Copy Analysis:**

**Who:** Technical Decision Makers in mid-market companies
- Founders/CTOs of 20-200 person companies
- Experiencing operational or technical decision paralysis
- Budget: €20k-€200k range (inferred from scope)

**Pain Points Inferred:**
- Too many options, no clear decision criteria
- Black-box AI solutions that can't be audited
- Consultants who deliver PDFs and disappear
- Need measurable outcomes, not generic advice

**Language They Understand:**
- Operational (not strategic fluff)
- Technical but not academic
- ROI-focused
- Process-explicit

---

## FRICTION SUMMARY

| Priority | Count | Sections Affected |
|----------|-------|-------------------|
| 🔴 Critical | 5 | Hero, Services, Contact |
| 🟡 Moderate | 5 | Hero, Value Props, Services |
| 🟢 Minor | 1 | Method |

**Total Frictions:** 11

---

## VERIFICATION ✅

- [x] Each section mapped with at least one concrete friction
- [x] Primary ICP declared (Founder/CTO, mid-market, decision paralysis)
- [x] Frictions categorized by severity
- [x] Evidence-based (no speculation)

---

## NEXT PHASE

**PHASE 1 — HERO & VALUE REWRITE**

**Focus:** Fix FRICTION-H01, H02, H04
**Time Estimate:** 45-60 minutes
**Files to Modify:** index.html (lines 121-127)

---

**STATUS:** PHASE 0 COMPLETE ✅  
**BLOCKER:** None  
**READY FOR:** Phase 1 execution
