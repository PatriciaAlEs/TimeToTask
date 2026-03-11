import os


BASE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
DEFAULT_SQLITE_PATH = os.path.join(BASE_DIR, "site.db")


def get_database_url():
    url = os.environ.get("DATABASE_URL", f"sqlite:///{DEFAULT_SQLITE_PATH}")
    # Render usa postgres:// pero SQLAlchemy necesita postgresql://
    if url.startswith("postgres://"):
        url = url.replace("postgres://", "postgresql://", 1)
    return url


class Config:
    SECRET_KEY = os.environ.get("SECRET_KEY", "your_default_secret_key")
    SQLALCHEMY_DATABASE_URI = get_database_url()
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    JWT_SECRET_KEY = os.environ.get("JWT_SECRET_KEY", "your_jwt_secret_key")