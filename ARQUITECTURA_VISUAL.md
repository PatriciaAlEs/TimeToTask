# Arquitectura Visual - Frontend Jira Light

## 🏗️ Estructura de Capas

```
┌─────────────────────────────────────────────────────────┐
│                   PÁGINAS (pages/)                       │
│              Dashboard | Projects | Login               │
└───────┬─────────────────────────────────────────┬────────┘
        │                                           │
        ↓                                           ↓
┌──────────────────────┐              ┌─────────────────────┐
│ COMPONENTES (UI)     │              │ CONTEXTO (State)    │
│                      │              │                     │
│ • ProjectList        │◄────────────►│ • projects[]        │
│ • TaskCard           │              │ • tasks[]           │
│ • Board              │              │ • currentUser       │
│ • Modal              │              │ • loading           │
│ • Button, Input      │              │ • error             │
└──────────┬───────────┘              └────────┬────────────┘
           │                                  │
           │    ACTIONS (Dispatch)            │
           └──────────────────┬───────────────┘
                              │
        ┌─────────────────────↓────────────────────┐
        │      HOOKS (Lógica de Negocio)           │
        │                                          │
        │ • useProjects()  ── fetchProjects()     │
        │ • useTasks()     ── fetchTasks()        │
        │ • useAuth()      ── login(), logout()   │
        └──────────────────┬──────────────────────┘
                           │
                           ↓
        ┌──────────────────────────────────┐
        │    SERVICES (API Calls)           │
        │                                  │
        │ • projectService.getAll()        │
        │ • taskService.create()           │
        │ • authService.login()            │
        └──────────────┬───────────────────┘
                       │
                       ↓
        ┌──────────────────────────────────┐
        │    API CLIENT (Axios)            │
        │   + Interceptadores              │
        │   + Headers + Token              │
        └──────────────┬───────────────────┘
                       │
                       ↓
           ┌───────────────────────┐
           │  BACKEND API          │
           │  (Node/Express)       │
           └───────────────────────┘
```

---

## 📦 Carpetas y Relaciones

```
┌────────────────────────────────────────────────────────────────┐
│                          SRC/                                  │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│  ┌──────────────┐  ┌────────────┐  ┌──────────────┐           │
│  │  PAGES/      │  │ LAYOUT/    │  │ COMPONENTS/  │           │
│  ├──────────────┤  ├────────────┤  ├──────────────┤           │
│  │ Dashboard    │  │ MainLayout │  │ Projects/    │           │
│  │ Projects     │  └────────────┘  │ Tasks/       │           │
│  │ Login        │                   │ Board/       │           │
│  │ Register     │   Envuelve        │ Modals/      │           │
│  │ TaskDetail   │   páginas con     │ Auth/        │           │
│  │ StyleGuide   │   estructura      │ Layout/      │           │
│  └──────┬───────┘   consistente     │ common/      │           │
│         │                           └──────┬───────┘           │
│         └───────────────────────────────────┴─────┐            │
│                                                    ↓            │
│                                              Renderizan        │
│                                              y usan             │
│                                                                │
│  ┌──────────────────────────────────────────────────────┐     │
│  │  HOOKS/ (Lógica centralizada)                        │     │
│  ├──────────────────────────────────────────────────────┤     │
│  │ • useAuth() ────────────────┐                        │     │
│  │ • useProjects() ────────┐   │                        │     │
│  │ • useTasks() ────────┐  │   │                        │     │
│  │ • useAppContext() ┐  │  │   │                        │     │
│  │                   │  │  │   │                        │     │
│  │ (Llaman a Services y actualizan Store)               │     │
│  └────────┬──────────┬──┬──┬───┘                        │     │
│           │          │  │  │                            │     │
│           ↓          ↓  ↓  ↓                            │     │
│  ┌──────────────────────────────────────────────────────┐     │
│  │  SERVICES/ (Comunicación API)                        │     │
│  ├──────────────────────────────────────────────────────┤     │
│  │ • authService                                        │     │
│  │ • projectService                                     │     │
│  │ • taskService                                        │     │
│  │ • userService                                        │     │
│  │ • apiClient.js (axios configurado)                  │     │
│  └────────┬───────────────────────────────────────────┬┘     │
│           │                                           │       │
│  ┌────────↓───────────┐          ┌──────────────────↓─────┐   │
│  │  STORE/            │          │    STYLES/             │   │
│  ├────────────────────┤          ├────────────────────────┤   │
│  │ • context.jsx      │          │ • index.css            │   │
│  │ • reducer.js       │          │   - Tailwind directives│   │
│  │ • index.js         │          │   - Clases base        │   │
│  │ • slices/ (future) │          │   - Componentes        │   │
│  │ • actions/ (future)│          │   - Layout utilities   │   │
│  └────────────────────┘          └────────────────────────┘   │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

---

## 🔄 Flujo de una Acción (Crear Proyecto)

```
Usuario hace click en "Crear Proyecto"
         │
         ↓
