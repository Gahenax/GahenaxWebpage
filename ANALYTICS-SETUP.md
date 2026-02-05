# ANALYTICS SETUP - Plausible.io

**Task:** OBS-001 - Implementar analítica con privacidad  
**Tool:** Plausible Analytics (GDPR-compliant, no cookies)  
**Status:** Configuración pendiente de cuenta

---

## Setup Instructions

### 1. Crear Cuenta Plausible

**URL:** https://plausible.io/register

**Plan Options:**
- Free Trial: 30 días
- Starter: $9/mes (10k pageviews)
- Growth: $19/mes (100k pageviews)

### 2. Agregar Dominio

1. Login → Add Website
2. Domain: `gahenaxaisolutions.com`
3. Timezone: `America/Bogota` (Colombia)
4. Copy script snippet

### 3. Implementar Script

**Location:** `index.html` antes de `</head>`

```html
<!-- Plausible Analytics -->
<script defer data-domain="gahenaxaisolutions.com" src="https://plausible.io/js/script.js"></script>
```

**Alternative (self-hosted):**
Si prefieres self-host en tu servidor:
```html
<script defer data-domain="gahenaxaisolutions.com" src="https://your-domain.com/js/script.js"></script>
```

### 4. Verificar Tracking

1. Deploy script to production
2. Visit https://gahenaxaisolutions.com
3. Check Plausible dashboard (Real-time visitors)
4. Confirm event appears

---

## Configuration Options

### Custom Events (Optional)

Track specific actions:

```html
<script>
  // Track CTA clicks
  document.querySelector('.btn-primary').addEventListener('click', function() {
    plausible('CTA Click', {props: {location: 'hero'}});
  });
  
  // Track section views
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        plausible('Section View', {props: {section: entry.target.id}});
      }
    });
  });
  
  document.querySelectorAll('section[id]').forEach(section => {
    observer.observe(section);
  });
</script>
```

### Goals to Track

Set up in Plausible Dashboard:
- CTA clicks (#contacto link)
- Email clicks (contacto@gahenax.ai)
- Section navigation (servicios, metodo)
- Outbound links (if any)

---

## Privacy & GDPR Compliance

✅ **No cookies** - fully GDPR compliant  
✅ **No personal data** collected  
✅ **Lightweight** - <1KB script  
✅ **Privacy-focused** - no tracking across sites  

**No cookie banner required** with Plausible!

---

## Alternative: Google Analytics 4

If you prefer GA4 instead:

```html
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

**Note:** GA4 requires cookie consent banner in EU.

---

## Current Status

- [ ] Plausible account created
- [ ] Domain added to Plausible
- [ ] Script snippet obtained
- [ ] Script added to index.html
- [ ] Deployment to production
- [ ] Verification of tracking
- [ ] Goals configured
- [ ] OWNERS.md updated with analytics owner

**Blocked by:** Need to create Plausible account (requires email/payment)

**Next Steps:**
1. Create account at https://plausible.io
2. Get script snippet
3. Add to index.html
4. Deploy and verify

---

## Monitoring Access

**Dashboard:** https://plausible.io/gahenaxaisolutions.com

**Shared Access:**
- Can be shared with team (email-based)
- No seat limits on most plans
- Read-only access available

**Assign Owner:** Update in OWNERS.md once deployed
