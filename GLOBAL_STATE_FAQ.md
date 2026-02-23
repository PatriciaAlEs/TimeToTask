# ❓ FAQ - Estado Global

## 🤔 Preguntas Frecuentes

### P1: ¿Dónde se guardan los datos? ¿Se pierden al recargar?

**R:** Se guardan en memoria durante la sesión. Al recargar la página se pierden.

**Solución:** Guarda en `localStorage` también:

```jsx
const handleLogin = (user, token) => {
  // Estado global
  setUser(user);
  setToken(token);

  // Persistencia
  localStorage.setItem("user", JSON.stringify(user));
  localStorage.setItem("token", token);
};

// Al inicializar app:
useEffect(() => {
  const user = localStorage.getItem("user");
  const token = localStorage.getItem("token");
  if (user && token) {
    setUser(JSON.parse(user));
    setToken(token);
  }
}, []);
```

---

### P2: ¿Cómo sincronizo el estado con el backend?

**R:** Usa `useEffect` + API calls:

```jsx
useEffect(() => {
  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/tasks");
      setTasks(await res.json());
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  fetchData();
}, [user]); // Solo si hay usuario loggeado
```

---

### P3: ¿El estado se comparte entre componentes?

**R:** Sí, automáticamente. Todos los componentes dentro de `GlobalProvider` comparten el mismo estado.

```jsx
// ComponenteA.jsx
const { tasks } = useGlobalContext();
console.log(tasks.length); // 5

// ComponenteB.jsx
const { addTask } = useGlobalContext();
addTask({ title: "Nueva" }); // Ahora tasks.length = 6

// ComponenteA se re-renderiza automáticamente con 6 tareas
```

---

### P4: ¿Afecta al performance?

**R:** Con pocos componentes (< 50), no hay problema. Si tienes muchos:

**Solución 1:** Divide el contexto en múltiples contextos pequeños

```jsx
// En lugar de un único GlobalContext
<AuthProvider>
  <TaskProvider>
    <ProjectProvider>
      <App />
    </ProjectProvider>
  </TaskProvider>
</AuthProvider>
```

**Solución 2:** Usa `useMemo` para evitar re-renders innecesarios

```jsx
const value = useMemo(
  () => ({ user, tasks, setUser, addTask }),
  [user, tasks]
);

return <GlobalContext.Provider value={value} {...} />;
```

---

### P5: ¿Cómo accedo al estado en middlewares o funciones?

**R:** No puedes fuera de componentes. Soluciones:

**Opción 1:** Pasa como parámetro

```jsx
const handleSubmit = async (formData) => {
  await apiService.create(formData, user.id); // Pasa user
};
```

**Opción 2:** Crea una función que recibe el estado

```jsx
const processData = (data, state) => {
  // Usa state.user, state.tasks, etc
  return data;
};
```

**Opción 3:** Usa store singleton (no recomendado)

```jsx
let globalState = INITIAL_STATE;

const setGlobalState = (newState) => {
  globalState = newState;
};

// Luego accede: globalState.user
```

---

### P6: ¿Cómo manejo errores?

**R:** Usa `setError` + `clearError`:

```jsx
try {
  await apiCall();
} catch (err) {
  setError(err.message);

  // Auto-limpiar después de 5 segundos
  setTimeout(() => clearError(), 5000);
}
```

---

### P7: ¿Puedo tener múltiples contextos?

**R:** Sí, es recomendado para grandes apps:

```jsx
// store/auth/context.js
const AuthContext = createContext();

// store/tasks/context.js
const TasksContext = createContext();

// App.jsx
<AuthProvider>
  <TasksProvider>
    <App />
  </TasksProvider>
</AuthProvider>

// En componentes
const auth = useAuthContext();
const tasks = useTasksContext();
```

---

### P8: ¿Cómo depuro el estado?

**R:** Opciones:

**Opción 1:** Console.log en reducer

```jsx
console.log("Estado anterior:", state);
console.log("Acción:", action);
console.log("Nuevo estado:", newState);
```

