from aiogram import Router, F
from aiogram.types import Message, CallbackQuery
from aiogram.filters import Filter
import app.keyboards as kb

router = Router()


class Admin(Filter):
    async def __call__(self, message: Message) -> bool:
        return message.from_user.id in [1158750792]


@router.message(Admin(), F.text == '/admin')
async def cmd_admin(message: Message):
    await message.answer('Ты админ')


@router.message(F.text == '/start')
async def cmd_start(message: Message):
    await message.answer('Добро пожаловать!', reply_markup=kb.main)


@router.message(F.text == 'Каталог')
async def catalog(message: Message):
    await message.answer('Выберите категорию', reply_markup=kb.catalog)


@router.callback_query(F.data == 'Adidas')
async def catalog(callback: CallbackQuery):
    await callback.answer(f'Вы выбрали {callback.data}')
