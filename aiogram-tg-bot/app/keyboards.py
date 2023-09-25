from aiogram.types import (ReplyKeyboardMarkup, KeyboardButton,
                           InlineKeyboardMarkup, InlineKeyboardButton)

main_kb = [
    [KeyboardButton(text='Каталог'), KeyboardButton(text='Корзина')],
    [KeyboardButton(text='Мой профиль'), KeyboardButton(text='Контакты')]
]

main = ReplyKeyboardMarkup(keyboard=main_kb,
                           resize_keyboard=True,
                           input_field_placeholder='Выберите пункт ниже')

socials = InlineKeyboardMarkup(
    inline_keyboard=[[InlineKeyboardButton(text='GutHub', url='https://github.com/lesharper')]])

catalog = InlineKeyboardMarkup(inline_keyboard=[
    [InlineKeyboardButton(text='Adidas', callback_data='adidas')],
    [InlineKeyboardButton(text='Nike', callback_data='nike')],
])
