# Resumen Rápido - Estructura Frontend

## 📁 7 Carpetas Principales

### 1️⃣ **components/** - Componentes React
- Almacena componentes reutilizables por feature
- Ejemplo: `TaskCard`, `Board`, `ProjectList`, `Button`, `Input`
- Cada feature tiene su subcarpeta: `Tasks/`, `Projects/`, `Board/`

### 2️⃣ **hooks/** - Custom Hooks
- Encapsulan lógica de negocio y efectos
- Incluyen: `useAuth()`, `useProjects()`, `useTasks()`
- Conectan servicios con componentes
- Manejan loading y errores automáticamente

### 3️⃣ **layout/** - Layouts Principales
- `MainLayout.jsx` - Estructura con navegación y header
- Envuelven páginas completas
- Proporcionan consistencia visual

### 4️⃣ **pages/** - Vistas/Páginas
- Una página por ruta principal
- Componen componentes menores
- Conectan con hooks
- Ejemplos: `Dashboard.jsx`, `Projects.jsx`, `Login.jsx`

### 5️⃣ **services/** - Llamadas a API
- Comunican con el backend
- Incluyen: `authService`, `projectService`, `taskService`
- Manejan tokens y autenticación
- Errores centralizados

### 6️⃣ **store/** - Estado Global
- **context.jsx** - Provider y acciones
- **reducer.js** - Lógica de cambios de estado
- **index.js** - Hook `useAppContext()`
- Comparte datos entre componentes sin prop drilling

### 7️⃣ **styles/** - Estilos Globales
- `index.css` - Tailwind + clases base
- Define sistema de colores y componentes reutilizables
- Estilos para `.btn`, `.input`, `.card`, `.alert`, etc.

---

## 🔄 Flujo de Datos Simple

```
Usuario hace click
    ↓
Componente llama hook (useProjects, useTasks, etc)
    ↓
Hook llama Service (projectService, taskService)
    ↓
Service llama API Backend
    ↓
Backend responde
    ↓
Hook actualiza Context (Store)
    ↓
Componente se re-renderiza automáticamente
```

---

## 💡 Ejemplo: Crear una Tarea

1. **En `components/Modals/TaskModal.jsx`:**
   - Usuario completa formulario

2. **En `hooks/useTasks.js`:**
   - Hook llama `taskService.create()`

3. **En `services/taskService.js`:**
   - Realiza `POST /api/tasks`

4. **Backend procesa y responde**

5. **En `store/reducer.js`:**
   - Action `ADD_TASK` agrega la nueva tarea

6. **En `components/Board/Board.jsx`:**
   - La tarea aparece automáticamente en el tablero

---

## 🎯 Responsabilidades Clave

| Carpeta | Responsabilidad |
|---------|-----------------|
| **components/** | Renderizar UI |
| **hooks/** | Lógica de negocio |
| **services/** | Comunicar con API |
| **store/** | Compartir estado |
| **pages/** | Orquestar todo junto |
| **layout/** | Estructura visual |
| **styles/** | Tema y estilos base |

---

## 🚀 Crear Nueva Feature (Ej: Comentarios)

```
1. components/Comments/
   ├── CommentList.jsx
   ├── CommentForm.jsx
   └── CommentCard.jsx

2. hooks/useComments.js
   - fetchComments()
   - createComment()
   - deleteComment()

3. services/commentService.js
   - API calls

4. store/reducer.js
   - Agregar casos para comentarios

5. pages/TaskDetail.jsx
   - Usar <CommentList /> y <CommentForm />
```

---

## 📋 Archivos Clave Creados

✅ **Store (Estado Global)**
- `store/context.jsx` - Contexto + Provider
- `store/reducer.js` - Función reductora
- `store/index.js` - Hook de acceso

✅ **Services (API)**
- `services/apiClient.js` - Axios configurado
- `services/authService.js` - Auth calls
- `services/projectService.js` - Projects CRUD
- `services/taskService.js` - Tasks CRUD
- `services/userService.js` - Users calls

✅ **Hooks (Lógica)**
- `hooks/useAuth.js` - Autenticación
- `hooks/useProjects.js` - Proyectos
- `hooks/useTasks.js` - Tareas

✅ **Components (UI)**
- `components/Projects/ProjectList.jsx`
- `components/Tasks/TaskCard.jsx`
- `components/Board/Board.jsx`
- `components/Modals/TaskModal.jsx`
- `layout/MainLayout.jsx`

✅ **Pages (Vistas)**
- `pages/Dashboard.jsx`
- `pages/Projects.jsx`

---

## 🔒 Autenticación

1. Usuario hace login en `pages/Login.jsx`
2. `useAuth()` llama `authService.login()`
3. Token se guarda en localStorage
4. `apiClient.js` agrega token a headers automáticamente
5. Si token expira, interceptor redirige a login

---

## 🎨 Componentes Base Disponibles

### Botones
```jsx
import { ButtonPrimary, ButtonSecondary, ButtonDanger } from '@/components/common/Buttons';
<ButtonPrimary onClick={...}>Crear</ButtonPrimary>
```

### Inputs
```jsx
import { Input, Textarea, Select } from '@/components/common/Inputs';
<Input label="Email" type="email" required />
```

### Cards
```jsx
import { Card, SimpleCard, StatsCard } from '@/components/common/Cards';
<SimpleCard title="Mi Card">Contenido</SimpleCard>
```

### Layout
```jsx
import { PageContainer, Section, DashboardGrid } from '@/components/common/Layout';
<PageContainer title="Título">...</PageContainer>
```

---

## 🔗 Importar desde cualquier componente

```jsx
// Componentes
import { ProjectList } from '@/components/Projects/ProjectList';

// Hooks
import { useProjects } from '@/hooks/useProjects';
import { useAppContext } from '@/store';

// Services
import { projectService } from '@/services/projectService';

// Layouts
import { MainLayout } from '@/layout/MainLayout';
```

---

## ✅ Próximos Pasos

1. **Instalar dependencias:** `npm install`
2. **Actualizar `App.jsx`** con rutas y AppProvider
3. **Configurar variables de entorno** (API_URL)
4. **Crear páginas faltantes** (Login, Register, TaskDetail)
5. **Conectar con backend** (verificar endpoints)
6. **Agregar más features** siguiendo el mismo patrón

