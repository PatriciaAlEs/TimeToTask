# Sistema de Estilos Base - Dashboard

Documentación completa del sistema de estilos base con Tailwind CSS para un dashboard profesional.

---

## 📋 Índice

1. [Botones](#botones)
2. [Inputs y Formularios](#inputs-y-formularios)
3. [Cards/Tarjetas](#cardstarjetas)
4. [Layout y Grid](#layout-y-grid)
5. [Componentes Adicionales](#componentes-adicionales)
6. [Mejores Prácticas](#mejores-prácticas)

---

## 🔘 Botones

### Variantes

```jsx
import { Button, ButtonPrimary, ButtonSecondary, ButtonDanger, ButtonSuccess } from '@/components/common/Buttons';

// Variantes específicas
<ButtonPrimary>Primario</ButtonPrimary>
<ButtonSecondary>Secundario</ButtonSecondary>
<ButtonDanger>Peligro</ButtonDanger>
<ButtonSuccess>Éxito</ButtonSuccess>

// Botón genérico con prop variant
<Button variant="primary">Primario</Button>
<Button variant="danger">Peligro</Button>
<Button variant="outline-primary">Outline</Button>
```

### Tamaños

```jsx
<ButtonPrimary size="sm">Pequeño</ButtonPrimary>    {/* py-1 px-3 text-sm */}
<ButtonPrimary size="md">Mediano</ButtonPrimary>    {/* py-2 px-4 - default */}
<ButtonPrimary size="lg">Grande</ButtonPrimary>      {/* py-3 px-6 text-lg */}
```

### Propiedades

```jsx
// fullWidth - Ancho completo
<ButtonPrimary fullWidth>Ancho Completo</ButtonPrimary>

// disabled - Estado deshabilitado
<ButtonPrimary disabled>Deshabilitado</ButtonPrimary>

// onClick y otros props
<ButtonPrimary onClick={() => console.log('Click')}>
  Haz click
</ButtonPrimary>
```

### Clases CSS directas (sin componente)

```html
<!-- Variantes -->
<button class="btn btn-primary">Primario</button>
<button class="btn btn-secondary">Secundario</button>
<button class="btn btn-danger">Peligro</button>
<button class="btn btn-success">Éxito</button>

<!-- Outline -->
<button class="btn btn-outline-primary">Outline Primario</button>

<!-- Tamaños -->
<button class="btn btn-primary btn-sm">Pequeño</button>
<button class="btn btn-primary btn-lg">Grande</button>

<!-- Ancho completo -->
<button class="btn btn-primary btn-block">Ancho Completo</button>
```

---

## 📝 Inputs y Formularios

### Input Básico

```jsx
import { Input, Textarea, Select, Checkbox, Radio, Form } from '@/components/common/Inputs';

<Input
  id="username"
  label="Usuario"
  placeholder="Ingresa tu usuario"
  required
  helpText="Texto de ayuda"
/>
```

### Input con Estados

```jsx
{/* Normal */}
<Input id="field1" label="Normal" />

{/* Error */}
<Input
  id="field2"
  label="Con Error"
  error
  helpText="Este campo tiene error"
/>

{/* Éxito */}
<Input
  id="field3"
  label="Con Éxito"
  success
  helpText="Campo válido"
/>

{/* Deshabilitado */}
<Input
  id="field4"
  label="Deshabilitado"
  disabled
  value="No editable"
/>
```

### Tipos de Input

```jsx
<Input type="text" label="Texto" />
<Input type="email" label="Email" />
<Input type="password" label="Contraseña" />
<Input type="number" label="Número" />
<Input type="date" label="Fecha" />
<Input type="file" label="Archivo" />
```

### Textarea

```jsx
<Textarea
  id="description"
  label="Descripción"
  placeholder="Escribe aquí..."
  rows={5}
  helpText="Máximo 500 caracteres"
/>
```

### Select

```jsx
<Select
  id="category"
  label="Categoría"
  options={[
    { value: 'cat1', label: 'Categoría 1' },
    { value: 'cat2', label: 'Categoría 2' },
  ]}
  required
/>
```

### Checkbox y Radio

```jsx
<Checkbox
  id="terms"
  label="Acepto los términos y condiciones"
  helpText="Debes aceptar para continuar"
/>

<Radio
  id="option1"
  label="Opción 1"
  name="options"
  value="opt1"
/>
```

### Formulario Completo

```jsx
import { Form, Input, Textarea, Button } from '@/components/common/Inputs';
import { ButtonPrimary, ButtonSecondary } from '@/components/common/Buttons';

<Form onSubmit={(e) => { e.preventDefault(); /* Procesar */ }}>
  <Input id="name" label="Nombre" required />
  <Input id="email" label="Email" type="email" required />
  <Textarea id="message" label="Mensaje" />
  
  <div className="flex gap-3">
    <ButtonPrimary type="submit">Enviar</ButtonPrimary>
    <ButtonSecondary type="button">Cancelar</ButtonSecondary>
  </div>
</Form>
```

---

## 🎴 Cards/Tarjetas

### Card Básica

```jsx
import { Card, CardHeader, CardTitle, CardBody, CardFooter } from '@/components/common/Cards';

<Card>
  <CardHeader>
    <CardTitle>Título de la Tarjeta</CardTitle>
  </CardHeader>
  <CardBody>
    Contenido principal
  </CardBody>
  <CardFooter>
    <button>Acción</button>
  </CardFooter>
</Card>
```

### SimpleCard (Composición Rápida)

```jsx
import { SimpleCard } from '@/components/common/Cards';

<SimpleCard
  title="Mi Tarjeta"
  footer={<button className="btn btn-primary btn-sm">Aceptar</button>}
>
  Contenido de la tarjeta
</SimpleCard>
```

### Variantes de Card

```jsx
{/* Default */}
<Card>...</Card>

{/* Primary */}
<Card variant="primary">...</Card>

{/* Danger */}
<Card variant="danger">...</Card>

{/* Success */}
<Card variant="success">...</Card>

{/* Warning */}
<Card variant="warning">...</Card>
```

### Tamaños de Padding

```jsx
<Card padding="compact">...</Card>   {/* p-4 */}
<Card padding="default">...</Card>   {/* p-6 */}
<Card padding="spacious">...</Card>  {/* p-8 */}
```

### StatsCard (Estadísticas)

```jsx
import { StatsCard } from '@/components/common/Cards';

<StatsCard
  title="Total Usuarios"
  value="1,234"
  icon="👥"
  trend="12%"
  trendUp={true}
/>
```

### Status Cards

```jsx
import { SuccessCard, ErrorCard } from '@/components/common/Cards';

<SuccessCard
  title="¡Éxito!"
  message="La operación se completó correctamente."
  action={<button className="btn btn-success">Continuar</button>}
/>

<ErrorCard
  title="Error"
  message="Ocurrió un problema."
  action={<button className="btn btn-danger">Reintentar</button>}
/>
```

---

## 📐 Layout y Grid

### Page Container

```jsx
import { PageContainer } from '@/components/common/Layout';

<PageContainer
  title="Título de la Página"
  subtitle="Subtítulo descriptivo"
>
  {/* Contenido */}
</PageContainer>
```

### Dashboard Grid

```jsx
import { DashboardGrid } from '@/components/common/Layout';

{/* Grid 3 columnas */}
<DashboardGrid columns={3}>
  <Card>Col 1</Card>
  <Card>Col 2</Card>
  <Card>Col 3</Card>
</DashboardGrid>

{/* Grid 2 columnas */}
<DashboardGrid columns={2}>
  <Card>Col 1</Card>
  <Card>Col 2</Card>
</DashboardGrid>

{/* Grid 4 columnas */}
<DashboardGrid columns={4}>
  {/* 4 items */}
</DashboardGrid>
```

### Section

```jsx
import { Section } from '@/components/common/Layout';

<Section
  title="Sección Principal"
  subtitle="Descripción"
  action={<button className="btn btn-primary">Nuevo</button>}
>
  Contenido de la sección
</Section>
```

### Row y Column (Flexbox)

```jsx
import { Row, Column } from '@/components/common/Layout';

{/* Row - Horizontal */}
<Row gap={4} align="center" justify="between">
  <div>Elemento 1</div>
  <div>Elemento 2</div>
</Row>

{/* Column - Vertical */}
<Column gap={3} align="center">
  <div>Elemento 1</div>
  <div>Elemento 2</div>
</Column>
```

### Sidebar Layout

```jsx
import { SidebarLayout } from '@/components/common/Layout';

<SidebarLayout
  sidebar={<NavMenu />}
>
  <MainContent />
</SidebarLayout>
```

### Divider y Spacer

```jsx
import { Divider, Spacer } from '@/components/common/Layout';

<Divider />          {/* Línea divisoria normal */}
<Divider size="sm" /> {/* Línea divisoria pequeña */}

<Spacer size={4} />  {/* Espacio vertical */}
<Spacer size={8} />  {/* Espacio vertical grande */}
```

---

## 🎨 Componentes Adicionales

### Badges

```html
<span class="badge badge-primary">Primario</span>
<span class="badge badge-success">Éxito</span>
<span class="badge badge-warning">Advertencia</span>
<span class="badge badge-danger">Peligro</span>
<span class="badge badge-outline badge-outline-primary">Outline</span>
```

### Alerts

```html
<div class="alert alert-info">
  <div class="alert-icon">ℹ️</div>
  <div class="alert-content">
    <div class="alert-title">Información</div>
    <p>Mensaje informativo</p>
  </div>
</div>

<div class="alert alert-success">...</div>
<div class="alert alert-warning">...</div>
<div class="alert alert-danger">...</div>
```

### Breadcrumb

```jsx
import { Breadcrumb } from '@/components/common/Layout';

<Breadcrumb
  items={[
    { label: 'Inicio', href: '/' },
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Perfil' },
  ]}
/>
```

---

## 💡 Mejores Prácticas

### 1. Usar componentes en lugar de clases directas

```jsx
// ✅ Recomendado
import { ButtonPrimary, Input } from '@/components/common';

<ButtonPrimary>Enviar</ButtonPrimary>
<Input label="Nombre" />

// ❌ Evitar (cuando sea posible)
<button className="btn btn-primary">Enviar</button>
<input className="input" />
```

### 2. Mantener consistencia en espaciado

```jsx
// ✅ Usar gap del componente Row
<Row gap={4}>
  <Card>Item 1</Card>
  <Card>Item 2</Card>
</Row>

// ❌ Evitar mezclar métodos
<div className="flex gap-4">
  <div style={{marginRight: '10px'}}>Item 1</div>
</div>
```

### 3. Grillas responsivas automáticas

```jsx
// ✅ Grid automático responsive
<DashboardGrid columns={3}>
  {/* Automáticamente: 1 col móvil, 2 cols tablet, 3 cols desktop */}
</DashboardGrid>
```

### 4. Composición de componentes

```jsx
// ✅ Componer componentes simples
<Card>
  <CardHeader>
    <CardTitle>Mi Card</CardTitle>
  </CardHeader>
  <CardBody>Contenido</CardBody>
</Card>

// También disponible
<SimpleCard title="Mi Card">Contenido</SimpleCard>
```

### 5. Props consistentes

```jsx
// ✅ Todos los botones aceptan estas props
<ButtonPrimary
  size="lg"
  fullWidth
  disabled
  onClick={handleClick}
>
  Enviar
</ButtonPrimary>
```

---

## 📦 Estructura de Archivos

```
frontend/src/
├── components/
│   └── common/
│       ├── Buttons.jsx      # Componentes de botones
│       ├── Inputs.jsx       # Inputs, textareas, checkboxes
│       ├── Cards.jsx        # Tarjetas y composición
│       └── Layout.jsx       # Layout, grid, estructura
├── pages/
│   └── StyleGuide.jsx       # Página de referencia
└── styles/
    └── index.css            # Estilos base con Tailwind
```

---

## 🚀 Importaciones Rápidas

```jsx
// Botones
import { Button, ButtonPrimary, ButtonSecondary, ButtonDanger, ButtonSuccess } from '@/components/common/Buttons';

// Inputs
import { Input, Textarea, Select, Checkbox, Radio, Form } from '@/components/common/Inputs';

// Cards
import { Card, CardHeader, CardBody, CardFooter, SimpleCard, StatsCard } from '@/components/common/Cards';

// Layout
import { DashboardLayout, Section, DashboardGrid, Row, Column, PageContainer } from '@/components/common/Layout';
```

---

## 📝 Ejemplo Completo de Dashboard

```jsx
import { PageContainer, Section, DashboardGrid, DashboardHeader } from '@/components/common/Layout';
import { SimpleCard, StatsCard } from '@/components/common/Cards';
import { ButtonPrimary } from '@/components/common/Buttons';

export default function Dashboard() {
  return (
    <PageContainer
      title="Dashboard"
      subtitle="Bienvenido de vuelta"
      actions={<ButtonPrimary>+ Nueva Tarea</ButtonPrimary>}
    >
      {/* Estadísticas */}
      <Section title="Resumen">
        <DashboardGrid columns={4}>
          <StatsCard title="Tareas" value="24" icon="✅" />
          <StatsCard title="En Progreso" value="8" icon="⏳" />
          <StatsCard title="Completadas" value="16" icon="✔️" />
          <StatsCard title="Atrasadas" value="0" icon="📅" />
        </DashboardGrid>
      </Section>

      {/* Contenido principal */}
      <Section title="Tareas Recientes">
        <DashboardGrid columns={2}>
          <SimpleCard title="Tarea 1">Descripción de tarea</SimpleCard>
          <SimpleCard title="Tarea 2">Descripción de tarea</SimpleCard>
        </DashboardGrid>
      </Section>
    </PageContainer>
  );
}
```

---

## 🎯 Próximos Pasos

1. **Ver StyleGuide**: Visita `/style-guide` para ver todos los componentes en acción
2. **Usar componentes**: Importa los componentes en tus páginas
3. **Personalizar**: Edita `tailwind.config.js` para cambiar colores
4. **Extender**: Crea nuevos componentes basados en los existentes

