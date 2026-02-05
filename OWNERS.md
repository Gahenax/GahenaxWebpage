# OWNERS - Responsables del Sistema

**Sistema:** Gahenax AI Solutions - Sitio Web Corporativo  
**Última actualización:** 2026-02-05

---

## Matriz de Responsabilidades

### Propiedad General
- **Product Owner:** Gahenax Leadership
- **Technical Lead:** A definir
- **Deployment Manager:** A definir

### Por Componente

| Componente | Responsable | Backup | Contacto |
|------------|-------------|--------|----------|
| Frontend (HTML/CSS) | Technical Lead | - | TBD |
| Arquitectura CSS | Technical Lead | - | TBD |
| Deployment (FTP/CI) | Deployment Manager | - | TBD |
| Contenido | Product Owner | - | contacto@gahenax.ai |
| Monitoreo | Deployment Manager | - | TBD |

### Escalación de Incidentes

**Nivel 1 - Operacional** (< 1 hora)
- CSS roto, links rotos, typos
- **Responsable:** Deployment Manager

**Nivel 2 - Funcional** (< 4 horas)
- Sitio caído, HTTPS roto, performance crítica
- **Responsable:** Technical Lead

**Nivel 3 - Estratégico** (< 24 horas)
- Brecha de seguridad, pérdida de datos, crisis reputacional
- **Responsable:** Product Owner

### Flujos de Trabajo

#### Deployment a Producción
1. **Autor:** Realiza cambios en branch feature/*
2. **Revisor:** Technical Lead aprueba PR
3. **Deployment:** Deployment Manager ejecuta deploy
4. **Verificación:** Deployment Manager confirma en producción

#### Hotfix Crítico
1. **Autor:** Crea branch hotfix/* desde main
2. **Deployment:** Deploy Manager ejecuta inmediatamente
3. **Notificación:** Aviso a Product Owner post-deploy

---

## Notas

- Este documento debe actualizarse al asignar personas reales a roles
- Los contactos deben incluir email + Slack/WhatsApp para emergencias
- Se recomienda rotación de Backup cada 3 meses

---

**Estado:** ⚠️ PLANTILLA - Requiere asignación de personas
