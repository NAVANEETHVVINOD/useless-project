from flask import Flask
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager
from flask_cors import CORS

from config import Config
from models.user_model import db
from routes.auth_routes import auth_bp

# Create and configure the app
app = Flask(__name__)
app.config.from_object(Config)

# Enable Cross-Origin Resource Sharing (CORS)
# This is crucial for allowing your Nuxt frontend to talk to this backend
CORS(app)

# Initialize extensions
db.init_app(app)
migrate = Migrate(app, db)
jwt = JWTManager(app)

# Register Blueprints (our routes)
app.register_blueprint(auth_bp, url_prefix='/auth')

# A simple route to test if the server is up
@app.route('/')
def index():
    return "Kanya Backend is running!"

if __name__ == '__main__':
    app.run(debug=True)