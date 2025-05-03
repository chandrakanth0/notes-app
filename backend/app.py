from flask import Flask
from flask_cors import CORS
from flask_session import Session
from extensions import mysql  # <-- import here

def create_app():
    app = Flask(__name__)
    app.config.from_pyfile('config.py')

    CORS(app, supports_credentials=True)
    Session(app)
    mysql.init_app(app)  # <-- initialize MySQL with app

    from routes.auth import auth_bp
    from routes.notes import notes_bp

    app.register_blueprint(auth_bp)
    app.register_blueprint(notes_bp)

    return app

if __name__ == "__main__":
    app = create_app()
    app.run(debug=True)
