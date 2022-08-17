from telethon.sync import TelegramClient
from telethon import functions, types
from telethon.tl.types import InputChannel

api_id = 13937718
api_hash = "f5ce1bb3caa62bf9bfefce8ba42a8d6b"

client = TelegramClient('PolinaEducation', api_id, api_hash)
client.start()

# set_discussions = client(functions.channels.SetDiscussionGroupRequest(
#         broadcast=-1001546840201,
#         group=-1001505502889
#     ))

# channel = client(functions.channels.CreateChannelRequest(
#         title='My awesome title',
#         about='some string here',
#         megagroup=True,
#         for_import=True,
#     ))

# group = client(functions.messages.CreateChatRequest(
#     users=['skhotwow', 'PolinaEducationChat_bot'],
#     title='My awesome title',
# ))

print()