┌─────────────────────────────┐
│  Component: ProjectForm     │
│  - Renderiza formulario     │
│  - Captura input del usuario│
└──────────┬──────────────────┘
           │
           ↓
┌─────────────────────────────┐
│  Hook: useProjects()        │
│  - createProject(data)      │
└──────────┬──────────────────┘
           │
           ↓
┌─────────────────────────────┐
│  Service: projectService    │
│  - api.post('/projects')    │
└──────────┬──────────────────┘
           │
           ↓
┌─────────────────────────────┐
│  API Client: axios          │
│  + Token en headers         │
│  + Error handling           │
└──────────┬──────────────────┘
           │
           ↓
    ┌──────────────┐
    │  Backend API │
    │  POST /api/  │
    │  projects    │
    └──────┬───────┘
           │
       ┌───↓────┐
       │ Éxito  │  Respuesta: { id, name, ... }
       └───┬────┘
           │
           ↓
┌─────────────────────────────┐
│  Hook: actualiza Context    │
│  - dispatch(ADD_PROJECT)    │
└──────────┬──────────────────┘
           │
           ↓
┌─────────────────────────────┐
│  Reducer: procesa action    │
│  - Agrega a projects[]      │
└──────────┬──────────────────┘
           │
           ↓
┌─────────────────────────────┐
│  Componentes se redibujan   │
│  - ProjectList muestra nuevo│
│  - UI se actualiza          │
└─────────────────────────────┘
```

---

## 📊 Matriz de Responsabilidades

```
┌─────────────────┬──────────┬──────────┬─────────┬─────────┐
│ Capa            │ Renderiz │ Lógica   │ Estado  │ API     │
│                 │ ar UI    │ Negocio  │ Gestión │ Calls   │
├─────────────────┼──────────┼──────────┼─────────┼─────────┤
│ Pages/          │    ✅    │    ✅    │         │         │
│ Components/     │    ✅    │          │         │         │
│ Hooks/          │          │    ✅    │    ✅   │    ✅   │
│ Services/       │          │          │         │    ✅   │
│ Store/          │          │          │    ✅   │         │
│ Layout/         │    ✅    │          │         │         │
│ Styles/         │    ✅    │          │         │         │
└─────────────────┴──────────┴──────────┴─────────┴─────────┘
```

---

## 🎯 Patrones de Uso

### Patrón 1: Mostrar Datos
```
Component (render)
     ↓
useHook (fetch data)
     ↓
Service (API call)
     ↓
Store (actualiza state)
     ↓
Component (re-render con new data)
```

### Patrón 2: Crear Datos
```
Form (user input)
     ↓
useHook (validar + crear)
     ↓
Service (POST API)
     ↓
Store (ADD action)
     ↓
List Component (muestra nuevo)
```

### Patrón 3: Compartir Estado
```
ComponentA necesita data
     ↓
useAppContext() accede al Store
     ↓
ComponentB también accede mismo Store
     ↓
Ambos sincronizados automáticamente
```

---

## 📍 Ubicación de Cada Responsabilidad

```
¿Dónde renderizar UI?
  → components/ o pages/

¿Dónde guardar lógica reutilizable?
  → hooks/

¿Dónde hacer llamadas a API?
  → services/

¿Dónde compartir estado entre componentes?
  → store/ (Context)

¿Dónde guardar estilos globales?
  → styles/

¿Dónde guardar estructura visual común?
  → layout/
```

---

## 🔌 Conexiones Clave

1. **Pages** → **Hooks** (lógica + datos)
2. **Hooks** → **Services** (API calls)
3. **Services** → **API Client** (axios)
4. **Hooks** → **Store** (actualizar estado)
5. **Store** → **Components** (leer estado)
6. **Components** → **Layout** (estructura)
7. **Components** → **Styles** (apariencia)

---

## 📈 Escalabilidad

Esta estructura permite:

✅ Agregar nuevas features fácilmente (nueva carpeta en components)
✅ Reutilizar lógica sin prop drilling (hooks + context)
✅ Cambiar backend sin tocar componentes (services)
✅ Testear componentes en aislamiento
✅ Compartir código entre equipos (componentes comunes)
✅ Mantener consistencia visual (estilos centralizados)

