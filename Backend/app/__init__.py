from flask import Flask
from .extensions import db, ma, jwt
from .routes import api, main_bp
from flask_cors import CORS

def create_app():
    app = Flask(__name__)
    CORS(app) # Enable CORS for all routes
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
