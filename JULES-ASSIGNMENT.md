# JULES ASSIGNMENT - Gahenax Webpage QA Progression

**Asignado a:** Jules (Google AI Agent)  
**Proyecto:** Gahenax AI Solutions - Sitio Web Corporativo  
**Estado Actual:** ✅ FASE 0 CERTIFICADA  
**Objetivo:** Completar FASES 1-4 bajo GAH-QA-STD-01  
**Prioridad:** ALTA  

---

## 📋 CONTEXTO

El sistema ha superado exitosamente **FASE 0 - Integridad Operativa Básica**.

**Documentación de referencia:**
- `AUDIT-REPORT-001.md` - Auditoría inicial
- `AUDIT-REPORT-001-REMEDIATION.md` - Certificación FASE 0
- `GAH-QA-STD-01.md` - Marco institucional de auditoría
- `STATUS.md` - Estado general del proyecto

**URL Producción:** https://gahenaxaisolutions.com

---

## 🎯 OBJETIVOS PRINCIPALES

### 1. COMPLETAR FASE 1 - Rendimiento y Estabilidad

**Meta:** Sistema responde de forma consistente bajo condiciones normales

**Tareas Prioritarias:**

#### PERF-001: Configurar HTTP Caching
```bash
# Archivo: .htaccess o configuración del servidor
# Objetivo: Cache-Control headers para assets estáticos

<IfModule mod_headers.c>
  # CSS/JS - 1 año
  <FilesMatch "\.(css|js)$">
    Header set Cache-Control "max-age=31536000, public"
  </FilesMatch>
  
  # Images - 1 mes
  <FilesMatch "\.(jpg|jpeg|png|gif|svg|webp)$">
    Header set Cache-Control "max-age=2592000, public"
  </FilesMatch>
  
  # Fonts - 1 año
  <FilesMatch "\.(woff|woff2|ttf|eot)$">
    Header set Cache-Control "max-age=31536000, public"
  </FilesMatch>
  
  # HTML - Sin caché
  <FilesMatch "\.(html|htm)$">
    Header set Cache-Control "no-cache, must-revalidate"
  </FilesMatch>
</IfModule>
```

**Checklist:**
- [ ] Crear archivo `.htaccess` con headers de caching
- [ ] Subir a FTP (raíz del sitio)
- [ ] Verificar headers con `curl -I https://gahenaxaisolutions.com/public/assets/css/main.css`
- [ ] Confirmar `Cache-Control` presente en respuesta

---

#### PERF-002: Implementar Font Preload
```html
<!-- En index.html <head>, después de preconnect -->
<link rel="preload" href="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff2" as="font" type="font/woff2" crossorigin>
```

**Checklist:**
- [ ] Identificar URL exacta de Inter-Regular.woff2
- [ ] Agregar `<link rel="preload">` en index.html
- [ ] Desplegar a producción
- [ ] Verificar mejora en renderizado (Lighthouse)

---

#### PERF-003: Métricas Performance Baseline
```markdown
# En archivo: PERFORMANCE-METRICS.md

## Baseline (Pre-optimización)
- First Contentful Paint (FCP): ? ms
- Largest Contentful Paint (LCP): ? ms
- Time to Interactive (TTI): ? ms
- Tamaño total página: ? KB
- Número de requests: ?

## Objetivo FASE 1
- FCP < 1.8s
- LCP < 2.5s
- TTI < 3.8s
- Tamaño < 500KB (sin imágenes)
```

**Checklist:**
- [ ] Ejecutar Lighthouse en https://gahenaxaisolutions.com
- [ ] Documentar métricas iniciales en PERFORMANCE-METRICS.md
- [ ] Establecer objetivos de mejora
- [ ] Re-ejecutar después de optimizaciones

---

### 2. COMPLETAR FASE 2 - Observabilidad y Control

**Meta:** Diagnóstico, monitoreo y toma de decisiones basadas en datos

#### OBS-001: Implementar Plausible Analytics
```html
<!-- En index.html <head>, antes de </head> -->
<script defer data-domain="gahenaxaisolutions.com" src="https://plausible.io/js/script.js"></script>
```

**Checklist:**
- [ ] Crear cuenta en Plausible.io
- [ ] Agregar dominio gahenaxaisolutions.com
- [ ] Insertar script en index.html
- [ ] Desplegar y verificar tracking
- [ ] Documentar en OWNERS.md quién monitorea

---

#### OBS-002: Configurar Sentry para Error Tracking
```html
<!-- En index.html <head> -->
<script
  src="https://browser.sentry-cdn.com/7.x.x/bundle.min.js"
  crossorigin="anonymous"
></script>
<script>
  Sentry.init({
    dsn: "YOUR_SENTRY_DSN",
    environment: "production",
    tracesSampleRate: 0.1,
  });
</script>
```

**Checklist:**
- [ ] Crear proyecto Sentry (free tier)
- [ ] Obtener DSN
- [ ] Implementar Sentry SDK
- [ ] Provocar error de prueba y verificar captura
- [ ] Configurar alertas en Sentry

---

### 3. ASSETS VISUALES (Pendiente de FASE 0)

#### VIS-001: Generar Favicon
**Herramienta sugerida:** https://realfavicongenerator.net/

**Checklist:**
- [ ] Diseñar monograma "G" o logo Gahenax (32x32px mínimo)
- [ ] Generar favicon.svg (vectorial, ideal)
- [ ] Generar favicon.png (fallback)
- [ ] Generar apple-touch-icon.png (180x180px)
- [ ] Subir archivos a raíz del sitio vía FTP
- [ ] Verificar que los links en index.html funcionen

---

#### VIS-002: Crear Open Graph Image
**Especificaciones:** 1200x630 px, JPG optimizado

