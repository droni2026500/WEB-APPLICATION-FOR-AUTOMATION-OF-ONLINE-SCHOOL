import requests
from mysql.connector import connect, Error
from flask import Flask, jsonify, request

app = Flask(__name__)
app.debug = True

cnx = connect(
    host="87.249.44.94",
    user="gen_user",
    password="555552026Zz1010",
    database="default_db",
)
cursor = cnx.cursor()


@app.route("/api/powerBI/addStudents", methods=["POST"])
def getStudents():
    student_id = request.args.get('id')
    Email = request.args.get('Email')
    Type_of_registration = request.args.get('Type_of_registration')
    Created = request.args.get('Created')
    Name = request.args.get('Name')
    Surname = request.args.get('Surname')
    Phone = request.args.get('Phone')
    Date_of_birth = request.args.get('Date_of_birth')
    Age = request.args.get('Age')
    Country = request.args.get('Country')
    City = request.args.get('City')
    insert_students_query = ("INSERT INTO employees "
                             "(student_id, Email, Type_of_registration, Created, Name, Surname, Phone, Date_of_birth, "
                             "Age, Country, City) "
                             "VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)")
    data_students = (
        student_id, Email, Type_of_registration, Created, Name, Surname, Phone, Date_of_birth, Age, Country, City,)
    cursor.execute(insert_students_query, data_students)
    cnx.commit()


@app.route("/api/powerBI/addDeals", methods=["POST"])
def addDeals():
    user_id = request.args.get('user_id')
    deal_id = request.args.get('deal_id')
    status = request.args.get('status')
    number = request.args.get('number')
    positions = request.args.get('positions')
    cost_money = int(request.args.get('cost_money'))
    left_cost_money = int(request.args.get('left_cost_money'))
    payed_money = int(request.args.get('payed_money'))
    created_at = request.args.get('created_at')
    payed_at = request.args.get('payed_at')
    flow = request.args.get('flow')
    utm_source = request.args.get('utm_source')
    utm_medium = request.args.get('utm_medium')
    utm_campaign = request.args.get('utm_campaign')
    utm_content = request.args.get('utm_source')
    utm_term = request.args.get('utm_medium')
    cpc_utm_source = request.args.get('utm_campaign')
    cpc_utm_medium = request.args.get('utm_source')
    cpc_utm_campaign = request.args.get('utm_medium')
    cpc_utm_content = request.args.get('utm_campaign')
    cpc_utm_term = request.args.get('cpc_utm_term')
    insert_deals_query = ("INSERT INTO deals "
                          "(user_id, deal_id, status, number, positions, cost_money, left_cost_money, payed_money, "
                          "created_at, payed_at, flow, utm_source, utm_medium, utm_campaign, utm_content, utm_term, "
                          "cpc_utm_source, cpc_utm_medium, cpc_utm_campaign, cpc_utm_content, cpc_utm_term)"
                          "VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, "
                          "%s)")
    data_deals = (
        user_id, deal_id, status, number, positions, cost_money, left_cost_money, payed_money, created_at, payed_at,
        flow,
        utm_source, utm_medium, utm_campaign, utm_content, utm_term, cpc_utm_source, cpc_utm_medium, cpc_utm_campaign,
        cpc_utm_content, cpc_utm_term)
    cursor.execute(insert_deals_query, data_deals)
    cnx.commit()
    return "", 200


@app.route("/api/powerBI/getExportID", methods=["POST", "GET"])
def getExportID():
    headers_gc = {'Accept': 'application/json; q=1.0, */*; q=0.1'}
    key = 'O7uhNqp13VEr60hJFPJGu9U13GVPiIetkiBmc7pd6C8nd7Okw0pACLRTtkCuHNAfgh3yoBL4d2sAKZvwNlptAVV8kJoQni6kiJk9QimWczHkMNjSM6VvzU5hjZVYewG5'
    data = {
        'key': 'O7uhNqp13VEr60hJFPJGu9U13GVPiIetkiBmc7pd6C8nd7Okw0pACLRTtkCuHNAfgh3yoBL4d2sAKZvwNlptAVV8kJoQni6kiJk9QimWczHkMNjSM6VvzU5hjZVYewG5',
    }
    groups_id = requests.post(
        f'https://polina-education.getcourse.ru/pl/api/account/deals?key={key}&created_at[from]=2019-01-01',
        headers=headers_gc,
        data=data)
    json_deal_data = groups_id.json()
    print(json_deal_data)
    return json_deal_data, 200


