# Импорты flask
from flask_pymongo import PyMongo
from flask import Flask, request, jsonify

app = Flask(__name__)
app.debug = True

app.config["MONGO_URI"] = "mongodb://Admin:555552026Zz1010@2.59.43.6:27017/Deals?authSource=admin"
mongodb_client = PyMongo(app)
db = mongodb_client.db


# http://2.59.43.6:5002/api/deals/addDealsFlow?first_name={object.user.first_name}&last_name={object.user.last_name}&email={object.user.email}&phone={object.user.phone}&title={object.positions}&opportunity={object.cost_money_value}&status={object.status}&link={object.payment_link}&manager={object.manager}&utm_source={object.custom_utm_source}&utm_medium={object.custom_utm_medium}&utm_campaign={object.custom_utm_campaign}&utm_content={object.custom_utm_content}&utm_term={object.custom_utm_term}&id_deal={object.id}

@app.route("/api/deals/addDealsFlow", methods=["POST"])
def addDealsFlow():
    first_name = request.args.get('first_name')
    last_name = request.args.get('last_name')
    email = request.args.get('email')
    phone = request.args.get('phone')
    title = request.args.get('title')
    opportunity = request.args.get('opportunity')
    status = request.args.get('status')
    link = request.args.get('link')
    manager = request.args.get('manager')
    utm_source = request.args.get('utm_source')
    utm_medium = request.args.get('utm_medium')
    utm_campaign = request.args.get('utm_campaign')
    utm_content = request.args.get('utm_content')
    utm_term = request.args.get('utm_term')
    id_deal = request.args.get('id_deal')
    flow = request.args.get('flow')
    collection = db[flow]
    collection.insert_one({
        'first_name': first_name,
        'last_name': last_name,
        'email': email,
        'phone': phone,
        'title': title,
        'opportunity': opportunity,
        'status': status,
        'link': link,
        'manager': manager,
        'utm_source': utm_source,
        'utm_medium': utm_medium,
        'utm_campaign': utm_campaign,
        'utm_content': utm_content,
        'utm_term': utm_term,
        'id_deal': id_deal
    })
    return "", 200


@app.route("/api/deals/findDealsFlow", methods=["GET"])
def findDealsFlow():
    flow = ""
    find_title = db.flow5.find()
    data = []
    for todo in find_title:
        item = str(todo['title'])
        data.append(item)
    unique_titles = list(set(data))
    return str(unique_titles), 200
    # return jsonify(
    #     status=True,
    #     data=data
    # )


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5002)
