# --- CHANGE: Added request and jsonify for the new API endpoint ---
from flask import Flask, request, jsonify
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager
from flask_cors import CORS

# --- CHANGE: Added new imports for AI generation and environment variables ---
import os
from dotenv import load_dotenv
import google.generativeai as genai

from config import Config
from models.user_model import db
from routes.auth_routes import auth_bp

# --- CHANGE: Load environment variables from the .env file ---
load_dotenv()

# Create and configure the app
app = Flask(__name__)
app.config.from_object(Config)

# --- CHANGE: Configure the Google AI client using the secure API key ---
# This line MUST be after load_dotenv()
try:
    genai.configure(api_key=os.environ.get("GOOGLE_API_KEY"))
except AttributeError:
    print("WARNING: GOOGLE_API_KEY not found. AI features will not work.")


# Enable Cross-Origin Resource Sharing (CORS)
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

# --- CHANGE: Added the new, secure route for AI bio generation ---
@app.route('/api/generate-bio', methods=['POST'])
def generate_bio_route():
    # Get the pet data from the frontend request
    data = request.get_json()
    if not data:
        return jsonify({"error": "Missing pet data"}), 400

    pet_name = data.get('name', 'My pet')
    pet_species = data.get('species', 'creature')
    pet_crime = data.get('favCrime', 'unspecified chaos')

    # Create the model and a sarcastic prompt
    model = genai.GenerativeModel('gemini-pro')
    prompt = f"""
    You are a witty, slightly sarcastic pet profile writer for a pet dating app.
    Based on the following details, write a short, funny, first-person bio (2-3 sentences).
    Make it sound like the pet is writing it.

    Pet's Name: {pet_name}
    Species: {pet_species}
    Favorite Crime: {pet_crime}
    """

    try:
        response = model.generate_content(prompt)
        # Return the generated text in a JSON object
        return jsonify({"bio": response.text.strip()})
    except Exception as e:
        print(f"AI generation failed: {e}")
        # Provide a generic error to the user for security
        return jsonify({"error": "Failed to generate bio due to a server error."}), 500


if __name__ == '__main__':
    app.run(debug=True)