**Contenido sugerido:**
```
Fondo: Degradado oscuro (--bg + --grad-hero)
Texto: "Gahenax AI Solutions"
       "Reducimos fricción. Devolvemos control."
Logo: Monograma o isotipo
```

**Checklist:**
- [ ] Diseñar og-image.jpg (Figma, Canva, o generate_image)
- [ ] Optimizar para <200KB
- [ ] Subir a raíz del sitio
- [ ] Validar con Facebook Debugger: https://developers.facebook.com/tools/debug/
- [ ] Validar con Twitter Card Validator

---

### 4. FASE 3 - Escalabilidad y Operación

#### OPS-001: Implementar GitHub Actions CI/CD
```yaml
# Archivo: .github/workflows/deploy.yml

name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Deploy via FTP
        uses: SamKirkland/FTP-Deploy-Action@4.3.0
        with:
          server: 212.1.209.105
          username: ${{ secrets.FTP_USER }}
          password: ${{ secrets.FTP_PASSWORD }}
          local-dir: ./
          server-dir: /
```

**Checklist:**
- [ ] Crear directorio `.github/workflows/`
- [ ] Crear archivo `deploy.yml`
- [ ] Configurar secrets en GitHub (FTP_USER, FTP_PASSWORD)
- [ ] Hacer test commit y verificar auto-deploy
- [ ] Documentar flujo en deploy/README.md

---

#### OPS-002: Estrategia de Rollback
**Enfoque:** Blue-Green con carpetas timestamped

```bash
# Estructura en servidor FTP:
/releases/
  /2026-02-05-001/  # Versión actual
  /2026-02-04-003/  # Versión anterior
/current -> symlink a /releases/2026-02-05-001/
```

**Checklist:**
- [ ] Modificar workflow para crear carpeta timestamped
- [ ] Implementar symlink a "current"
- [ ] Configurar servidor para servir desde /current
- [ ] Documentar procedimiento de rollback manual
- [ ] Probar rollback en test

---

### 5. FASE 4 - Calidad de Producto y Cumplimiento

#### COMP-001: Generar sitemap.xml
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://gahenaxaisolutions.com/</loc>
    <lastmod>2026-02-05</lastmod>
    <priority>1.0</priority>
  </url>
</urlset>
```

**Checklist:**
- [ ] Crear sitemap.xml
- [ ] Subir a raíz del sitio
- [ ] Registrar sitio en Google Search Console
- [ ] Enviar sitemap
- [ ] Verificar indexación

---

#### COMP-002: Auditoría de Accesibilidad WCAG
**Herramienta:** https://wave.webaim.org/

**Checklist:**
- [ ] Ejecutar WAVE en https://gahenaxaisolutions.com
- [ ] Corregir errores críticos (contraste, alt text)
- [ ] Agregar `aria-label` donde falte contexto
- [ ] Verificar navegación por teclado
- [ ] Documentar resultado en ACCESSIBILITY-REPORT.md

---

## 📊 TRACKING DE PROGRESO

**Actualizar este archivo al completar cada tarea**

### FASE 1 - Rendimiento
- [ ] PERF-001: HTTP Caching configurado
- [ ] PERF-002: Font preload implementado
- [ ] PERF-003: Métricas baseline documentadas
- [ ] **Certificación FASE 1:** [ ] PENDIENTE

### FASE 2 - Observabilidad
- [ ] OBS-001: Plausible Analytics activo
- [ ] OBS-002: Sentry configurado
- [ ] **Certificación FASE 2:** [ ] PENDIENTE

### Assets Visuales
- [ ] VIS-001: Favicon generado
- [ ] VIS-002: OG Image creada

### FASE 3 - Escalabilidad
- [ ] OPS-001: CI/CD con GitHub Actions
- [ ] OPS-002: Rollback strategy implementada
- [ ] **Certificación FASE 3:** [ ] PENDIENTE

### FASE 4 - Cumplimiento
- [ ] COMP-001: sitemap.xml generado
- [ ] COMP-002: WCAG audit completada
- [ ] **Certificación FASE 4:** [ ] PENDIENTE

---

## 🚀 CRITERIOS DE ÉXITO

**FASE 1 APROBADA si:**
- Lighthouse Performance Score > 90
- No hay consultas lentas evidentes
- Métricas documentadas muestran mejora >20%

**FASE 2 APROBADA si:**
- Analytics captura tráfico en últimas 24h
- Sentry captura errores de prueba
- Dashboards accesibles para equipo

**FASE 3 APROBADA si:**
- Deploy automático funciona en 3 commits consecutivos
- Rollback probado con éxito
- Documentación de flujos completa

**FASE 4 APROBADA si:**
- SEO score > 95
- 0 errores WCAG de alto impacto
- Sitemap indexado en Google

---

## 📝 REPORTES ESPERADOS

Al finalizar cada fase, generar:

```markdown
AUDIT-REPORT-00X-PHASE-Y.md

## FASE Y - [Nombre]
**Estado:** ✅ APROBADA / ❌ RECHAZADA
**Hallazgos:** X críticos, Y mayores, Z menores
**Métricas:**
  - Antes: ...
  - Después: ...
**Evidencia:** [Screenshots, logs, curl outputs]
```

---

## 🆘 ESCALACIÓN

**Si encuentras bloqueadores:**
1. Documentar en GitHub Issues con tag `blocked`
2. Notificar en commit message
3. Continuar con tareas no-bloqueadas

**Contacto Humano:** (pendiente de asignar en OWNERS.md)

---

**Última actualización:** 2026-02-05 04:23 UTC  
**Próxima revisión:** Al completar FASE 1 o en 48 horas

¡Éxito, Jules! 🚀
