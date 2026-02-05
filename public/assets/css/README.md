# Gahenax Webpage - CSS Architecture

## 📐 Arquitectura CSS Modular (ITCSS Pattern)

Este proyecto utiliza una arquitectura CSS modular basada en el patrón **ITCSS** (Inverted Triangle CSS) para máxima escalabilidad y mantenibilidad.

## 📁 Estructura de Archivos

```
/public/assets/css/
├── main.css                # 🔸 Punto de entrada (solo @import)
├── 00-tokens.css           # 🎨 Design tokens: colores, tipografía, espaciado
├── 01-reset.css            # 🔄 Reset moderno + accesibilidad base
├── 02-base.css             # 📝 Estilos base: html, body, links
├── 03-layout.css           # 📐 Grid, containers, primitivas espaciales
├── 04-components.css       # 🧩 Componentes reutilizables
├── 05-utilities.css        # 🛠️ Helpers y clases de utilidad
├── 06-motion.css           # ✨ Transiciones y animaciones
├── 07-themes.css           # 🌓 Variantes de tema (dark/light/high-contrast)
└── pages/
    ├── home.css            # 🏠 Estilos específicos de la página home
    └── apps.css            # (futuro) Estilos para páginas de aplicaciones
```

## 🎯 Filosofía del Sistema

### 1. **00-tokens.css** - Design Tokens
Variables CSS (custom properties) que definen todo el sistema de diseño:
- Colores de marca (purple, green)
- Paleta base (bg, panel, text, muted)
- Espaciado (--space-xs hasta --space-6xl)
- Tipografía (tamaños, pesos, line-heights)
- Radios, sombras, transiciones

**Uso:**
```css
.mi-elemento {
  padding: var(--space-lg);
  color: var(--purple);
  border-radius: var(--radius-lg);
}
```

### 2. **01-reset.css** - Reset Moderno
Reset CSS moderno con:
- Box-sizing universal
- Eliminación de márgenes/paddings predeterminados
- Accesibilidad: focus-visible, screen-reader-only
- Smooth scroll behavior

### 3. **02-base.css** - Estilos Base
Estilos para elementos HTML semánticos:
- Body con gradientes de fondo
- Links con transiciones
- Headings (h1-h6) con tipografía consistente

### 4. **03-layout.css** - Layout System
Sistema de layout con:
- `.container` - Contenedor responsivo con max-width
- `.grid`, `.grid-2`, `.grid-3`, `.grid-4` - Sistemas de grid
- `.flex`, `.flex-col` - Flexbox utilities
- `.stack`, `.stack-sm`, `.stack-xl` - Vertical rhythm

### 5. **04-components.css** - Componentes
Componentes reutilizables:

#### Header & Navigation
- `.header` - Header sticky con glassmorphism
- `.nav`, `.nav-links` - Navegación
- `.brand`, `.brand-highlight`

#### Botones
- `.btn` - Botón base
- `.btn-primary` - Botón principal con gradiente
- `.btn-secondary` - Botón secundario

#### Cards
- `.card` - Tarjeta base con hover effect
- `.card-title` - Título de la tarjeta
- `.card-body` - Cuerpo de texto

#### Process Steps
- `.step` - Paso del proceso
- `.step-number` - Número del paso
- `.step-title` - Título del paso
- `.step-desc` - Descripción del paso

#### Badges
- `.badge` - Badge base
- `.badge-purple`, `.badge-green` - Variantes de color

#### Footer
- `.footer` - Footer con borde superior
- `.footer-grid` - Grid del footer
- `.footer-brand` - Marca en el footer

#### Forms
- `.form-group`, `.form-label`
- `.form-input`, `.form-textarea`

### 6. **05-utilities.css** - Utilidades
Clases de ayuda:

#### Texto
- `.text-gradient` - Texto con gradiente
- `.text-muted`, `.text-purple`, `.text-green`
- `.text-center`, `.text-left`, `.text-right`
- `.font-light` hasta `.font-black`

#### Glassmorphism
- `.glass` - Efecto glass sutil
- `.glass-heavy` - Efecto glass intenso

