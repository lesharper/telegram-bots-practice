package telegram

import "../../clients/telegram"

type Processor struct {
	tg     *telegram.Client
	offset int
	//storage
}
