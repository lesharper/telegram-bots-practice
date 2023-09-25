import asyncio
from dotenv import load_dotenv
import os
from aiogram import Bot, Dispatcher, F
from app.handlers import router


async def main():
    load_dotenv()
    bot = Bot(os.getenv('TOKEN'))
    dp = Dispatcher()
    dp.include_router(router)
    await dp.start_polling(bot)


if __name__ == '__main__':
    asyncio.run(main())
