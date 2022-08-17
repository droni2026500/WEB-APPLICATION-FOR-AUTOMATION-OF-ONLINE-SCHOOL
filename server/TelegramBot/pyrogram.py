import asyncio

api_id = 15353416
api_hash = "6c5c806f6e749d4d1a17738806e27b1e"


# client = Client(session_name="my_account")
async def main():
    async with Client("my_account", api_id, api_hash) as app:
        await app.send_message("me", "Greetings from **Pyrogram**!")


asyncio.run(main())
