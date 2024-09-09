
from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager
from flask_migrate import Migrate
import paypalrestsdk
import os
from config import PAYPAL_CLIENT_ID, PAYPAL_CLIENT_SECRET, PAYPAL_MODE


db = SQLAlchemy()
migrate = Migrate()
jwt = JWTManager()

def create_app():
    app = Flask(__name__)
    app.config.from_pyfile('../config.py')
    # app.config.from_pyfile('config.py')
    # app.config.from_object('config')  # Load configuration from config.py
    

    # Enable CORS for all origins
    CORS(app)

    # Initialize database and JWT
    db.init_app(app)
    jwt.init_app(app)
    migrate.init_app(app, db)

    # Configure PayPal SDK
    paypalrestsdk.configure({
        "mode": PAYPAL_MODE,  # sandbox or live
        "client_id": PAYPAL_CLIENT_ID,
        "client_secret": PAYPAL_CLIENT_SECRET
    })

    # Register blueprints
    from routes import api_bp, auth_bp
    app.register_blueprint(api_bp, url_prefix='/api')
    app.register_blueprint(auth_bp, url_prefix='/auth')

    return app
