# 📐 ESTRUCTURA FRONTEND - SUMARIO VISUAL

## 🎯 7 Carpetas = 7 Responsabilidades

```
┌─────────────┬──────────────────┬────────────────────────────┐
│ CARPETA     │ RESPONSABILIDAD  │ ARCHIVO PRINCIPAL          │
├─────────────┼──────────────────┼────────────────────────────┤
│ pages/      │ Páginas completas│ Dashboard.jsx, Projects.jsx│
│ components/ │ Componentes UI   │ ProjectList, TaskCard      │
│ hooks/      │ Lógica reutiliz. │ useProjects, useTasks      │
│ services/   │ Llamadas API     │ projectService.js          │
│ store/      │ Estado global    │ context.jsx, reducer.js    │
│ layout/     │ Estructura base  │ MainLayout.jsx             │
│ styles/     │ Estilos globales │ index.css (Tailwind)       │
└─────────────┴──────────────────┴────────────────────────────┘
```

---

## 🗂️ Vista de Árbol

```
src/
├── components/
│   ├── Auth/              ← Login, Register
│   ├── Board/             ← Kanban
│   ├── Projects/          ← ProjectList
│   ├── Tasks/             ← TaskCard
│   ├── Modals/            ← TaskModal
│   ├── Layout/            ← Existente
│   └── common/            ← Botones, Inputs, Cards (✅ Completo)
│
├── hooks/
│   ├── useAuth.js         ✅ Autenticación
│   ├── useProjects.js     ✅ Proyectos
│   └── useTasks.js        ✅ Tareas
│
├── services/
│   ├── apiClient.js       ✅ Axios config
│   ├── authService.js     ✅
│   ├── projectService.js  ✅
│   ├── taskService.js     ✅
│   └── userService.js     ✅
│
├── store/
│   ├── context.jsx        ✅ Provider + Acciones
│   ├── reducer.js         ✅ Reductora
│   └── index.js           ✅ Hook de acceso
│
├── layout/
│   └── MainLayout.jsx     ✅ Estructura principal
│
├── pages/
│   ├── Dashboard.jsx      ✅ Actualizado
│   ├── Projects.jsx       ✅ Creado
│   ├── Home.jsx           ← Existente
│   ├── Login.jsx          ← Existente
│   ├── Register.jsx       ← Existente
│   └── StyleGuide.jsx     ← Existente
│
├── styles/
│   └── index.css          ✅ (500+ líneas de base)
│
├── utils/
│   └── helpers.js         ← Existente
│
├── App.jsx
└── main.jsx
```

---

## 📊 Resumen por Carpeta

### **1️⃣ components/** (7 subcarpetas)
```
Contiene: 8 componentes creados
├── TaskCard           - Tarjeta individual de tarea
├── Board              - Tablero Kanban (drag & drop)
├── ProjectList        - Lista de proyectos
├── TaskModal          - Modal para crear/editar tarea
├── MainLayout (en layout/)
└── (Componentes base: Button, Input, Card, etc.)

Uso: Renderizar UI
Ubicación: Dentro de Pages
```

### **2️⃣ hooks/** (3 hooks)
```
Contiene: useAuth, useProjects, useTasks
Características:
✅ Fetch de datos automático
✅ Manejo de loading/error
✅ Actualización de Store
✅ Lógica reutilizable

Uso: const { projects, createProject } = useProjects();
```

### **3️⃣ services/** (5 servicios)
```
Contiene: apiClient, authService, projectService, taskService, userService
Cada uno tiene métodos CRUD:
✅ .getAll()
✅ .getById()
✅ .create()
✅ .update()
✅ .delete()

Uso: await projectService.create(data)
```

### **4️⃣ store/** (3 archivos)
```
Contiene:
├── context.jsx    - Contexto + Provider + Acciones
├── reducer.js     - Casos de cambio de estado
└── index.js       - Hook useAppContext()

Estado compartido:
{
  projects[], tasks[], users[],
  loading, error, selectedProject,
  currentUser, isAuthenticated
}

Uso: const { projects } = useAppContext();
```

### **5️⃣ layout/** (1 componente)
```
Contiene: MainLayout
Incluye:
✅ Header con navegación
✅ Footer
✅ Links a secciones
✅ Botón de logout

Envolucra: Todas las páginas
```

### **6️⃣ pages/** (actualizado)
```
Contiene: Dashboard, Projects, (+ existentes)
Ejemplos de cómo conectar todo:
├── useHooks
├── renderizar componentes
├── usar Context
└── manejo de eventos

Patrón: Cada página orquesta sus componentes
```

### **7️⃣ styles/** (completo)
```
Contiene: index.css (500+ líneas)
Sistema de clases:
✅ .btn .btn-primary .btn-lg
✅ .input .select .checkbox
✅ .card .card-header .card-body
✅ .badge .alert .divider
✅ Layout utilities (grid, flexbox)

Base: Tailwind CSS + clases custom
```

---

## 🔄 Flujo Paso a Paso

```
1. Usuario abre app
   ↓
2. App.jsx renderiza con AppProvider
   ↓
3. MainLayout proporciona estructura
   ↓
4. Página se carga (ej: Dashboard)
   ↓
5. Hooks hacen fetch (useProjects, useTasks)
   ↓
6. Services llaman API
   ↓
7. Store actualiza estado
   ↓
8. Componentes se renderizan con datos
   ↓
9. Usuario interactúa
   ↓
10. Ciclo se repite
```

