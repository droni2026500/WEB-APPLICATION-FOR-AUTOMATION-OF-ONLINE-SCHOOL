from pyrogram import Client
from pyrogram.raw import functions, types
import asyncio

api_id = 13937718
api_hash = "f5ce1bb3caa62bf9bfefce8ba42a8d6b"


# client = Client("client1", api_id=api_id, api_hash=api_hash)

# async def hello():
#     async with Client("client1", api_id=api_id, api_hash=api_hash) as app:
#         r = await app.invoke(
#             functions.channels.SetDiscussionGroup(
#                 broadcast=app.resolve_peer(-1001546840201),
#                 group=app.resolve_peer(-1001505502889)
#             )
#     )
#         print(r)

def hello():
    with Client("PolinaEducation") as app:
        # Set online status
        r = app.invoke(functions.channels.SetDiscussionGroup(
            broadcast=app.resolve_peer(-1001546840201),
            group=app.resolve_peer(-1001505502889)
        ))
        print(r)

        # Set offline status
        # await app.invoke(functions.account.UpdateStatus(offline=True))


# async def hello():
#     await client.send_message("me", "Greetings from **Pyrogram**!")
#     # await client.send(
#         functions.channels.SetDiscussionGroup(
#             broadcast=client.resolve_peer(-1001546840201),
#             group=client.resolve_peer(-1001505502889)
#         )
#     # )

# async def main():
#     async with Client("client1", api_id, api_hash) as app:
#         await app.send(
#             functions.channels.SetDiscussionGroup(
#                 broadcast=app.resolve_peer(-1001546840201),
#                 group=app.resolve_peer(-1001505502889)
#             )
#         )
#
#
# asyncio.run(hello())
hello()
# client.run()
