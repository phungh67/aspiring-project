from flask import Flask
from app.blueprints.home import home_bp
from app.blueprints.letter import letter_bp

def create_app():
    app = Flask(__name__)

    # register all blueprints
    app.register_blueprint(home_bp)
    app.register_blueprint(letter_bp)

    return app