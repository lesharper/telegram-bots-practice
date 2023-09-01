package main

import (
	"context"
	"flag"
	"log"

	tgClient "telegram-bot-golang-linker/clients/telegram"
	event_consumer "telegram-bot-golang-linker/consumer/event-consumer"
	telegram "telegram-bot-golang-linker/events/telegram"
	"telegram-bot-golang-linker/storage/sqlite"
)

const (
	tgBotHost         = "api.telegram.org"
	storagePath       = "files_storage"
	sqliteStoragePath = "data/sqlite/storage.db"
	batchSize         = 100
)

func main() {

	//s := files.New(storagePath)
	s, err := sqlite.New(sqliteStoragePath)
	if err != nil {
		log.Fatalf("can't connect storage: ", err)
	}
	if err := s.Init(context.TODO()); err != nil {
		log.Fatal("can't init storage", err)
	}
	eventsProcessor := telegram.New(
		tgClient.New(tgBotHost, mustToken()),
		s,
	)

	log.Print("Service started")
	consumer := event_consumer.New(eventsProcessor, eventsProcessor, batchSize)
	if err := consumer.Start(); err != nil {
		log.Fatal("Service is stopped", err)
	}
}

func mustToken() string {
	token := flag.String(
		"tg-bot-token",
		"",
		"token for access to telegram bot",
	)

	flag.Parse()

	if *token == "" {
		log.Fatal("token is not specified")
	}

	return *token
}
