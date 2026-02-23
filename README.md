<<<<<<< HEAD
# My Fullstack App

This project is a fullstack application built with a React frontend and a Flask backend. It features JWT authentication, user registration, and a simple dashboard for authenticated users.

## Project Structure

```
my-fullstack-app
├── frontend
│   ├── src
│   │   ├── main.jsx
│   │   ├── App.jsx
│   │   ├── components
│   │   │   ├── Auth
│   │   │   │   ├── Login.jsx
│   │   │   │   └── Register.jsx
│   │   │   ├── Layout
│   │   │   │   ├── Header.jsx
│   │   │   │   └── Footer.jsx
│   │   │   └── common
│   │   │       └── Button.jsx
│   │   ├── pages
│   │   │   ├── Home.jsx
│   │   │   └── Dashboard.jsx
│   │   ├── services
│   │   │   └── api.js
│   │   ├── hooks
│   │   │   └── useAuth.js
│   │   ├── utils
│   │   │   └── helpers.js
│   │   └── styles
│   │       └── index.css
│   ├── public
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── postcss.config.js
├── backend
│   ├── app
│   │   ├── __init__.py
│   │   ├── config.py
│   │   ├── models
│   │   │   ├── __init__.py
│   │   │   └── user.py
│   │   ├── routes
│   │   │   ├── __init__.py
│   │   │   ├── auth.py
│   │   │   └── api.py
│   │   ├── services
│   │   │   ├── __init__.py
│   │   │   └── auth_service.py
│   │   ├── utils
│   │   │   ├── __init__.py
│   │   │   └── jwt_handler.py
│   │   └── extensions.py
│   ├── migrations
│   ├── tests
│   │   └── __init__.py
│   ├── requirements.txt
│   └── run.py
└── README.md
```

## Frontend Setup

1. Navigate to the `frontend` directory.
2. Install dependencies using npm:
   ```
   npm install
   ```
3. Start the development server:
   ```
   npm run dev
   ```

## Backend Setup

1. Navigate to the `backend` directory.
2. Create a virtual environment and activate it:
   ```
   python -m venv venv
   source venv/bin/activate  # On Windows use `venv\Scripts\activate`
   ```
3. Install dependencies:
   ```
   pip install -r requirements.txt
   ```
4. Run the Flask application:
   ```
   python run.py
   ```

## Features

- User authentication with JWT
- User registration and login
- Responsive design using Tailwind CSS
- Modular architecture for easy maintenance and scalability

## License

This project is licensed under the MIT License.
=======
# 📋 Gestor de Tareas (Jira Light) - Frontend

Aplicación React de gestión de tareas y proyectos con autenticación JWT.

## 🚀 Stack Tecnológico

- **React 18+** con Vite (build tool)
- **JavaScript** (sin TypeScript)
- **Tailwind CSS** (estilos)
- **React Router v6** (navegación)
- **Context API + useReducer** (estado global)
- **Fetch API** (HTTP client centralizado)

## 📁 Estructura del Proyecto

```
src/
├── components/
│   ├── Auth/              # Componentes de autenticación
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   └── ProtectedRoute.jsx
│   ├── Layout/            # Componentes de layout
│   │   ├── Header.jsx
│   │   └── Footer.jsx
│   ├── Tasks/             # Componentes de tareas
│   │   ├── TaskList.jsx
│   │   ├── TaskCard.jsx
│   │   └── TaskForm.jsx
│   ├── Projects/          # Componentes de proyectos
│   ├── Board/             # Board/Kanban
│   ├── Modals/            # Componentes modales
│   └── common/            # Componentes reutilizables
├── pages/                 # Páginas (rutas)
│   ├── Home.jsx
│   ├── Dashboard.jsx
│   └── Projects.jsx
├── store/                 # Estado global (Context + Reducer)
│   ├── provider.jsx
│   ├── useGlobalContext.jsx
│   ├── reducer.js
│   ├── actions.js
│   ├── store.js
│   └── index.js
├── services/              # Servicios API y lógica
│   ├── api.js            # Cliente API centralizado
│   ├── taskService.js
│   ├── authService.js
│   ├── projectService.js
│   └── userService.js
├── hooks/                 # Custom hooks
│   ├── useAuth.jsx
│   ├── useTasks.jsx
│   └── useProjects.jsx
├── utils/                 # Utilidades
│   └── helpers.js
├── styles/                # Estilos CSS
│   └── index.css         # Tailwind + componentes personalizados
├── App.jsx                # Componente raíz
├── main.jsx               # Punto de entrada
└── .env.local             # Variables de entorno (local)
```

