from flask import Flask
from .extensions import db, ma, jwt
from .routes import api, main_bp  # import both the API and blueprint

def create_app():
    app = Flask(__name__)
    app.config.from_object('app.config.Config')

    # Initialize extensions
    db.init_app(app)
    ma.init_app(app)
    jwt.init_app(app)

    # Register API routes
    api.init_app(app)

    # Register blueprint for root and other non-API routes
    app.register_blueprint(main_bp)

    return app
