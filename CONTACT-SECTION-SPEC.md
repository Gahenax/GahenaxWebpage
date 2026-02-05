# CONTACT SECTION OPTIMIZATION - Design Brief

**Task ID:** CONTACT-001  
**Priority:** 🔥 High  
**Assigned to:** Jules (Google AI Agent)  
**Estimated Time:** 2-3 hours  
**Status:** TODO  

---

## CONTEXT

Current state: The `#contacto` section is just a footer with static email.
Goal: Transform into a high-friction, high-signal conversion gate for qualified leads.

**Current Implementation (Lines 233-248 in index.html):**
```html
<footer id="contacto" class="footer">
  <!-- Just email contact, no form -->
</footer>
```

---

## OBJECTIVE

Create a new contact section that:
1. **Filters** unqualified leads through strategic copy
2. **Signals** selectivity and value-based response
3. **Captures** high-signal information (problem, context, company)
4. **Sets expectations** about response time and criteria

---

## NON-NEGOTIABLE RULES

✅ Incremental changes (reversible via git)  
✅ Frontend-only (no backend dependencies initially)  
✅ Maintain existing design system (colors, typography, spacing)  
✅ Mobile-responsive  
✅ Accessible (WCAG AA minimum)  
❌ DO NOT redesign entire site  
❌ DO NOT break existing sections  
❌ DO NOT introduce complex backend before validation  

---

## IMPLEMENTATION SPEC

### Phase 1: Section Structure

**Location:** Insert BEFORE current footer (around line 231)

```html
<section id="contacto" class="contact-section">
  <div class="container">
    <!-- Content here -->
  </div>
</section>

<!-- Keep existing footer as <footer> without id="contacto" -->
```

### Phase 2: Framing Copy

**Purpose:** Filter audience, set expectations

**Copy Template (adapt tone):**
```
[SECTION TITLE]
Solicitar Evaluación Estratégica

[FRAMING PARAGRAPH]
Este canal está reservado para proyectos con fricción técnica o decisional verificable.
Revisamos cada solicitud selectivamente y respondemos donde podemos aportar 
valor medible y criterio aplicado.

No es para:
- Consultas generales sobre IA
- Solicitudes de presupuesto sin contexto
- Propuestas comerciales genéricas
```

**Tone:** Professional, direct, filtering (not arrogant)

### Phase 3: Form Fields

**Strategic Fields (in order):**

1. **Empresa / Organización** (text input)
   - Label: "Empresa u Organización"
   - Placeholder: "Nombre de la empresa"
   - Required: Yes

2. **Email de Contacto** (email input)
   - Label: "Email Corporativo"
   - Placeholder: "tu@empresa.com"
   - Required: Yes
   - Validation: Email format

3. **Problema Específico** (textarea, 4-5 rows)
   - Label: "¿Qué problema específico necesitas resolver?"
   - Placeholder: "Describe el problema técnico, operativo o decisional que enfrentas. Sé específico: qué has intentado, dónde está la fricción, qué impacto tiene."
   - Required: Yes
   - Min-length: 100 characters (enforce quality)

4. **Contexto del Sistema** (textarea, 3-4 rows)
   - Label: "Contexto técnico o de negocio (opcional)"
   - Placeholder: "Tecnologías actuales, tamaño del equipo, volumen de operación, o cualquier contexto relevante"
   - Required: No

**DO NOT ADD MORE FIELDS** - Minimize friction while maximizing signal

### Phase 4: CTA Design

**Button Text Options (choose one):**
- "Solicitar Evaluación"
- "Enviar para Revisión"
- "Iniciar Análisis"

**Recommended:** "Solicitar Evaluación"

**Button Style:**
- Primary accent color (`--accent` or `--accent-2`)
- Large, prominent
- Hover state with subtle scale/shadow
- Disabled state while empty/invalid

### Phase 5: Expectation Notice

**Location:** Below CTA button

**Copy Template:**
```
Proceso de Revisión:
• Evaluamos cada solicitud en 48-72 horas hábiles
• Respondemos solo donde identificamos valor mutuo
• Si no recibes respuesta, significa que no hay alineación actual
• La falta de respuesta no implica juicio sobre tu proyecto
```

**Style:** Small text (12-14px), muted color, left-aligned

### Phase 6: Form Handling

**Implementation Options:**

**Option A (Recommended - No Backend):**
Use FormSpree or similar:
```html
<form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
  <!-- fields -->
</form>
```

**Option B (Temporary - Mailto):**
```html
<form action="mailto:contacto@gahenax.ai?subject=Solicitud%20Evaluación" 
      method="post" enctype="text/plain">
  <!-- fields -->
</form>
```

**Option C (Future - Custom Backend):**
Flag for later implementation when volume justifies it

**Choose Option A (FormSpree)** unless blocked

---

## CSS STYLING REQUIREMENTS

### Section Container
```css
.contact-section {
  background: rgba(255,255,255,0.03);
  padding: 80px 0;
  border-top: 1px solid rgba(255,255,255,0.1);
}
```

### Form Container
```css
.contact-form {
  max-width: 640px;
  margin: 0 auto;
}
```

### Input Fields
- Use existing design tokens (`--bg`, `--surface`, `--text`, `--accent`)
- Border: `1px solid rgba(255,255,255,0.12)`
- Focus state: `--accent` border glow
- Padding: `12px 16px`
- Border-radius: `8px`

### Button
- Background: `linear-gradient(90deg, var(--accent-2), var(--accent))`
- Padding: `14px 32px`
- Border-radius: `8px`
- Font-weight: 600
- Hover: `transform: translateY(-2px); box-shadow: ...`