## 🔧 Configuración Inicial

### 1. Instalar dependencias
```bash
npm install
```

### 2. Configurar variables de entorno
Copiar `.env.example` a `.env.local`:
```bash
cp .env.example .env.local
```

Editar `.env.local` con los valores correctos:
```env
VITE_API_URL=http://localhost:5000/api
VITE_NODE_ENV=development
```

### 3. Iniciar servidor de desarrollo
```bash
npm run dev
```

La aplicación estará disponible en: **http://localhost:3000**

## 🔐 Autenticación

### Flujo de Autenticación:

1. **Login/Register**: Usuario se autentica
2. **JWT Token**: Backend retorna token JWT
3. **localStorage**: Token se guarda en localStorage
4. **Bearer Token**: Se auto-inyecta en headers de cada request
5. **ProtectedRoute**: Dashboard y otras rutas protegidas
6. **Token Expiration**: Si expira, se limpia sesión

### Estructura del Token:
```javascript
// Header
{
  "Authorization": "Bearer <JWT_TOKEN>"
}
```

## 🌐 API Client

Cliente centralizado en `services/api.js`:

```javascript
import api from '@/services/api';

// Ejemplos de uso:
const user = await api.auth.login(email, password);
const tasks = await api.tasks.getAll();
const newTask = await api.tasks.create({ title, description });
```

## 🎨 Estilos con Tailwind

Utiliza Tailwind CSS con clases personalizadas en `styles/index.css`:

```css
.btn-primary { @apply bg-blue-600 text-white hover:bg-blue-700; }
.card { @apply bg-white rounded-lg shadow-md p-4; }
.input { @apply w-full px-4 py-2 border border-gray-300 rounded-lg; }
```

## 🗂️ Estado Global (Context + Reducer)

Acceso al estado global:

```javascript
import { useGlobalContext } from '@/store';

export function MyComponent() {
  const { tasks, loading, setTasks, updateTask } = useGlobalContext();
  
  // usar state y acciones
}
```

### Actions Disponibles:
- `SET_TASKS`: Asignar lista de tareas
- `UPDATE_TASK`: Actualizar tarea específica
- `DELETE_TASK`: Eliminar tarea
- `SET_LOADING`: Estado de carga
- `SET_ERROR`: Manejo de errores

## 🚢 Deploy a Render

### Preparación:

1. Crear repositorio en GitHub
2. Conectar con Render.com
3. Configurar variables de entorno en Render:
   ```
   VITE_API_URL=<URL_DEL_BACKEND_EN_RENDER>
   VITE_NODE_ENV=production
   ```
4. Build command: `npm run build`
5. Start command: `npm run preview`

## 📦 Scripts Disponibles

```bash
npm run dev          # Inicia servidor de desarrollo
npm run build        # Compila para producción
npm run preview      # Previsualiza build de producción
npm run lint         # Lint del código (si está configurado)
```

## 🐛 Debugging

### Console Logs:
- API calls se loguean en desarrollo
- Errores de autenticación se muestran
- Estado global accesible en devtools

### DevTools Recomendadas:
- React Developer Tools (Chrome/Firefox)
- Redux DevTools (compatible con Context)

## 📋 Checklist de Desarrollo

- [ ] Configurar `.env.local` con URL de API
- [ ] Iniciar backend en puerto 5000
- [ ] Ejecutar `npm run dev`
- [ ] Probar Login/Register
- [ ] Probar creación de tareas
- [ ] Probar rutas protegidas
- [ ] Verificar Bearer token en headers

## 🤝 Contribuir

1. Crear rama para feature: `git checkout -b feature/nueva-feature`
2. Seguir estructura de componentes existente
3. Mantener naming coherente con task management
4. No agregar librerías sin autorización

## 📄 Licencia

Proyecto educativo - Gestor de Tareas (Jira Light)
>>>>>>> 18529a46766e8e466e8768f39ee588f06fadf0dc
