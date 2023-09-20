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


@dp.message(F.text == '/send_image')
async def cmd_send_imahe(message: Message):
    await message.answer_photo(photo='https://i.pinimg.com/564x/a1/88/70/a18870d05cd698d05aea26557ce75eda.jpg',
                               caption='Изображение с интернета')
    await message.answer_photo(
        photo='AgACAgIAAxkBAAOVZQr3_Kf4hOioVQcs8q0369UCRMAAAmDKMRuAbFlI3D4nWpghHAIBAAMCAAN5AAMwBA',
        caption='Изображение по ID')


@dp.message(F.text == '/send_doc')
async def cmd_send_doc(message: Message):
    await message.answer_document(document="")


@dp.message(F.photo)
async def cmd_get_photo_id(message: Message):
    await message.answer(message.photo[-1].file_id)


@dp.message(F.document)
async def cmd_get_doc_id(message: Message):
    await message.answer(message.document.file_id)


@dp.message()
async def echo(message: Message):
    await message.answer(message.text)


async def main():
    await dp.start_polling(bot)


if __name__ == '__main__':
    asyncio.run(main())
