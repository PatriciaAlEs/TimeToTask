import os

from flask import Flask
from flask.cli import with_appcontext
import click
from werkzeug.exceptions import BadRequest, Unauthorized, NotFound

from .config import Config
from .extensions import db, jwt, cors
from .routes import register_blueprints
from .utils.responses import json_response


def get_cors_origins():
    origins = [
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "http://localhost:3001",
        "http://127.0.0.1:3001",
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ]
    # Añadir origen de producción desde variable de entorno
    frontend_url = os.environ.get("FRONTEND_URL")
    if frontend_url:
        origins.append(frontend_url)
    return origins


def create_app(config_object: type[Config] = Config) -> Flask:
    app = Flask(__name__)
    app.config.from_object(config_object)

    db.init_app(app)
    jwt.init_app(app)
    cors.init_app(app, resources={
        r"/*": {
            "origins": get_cors_origins(),
            "methods": ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
            "allow_headers": ["Content-Type", "Authorization"],
            "supports_credentials": True
        }
    })

    register_blueprints(app)
    register_cli(app)
    register_error_handlers(app)

    # Auto-crear tablas y seed si la DB está vacía (útil para deploy en Render)
    with app.app_context():
        db.create_all()
        _auto_seed_if_empty()

    return app


def _auto_seed_if_empty():
    """Inserta datos de demo si la base de datos está vacía."""
    from .models.user import User
    if User.query.first() is not None:
        return

    from datetime import datetime, timedelta
    from .models.project import Project
    from .models.task import Task

    print("[AUTO-SEED] Base de datos vacía, creando datos de demo...")

    users = [
        User(username="patricia", email="patricia@example.com"),
        User(username="carlos", email="carlos@example.com"),
        User(username="ana", email="ana@example.com"),
    ]
    for u in users:
        u.set_password("password123")
        db.session.add(u)
    db.session.commit()

    projects = [
        Project(name="Portal Clientes", description="Seguimiento de incidencias y entregas del portal principal", color="from-orange-500 to-orange-600", owner_id=users[0].id),
        Project(name="Campaña Marketing Q2", description="Planificación de contenidos, anuncios y reporting semanal", color="from-blue-500 to-blue-600", owner_id=users[0].id),
        Project(name="Migración ERP", description="Integración de módulos, pruebas funcionales y despliegue", color="from-green-500 to-green-600", owner_id=users[0].id),
    ]
    for p in projects:
        db.session.add(p)
    db.session.commit()

    now = datetime.now()
    tasks_data = [
        ("Crear backlog inicial de sprint", "feature", "high", "done", True, users[0].id, projects[0].id, 25, 20),
        ("Ajustar colores por tipo de tarea", "design", "medium", "inReview", False, users[1].id, projects[1].id, 18, 3),
        ("Corregir bug en drag and drop", "bug", "high", "done", True, users[1].id, projects[1].id, 16, 7),
        ("Definir formulario de creación de tareas", "feature", "high", "done", True, users[2].id, projects[0].id, 15, 10),
        ("Documentar flujo registro/login/dashboard", "documentation", "medium", "inProgress", False, users[0].id, projects[2].id, 14, 1),
        ("Preparar test de calendario mensual", "testing", "medium", "selected", False, users[2].id, projects[2].id, 13, 2),
        ("Mejorar estado vacío de columnas", "improvement", "low", "backlog", False, users[1].id, projects[1].id, 12, 11),
        ("Implementar persistencia de filtros", "feature", "medium", "inProgress", False, users[0].id, projects[0].id, 10, 1),
        ("Refactor de componentes de resumen", "improvement", "medium", "inReview", False, users[2].id, projects[2].id, 9, 2),
        ("Corregir validación de prioridad", "bug", "high", "selected", False, users[0].id, projects[0].id, 8, 4),
        ("Añadir ejemplos en documentación interna", "documentation", "low", "backlog", False, users[1].id, projects[2].id, 7, 7),
        ("Diseñar visual de post-its calendario", "design", "medium", "done", True, users[2].id, projects[1].id, 6, 3),
        ("QA flujo completo usuario", "testing", "high", "inProgress", False, users[0].id, projects[2].id, 5, 0),
        ("Optimizar consulta de tareas", "improvement", "high", "inProgress", False, users[1].id, projects[0].id, 4, 0),
        ("Revisar estructura de rutas frontend", "documentation", "medium", "selected", False, users[2].id, projects[2].id, 3, 1),
        ("Arreglar mismatch de completed/status", "bug", "high", "done", True, users[0].id, projects[0].id, 2, 0),
        ("Nueva mejora en tablero por columnas", "improvement", "low", "backlog", False, users[1].id, projects[1].id, 1, 1),
        ("Agregar tarjetas diarias al calendario", "feature", "high", "done", True, users[2].id, projects[0].id, 1, 0),
        ("Planificar roadmap del mes", "feature", "high", "inProgress", False, users[0].id, projects[0].id, 0, 0),
        ("Ajustar tarjetas del calendario", "design", "medium", "inReview", False, users[0].id, projects[0].id, 1, 0),
        ("Revisar backlog de bugs críticos", "bug", "high", "selected", False, users[0].id, projects[0].id, 2, 1),
        ("Documentar release v1.2", "documentation", "medium", "done", True, users[0].id, projects[0].id, 3, 1),
        ("Crear suite smoke de autenticación", "testing", "high", "inProgress", False, users[0].id, projects[0].id, 4, 2),
        ("Optimizar consulta de tareas por usuario", "improvement", "medium", "backlog", False, users[0].id, projects[0].id, 5, 2),
        ("Depurar issue de redirección", "bug", "high", "done", True, users[0].id, projects[0].id, 6, 3),
        ("Refactor de tarjetas resumen", "improvement", "low", "selected", False, users[0].id, projects[0].id, 7, 2),
    ]

    for title, ttype, priority, status, completed, uid, pid, created_ago, updated_ago in tasks_data:
        created_at = now - timedelta(days=created_ago)
        updated_at = now - timedelta(days=updated_ago)
        task = Task(
            title=title, type=ttype, priority=priority, status=status,
            completed=completed, user_id=uid, project_id=pid,
            created_at=created_at, updated_at=updated_at,
            dueDate=updated_at + timedelta(days=7),
        )
        db.session.add(task)

    db.session.commit()
    print(f"[AUTO-SEED] Creados {len(users)} usuarios, {len(projects)} proyectos, {len(tasks_data)} tareas")
    print("[AUTO-SEED] Login: patricia@example.com / password123")


def register_cli(app: Flask) -> None:
    @app.cli.command("create-db")
    @with_appcontext
    def create_db_command():
        """Create all database tables."""

        db.create_all()
        click.echo("Database tables created.")


def register_error_handlers(app: Flask) -> None:
    @app.errorhandler(BadRequest)
    def handle_bad_request(error):
        return json_response("error", str(error), code=400)

    @app.errorhandler(Unauthorized)
    def handle_unauthorized(error):
        return json_response("error", "Unauthorized", code=401)

    @app.errorhandler(NotFound)
    def handle_not_found(error):
        return json_response("error", "Not found", code=404)
    
    # JWT error handlers
    @jwt.invalid_token_loader
    def invalid_token_callback(error_string):
        return json_response("error", f"Invalid token: {error_string}", code=401)
    
    @jwt.unauthorized_loader
    def missing_token_callback(error_string):
        return json_response("error", "Missing authorization token", code=401)
    
    @jwt.expired_token_loader
    def expired_token_callback(jwt_header, jwt_payload):
        return json_response("error", "Token has expired", code=401)