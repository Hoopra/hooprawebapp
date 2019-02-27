package main

import (
	"log"
	"net/http"

	"github.com/codegangsta/negroni"
	"github.com/hoopra/api/config"
	"github.com/hoopra/api/routing"
	"github.com/rs/cors"
)

func main() {

	// Configure instance
	config.Init()

	// Create router
	router := routing.GetRouting()
	n := negroni.Classic()

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
