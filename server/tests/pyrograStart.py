import asyncio
from pyrogram import Client

api_id = 13937718
api_hash = "f5ce1bb3caa62bf9bfefce8ba42a8d6b"


async def main():
    async with Client("PolinaEducation", api_id, api_hash) as app:
        await app.send_message("me", "Greetings from **Pyrogram**!")


asyncio.run(main())