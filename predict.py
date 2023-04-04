from app_import import create_app

app = create_app()

from app import routes

if __name__ == "__main__":
    app.run(host="http://127.0.0.1:5000", debug=True)
