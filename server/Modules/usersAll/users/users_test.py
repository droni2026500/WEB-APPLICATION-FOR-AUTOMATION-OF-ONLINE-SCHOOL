# Импорты flask
from bson import json_util
from flask_pymongo import PyMongo
from flask import Flask, request, jsonify
import json
from bson import ObjectId

app = Flask(__name__)
app.debug = True

app.config["MONGO_URI"] = "mongodb://Admin:555552026Zz1010@2.59.43.6:27017/users?authSource=admin"
mongodb_client = PyMongo(app)
db = mongodb_client.db


# http://2.59.43.6:5002/api/deals/addDealsFlow?first_name={object.user.first_name}&last_name={object.user.last_name}&email={object.user.email}&phone={object.user.phone}&title={object.positions}&opportunity={object.cost_money_value}&status={object.status}&link={object.payment_link}&manager={object.manager}&utm_source={object.custom_utm_source}&utm_medium={object.custom_utm_medium}&utm_campaign={object.custom_utm_campaign}&utm_content={object.custom_utm_content}&utm_term={object.custom_utm_term}&id_deal={object.id}

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
    role = req.get('role', None)
    if db.Users.find_one({"email": email}):
        return "User exists", 409
    else:
        db.Users.insert_one({
            'full_name': full_name,
            'email': email,
            'password': password,
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


# @app.route("/api/users/findRoleUsers", methods=["POST"])
# def findRoleUsers():
#     return "", 200


if __name__ == '__main__':
    app.run(host="0.0.0.0")
