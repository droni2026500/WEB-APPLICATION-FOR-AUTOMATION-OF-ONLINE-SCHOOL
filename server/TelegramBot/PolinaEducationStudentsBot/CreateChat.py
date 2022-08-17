import asyncio

from pyrogram import Client

# api_id = 15353416
# api_hash = "6c5c806f6e749d4d1a17738806e27b1e"
#
#
#
# # client = Client(session_name="my_account")
# with Client("my_account", api_id, api_hash) as app:
#     app.send_message("me", "Greetings from **Pyrogram**!")


client = Client(session_name="my_account")
client.start()
users = [279617033, "@PolinaEducationChat_bot"]
channel = client.create_channel("123", "")
print(channel)
channel_id = channel["id"]
print(channel)
print(str("123") + " " + str(channel_id))


# client = Client(session_name="my_account")
# client.start()
# name_group = "Бот создает чатик"
# users = [279617033, "@PolinaEducationChat_bot"]
# description = "Тест"
# group = client.create_supergroup(name_group, description)
# group_id = group["id"]
# print(group)
# print(str(name_group) + " " + str(group_id))
# client.add_chat_members(
#     chat_id=group_id,
#     user_ids=639679570,
# )
# client.promote_chat_member(
#     chat_id=group_id,
#     user_id=639679570,
#     can_manage_chat=True,
#     can_manage_voice_chats=True,
#     can_delete_messages=True,
#     can_restrict_members=True,
#     can_promote_members=True,
#     can_change_info=True,
#     can_post_messages=True,
#     can_edit_messages=True,
#     can_invite_users=True,
#     can_pin_messages=True
# )
# chat = client.get_chat(group["id"])
# print(chat)
