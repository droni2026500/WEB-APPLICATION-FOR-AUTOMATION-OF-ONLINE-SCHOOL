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
id = '10030567'
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
        user_id = json_users_data["info"]["items"][i][0]
        email = json_users_data["info"]["items"][i][1]
        created_at = json_users_data["info"]["items"][i][3]
        first_name = json_users_data["info"]["items"][i][5]
        last_name = json_users_data["info"]["items"][i][6]
        phone = json_users_data["info"]["items"][i][7]
        birthdate = json_users_data["info"]["items"][i][8]
        country = json_users_data["info"]["items"][i][10]
        city = json_users_data["info"]["items"][i][11]
        is_student = json_users_data["info"]["items"][i][70]
        insert_deals_query = ("INSERT INTO users"
                              "(user_id, email, created_at, first_name, last_name, phone, "
                              "birthdate, country, city, is_student) "
                              "VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)")
        data_deals = (
            user_id, email, created_at, first_name, last_name, phone,
            birthdate, country, city, is_student)
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
