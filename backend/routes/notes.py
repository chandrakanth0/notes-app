from flask import Blueprint, request, session, jsonify
from flask_mysqldb import MySQL

notes_bp = Blueprint('notes', __name__)
mysql = MySQL()

def require_login():
    if 'user' not in session:
        return False, jsonify({"msg": "Unauthorized"}), 401
    return True, None, None

@notes_bp.route('/notes', methods=['POST'])
def create_note():
    logged_in, msg, code = require_login()
    if not logged_in: return msg, code

    data = request.get_json()
    username = session['user']

    cur = mysql.connection.cursor()
    cur.execute("SELECT id FROM users WHERE username=%s", (username,))
    user_id = cur.fetchone()[0]

    cur.execute("INSERT INTO notes (user_id, title, content) VALUES (%s, %s, %s)",
                (user_id, data['title'], data['content']))
    mysql.connection.commit()
    note_id = cur.lastrowid  # get inserted note ID

    return jsonify({
        "id": note_id,
        "title": data['title'],
        "content": data['content']
    }), 201

@notes_bp.route('/notes', methods=['GET'])
def get_notes():
    logged_in, msg, code = require_login()
    if not logged_in: return msg, code

    username = session['user']
    cur = mysql.connection.cursor()
    cur.execute("SELECT id FROM users WHERE username=%s", (username,))
    user_id = cur.fetchone()[0]

    cur.execute("SELECT id, title, content FROM notes WHERE user_id=%s", (user_id,))
    notes = cur.fetchall()
    notes_list = [{"id": n[0], "title": n[1], "content": n[2]} for n in notes]
    return jsonify(notes_list), 200

@notes_bp.route('/notes/<int:note_id>', methods=['PUT'])
def update_note(note_id):
    logged_in, msg, code = require_login()
    if not logged_in: return msg, code

    data = request.get_json()
    username = session['user']
    cur = mysql.connection.cursor()
    cur.execute("SELECT id FROM users WHERE username=%s", (username,))
    user_id = cur.fetchone()[0]

    cur.execute("UPDATE notes SET title=%s, content=%s WHERE id=%s AND user_id=%s",
                (data['title'], data['content'], note_id, user_id))
    mysql.connection.commit()
    return jsonify({"msg": "Note updated"}), 200

@notes_bp.route('/notes/<int:note_id>', methods=['DELETE'])
def delete_note(note_id):
    print("delete called")
    logged_in, msg, code = require_login()
    if not logged_in: return msg, code

    username = session['user']
    cur = mysql.connection.cursor()
    cur.execute("SELECT id FROM users WHERE username=%s", (username,))
    user_id = cur.fetchone()[0]

    cur.execute("DELETE FROM notes WHERE id=%s AND user_id=%s", (note_id, user_id))
    mysql.connection.commit()
    return jsonify({"msg": "Note deleted"}), 200
