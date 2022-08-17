# Импорты flask
import flask
from flask import request, jsonify, Response
from flask_pymongo import PyMongo
from werkzeug.security import generate_password_hash, check_password_hash

# Импорты flask_jwt_extended
from flask_jwt_extended import (create_access_token, decode_token, create_refresh_token,
                                get_jwt, jwt_required, JWTManager)

# Импорты datetime
from datetime import datetime, timedelta, timezone

# Импорты bson
from bson import ObjectId

ACCESS_EXPIRES = timedelta(hours=1)

# Инициализация flask приложения
app = flask.Flask(__name__)
app.debug = True
app.config["JWT_SECRET_KEY"] = "secterkey"  # Change this!
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(minutes=30)
app.config["JWT_REFRESH_TOKEN_EXPIRES"] = timedelta(days=30)
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = ACCESS_EXPIRES

#app.config["MONGO_URI"] = "mongodb://admin1:admin1@213.183.53.93:27018/users?authSource=users"
app.config["MONGO_URI"] = "mongodb://Admin:555552026Zz1010@2.59.43.6:27017/Users?authSource=admin"
# Подключение mongodb
mongodb_client = PyMongo(app)
db = mongodb_client.db

jwt = JWTManager(app)

# Переменные время
now = datetime.now(timezone.utc)
target_timestamp = datetime.timestamp(now)

hash = generate_password_hash("12345")


@app.route('/api/users/check_tokens', methods=['GET'])
def check_tokens():
    for x in db.Sessions.find():
        id_session = x['_id']
        expired = x['resfresh_token']['expired']
        if target_timestamp >= expired:
            db.Sessions.delete_one({'_id': ObjectId(id_session)})
        else:
            return "Все токены валидны", 200
    else:
        return "Записей нет", 200
    return "База почищена", 200


# Функция авториазции
@app.route('/api/users/login', methods=['POST'])
def login():
    try:
        req = flask.request.get_json(force=True)
        email = req.get('email', None)
        password = req.get('password', None)
        crypto_pass = check_password_hash(hash, password)
        print(crypto_pass)
        find_user = db.Users.find_one({"email": email})
        if find_user:
            hash_pass = find_user["password"]
            check_password = check_password_hash(hash_pass, password)
            if check_password:
                user_id = find_user["_id"]
                role = find_user["role"]
                user_agent = request.headers.get('User-Agent')
                user = (email, role)
                access_token = create_access_token(identity=user)
                refresh_token = create_refresh_token(identity=user)
                decoding_token = decode_token(refresh_token)
                response = jsonify({"msg": "login successful", "access_token": access_token, "role": role})
                response.set_cookie('refresh_token', refresh_token, httponly=True)
                db.Sessions.insert_one({
                    'user': ObjectId(user_id),
                    'resfresh_token': {
                        'resfresh_token': refresh_token,
                        'created_at': decoding_token["nbf"],
                        'expired': decoding_token["exp"]
                    },
                    'user_agent': user_agent
                })
                return response
            else:
                return Response(
                    "The response body goes here",
                    status=400,
                )
        else:
            return Response(
                "The response body goes here",
                status=400,
            )
    except:
        return "Error", 400


@app.route('/api/users/logout', methods=['POST'])
@jwt_required()
def logout():
    response = jsonify({"msg": "logout successful"})
    response.delete_cookie('refresh_token')
    return response


@app.route('/api/users/refresh', methods=['POST'])
def refresh():
    req = flask.request.get_json(force=True)
    access_token = req.get('access_token', None)
    refresh_token = request.cookies.get('refresh_token')
    if refresh_token:
        decoding_refresh_token = decode_token(refresh_token)
        decoding_access_token = decode_token(access_token)
        exp_timestamp_refresh = decoding_refresh_token["exp"]
        exp_timestamp_access = decoding_access_token["exp"]
        if target_timestamp < exp_timestamp_access:
            if target_timestamp < exp_timestamp_refresh:
                return jsonify({"msg": "isAuth"}), 200
            else:
                return jsonify({"msg": "refresh_token invalid"}), 401
        else:
            if target_timestamp < exp_timestamp_refresh:
                access_token = create_access_token(identity="user")
                refresh_token = create_refresh_token(identity="user")
                response = jsonify({"msg": "refresh successful", "access_token": access_token})
                response.set_cookie('refresh_token', refresh_token, httponly=True)
                return response, 200
            else:
                return jsonify({"msg": "refresh_token invalid"}), 401
    else:
        return jsonify({"msg": "refresh_token is missing"}), 401


@app.route("/api/users/getUsers", methods=["POST", "GET"])
def getUsers():
    _todos = db.Users.find()
    item = {}
    data = []
    for todo in _todos:
        item = {
            'id': str(todo['_id']),
            'full_name': todo['full_name'],
            'email': todo['email'],
            'role': todo['role'],
        }
        data.append(item)

    return jsonify(data)
    # find_users = db.users.find()
    # return jsonify([todo for todo in find_users])
    # return json.dumps([users for users in find_users], indent=4, default=json_util.default)


@app.route("/api/users/addUsers", methods=["POST"])
def addUsers():
    req = request.get_json(force=True)
    full_name = req.get('full_name', None)
    email = req.get('email', None)
    password = req.get('password', None)
    crypto_pass = generate_password_hash(password, method='sha256')
    role = req.get('role', None)
    if db.Users.find_one({"email": email}):
        return "User exists", 409
    else:
        db.Users.insert_one({
            'full_name': full_name,
            'email': email,
            'password': crypto_pass,
            'role': role,
        })
        return "User added", 200
    return "Error", 400


@app.route("/api/users/deleteUsers", methods=["POST"])
def deleteUsers():
    req = request.get_json(force=True)
    requests = req.get('selectedRows', None)
    for i in range(len(requests)):
        user_id = ObjectId(requests[i]["id"])
        print(user_id)
        delete_users = db.Users.delete_one({"_id": user_id})
    if delete_users is not None:
        return "User delete", 200
    else:
        return "Error", 400


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001)
