from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token

from app.extensions import db
from app.models.user import User
from app.utils.responses import json_response


auth_bp = Blueprint('auth', __name__, url_prefix='/api/auth')

@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')

    if User.query.filter_by(username=username).first():
        return json_response("error", "Username already exists", code=400)

    if User.query.filter_by(email=email).first():
        return json_response("error", "Email already exists", code=400)

    new_user = User(username=username, email=email)
    new_user.set_password(password)

    db.session.add(new_user)
    db.session.commit()

    return json_response("success", "User registered successfully", new_user.to_dict(), 201)

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')

    # Intentar encontrar usuario por username o email
    user = None
    if username:
        user = User.query.filter_by(username=username).first()
    elif email:
        user = User.query.filter_by(email=email).first()

    if user and user.check_password(password):
        access_token = create_access_token(identity=str(user.id))
        data = {"token": access_token, "user": user.to_dict()}
        return json_response("success", "Login successful", data, 200)

    return json_response("error", "Invalid credentials", code=401)