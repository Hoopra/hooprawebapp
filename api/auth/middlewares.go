package auth

import (
	"fmt"
	"net/http"

	"hoopraapi/config"
	"hoopraapi/models"
	"hoopraapi/util"

	jwt "github.com/dgrijalva/jwt-go"
	"github.com/dgrijalva/jwt-go/request"
	"github.com/gorilla/context"
)

func PrintHeaders(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		util.DescribeRequest(r)
		next.ServeHTTP(w, r)
	})
}

// RequireTokenAuthentication ivalidates the JWT of a request
// and calls a handler if successful
func RequireTokenAuthentication(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		responder := models.NewHTTPResponder(w)
		token, err := request.ParseFromRequest(r, request.OAuth2Extractor, keyFunction)

		if err != nil {
			responder.RespondWithStatus(http.StatusUnauthorized)
			return
		}
		valid := validateToken(token)
		if !valid {
			responder.RespondWithStatus(http.StatusUnauthorized)
			return
		}

		id, err := getIDFromToken(token)
		if err != nil {
			responder.RespondWithError(err)
			return
		}

		context.Set(r, "token", token)
		context.Set(r, "id", id)
		next.ServeHTTP(w, r)
	})
}

func keyFunction(token *jwt.Token) (interface{}, error) {
	if _, ok := token.Method.(*jwt.SigningMethodRSA); !ok {
		return nil, fmt.Errorf("Unexpected signing method: %v", token.Header["alg"])
	}
	return config.GetJWTKeyPair().PublicKey, nil
}