@app.route("/api/powerBI/updateDeals", methods=["POST", "GET"])
def updateDeals():
    id = '9756676'
    headers_gc = {'Accept': 'application/json; q=1.0, */*; q=0.1'}
    data = {
        'key': 'O7uhNqp13VEr60hJFPJGu9U13GVPiIetkiBmc7pd6C8nd7Okw0pACLRTtkCuHNAfgh3yoBL4d2sAKZvwNlptAVV8kJoQni6kiJk9QimWczHkMNjSM6VvzU5hjZVYewG5',
    }
    groups_users = requests.post('https://polina-education.getcourse.ru/pl/api/account/exports/' + id,
                                 headers=headers_gc,
                                 data=data)
    json_users_data = groups_users.json()
    success = json_users_data["success"]
    if success:
        items = json_users_data["info"]["items"]
        for i in range(len(items)):
            deal_id = json_users_data["info"]["items"][i][0]
            deal_number = json_users_data["info"]["items"][i][1]
            user_id = json_users_data["info"]["items"][i][2]
            deal_created_at = json_users_data["info"]["items"][i][6]
            deal_payed_at = json_users_data["info"]["items"][i][7]
            deal_title = json_users_data["info"]["items"][i][8]
            deal_status = json_users_data["info"]["items"][i][9]
            deal_cost = int(json_users_data["info"]["items"][i][10])
            deal_paid = int(json_users_data["info"]["items"][i][11])
            deal_commission = int(json_users_data["info"]["items"][i][12])
            deal_received = int(json_users_data["info"]["items"][i][13])
            deal_earned = int(json_users_data["info"]["items"][i][17])
            payment_system = int(json_users_data["info"]["items"][i][21])
            utm_source = json_users_data["info"]["items"][i][25]
            utm_medium = json_users_data["info"]["items"][i][26]
            utm_campaign = json_users_data["info"]["items"][i][27]
            utm_content = json_users_data["info"]["items"][i][28]
            utm_term = json_users_data["info"]["items"][i][29]
            cpc_utm_source = json_users_data["info"]["items"][i][30]
            cpc_utm_medium = json_users_data["info"]["items"][i][31]
            cpc_utm_campaign = json_users_data["info"]["items"][i][32]
            cpc_utm_content = json_users_data["info"]["items"][i][33]
            cpc_utm_term = json_users_data["info"]["items"][i][34]
            flow = json_users_data["info"]["items"][i][50]
            deal_tags = json_users_data["info"]["items"][i][73]
            offer_tags = json_users_data["info"]["items"][i][74]
            # print(deal_id)
            # print(deal_number)
            # print(user_id)
            # print(deal_created_at)
            # print(deal_payed_at)
            # print(deal_title)
            # print(deal_status)
            # print(deal_cost)
            # print(deal_paid)
            # print(deal_commission)
            # print(deal_earned)
            # print(deal_received)
            # print(payment_system)
            sql = "UPDATE deals SET created_at = %s, payed_at = %s WHERE deal_id = %s"
            val = (deal_created_at, deal_payed_at, deal_id)
            print(val)
            cursor.execute(sql, val)
            cnx.commit()
            # cursor.execute("SELECT * from deals WHERE deal_id = '%s'" % deal_id)

            # insert_deals_query = ("INSERT INTO deals"
            #                       "(deal_id, deal_number, user_id, deal_created_at, deal_payed_at, deal_title, deal_status, "
            #                       "deal_cost, deal_paid, deal_commission, deal_earned, payment_system, deal_received) "
            #                       "VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)")
            # data_deals = (
            #     deal_id, deal_number, user_id, deal_created_at, deal_payed_at, deal_title, deal_status, deal_cost,
            #     deal_paid,
            #     deal_commission, deal_earned, payment_system, deal_received)
            # cursor.execute(insert_deals_query, data_deals)
            # cnx.commit()
        return "ok", 200
    else:
        error_message = json_users_data["error_message"]
        return error_message, 200


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
