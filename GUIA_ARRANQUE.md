# 🚀 GUÍA DE ARRANQUE - Paso a Paso

## ✅ Estado del Proyecto

Todo está verificado y listo:

```
✓ 7 Componentes React creados
✓ Estado Global implementado
✓ API Client centralizado
✓ Tailwind CSS configurado
✓ React Router listo
✓ Documentación completa
```

---

## 🚀 ARRANCAR LA APLICACIÓN

### Terminal 1: Frontend (Vite)

```bash
# Navegar a la carpeta frontend
cd frontend

# Instalar dependencias (solo la primera vez)
npm install

# Arrancar servidor de desarrollo
npm run dev
```

**Resultado esperado:**
```
  VITE v2.x.x  ready in xxx ms

  ➜  Local:   http://localhost:5173/
  ➜  press h to show help
```

✅ **Frontend corriendo en:** `http://localhost:5173`

---

### Terminal 2: Backend (Python)

En **otra terminal nueva**:

```bash
# Navegar a la carpeta backend
cd backend

# Activar entorno virtual (si lo tienes)
# Windows:
venv\Scripts\activate
# macOS/Linux:
source venv/bin/activate

# Instalar dependencias (solo la primera vez)
pip install -r requirements.txt

# Arrancar servidor Flask
python run.py
```

**Resultado esperado:**
```
 * Running on http://127.0.0.1:5000/
 * WARNING: This is a development server. Do not use it in production.
```

✅ **Backend corriendo en:** `http://localhost:5000`

---

## 📍 Verificación

Abre tu navegador y verifica:

| Servicio | URL | Estado |
|----------|-----|--------|
| Frontend | http://localhost:5173 | ✓ Deberías ver Login |
| Backend | http://localhost:5000/api | ✓ API disponible |

---

## 🎯 Flujo de Uso

1. **Abrir Frontend**
   - Navegador: `http://localhost:5173`
   - Deberías ver el formulario de Login

2. **Crear Cuenta (Register)**
   - Click en "Regístrate aquí"
   - Llenar formulario
   - Hacer click en "Registrarse"

3. **Login**
   - Usar credenciales que acabas de crear
   - Click en "Iniciar sesión"

4. **Dashboard**
   - Deberías ver el Dashboard con tareas

5. **Usar Componentes**
   - Ver lista de tareas
   - Crear nueva tarea
   - Editar/eliminar tareas
   - Usar Navbar para navegar

---

## 🆘 Problemas Comunes

### "npm: command not found"
```bash
# Verificar Node.js
node --version
npm --version

# Si no está instalado:
# Descargar desde https://nodejs.org
```

### "Port 5173 already in use"
```bash
# Usar otro puerto
npm run dev -- --port 3000
# Acceder a http://localhost:3000
```

### "API connection refused"
```bash
# Verificar que backend está corriendo
# Revisar que backend escucha en puerto 5000
# Verificar REACT_APP_API_URL en .env.local
```

### "Cannot find module @/store"
```bash
# Verificar que vite.config.js tiene alias
# Debe tener: alias: { '@': resolve(__dirname, './src') }
```

### "Tailwind CSS no aplica estilos"
```bash
# Esperar 5-10 segundos a que Vite compile
# Refresh de página (Ctrl+R)
# Limpiar caché del navegador (Ctrl+Shift+Delete)
```

---

## 📂 Estructura de Carpetas Final

```
my-fullstack-app/
├─ frontend/
│  ├─ src/
│  │  ├─ components/ ............... 7 componentes React ✓
│  │  ├─ store/ .................... Estado global ✓
│  │  ├─ services/ ................. API client ✓
│  │  ├─ pages/ .................... Páginas
│  │  ├─ App.jsx
│  │  └─ main.jsx
│  ├─ package.json ................. Dependencias ✓
│  ├─ vite.config.js ............... Config Vite
│  ├─ tailwind.config.js ........... Config Tailwind ✓
│  └─ index.html ................... HTML principal
│
├─ backend/
│  ├─ app/ ......................... Aplicación Flask
│  ├─ run.py ....................... Punto de entrada
│  ├─ requirements.txt ............. Dependencias Python
│  └─ migrations/ .................. Migraciones DB
│
└─ Documentación/
   ├─ COMPONENTES_GUIDE.md ......... Guía componentes
   ├─ COMPONENTES_TLDR.md .......... Quick start
   ├─ COMPONENTES_EJEMPLOS.jsx ..... Ejemplos
   ├─ API_CLIENT_GUIDE.md .......... Guía API
   └─ GLOBAL_STATE_GUIDE.md ........ Guía estado
```

---

## ⚡ Comandos Rápidos

```bash
# Desarrollo Frontend
cd frontend && npm run dev

# Build Frontend
cd frontend && npm run build

# Ejecutar versión compilada
cd frontend && npm run serve

# Desarrollo Backend
cd backend && python run.py

# Instalar dependencias Frontend
cd frontend && npm install

# Instalar dependencias Backend
cd backend && pip install -r requirements.txt
```

---

## 📊 Checklist Final

Antes de usar la aplicación:

- [ ] Node.js v16+ instalado
- [ ] npm v7+ instalado
- [ ] Backend corriendo en :5000
- [ ] Frontend instalado (`npm install`)
- [ ] Frontend corriendo en :5173
- [ ] Navegador abre http://localhost:5173
- [ ] Ves el formulario de Login
- [ ] Puedes hacer Register
- [ ] Puedes hacer Login
- [ ] Ves Dashboard con componentes

---

## 🎉 ¡Listo!

Tu aplicación está completamente lista para desarrollar.

**Próximos pasos:**
1. Arrancar ambos servidores
2. Probar el flujo de Login/Register
3. Explorar los componentes
4. Integrar más funcionalidades según necesites

---

**Última actualización:** Enero 14, 2026
**Estado:** ✅ Todo OK - Listo para arrancar
