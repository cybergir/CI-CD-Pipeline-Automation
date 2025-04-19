from flask import Flask
from .config import Config
from .extensions import db
from .routes import api

def create_app():
    """
    Application factory function.
    Creates and configures the Flask app instance.
    """
    app = Flask(__name__)

    # Load configuration from Config class
    app.config.from_object(Config)

    # Initialize Flask extensions (e.g., SQLAlchemy)
    db.init_app(app)

    # Register API routes (Flask-RESTful)
    api.init_app(app)

    return app
