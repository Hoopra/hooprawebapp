package controllers

import (
	"net/http"

	"hoopraapi/auth"
	db "hoopraapi/database"
	"hoopraapi/models"

	"github.com/gorilla/context"
	"github.com/gorilla/mux"
)

func RegisterUserRoutes(r *mux.Router) *mux.Router {
	s := r.PathPrefix("/user").Subrouter()

	s.Use(auth.RequireTokenAuthentication)
	s.HandleFunc("/", getUser).Methods("GET")
	s.HandleFunc("/", updateUser).Methods("PUT")
	return s
}

// UpdateName changes the name of a user in the datastore
func getUser(w http.ResponseWriter, req *http.Request) {

	responder := models.NewHTTPResponder(w)
	responder.RespondWithStatus(http.StatusOK)
}

// UpdateName changes the name of a user in the datastore
func updateUser(w http.ResponseWriter, req *http.Request) {

	responder := models.NewHTTPResponder(w)

	type jsonBody struct{ Username string }
	body := context.Get(req, "body")
	if body == nil {
		responder.RespondWithStatus(http.StatusBadRequest)
		return
	}

	id := context.Get(req, "id")
	if id == nil {
		responder.RespondWithStatus(http.StatusUnauthorized)
		return
	}

	err := db.Users().UpdateName(id.(int), body.(jsonBody).Username)

	if err != nil {
		responder.RespondWithError(err)
		return
	}

	responder.RespondWithStatus(http.StatusOK)
}

// // UpdatePassword changes the password (hash) of a user in the datastore
// func UpdatePassword(w http.ResponseWriter, req *http.Request, next http.HandlerFunc) {

// 	responder := models.NewHTTPResponder(w)

// 	type jsonBody struct{ Password string }
// 	body := context.Get(req, "body")
// 	if body == nil {
// 		responder.RespondWithStatus(http.StatusBadRequest)
// 		return
// 	}

// 	id := context.Get(req, "id")
// 	if id == nil {
// 		responder.RespondWithStatus(http.StatusUnauthorized)
// 		return
// 	}
// 	err := db.Users().UpdatePassword(id.(int), body.(jsonBody).Password)

// 	if err != nil {
// 		responder.RespondWithError(err)
// 		return
// 	}

// 	responder.RespondWithStatus(http.StatusOK)
// }
