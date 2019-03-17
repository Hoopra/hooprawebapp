package main

import (
	"log"
	"net/http"

	"hoopraapi/config"
	"hoopraapi/datastore"
	"hoopraapi/routing"

	"github.com/rs/cors"
)

func main() {

	// Configure instance
	config.Init()

	// Initialize datastore
	datastore.Init()

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