---

## 💾 Datos Guardados

### En localStorage:
```
token           → Autenticación
user            → Datos del usuario actual
```

### En Store (RAM):
```
projects[]      → Todos los proyectos
tasks[]         → Todas las tareas
users[]         → Usuarios del proyecto
currentUser     → Usuario loggeado
loading         → Estado de carga
error           → Mensajes de error
selectedProject → Proyecto actual
```

---

## 🎯 Ejemplo Real: "Crear Proyecto"

```
usuario hace click
        ↓
        component: ProjectForm (renderiza formulario)
        ↓
        usuario ingresa datos y hace submit
        ↓
        hook: useProjects() (valida + createProject)
        ↓
        service: projectService.create() (POST /api/projects)
        ↓
        apiClient: agrega token, maneja error
        ↓
        BACKEND responde con id del proyecto
        ↓
        store: dispatch(ADD_PROJECT) → reducer actualiza
        ↓
        component: ProjectList se re-renderiza
        ↓
        usuario ve nuevo proyecto
```

---

## 🚀 Ventajas de Esta Estructura

| Beneficio | Explicación |
|-----------|-------------|
| **Separación** | Componentes solo renderizan, hooks manejan lógica |
| **Reutilizable** | Mismo hook en múltiples páginas |
| **Escalable** | Agregar feature = copiar patrón |
| **Mantenible** | Cambios localizados |
| **Testeable** | Cada parte independiente |
| **Consistente** | Mismo patrón en toda la app |

---

## 📦 Estado Dentro del Store

```javascript
{
  // Datos del servidor
  projects: [
    { id: 1, name: "Proyecto A", description: "..." },
    { id: 2, name: "Proyecto B", description: "..." }
  ],
  
  tasks: [
    { id: 1, title: "Tarea 1", status: "todo", projectId: 1 },
    { id: 2, title: "Tarea 2", status: "inProgress", projectId: 1 }
  ],
  
  users: [
    { id: 1, name: "Juan", email: "juan@mail.com" }
  ],
  
  // Estado UI
  loading: false,
  error: null,
  
  // Selecciones
  selectedProject: 1,
  selectedTask: null,
  
  // Autenticación
  currentUser: { id: 1, name: "Juan", email: "..." },
  isAuthenticated: true
}
```

---

## 🔐 Ciclo de Autenticación

```
1. Usuario en Login.jsx ingresa credenciales
2. useAuth().login() valida y llama authService.login()
3. authService hace POST /api/auth/login
4. Backend responde con { token, user }
5. Token se guarda en localStorage
6. user se guarda en Store (setUser)
7. apiClient automáticamente agrega token a headers
8. Usuario redirigido a Dashboard
9. Si token expira, interceptor redirige a Login
10. logout() limpia todo
```

---

## 📝 Documentación Generada

| Archivo | Contenido |
|---------|----------|
| **ESTRUCTURA_FRONTEND.md** | Guía detallada (10 secciones) |
| **RESUMEN_ESTRUCTURA.md** | Resumen ejecutivo (5 min lectura) |
| **ARQUITECTURA_VISUAL.md** | Diagramas y flujos |
| **EJEMPLO_COMPLETO.jsx** | Código comentado de integración |
| **CHECKLIST_ESTRUCTURA.md** | TODO list de tareas |
| **SISTEMA_ESTILOS.md** | Componentes UI |
| **TAILWIND_SETUP.md** | Configuración de estilos |
| **Este documento** | Sumario visual rápido |

---

## ✅ Lo que está LISTO para usar

- ✅ Sistema de estado global (Context + Reducer)
- ✅ Hooks para proyectos, tareas, autenticación
- ✅ Services con API calls CRUD
- ✅ Componentes base (Buttons, Inputs, Cards)
- ✅ Layout principal con navegación
- ✅ Sistema de estilos con Tailwind
- ✅ Ejemplos de integración
- ✅ Documentación completa

---

## ⚠️ Lo que FALTA hacer

- Actualizar App.jsx con AppProvider y rutas
- Crear páginas adicionales (TaskDetail, etc)
- Completar componentes específicos (Forms, etc)
- Conectar con backend real
- Tests (unitarios e integración)
- Deploy

---

## 🎓 Para Usar la Estructura

### 1. En cualquier componente de página:
```jsx
import { useProjects } from '@/hooks/useProjects';
import { ProjectList } from '@/components/Projects/ProjectList';

export function MyPage() {
  const { projects, loading } = useProjects();
  return <ProjectList projects={projects} loading={loading} />;
}
```

### 2. Para acceder estado global:
```jsx
import { useAppContext } from '@/store';

const { projects, setError } = useAppContext();
```

### 3. Para llamar API directamente:
```jsx
import { projectService } from '@/services/projectService';

const projects = await projectService.getAll();
```

---

## 🎯 Resumen en 3 frases

1. **Store** guarda datos compartidos
2. **Hooks** manejan lógica y actualizan Store
3. **Components** renderizan y usan Hooks

---

## 📈 Próximo Paso

Actualizar `App.jsx`:

```jsx
import { AppProvider } from '@/store/context';
import { MainLayout } from '@/layout/MainLayout';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

export default function App() {
  return (
    <AppProvider>
      <Router>
        <MainLayout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            {/* más rutas */}
          </Routes>
        </MainLayout>
      </Router>
    </AppProvider>
  );
}
```

¡Listo! 🎉

