import json

import requests
from mysql.connector import connect, Error
cnx = connect(
    host="87.249.44.94",
    user="gen_user",
    password="555552026Zz1010",
    database="default_db",
)
cursor = cnx.cursor()
id = '10029250'
headers_gc = {'Accept': 'application/json; q=1.0, */*; q=0.1'}
data = {
    'key': 'O7uhNqp13VEr60hJFPJGu9U13GVPiIetkiBmc7pd6C8nd7Okw0pACLRTtkCuHNAfgh3yoBL4d2sAKZvwNlptAVV8kJoQni6kiJk9QimWczHkMNjSM6VvzU5hjZVYewG5',
}
groups_users = requests.post('https://polina-education.getcourse.ru/pl/api/account/exports/' + id,
                             headers=headers_gc,
                             data=data)
json_users_data = groups_users.json()
print(json_users_data)
success = json_users_data["success"]
if success:
    items = json_users_data["info"]["items"]
    for i in range(len(items)):
        deal_id = json_users_data["info"]["items"][i][0]
        user_id = json_users_data["info"]["items"][i][2]
        status = json_users_data["info"]["items"][i][9]
        number = json_users_data["info"]["items"][i][1]
        positions = json_users_data["info"]["items"][i][8]
        cost_money = float(json_users_data["info"]["items"][i][10])
        payed_money = float(json_users_data["info"]["items"][i][11])
        commission = float(json_users_data["info"]["items"][i][12])
        received = float(json_users_data["info"]["items"][i][13])
        earned = float(json_users_data["info"]["items"][i][17])
        if cost_money != payed_money and payed_money != 0:
            left_cost_money = float(cost_money - payed_money)
        else:
            left_cost_money = 0
        created_at = json_users_data["info"]["items"][i][6]
        payed_at = json_users_data["info"]["items"][i][7]
        payment_system = json_users_data["info"]["items"][i][21]
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
        dump = json.dumps(deal_tags)
        dump2 = json.dumps(offer_tags)
        # cursor.execute("SELECT * from deals WHERE deal_id = '%s'" % deal_id)

        insert_deals_query = ("INSERT INTO deals2"
                              "(user_id, deal_id, status, number, positions, cost_money, left_cost_money, "
                              "payed_money, commission, received, earned, created_at, payed_at,"
                              "payment_system, utm_source, utm_medium, utm_campaign, utm_content,"
                              "utm_term, cpc_utm_source, cpc_utm_medium, cpc_utm_campaign, cpc_utm_content,"
                              "cpc_utm_term, flow) "
                              "VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s,"
                              "%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)")
        data_deals = (
            user_id, deal_id, status, number, positions, cost_money, left_cost_money, payed_money,
            commission, received, earned, created_at, payed_at, payment_system, utm_source,
            utm_medium, utm_campaign, utm_content, utm_term, cpc_utm_source, cpc_utm_medium,
            cpc_utm_campaign, cpc_utm_content, cpc_utm_term, flow)
        try:
            cursor.execute(insert_deals_query, data_deals)
            cnx.commit()
        except:
            pass

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
        # print(utm_source)
        # print(utm_medium)
        # print(utm_campaign)
        # print(utm_content)
        # print(utm_term)
        # print(cpc_utm_source)
        # print(cpc_utm_medium)
        # print(cpc_utm_campaign)
        # print(cpc_utm_content)
        # print(cpc_utm_term)
        # print(flow)
        # print(deal_tags)
        # print(offer_tags)

