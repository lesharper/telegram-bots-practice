import asyncio
from aiogram import Bot, Dispatcher, F
from aiogram.types import Message

bot = Bot(token='6421481233:AAHTkgbxqBJy57WyXSNDVZ-hmz6ANCZnyak')
dp = Dispatcher()


@dp.message(F.text == '/start')
async def cmd_start(message: Message):
    await message.answer('Добро пожаловать')


async def main():
    await dp.start_polling(bot)

if __name__ == '__main__':
    asyncio.run(main())
