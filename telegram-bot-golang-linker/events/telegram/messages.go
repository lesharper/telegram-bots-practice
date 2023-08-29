package telegram

const msgHelp = `Я могу сохранить ваши страницы. Также я могу предложить вам их почитать.

Чтобы сохранить страницу, просто пришлите мне ссылку на нее.

Чтобы получить случайную страницу из вашего списка, отправьте мне команду /rnd.

Осторожно! После этого эта страница будет удалена из вашего списк`

const msgHello = "Привет! \n\n" + msgHelp

const (
	msgUnknownCommand = "Неизвестная команда"
	msgNoSavePages    = "Вы не сохраняли никакие страницы"
	msgSaved          = "Сохранено!"
	msgAlreadyExists  = "Вы уже сохраняли эту страницу"
)