### Responsive
- Mobile: Single column, full-width inputs
- Desktop: Maintain max-width 640px center

---

## VERIFICATION CHECKLIST

**Before Commit:**
- [ ] Section renders correctly on desktop (1920px, 1440px, 1280px)
- [ ] Section renders correctly on mobile (375px, 414px)
- [ ] All inputs are keyboard accessible (tab order)
- [ ] Focus states visible on all interactive elements
- [ ] Form submits correctly (test with real submission)
- [ ] Validation works (required fields, email format)
- [ ] Copy is grammatically correct (Spanish)
- [ ] No console errors
- [ ] No layout shifts on other sections
- [ ] Footer still renders correctly below

**Accessibility:**
- [ ] Form labels properly associated with inputs
- [ ] Error states have `aria-invalid` and `aria-describedby`
- [ ] Button has proper semantic markup
- [ ] Contrast ratios meet WCAG AA (4.5:1 text, 3:1 UI)

---

## FILES TO MODIFY

1. **index.html**
   - Insert new `<section id="contacto">` before `<footer>` (line ~231)
   - Remove `id="contacto"` from footer element
   - Add form HTML with all fields

2. **public/assets/css/04-components.css**
   - Add `.contact-section` styles
   - Add `.contact-form` styles
   - Add `.form-group`, `.input`, `.textarea`, `.btn-submit` styles
   - Add `.expectation-notice` styles

3. **Optional: public/assets/css/pages/contact.css**
   - If contact-specific styles grow large, create separate file

---

## SUCCESS CRITERIA

**Functional:**
✅ Form submits successfully  
✅ User receives confirmation (if using FormSpree)  
✅ Email arrives at contacto@gahenax.ai  

**UX:**
✅ Copy filters and sets expectations clearly  
✅ Fields guide user input (good placeholders)  
✅ CTA is process-oriented, not generic  
✅ Expectation notice reduces anxiety  

**Technical:**
✅ No regressions on other sections  
✅ Mobile responsive  
✅ Accessible  
✅ Performance (no heavy deps)  

**Business:**
✅ Reduces low-quality leads  
✅ Increases signal-to-noise ratio  
✅ Sets clear filtering criteria  

---

## ROLLBACK PLAN

If something breaks:
```bash
git revert HEAD
git push origin main
# FTP re-deploy previous version
```

---

## EXAMPLE HTML OUTPUT

```html
<section id="contacto" class="contact-section">
  <div class="container">
    <h2 class="section-title">Solicitar Evaluación Estratégica</h2>
    
    <div class="contact-intro">
      <p>
        Este canal está reservado para proyectos con fricción técnica 
        o decisional verificable. Revisamos cada solicitud selectivamente 
        y respondemos donde podemos aportar valor medible.
      </p>
      <p class="filter-notice">
        <strong>No es para:</strong> Consultas generales sobre IA, 
        solicitudes de presupuesto sin contexto, o propuestas comerciales genéricas.
      </p>
    </div>
    
    <form class="contact-form" action="https://formspree.io/f/YOUR_ID" method="POST">
      
      <div class="form-group">
        <label for="company">Empresa u Organización</label>
        <input type="text" id="company" name="company" 
               placeholder="Nombre de la empresa" required>
      </div>
      
      <div class="form-group">
        <label for="email">Email Corporativo</label>
        <input type="email" id="email" name="email" 
               placeholder="tu@empresa.com" required>
      </div>
      
      <div class="form-group">
        <label for="problem">¿Qué problema específico necesitas resolver?</label>
        <textarea id="problem" name="problem" rows="5" 
                  placeholder="Describe el problema técnico, operativo o decisional que enfrentas..." 
                  required minlength="100"></textarea>
        <small class="char-count">Mínimo 100 caracteres</small>
      </div>
      
      <div class="form-group">
        <label for="context">Contexto técnico o de negocio (opcional)</label>
        <textarea id="context" name="context" rows="4" 
                  placeholder="Tecnologías actuales, tamaño del equipo, volumen de operación..."></textarea>
      </div>
      
      <button type="submit" class="btn btn-submit">
        Solicitar Evaluación
      </button>
      
      <div class="expectation-notice">
        <strong>Proceso de Revisión:</strong>
        <ul>
          <li>Evaluamos cada solicitud en 48-72 horas hábiles</li>
          <li>Respondemos solo donde identificamos valor mutuo</li>
          <li>Si no recibes respuesta, significa que no hay alineación actual</li>
        </ul>
      </div>
      
    </form>
  </div>
</section>

<footer class="footer">
  <!-- Existing footer without id="contacto" -->
</footer>
```

---

## NOTES FOR JULES

**FormSpree Setup (if using Option A):**
1. Go to https://formspree.io/
2. Create free account
3. Add form for contacto@gahenax.ai
4. Copy form ID (looks like `mpwaaabbb`)
5. Use in action: `https://formspree.io/f/mpwaaabbb`

**Alternative:** If FormSpree blocked, use mailto: temporarily and flag for backend implementation later.

---

## TIMELINE

**Estimated:** 2-3 hours  
**Breakdown:**
- HTML Structure: 30 min
- CSS Styling: 60 min
- Form Integration: 30 min
- Testing & QA: 30-60 min

**Deadline:** No hard deadline, quality over speed

---

## REFERENCES

- Existing design system: `public/assets/css/00-tokens.css`
- Component patterns: `public/assets/css/04-components.css`
- Current site: https://gahenaxaisolutions.com

---

**STATUS:** Ready for implementation  
**BLOCKED BY:** None  
**NEXT:** Jules to execute following this spec