**Opción 2:** DevTools de React

```jsx
// En las DevTools de React puedes inspeccionar estado del hook
```

**Opción 3:** Integra Redux DevTools (opcional)

```jsx
// https://github.com/reduxjs/redux-devtools
```

---

### P9: ¿Necesito TypeScript?

**R:** No es obligatorio, pero ayuda:

```typescript
// types.ts
export interface AppState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  tasks: Task[];
  projects: Project[];
  loading: boolean;
  error: string | null;
}

// reducer.ts
const appReducer = (state: AppState, action: AppAction): AppState => {
  // TypeScript valida tipos
};
```

---

### P10: ¿Cómo renderizo UI basado en estado?

**R:** Condicionales normales:

```jsx
const { loading, error, user } = useGlobalContext();

return (
  <>
    {loading && <Spinner />}
    {error && <Alert color="error">{error}</Alert>}
    {!user && <LoginForm />}
    {user && <Dashboard />}
  </>
);
```

---

### P11: ¿Cómo pruebo componentes con useGlobalContext?

**R:** Crea un Provider mock para tests:

```jsx
// tests/setup.js
export const MockedGlobalProvider = ({ children, value }) => {
  const defaultValue = {
    user: null,
    tasks: [],
    setUser: jest.fn(),
    addTask: jest.fn(),
    // ... más mocks
  };

  return (
    <GlobalContext.Provider value={{ ...defaultValue, ...value }}>
      {children}
    </GlobalContext.Provider>
  );
};

// MyComponent.test.jsx
test("muestra usuario", () => {
  render(
    <MockedGlobalProvider value={{ user: { name: "Juan" } }}>
      <MyComponent />
    </MockedGlobalProvider>
  );

  expect(screen.getByText(/Juan/)).toBeInTheDocument();
});
```

---

### P12: ¿Puedo actualizar solo parte del estado?

**R:** Sí, usa `updateTask` o similar:

```jsx
// ❌ No reemplaces todo
setTasks([...tasks, newTask]); // Ineficiente

// ✅ Usa acciones específicas
addTask(newTask); // Eficiente

// ✅ Para actualizaciones parciales
updateTask(id, { status: "done" }); // Solo actualiza status
```

---

### P13: ¿Cómo paso datos entre componentes sin props drilling?

**R:** Con el contexto global:

```jsx
// ComponenteA.jsx
const { addTask } = useGlobalContext();
addTask({ title: "Tarea A" });

// ComponenteB.jsx (hermano de A, padres arriba)
const { tasks } = useGlobalContext();
// Ve la tarea agregada por ComponenteA ✅
```

---

### P14: ¿Debo usar Context o Redux?

**R:** Depende del proyecto:

| Criterio | Context | Redux |
|----------|---------|-------|
| Proyecto pequeño | ✅ | ❌ |
| Proyecto mediano | ✅ | ✅ |
| Proyecto grande | ⚠️ | ✅ |
| Curva aprendizaje | Fácil | Media |
| DevTools | Básicas | Excelentes |
| Performance | Bien | Muy bien |
| Estado complejo | OK | Excelente |

**Recomendación:** Empieza con Context, migra a Redux si crece.

---

### P15: ¿Qué pasa si dejo GlobalProvider?

**R:** Todos los componentes que usen `useGlobalContext()` darán error:

```
Error: useGlobalContext debe usarse dentro de GlobalProvider
```

**Solución:** Siempre envuelve la app con `GlobalProvider`

```jsx
<GlobalProvider>
  <App />
</GlobalProvider>
```

---

## 🎯 Resumen

- ✅ Context es perfecto para apps pequeñas/medianas
- ✅ Guarda en localStorage para persistencia
- ✅ Usa múltiples contextos si tienes mucho estado
- ✅ Optimiza con useMemo si tienes muchos componentes
- ✅ Integra DevTools para debugging
- ✅ Prueba con mocks del contexto

---

**¿Más preguntas?** Revisa `GLOBAL_STATE_GUIDE.md` 📚
