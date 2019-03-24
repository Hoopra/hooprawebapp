package main

import (
	"log"
	"net/http"
	"sync"

	"hoopraapi/config"
	db "hoopraapi/database"
	"hoopraapi/routing"

	"github.com/rs/cors"
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
	router, n := routing.GetRouting()

	corsOpts := cors.Options{}
	corsOpts.AllowCredentials = true
	corsOpts.AllowedOrigins = []string{"*"}
	corsOpts.AllowedHeaders = []string{"Origin", "Content-Type", "Authorization"}

	handler := cors.New(corsOpts).Handler(router)
	n.UseHandler(handler)

	// Run server
	log.Print("Listening on " + routing.Port)
	http.ListenAndServe(routing.Port, n)
}

func corsHandler() {

}
