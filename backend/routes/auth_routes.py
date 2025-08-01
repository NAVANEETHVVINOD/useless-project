from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token
from models.user_model import db, User

# Create a "Blueprint" for our auth routes
auth_bp = Blueprint('auth_bp', __name__)

@auth_bp.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')
    city = data.get('city')

    if not all([username, email, password, city]):
        return jsonify({"msg": "Missing required fields"}), 400

    # Check if user already exists
    if User.query.filter_by(email=email).first() or User.query.filter_by(username=username).first():
        return jsonify({"msg": "Email or username already exists"}), 409

    # Hash the password for security
    hashed_password = generate_password_hash(password)

    # Create new user
    new_user = User(
        username=username,
        email=email,
        password_hash=hashed_password,
        city=city
    )

    db.session.add(new_user)
    db.session.commit()
    
    # Create a token for the new user
    access_token = create_access_token(identity=new_user.id)

    return jsonify({"msg": "User created successfully", "token": access_token}), 201

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    
    if not email or not password:
        return jsonify({"msg": "Missing email or password"}), 400

    user = User.query.filter_by(email=email).first()

    # Check if user exists and password is correct
    if not user or not check_password_hash(user.password_hash, password):
        return jsonify({"msg": "Bad email or password"}), 401

    # Create token for the logged-in user
    access_token = create_access_token(identity=user.id)
    
    return jsonify({"token": access_token})