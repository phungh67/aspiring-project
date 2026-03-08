from flask import Blueprint

from app.routes.user_routes import user_bp

blueprints = [user_bp]