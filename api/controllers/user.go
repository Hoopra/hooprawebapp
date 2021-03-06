package controllers

import (
	"net/http"

	auth "hoopraapi/authorization"
	db "hoopraapi/database"
	"hoopraapi/models"
)

// UpdateName changes the name of a user in the datastore
func UpdateName(w http.ResponseWriter, req *http.Request, next http.HandlerFunc) {

	responder := models.NewHTTPResponder(w)
	token, err := auth.GetTokenFromRequest(req)

	if err != nil {
		responder.RespondWithStatus(http.StatusUnauthorized)
		return
	}

	user := new(db.User)
	err = UnpackJSONBody(req, &user)
	if err != nil {
		responder.RespondWithError(err)
		return
	}

	id, err := auth.GetIDFromToken(token)
	if err != nil {
		responder.RespondWithError(err)
		return
	}

	err = db.Users.UpdateName(id, user.Username)

	if err != nil {
		responder.RespondWithError(err)
		return
	}

	responder.RespondWithStatus(http.StatusOK)
}

// UpdatePassword changes the password (hash) of a user in the datastore
func UpdatePassword(w http.ResponseWriter, req *http.Request, next http.HandlerFunc) {

	responder := models.NewHTTPResponder(w)
	token, err := auth.GetTokenFromRequest(req)

	if err != nil {
		responder.RespondWithStatus(http.StatusUnauthorized)
		return
	}

	user := new(db.User)
	err = UnpackJSONBody(req, &user)
	if err != nil {
		responder.RespondWithError(err)
		return
	}

	id, err := auth.GetIDFromToken(token)
	if err != nil {
		responder.RespondWithError(err)
		return
	}

	err = db.Users.UpdatePassword(id, user.Password)

	if err != nil {
		responder.RespondWithError(err)
		return
	}

	responder.RespondWithStatus(http.StatusOK)
}
