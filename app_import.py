from flask import Flask
from app import Config

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    app.config["SESSION_PERMANENT"] = False
    app.config["SESSION_TYPE"] = "filesystem"
    app.config['SECRET_KEY'] = 'key'
    app.secret_key = 'key'
    app.debug = True

    from app import routes
    return app