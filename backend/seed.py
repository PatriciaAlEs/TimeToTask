"""Seed de demo para validar flujo Dashboard + Board."""

from datetime import datetime, timedelta

from app import create_app, db
from app.models.project import Project
from app.models.task import Task
from app.models.user import User


def seed_database():
    """Crea usuarios y tareas distribuidas por días para probar calendario/resumen."""

    app = create_app()

    with app.app_context():
        print("[*] Limpiando base de datos...")
        db.drop_all()
        db.create_all()
        print("[OK] Base de datos limpia y creada")

        print("\n[*] Creando usuarios...")
        users = [
            User(username="patricia", email="patricia@example.com"),
            User(username="carlos", email="carlos@example.com"),
            User(username="ana", email="ana@example.com"),
        ]

        for user in users:
            user.set_password("password123")
            db.session.add(user)

        db.session.commit()
        print(f"[OK] {len(users)} usuarios creados")

        print("\n[*] Creando proyectos de demo...")
        projects = [
            Project(
                name="Portal Clientes",
                description="Seguimiento de incidencias y entregas del portal principal",
                color="from-orange-500 to-orange-600",
                owner_id=users[0].id,
            ),
            Project(
                name="Campaña Marketing Q2",
                description="Planificación de contenidos, anuncios y reporting semanal",
                color="from-blue-500 to-blue-600",
                owner_id=users[0].id,
            ),
            Project(
                name="Migración ERP",
                description="Integración de módulos, pruebas funcionales y despliegue",
                color="from-green-500 to-green-600",
                owner_id=users[0].id,
            ),
        ]

        for project in projects:
            db.session.add(project)

        db.session.commit()
        print(f"[OK] {len(projects)} proyectos creados")

        patricia_user = users[0]

        project_by_key = {
            "portal": projects[0],
            "mobile": projects[1],
            "infra": projects[2],
        }

        print("\n[*] Creando tareas de demo...")
        now = datetime.now()

        tasks_data = [
            {
                "title": "Crear backlog inicial de sprint",
                "description": "Definir tareas base para tablero de trabajo",
                "type": "feature",
                "priority": "high",
                "status": "done",
                "completed": True,
                "user_id": users[0].id,
                "project_id": project_by_key["portal"].id,
                "created_days_ago": 25,
                "updated_days_ago": 20,
            },
            {
                "title": "Ajustar colores por tipo de tarea",
                "description": "Aplicar estilos por tipo para tarjetas del board",
                "type": "design",
                "priority": "medium",
                "status": "inReview",
                "completed": False,
                "user_id": users[1].id,
                "project_id": project_by_key["mobile"].id,
                "created_days_ago": 18,
                "updated_days_ago": 3,
            },
            {
                "title": "Corregir bug en drag and drop",
                "description": "Al mover tareas entre columnas no persistía el tipo",
                "type": "bug",
                "priority": "high",
                "status": "done",
                "completed": True,
                "user_id": users[1].id,
                "project_id": project_by_key["mobile"].id,
                "created_days_ago": 16,
                "updated_days_ago": 7,
            },
            {
                "title": "Definir formulario de creación de tareas",
                "description": "Campos mínimos para flujo principal",
                "type": "feature",
                "priority": "high",
                "status": "done",
                "completed": True,
                "user_id": users[2].id,
                "project_id": project_by_key["portal"].id,
                "created_days_ago": 15,
                "updated_days_ago": 10,
            },
            {
                "title": "Documentar flujo registro/login/dashboard",
                "description": "Guía funcional para QA y demos",
                "type": "documentation",
                "priority": "medium",
                "status": "inProgress",
                "completed": False,
                "user_id": users[0].id,
                "project_id": project_by_key["infra"].id,
                "created_days_ago": 14,
                "updated_days_ago": 1,
            },
            {
                "title": "Preparar test de calendario mensual",
                "description": "Validar render de tareas por día",
                "type": "testing",
                "priority": "medium",
                "status": "selected",
                "completed": False,
                "user_id": users[2].id,
                "project_id": project_by_key["infra"].id,
                "created_days_ago": 13,
                "updated_days_ago": 2,
            },
            {
                "title": "Mejorar estado vacío de columnas",
                "description": "Incluir feedback visual cuando no hay tareas",
                "type": "improvement",
                "priority": "low",
                "status": "backlog",
                "completed": False,
                "user_id": users[1].id,
                "project_id": project_by_key["mobile"].id,
                "created_days_ago": 12,
                "updated_days_ago": 11,
            },
            {
                "title": "Implementar persistencia de filtros",
                "description": "Mantener filtros activos al navegar",
                "type": "feature",
                "priority": "medium",
                "status": "inProgress",
                "completed": False,
                "user_id": users[0].id,
                "project_id": project_by_key["portal"].id,
                "created_days_ago": 10,
                "updated_days_ago": 1,
            },
            {
                "title": "Refactor de componentes de resumen",
                "description": "Unificar estilo de tarjetas y contadores",
                "type": "improvement",
                "priority": "medium",
                "status": "inReview",
                "completed": False,
                "user_id": users[2].id,
                "project_id": project_by_key["infra"].id,
                "created_days_ago": 9,
                "updated_days_ago": 2,
            },
            {
                "title": "Corregir validación de prioridad",
                "description": "Aceptar solo high, medium o low",
                "type": "bug",
                "priority": "high",
                "status": "selected",
                "completed": False,
                "user_id": users[0].id,
                "project_id": project_by_key["portal"].id,
                "created_days_ago": 8,
                "updated_days_ago": 4,
            },
            {
                "title": "Añadir ejemplos en documentación interna",
                "description": "Casos reales de uso para el equipo",
                "type": "documentation",
                "priority": "low",
                "status": "backlog",
                "completed": False,
                "user_id": users[1].id,
                "project_id": project_by_key["infra"].id,
                "created_days_ago": 7,
                "updated_days_ago": 7,
            },
            {
                "title": "Diseñar visual de post-its calendario",
                "description": "Tarjetas compactas por día en dashboard",
                "type": "design",
                "priority": "medium",
                "status": "done",
                "completed": True,
                "user_id": users[2].id,
                "project_id": project_by_key["mobile"].id,
                "created_days_ago": 6,
                "updated_days_ago": 3,
            },
            {
                "title": "QA flujo completo usuario",
                "description": "Home > Register > Login > Dashboard > Board",
                "type": "testing",
                "priority": "high",
                "status": "inProgress",
                "completed": False,
                "user_id": users[0].id,
                "project_id": project_by_key["infra"].id,
                "created_days_ago": 5,
                "updated_days_ago": 0,
            },
            {
                "title": "Optimizar consulta de tareas",
                "description": "Reducir latencia al cargar dashboard",
                "type": "improvement",
                "priority": "high",
                "status": "inProgress",
                "completed": False,
                "user_id": users[1].id,
                "project_id": project_by_key["portal"].id,
                "created_days_ago": 4,
                "updated_days_ago": 0,
            },
            {
                "title": "Revisar estructura de rutas frontend",
                "description": "Limpiar rutas y evitar duplicados",
                "type": "documentation",
                "priority": "medium",
                "status": "selected",
                "completed": False,
                "user_id": users[2].id,
                "project_id": project_by_key["infra"].id,
                "created_days_ago": 3,
                "updated_days_ago": 1,
            },
            {
                "title": "Arreglar mismatch de completed/status",
                "description": "Sincronizar métricas de tareas completadas",
                "type": "bug",
                "priority": "high",
                "status": "done",
                "completed": True,
                "user_id": users[0].id,
                "project_id": project_by_key["portal"].id,
                "created_days_ago": 2,
                "updated_days_ago": 0,
            },
            {
                "title": "Nueva mejora en tablero por columnas",
                "description": "Ajustar encabezados y espaciado",
                "type": "improvement",
                "priority": "low",
                "status": "backlog",
                "completed": False,
                "user_id": users[1].id,
                "project_id": project_by_key["mobile"].id,
                "created_days_ago": 1,
                "updated_days_ago": 1,
            },
            {
                "title": "Agregar tarjetas diarias al calendario",
                "description": "Mostrar tareas por día en cuadrícula",
                "type": "feature",
                "priority": "high",
                "status": "done",
                "completed": True,
                "user_id": users[2].id,
                "project_id": project_by_key["portal"].id,
                "created_days_ago": 1,
                "updated_days_ago": 0,
            },

            # Bloque adicional para Patricia (calendario y tareas)
            {
                "title": "Planificar roadmap del mes",
                "description": "Definir prioridades semanales con equipo de producto",
                "type": "feature",
                "priority": "high",
                "status": "inProgress",
                "completed": False,
                "user_id": patricia_user.id,
                "project_id": project_by_key["portal"].id,
                "created_days_ago": 0,
                "updated_days_ago": 0,
            },
            {
                "title": "Ajustar tarjetas del calendario",
                "description": "Mejorar visibilidad de tareas por color",
                "type": "design",
                "priority": "medium",
                "status": "inReview",
                "completed": False,
                "user_id": patricia_user.id,
                "project_id": project_by_key["portal"].id,
                "created_days_ago": 1,
                "updated_days_ago": 0,
            },
            {
                "title": "Revisar backlog de bugs críticos",
                "description": "Priorizar incidencias de login y sesiones",
                "type": "bug",
                "priority": "high",
                "status": "selected",
                "completed": False,
                "user_id": patricia_user.id,
                "project_id": project_by_key["portal"].id,
                "created_days_ago": 2,
                "updated_days_ago": 1,
            },
            {
                "title": "Documentar release v1.2",
                "description": "Actualizar changelog con nuevas rutas protegidas",
                "type": "documentation",
                "priority": "medium",
                "status": "done",
                "completed": True,
                "user_id": patricia_user.id,
                "project_id": project_by_key["portal"].id,
                "created_days_ago": 3,
                "updated_days_ago": 1,
            },
            {
                "title": "Crear suite smoke de autenticación",
                "description": "Validar login, logout y acceso a dashboard",
                "type": "testing",
                "priority": "high",
                "status": "inProgress",
                "completed": False,
                "user_id": patricia_user.id,
                "project_id": project_by_key["portal"].id,
                "created_days_ago": 4,
                "updated_days_ago": 2,
            },
            {
                "title": "Optimizar consulta de tareas por usuario",
                "description": "Reducir tiempo de respuesta en dashboard",
                "type": "improvement",
                "priority": "medium",
                "status": "backlog",
                "completed": False,
                "user_id": patricia_user.id,
                "project_id": project_by_key["portal"].id,
                "created_days_ago": 5,
                "updated_days_ago": 2,
            },
            {
                "title": "Depurar issue de redirección",
                "description": "Corregir retorno indebido a login tras autenticación",
                "type": "bug",
                "priority": "high",
                "status": "done",
                "completed": True,
                "user_id": patricia_user.id,
                "project_id": project_by_key["portal"].id,
                "created_days_ago": 6,
                "updated_days_ago": 3,
            },
            {
                "title": "Refactor de tarjetas resumen",
                "description": "Unificar métricas de estado con gráficos redondos",
                "type": "improvement",
                "priority": "low",
                "status": "selected",
                "completed": False,
                "user_id": patricia_user.id,
                "project_id": project_by_key["portal"].id,
                "created_days_ago": 7,
                "updated_days_ago": 2,
            },
        ]

        tasks = []
        for task_data in tasks_data:
            created_at = now - timedelta(days=task_data.pop("created_days_ago", 0))
            updated_at = now - timedelta(days=task_data.pop("updated_days_ago", 0))

            task = Task(
                **task_data,
                created_at=created_at,
                updated_at=updated_at,
                dueDate=updated_at + timedelta(days=7),
            )
            tasks.append(task)
            db.session.add(task)

        db.session.commit()
        print(f"[OK] {len(tasks)} tareas creadas")

        print("\n" + "=" * 60)
        print("[SUCCESS] Seed de demo aplicado correctamente")
        print("=" * 60)
        print(f"\n[USERS] Usuarios de prueba (password: password123):")
        for user in users:
            print(f"   - {user.username} / {user.email}")

        print(f"\n[STATS] Total usuarios: {len(users)}")
        print(f"[STATS] Total proyectos: {len(projects)}")
        print(f"[STATS] Total tareas: {len(tasks)}")

        print("\n[PROJECTS] Proyectos:")
        for project in projects:
            project_tasks = sum(1 for task in tasks if task.project_id == project.id)
            print(f"   - {project.name}: {project_tasks} tareas")

        print("\n[TYPES] Tareas por tipo:")
        for task_type in ["feature", "bug", "improvement", "documentation", "testing", "design"]:
            count = sum(1 for task in tasks if task.type == task_type)
            print(f"   - {task_type}: {count}")

        print("\n[USERS] Tareas por usuario:")
        for user in users:
            count = sum(1 for task in tasks if task.user_id == user.id)
            print(f"   - {user.email}: {count}")

        print("\n[STATUS] Tareas por estado:")
        for status in ["backlog", "selected", "inProgress", "inReview", "done"]:
            count = sum(1 for task in tasks if task.status == status)
            print(f"   - {status}: {count}")

        completed_count = sum(1 for task in tasks if task.completed)
        print(f"\n[COMPLETED] Tareas completadas: {completed_count}")


if __name__ == "__main__":
    seed_database()
