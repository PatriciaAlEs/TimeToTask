from flask import Flask
from flask.cli import with_appcontext
import click
from werkzeug.exceptions import BadRequest, Unauthorized, NotFound

from .config import Config
from .extensions import db, jwt, cors
from .routes import register_blueprints
from .utils.responses import json_response


def create_app(config_object: type[Config] = Config) -> Flask:
    app = Flask(__name__)
    app.config.from_object(config_object)

    db.init_app(app)
    jwt.init_app(app)
    cors.init_app(app, resources={
        r"/*": {
            "origins": [
                "http://localhost:3000",
                "http://127.0.0.1:3000",
                "http://localhost:5173",
                "http://127.0.0.1:5173",
            ],
            "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
            "allow_headers": ["Content-Type", "Authorization"],
            "supports_credentials": True
        }
    })

    register_blueprints(app)
    register_cli(app)
    register_error_handlers(app)

    return app


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