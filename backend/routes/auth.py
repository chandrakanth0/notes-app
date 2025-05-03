from flask import Blueprint, request, session, jsonify
from extensions import mysql  # ✅ import shared MySQL instance

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    cursor = mysql.connection.cursor()
    print("executed the /login")
    cursor.execute("SELECT * FROM users WHERE username=%s AND password=%s",
                   (data['username'], data['password']))
    user = cursor.fetchone()
    if user:
        session['user'] = data['username']
        return jsonify({"msg": "Login successful"}), 200
    return jsonify({"msg": "Invalid credentials"}), 401
