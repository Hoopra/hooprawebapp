package auth

import (
	"fmt"
	"log"
	"net/http"
	"strings"

	"hoopraapi/config"
	"hoopraapi/models"

	jwt "github.com/dgrijalva/jwt-go"
	"github.com/dgrijalva/jwt-go/request"
	"github.com/gorilla/context"
)

// RequireTokenAuthentication ivalidates the JWT of a request
// and calls a handler if successful
func RequireTokenAuthentication(w http.ResponseWriter, r *http.Request, next http.HandlerFunc) {
	log.Println("require auth")
	// printHeaders(req)
	responder := models.NewHTTPResponder(w)
	token, err := request.ParseFromRequest(r, request.OAuth2Extractor, keyFunction)
	log.Println("token", token, err)

	if err != nil {
		responder.RespondWithStatus(http.StatusUnauthorized)
		return
	}
	valid := validateToken(token)
	log.Println("valid", valid)
	if !valid {
		responder.RespondWithStatus(http.StatusUnauthorized)
		return
	}

	id, err := getIDFromToken(token)
	log.Println("id", id, err)
	if err != nil {
		responder.RespondWithError(err)
		return
	}

	context.Set(r, "token", token)
	context.Set(r, "id", id)
	next(w, r)
}

func printHeaders(req *http.Request) {

	for name, headers := range req.Header {
		name = strings.ToLower(name)
		for _, h := range headers {
			log.Printf("%v: %v", name, h)
		}
	}
}

func keyFunction(token *jwt.Token) (interface{}, error) {
	if _, ok := token.Method.(*jwt.SigningMethodRSA); !ok {
		return nil, fmt.Errorf("Unexpected signing method: %v", token.Header["alg"])
	}
	return config.GetJWTKeyPair().PublicKey, nil
}
