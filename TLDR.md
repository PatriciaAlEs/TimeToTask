# ⚡ TL;DR - Estructura Frontend en 2 Minutos

## 7 Carpetas = 7 Responsabilidades

| # | Carpeta | ¿Qué va? | Ejemplo |
|---|---------|----------|---------|
| 1️⃣ | **pages/** | Páginas completas | Dashboard.jsx |
| 2️⃣ | **components/** | Componentes UI | TaskCard.jsx |
| 3️⃣ | **hooks/** | Lógica reutilizable | useProjects() |
| 4️⃣ | **services/** | Llamadas API | projectService.js |
| 5️⃣ | **store/** | Estado compartido | context.jsx |
| 6️⃣ | **layout/** | Estructura común | MainLayout.jsx |
| 7️⃣ | **styles/** | Estilos base | index.css |

---

## 🔄 Flujo en 10 segundos

```
Página usa Hook
    ↓
Hook llama Service
    ↓
Service llama API
    ↓
Hook actualiza Store
    ↓
Componente se re-renderiza
```

---

## 💾 Estado Global (5 cosas)

```javascript
{
  projects: [],      // Todos los proyectos
  tasks: [],         // Todas las tareas
  currentUser: {},   // Usuario loggeado
  loading: false,    // Cargando?
  error: null        // Error?
}
```

---

## 📦 Lo que está LISTO

✅ Store con Context + Reducer  
✅ 5 Services (auth, project, task, user, apiClient)  
✅ 3 Hooks (useAuth, useProjects, useTasks)  
✅ 4 Componentes específicos de Jira  
✅ Layout principal  
✅ Sistema de estilos base  
✅ Documentación completa  

---

## 🚀 Para Empezar

### 1. Actualiza App.jsx:
```jsx
import { AppProvider } from '@/store/context';
<AppProvider>
  <Routes>...</Routes>
</AppProvider>
```

### 2. En cualquier página:
```jsx
import { useProjects } from '@/hooks/useProjects';
const { projects } = useProjects();
```

### 3. En cualquier componente:
```jsx
import { useAppContext } from '@/store';
const { projects, currentUser } = useAppContext();
```

---

## 🎯 Patrones

### Mostrar datos:
```jsx
const { data, loading } = useHook();
return <List data={data} loading={loading} />;
```

### Crear datos:
```jsx
const { create } = useHook();
await create(newData);
```

### Compartir estado:
```jsx
const { data } = useAppContext();
// Disponible en cualquier componente
```

---

## 📚 Documentos

**1. Lee primero:** SUMARIO_VISUAL.md (5 min)  
**2. Después:** ESTRUCTURA_FRONTEND.md (30 min)  
**3. Referencia:** ARQUITECTURA_VISUAL.md  

---

## ✅ Checklist Rápido

- [ ] Entiendo las 7 carpetas
- [ ] Agregué AppProvider a App.jsx
- [ ] Ejecuté npm run dev
- [ ] Accedí a /dashboard
- [ ] Probé un hook

---

**¡Listo!** 🎉

