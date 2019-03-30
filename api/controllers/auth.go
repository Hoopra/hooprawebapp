package controllers

import (
	"errors"
	"net/http"

	db "hoopraapi/database"
	"hoopraapi/models"

	auth "hoopraapi/auth"

	"github.com/gorilla/context"
	"github.com/gorilla/mux"
)

func RegisterAuthRoutes(r *mux.Router) *mux.Router {
	s := r.PathPrefix("").Subrouter()

	s.HandleFunc("/register", register).Methods("POST")
	s.HandleFunc("/login", login).Methods("POST")
	s.HandleFunc("/refresh", refreshToken).Methods("POST")
	s.HandleFunc("/logout", logout).Methods("GET")

	return s
}

// Register adds a user to the datastore if one
// was supplied in the request
func register(w http.ResponseWriter, req *http.Request) {

	responder := models.NewHTTPResponder(w)
	user := new(db.User)

	err := UnpackJSONBody(req, &user)
	if err != nil {
		responder.RespondWithError(err)
		return
	}

	if user.Username == "" || user.Password == "" {
		responder.RespondWithError(errors.New("No data supplied for user"))
		return
	}

	err = db.Users().Add(user)
	if err != nil {
		responder.RespondWithError(err)
		return
	}

	responder.RespondWithStatus(http.StatusAccepted)
}

// Login issues a JWT if the user in the request
// can be validated in the datastore
func login(w http.ResponseWriter, req *http.Request) {

	responder := models.NewHTTPResponder(w)
	user := new(db.User)
	err := UnpackJSONBody(req, &user)
	if err != nil {
		responder.RespondWithError(err)
		return
	}

	if user.Username == "" || user.Password == "" {
		responder.RespondWithError(errors.New("No credentials supplied for login"))
		return
	}

	_, u := db.Users().SelectByName(user.Username)
	if u == nil {
		// responder.RespondWithError(err)
		responder.RespondWithStatus(http.StatusUnauthorized)
		return
	}

	valid := db.Users().Validate(user.Username, user.Password)
	if valid {
		token, err := auth.IssueJWT(u.ID)
		responder.RespondWithToken(token, err)
		return
	}

	responder.RespondWithStatus(http.StatusUnauthorized)
}

// RefreshToken issues a new JWT if the request
// already contains a valid one
func refreshToken(w http.ResponseWriter, req *http.Request) {

	responder := models.NewHTTPResponder(w)
	user := new(db.User)
	UnpackJSONBody(req, &user)

	// decoder := json.NewDecoder(req.Body)
	// decoder.Decode(&requestUser)

	token, err := auth.IssueJWT(user.ID)
	if err == nil {
		responder.RespondWithToken(token, err)
		return
	}

	responder.RespondWithStatus(http.StatusUnauthorized)
}

// Logout invalidates a refresh token. Dummy function for now
func logout(w http.ResponseWriter, req *http.Request) {

	responder := models.NewHTTPResponder(w)
	token := context.Get(req, "token")
	if token == nil {
		responder.RespondWithStatus(http.StatusUnauthorized)
	}

	responder.RespondWithStatus(http.StatusOK)
}
