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

	// router := newRouter()
	// return router, negroni.Classic()
	r := mux.NewRouter()

	controllers.RegisterAuthRoutes(r)
	controllers.RegisterUserRoutes(r)
	// for _, route := range routes {

	// 	handler := negroni.New(negroni.HandlerFunc(route.HandlerFunc))
	// 	if route.Secure {
	// 		handler = negroni.New(
	// 			negroni.HandlerFunc(auth.RequireTokenAuthentication),
	// 			negroni.HandlerFunc(unpackHTTPBody),
	// 			negroni.HandlerFunc(route.HandlerFunc),
	// 		)
	// 	}

	// 	// router.Use(unpackHTTPBody)
	// 	router.Handle(route.Pattern, handler).Methods(route.Method).Name(route.Name)
	// }

	return r, negroni.Classic()
}