#### Espaciado
- `.m-0`, `.mt-xs`, `.mb-lg` - Márgenes
- `.p-0`, `.p-sm`, `.p-xl` - Paddings

#### Width & Display
- `.w-full`, `.max-w-sm`, `.max-w-lg`
- `.hidden`, `.block`, `.flex`, `.grid`

#### Borders & Shadows
- `.rounded-sm` hasta `.rounded-full`
- `.shadow-sm` hasta `.shadow-lg`

### 7. **06-motion.css** - Animaciones
Animaciones y transiciones:

#### Keyframes
- `fadeIn`, `fadeInUp`, `fadeInDown`
- `slideInLeft`, `slideInRight`
- `pulse`, `spin`, `shimmer`

#### Clases de animación
- `.animate-fade-in`, `.animate-fade-in-up`
- `.animate-pulse`, `.animate-spin`

#### Efectos hover
- `.hover-lift` - Elevación al hover
- `.hover-scale` - Escala al hover
- `.hover-glow-purple`, `.hover-glow-green`

#### Transiciones
- `.transition-all`, `.transition-colors`
- `.transition-transform`, `.transition-opacity`

**Nota:** Respeta `prefers-reduced-motion` para accesibilidad.

### 8. **07-themes.css** - Temas
Sistema de temas (dark por defecto, preparado para light/high-contrast).

### 9. **pages/home.css** - Página Home
Estilos específicos de la página principal:
- `.hero`, `.hero-grid`
- `.hero-description`
- `.hero-cards`
- `.mission-vision`

## 🚀 Uso

### En HTML
```html
<link rel="stylesheet" href="./public/assets/css/main.css">
```

### Ejemplo de componente
```html
<div class="card hover-lift">
  <h3 class="card-title">Título</h3>
  <p class="card-body text-muted">Descripción...</p>
</div>
```

## 📱 Responsive Design
El sistema es **mobile-first** con breakpoints:
- **480px** - Móviles pequeños
- **900px** - Tablets
- **1024px** - Tablets grandes / Laptops pequeños
- **1280px** - Desktops (max-width del container)

## 🎨 Sistema de Colores

### Colores de Marca
- **Purple** (`#6d4aff`) - Estrategia, criterio
- **Green** (`#23e6a8`) - Optimización, lógica viva

### Paleta Base
- **Background** (`#050507`) - Negro profundo
- **Panel** (`#0b0c10`) - Negro técnico
- **Text** (`#e6e6eb`) - Blanco suave
- **Muted** (`#9aa0a6`) - Gris técnico

## ✨ Características

✅ **Modular** - Cada capa tiene una responsabilidad específica  
✅ **Escalable** - Fácil agregar nuevos componentes y páginas  
✅ **Mantenible** - Cambios en tokens se propagan automáticamente  
✅ **Accesible** - Focus states, reduced motion, semantic HTML  
✅ **Performante** - CSS optimizado, transiciones GPU-accelerated  
✅ **Responsive** - Mobile-first con breakpoints consistentes  

## 🔄 Agregar Nuevos Componentes

1. Define el componente en `04-components.css`
2. Usa tokens de `00-tokens.css` para valores
3. Aplica clases de `05-utilities.css` cuando sea necesario
4. Agrega animaciones de `06-motion.css` si corresponde

## 📝 Convenciones

- **Nombres de clases:** kebab-case (`.hero-grid`)
- **BEM parcial:** `.component`, `.component-element`, `.component--modifier`
- **Tokens:** `--nombre-descriptivo` (variables CSS)
- **Comentarios:** Secciones claramente marcadas

## 🔮 Futuro

- [ ] Agregar modo light en `07-themes.css`
- [ ] Crear `pages/apps.css` para páginas de aplicaciones
- [ ] Implementar más componentes (modales, tooltips, etc.)
- [ ] Optimizar con PostCSS/Autoprefixer
- [ ] Generar versión minificada para producción

---

**Gahenax AI Solutions** - Ingeniería cognitiva aplicada a sistemas reales
