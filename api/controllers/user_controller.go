package controllers

import (
	"net/http"

	auth "github.com/hoopra/api/authorization"
	"github.com/hoopra/api/datastore"
	"github.com/hoopra/api/models"
)

// UpdateName changes the name of a user in the datastore
func UpdateName(w http.ResponseWriter, req *http.Request, next http.HandlerFunc) {

	responder := models.NewHTTPResponder(w)
	token, err := auth.GetTokenFromRequest(req)

	if err != nil {
		responder.RespondWithStatus(http.StatusUnauthorized)
		return
	}

	user := new(models.User)
	err = UnpackJSONBody(req, &user)
	if err != nil {
		responder.RespondWithError(err)
		return
	}

	id := auth.GetUUIDFromToken(token)

	err = datastore.Store().Users().UpdateName(id, user.Username)

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

	user := new(models.User)
	err = UnpackJSONBody(req, &user)
	if err != nil {
		responder.RespondWithError(err)
		return
	}

	id := auth.GetUUIDFromToken(token)

	err = datastore.Store().Users().UpdatePassword(id, user.Password)

	if err != nil {
		responder.RespondWithError(err)
		return
	}

	responder.RespondWithStatus(http.StatusOK)
}
