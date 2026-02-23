# Configuración de Tailwind CSS - Guía de Referencia

## ✅ Estado de Instalación

Tailwind CSS ya está instalado en tu proyecto. Aquí hay un resumen de la configuración:

### Dependencias instaladas:
```json
{
  "tailwindcss": "^2.0.0",
  "postcss": "^8.0.0",
  "autoprefixer": "^10.0.0"
}
```

### Archivos de configuración:
- ✓ `tailwind.config.js` - Configuración principal
- ✓ `postcss.config.js` - Procesamiento de estilos
- ✓ `src/styles/index.css` - Directivas y clases base

---

## 🎨 Clases Base Disponibles

### Botones
```html
<!-- Variantes -->
<button class="btn btn-primary">Primario</button>
<button class="btn btn-secondary">Secundario</button>
<button class="btn btn-danger">Peligro</button>
<button class="btn btn-success">Éxito</button>

<!-- Tamaños -->
<button class="btn btn-primary btn-small">Pequeño</button>
<button class="btn btn-primary">Normal</button>
<button class="btn btn-primary btn-large">Grande</button>

<!-- Estados -->
<button class="btn btn-primary" disabled>Deshabilitado</button>
```

### Fondos
```html
<!-- Colores sólidos -->
<div class="bg-light">Fondo claro</div>
<div class="bg-darker text-white">Fondo oscuro</div>

<!-- Gradientes -->
<div class="bg-gradient-primary text-white">Gradiente primario</div>
```

### Tarjetas
```html
<div class="card">
  <div class="card-header">
    <h3>Encabezado</h3>
  </div>
  <div class="card-body">
    Contenido principal
  </div>
  <div class="card-footer">
    Pie de página
  </div>
</div>
```

### Inputs
```html
<input class="input" type="text" placeholder="Normal" />
<input class="input input-error" type="email" placeholder="Con error" />
<input class="input" type="text" disabled />
```

### Badges
```html
<span class="badge badge-primary">Primario</span>
<span class="badge badge-success">Éxito</span>
<span class="badge badge-warning">Advertencia</span>
<span class="badge badge-danger">Peligro</span>
```

### Alertas
```html
<div class="alert alert-info">Información</div>
<div class="alert alert-success">Éxito</div>
<div class="alert alert-warning">Advertencia</div>
<div class="alert alert-danger">Error</div>
```

---

## 🎯 Color Primario Personalizado

Se agregó una paleta de colores primarios personalizados:

```javascript
colors: {
  primary: {
    50: '#f0f9ff',   // Muy claro
    100: '#e0f2fe',
    200: '#bae6fd',
    300: '#7dd3fc',
    400: '#38bdf8',
    500: '#0ea5e9',  // Color base
    600: '#0284c7',
    700: '#0369a1',
    800: '#075985',
    900: '#0c3d66',  // Muy oscuro
  }
}
```

**Uso:** `bg-primary-600`, `text-primary-500`, `border-primary-700`, etc.

---

## 🚀 Comandos Útiles

```bash
# Iniciar servidor de desarrollo
npm run dev

# Compilar para producción
npm run build

# Ver vista previa de producción
npm run serve
```

---

## 📁 Estructura de Archivos

```
frontend/
├── tailwind.config.js          # Configuración de Tailwind
├── postcss.config.js           # Configuración de PostCSS
├── src/
│   ├── styles/
│   │   └── index.css           # Directivas y clases base
│   └── components/
│       └── common/
│           └── Examples.jsx    # Ejemplos de componentes
```

---

## 💡 Tips y Mejores Prácticas

### 1. Usar clases utilitarias
```jsx
// ✓ Recomendado
<div className="flex gap-4 items-center">

// ✗ Evitar
<div style={{display: 'flex', gap: '16px', alignItems: 'center'}}>
```

### 2. Responsive classes
```jsx
// Mobile first
<div className="text-sm md:text-base lg:text-lg">
  Texto que cambia de tamaño
</div>
```

### 3. Estados con hover y focus
```jsx
<button className="btn btn-primary hover:bg-primary-700 focus:ring-2">
  Click me
</button>
```

### 4. Componentes reutilizables
```jsx
function PrimaryButton({children, ...props}) {
  return <button className="btn btn-primary" {...props}>{children}</button>
}
```

### 5. Extender la configuración
Edita `tailwind.config.js` para agregar nuevos colores, fuentes, etc.

---

## 🔗 Recursos Útiles

- [Documentación oficial de Tailwind CSS](https://tailwindcss.com/docs)
- [Tailwind UI Components](https://tailwindui.com/)
- [Playground de Tailwind](https://play.tailwindcss.com/)
- [Utilidades de Tailwind](https://tailwindcss.com/docs/utility-first)

---

## 📝 Notas

- Tailwind solo incluye los estilos que usas gracias a la purificación de CSS
- Los estilos se procesan automáticamente con PostCSS
- Es compatible con Vite y React
- Se pueden agregar más colores, fuentes y temas en `tailwind.config.js`

