# Импорты flask
import asyncio

from flask_pymongo import PyMongo
from flask import Flask, request, jsonify
from pyrogram import Client
from pyrogram.raw import functions

app = Flask(__name__)
app.debug = True

# app.config["MONGO_URI"] = "mongodb://admin1:admin1@213.183.53.93:27020/chatbots?authSource=chatbots"
app.config["MONGO_URI"] = "mongodb://Admin:555552026Zz1010@2.59.43.6:27017/ChatBotChannels?authSource=admin"
mongodb_client = PyMongo(app)
db = mongodb_client.db
api_id = 13937718
api_hash = "f5ce1bb3caa62bf9bfefce8ba42a8d6b"


# http://2.59.43.6:5002/api/deals/addDealsFlow?first_name={object.user.first_name}&last_name={object.user.last_name}&email={object.user.email}&phone={object.user.phone}&title={object.positions}&opportunity={object.cost_money_value}&status={object.status}&link={object.payment_link}&manager={object.manager}&utm_source={object.custom_utm_source}&utm_medium={object.custom_utm_medium}&utm_campaign={object.custom_utm_campaign}&utm_content={object.custom_utm_content}&utm_term={object.custom_utm_term}&id_deal={object.id}

@app.route("/api/chatbots/channel/addChannel", methods=["POST", "GET"])
async def addChannel():
    req = request.get_json(force=True)
    channel_name = req.get('channelName', None)
    users = ["@PolinaEducationChat_bot"]
    # channel = asyncio.run(create_channel(channel_name, users))
    async with Client("PolinaEducation", api_id=api_id, api_hash=api_hash) as app:
        channel = await app.create_channel(channel_name, "")
        channel_id = channel.id
        group = await app.create_group(f"Чат {channel_name}", users)
        group_id = group.id
        info_channel = await app.get_chat(channel_id)
        link = info_channel.invite_link
        info_bot_channel = await app.promote_chat_member(
            chat_id=channel_id,
            user_id="@PolinaEducationChat_bot",
            # privileges=privileges,
        )
        print(info_bot_channel)
        db.Chats.insert_one({
            'name': channel_name,
            'channel_id': channel_id,
            'link': link,
            'group_id': group_id,
        })
    return "Chat created", 200
    # print("channel "+str(channel))
    # db.Chats.insert_one({
    #     'name': channel_name,
    #     'channel_id': channel.channel_id,
    #     'link': channel.link,
    #     'group_id': channel.group_id,
    # })
    # return "Chat created", 200
    # except:
    #     return "Error", 400


# async def create_channel(channel_name, users):
#     async with Client("PolinaEducation", api_id=api_id, api_hash=api_hash) as app:
#         channel = await app.create_channel(channel_name, "")
#         channel_id = channel.id
#         channel_link = channel.invite_link
#         group = await app.create_group(f"Чат {channel_name}", users)
#         group_id = group.id
#         info_channel = await app.get_chat(channel_id)
#         print(info_channel)
#         info_bot_channel = await app.promote_chat_member(
#             chat_id=channel_id,
#             user_id="@PolinaEducationChat_bot",
#             # privileges=privileges,
#         )
#         print(info_bot_channel)
#         db.Chats.insert_one({
#             'name': channel_name,
#             'channel_id': channel_id,
#             'link': channel_link,
#             'group_id': group_id,
#         })
#         return "Chat created", 200
        # await set_discussion_group(channel_id, group_id)
    # return channel, group, info_channel, info_bot_channel


# def set_discussion_group(channel_id, group_id):
#     with Client("my_account2") as app:
#         r = app.invoke(functions.channels.SetDiscussionGroup(
#             broadcast=app.resolve_peer(channel_id),
#             group=app.resolve_peer(group_id)
#         ))
#         print(r)
#         return "", 200


# privileges = {
#     "can_manage_chat": True,
#     "can_manage_voice_chats": True,
#     "can_delete_messages": True,
#     "can_restrict_members": True,
#     "can_promote_members": True,
#     "can_change_info": True,
#     "can_post_messages": True,
#     "can_edit_messages": True,
#     "can_invite_users": True,
#     "can_pin_messages": True,
# }

# async def set_discussion_group(channel_id, group_id):
#     async with Client("client1") as app:
#         info_discussion_group = await app.invoke(functions.channels.SetDiscussionGroup(
#             broadcast=app.resolve_peer(channel_id),
#             group=app.resolve_peer(group_id)
#         ))
#         return info_discussion_group


@app.route("/api/chatbots/channel/getChannels", methods=["POST", "GET"])
def getChannels():
    _todos = db.Chats.find()
    item = {}
    data = []
    for todo in _todos:
        item = {
            'id': str(todo['_id']),
            'name': todo['name'],
            'channel_id': todo['channel_id'],
            'link': todo['link'],
        }
        data.append(item)
    return jsonify(data)


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5004)
