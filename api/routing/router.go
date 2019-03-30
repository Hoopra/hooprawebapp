package routing

import (
	"hoopraapi/controllers"

	"github.com/gorilla/mux"
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

	r := mux.NewRouter()

	controllers.RegisterAuthRoutes(r)
	controllers.RegisterUserRoutes(r)

	// s.Use(auth.PrintHeaders)
	r.Use(unpackJSONBody)

	return r, negroni.Classic()
}
