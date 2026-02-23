from .auth import auth_bp
from .api import api_bp


def register_blueprints(app):
    app.register_blueprint(auth_bp)
    app.register_blueprint(api_bp)