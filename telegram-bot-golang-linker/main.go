package main

import (
	"flag"
	"log"

	"./clients/telegram"
)

const (
	tgBotHost = "api.telegram.org"
)

func main() {

	tgClient := telegram.New(tgBotHost, mustToken())

	//fetcher = fetcher.New(tgClient)

	//processor = processor.New(tgClient)

	//consumer.Start(fetcher, processor)
}

func mustToken() string {
	token := flag.String("token-bot-token", "", "Token for access to telegram bot")
	flag.Parse()
	if *token == "" {
		log.Fatal("Token is not specified")
	}

	return *token
}
