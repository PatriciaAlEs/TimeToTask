# 📋 TimeToTask - Gestor de Tareas

Aplicación fullstack de gestión de tareas y proyectos con autenticación JWT, construida con React + Flask.

## 🚀 Stack Tecnológico

| Frontend | Backend |
|----------|---------|
| React 18+ con Vite | Flask (Python) |
| Tailwind CSS | SQLAlchemy + Migrations |
| React Router v6 | JWT Authentication |
| Context API + useReducer | RESTful API |

## 📁 Estructura del Proyecto

```
my-fullstack-app/
├── frontend/          # Aplicación React (ver frontend/README.md)
│   ├── src/
│   │   ├── components/   # Auth, Board, Tasks, Projects, Modals, Layout
│   │   ├── pages/        # Home, Dashboard, Board, Projects...
│   │   ├── services/     # API client y servicios
│   │   ├── store/        # Estado global (Context + Reducer)
│   │   ├── hooks/        # Custom hooks
│   │   ├── i18n/         # Internacionalización
│   │   └── styles/       # Tailwind CSS
│   └── package.json
├── backend/           # API Flask
│   ├── app/
│   │   ├── models/       # User, Task, Project, Activity
│   │   ├── routes/       # Auth, API
│   │   ├── services/     # Auth, Activity services
│   │   └── utils/        # JWT handler, responses
│   ├── migrations/
│   ├── requirements.txt
│   └── run.py
└── README.md
```

## 🔧 Configuración

### Backend

```bash
cd backend
python -m venv venv
venv\Scripts\activate        # Windows
# source venv/bin/activate   # Linux/Mac
pip install -r requirements.txt
python run.py
```

### Frontend

```bash
cd frontend
npm install
cp .env.example .env.local   # Configurar VITE_API_URL
npm run dev
```

La aplicación estará disponible en: **http://localhost:3000** (frontend) y **http://localhost:5000** (backend).

## ✨ Funcionalidades

- Autenticación con JWT (login/registro)
- Gestión de proyectos y tareas
- Board Kanban con drag & drop
- Dashboard con resumen de actividad
- Diseño responsive con Tailwind CSS
- Internacionalización (ES/EN)

## � Demo Login

```
Email:    patricia@example.com
Password: password123
```

> Al desplegar, la base de datos se carga automáticamente con usuarios, proyectos y tareas de ejemplo.

## �📄 Licencia

Proyecto educativo - Gestor de Tareas
