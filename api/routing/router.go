package routing

import (
	"hoopraapi/authorization"

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

	router := newRouter(Routes)
	return router, negroni.Classic()
}

func newRouter(routes []route) *mux.Router {

	router := mux.NewRouter()
	for _, route := range routes {

		handler := negroni.New(negroni.HandlerFunc(route.HandlerFunc))
		if route.Secure {
			handler = negroni.New(
				negroni.HandlerFunc(authorization.RequireTokenAuthentication),
				negroni.HandlerFunc(route.HandlerFunc),
			)
		}

		router.Handle(route.Pattern, handler).Methods(route.Method).Name(route.Name)
	}

	return router
}
