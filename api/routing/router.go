package routing

import (
	"hoopraapi/controllers"

	"github.com/gorilla/mux"
	"github.com/rs/cors"
	negroni "gopkg.in/codegangsta/negroni.v0"
)

type route struct {
	Name        string
	Method      string
	Pattern     string
	HandlerFunc negroni.HandlerFunc
	Secure      bool
}

// GetRouting returns the complete routing
// for this server
func GetRouting() (*mux.Router, *negroni.Negroni) {

	r, n := mux.NewRouter(), negroni.Classic()

	controllers.RegisterAuthRoutes(r)
	controllers.RegisterUserRoutes(r)

	// s.Use(auth.PrintHeaders)
	r.Use(unpackJSONBody)

	corsOpts := cors.Options{}
	corsOpts.AllowCredentials = true
	corsOpts.AllowedOrigins = []string{"*"}
	corsOpts.AllowedHeaders = []string{"Origin", "Content-Type", "Authorization"}

	corsHandler := cors.New(corsOpts).Handler(r)
	n.UseHandler(corsHandler)

	return r, n
}

func corsHandler() {

}
