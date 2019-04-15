package main

import (
	"log"
	"net/http"
	"sync"

	"hoopraapi/config"
	db "hoopraapi/database"
	"hoopraapi/routing"
)

func main() {

	var wg sync.WaitGroup
	wg.Add(2)

	// Configure instance
	go func() {
		config.Init()
		wg.Done()
	}()

	// Initialize datastore
	go func() {
		db.Init()
		wg.Done()
	}()

	wg.Wait()

	// Create router
	_, n := routing.GetRouting()

	// Run server
	log.Print("Listening on " + routing.Port)
	http.ListenAndServe(routing.Port, n)
}
