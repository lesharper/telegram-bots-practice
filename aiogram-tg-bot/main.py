import asyncio
from aiogram import Bot, Dispatcher, F
from aiogram.types import Message

bot = Bot(token='6421481233:AAHTkgbxqBJy57WyXSNDVZ-hmz6ANCZnyak')
dp = Dispatcher()


@dp.message(F.text == '/start')
async def cmd_start(message: Message):
    await message.answer('Добро пожаловать')


@dp.message(F.text == '/my_info')
async def cmd_my_id(message: Message):
    await message.answer(f'Твой ID: {message.from_user.id}')
    await message.answer(f'Твое имя: {message.from_user.first_name}')
    await message.answer(f'Твой никнейм: {message.from_user.username}')


@dp.message()
async def echo(message: Message):
    await message.answer(message.text)


async def main():
    await dp.start_polling(bot)


if __name__ == '__main__':
    asyncio.run(main())
