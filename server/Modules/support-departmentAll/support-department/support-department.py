# Импорты flask
import json
from bson import ObjectId
from flask import Flask, jsonify, request
from flask_pymongo import PyMongo
import re

app = Flask(__name__)
app.debug = True

# app.config["MONGO_URI"] = "mongodb://admin1:admin1@213.183.53.93:27019/support-department?authSource=support-department"
curatorsConnection = PyMongo(app,
                             uri="mongodb://admin1:admin1@213.183.53.93:27019/support-department?authSource=support"
                                 "-department")
usersConnection = PyMongo(app, uri="mongodb://admin1:admin1@213.183.53.93:27018/users?authSource=users")

# mongodb_client = PyMongo(app)
db = curatorsConnection.db
usersDB = usersConnection.db


@app.route("/api/support-department/addUserData", methods=["GET", "POST"])
def addUserData():
    user_id = request.args.get('user_id')
    first_name = request.args.get('first_name')
    last_name = request.args.get('last_name')
    email = request.args.get('email')
    type = request.args.get('type')
    link = request.args.get('link')
    chat_link = request.args.get('chat_link')
    in_chat = "нет"
    flow = request.args.get('flow')
    tg_id = ""
    lessons = []
    colors = []
    if type == "uploading":
        find_table = db.tabels.find_one({"flow": flow, "curator": "maildron@yandex.ru"})
        if find_table:
            columns = find_table["cols"]
            tables_id = find_table["_id"]
            for i in range(len(columns)):
                accessor = columns[i]["accessor"]
                lessons.append(accessor)
            print(lessons)
            string = ''.join(lessons)
            find_coll = re.findall(r'(col[7-9]|[1-5][\d])', string)
            rows = {item: "нет" for item in find_coll}
            user_rows = {
                "col1": first_name,
                "col2": last_name,
                "col3": email,
                "col4": link,
                "col5": in_chat,
                "col6": tg_id,
            }
            user_rows.update(rows)
            print(user_rows)
            for i in range(len(find_coll)):
                colors.append({find_coll[i]: "нет"})
            students = db.students.insert_one({
                "user_id": user_id,
                "first_name": first_name,
                "last_name": last_name,
                "email": email,
                "link": link,
                "chat_link": chat_link,
                "in_chat": in_chat,
                "tg_id": tg_id
            })
            students_id = students.inserted_id
            db.rows.insert_one({
                "user_id": students_id,
                "tables_id": tables_id,
                "rows": user_rows
            })
            return "", 200
        else:
            return "Error", 400
    else:
        student = db.students.find_one({"email": email})
        student_id = student["_id"]
        update = db.rows.update_one({'user_id': student_id}, {'$set': {'rows.cols.' + type: 'да'}})
        print(update)
        return "", 200


@app.route("/api/support-department/createTable", methods=["GET", "POST"])
def addTable():
    cols = []
    req = request.get_json(force=True)
    table_name = req.get('tableName', None)
    flow = req.get('flow', None)
    curators = req.get('curator', None)
    data = [
        {
            'header': 'Имя',
            'accessor': 'col1',
            'width': 80
        },
        {
            'header': 'Фамилия',
            'accessor': 'col2',
            'width': 80
        },
        {
            'header': 'Почта',
            'accessor': 'col3',
            'width': 250
        },
        {
            'header': 'Ссылка',
            'accessor': 'col4',
            'width': 80
        },
        {
            'header': 'Добавлен в чат',
            'accessor': 'col5',
            'width': 120
        },
        {
            'header': 'Ник в ТГ',
            'accessor': 'col6',
            'width': 120
        },
    ]
    lessons = req.get('lessons', None)
    for i in range(len(data)):
        cols.append(data[i])
    for i in range(len(lessons)):
        cols.append(lessons[i])
    db.tabels.insert_one({
        'name': table_name,
        'flow': flow,
        'curator': curators,
        'lessons': lessons,
        'cols': cols
    })
    return "", 200


@app.route("/api/support-department/findTable", methods=["POST"])
def findTable():
    req = request.get_json(force=True)
    flow = req.get('flow', None)
    curator = req.get('curator', None)
    find_table = db.tabels.find_one({"flow": flow, "curator": curator})
    if find_table:
        columns = find_table["cols"]
        tables_id = find_table["_id"]
        find_data = db.rows.find({"tables_id": tables_id})
        if find_data:
            rows = []
            for data in find_data:
                print(data["rows"])
                rows.append(data["rows"])
            return jsonify(columns, rows), 200
        else:
            return "None data", 400
    else:
        return "Table is not exist", 400


@app.route("/api/support-department/findCurators", methods=["GET", "POST"])
def findCurators():
    curators_array = []
    req = request.get_json(force=True)
    get_flow = req.get('flow', None)
    print(get_flow)
    find_curators = db.tabels.find({"flow": get_flow})
    if find_curators:
        for curators in find_curators:
            curators = curators["curator"]
            find_name_curators = usersDB.users.find_one({"email": curators})
            if find_name_curators:
                curator_name = find_name_curators["full_name"]
                curators_json = {
                    "value": curators,
                    "text": curator_name
                }
                curators_array.append(curators_json)
            return jsonify(curators_array), 200


@app.route("/api/support-department/findFlows", methods=["GET"])
def findFlows():
    flows_array = []
    find_flow = db.flows.find()
    if find_flow:
        for flows in find_flow:
            value = flows["flow"]
            text = flows["name"]
            flows_json = {
                "value": value,
                "text": text
            }
            flows_array.append(flows_json)
        print(flows_array)
        return jsonify(flows_array), 200
    else:
        return "error", 400


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5002)
