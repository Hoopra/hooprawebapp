package authorization

import (
	"strconv"
	"time"

	"hoopraapi/config"
	"hoopraapi/datastore"
	"hoopraapi/models"

	jwt "github.com/dgrijalva/jwt-go"
)

// IssueJWT returns a JWT signed by this server
func IssueJWT(id int) (string, error) {

	keyInstance := config.GetJWTKeyPair()
	token := jwt.New(jwt.SigningMethodRS512)

	claims := make(jwt.MapClaims)
	claims["exp"] = time.Now().Add(time.Hour * time.Duration(config.Get().ExpireDelta)).Unix()
	claims["iat"] = time.Now().Unix()
	claims["sub"] = strconv.Itoa(id)
	claims["iss"] = config.Get().Issuer
	token.Claims = claims

	tokenString, err := token.SignedString(keyInstance.PrivateKey)
	if err != nil {
		return "", err
	}
	return tokenString, nil
}

// GetIDFromToken returns the id of the user
// for which a token was issued
func GetIDFromToken(token *jwt.Token) (int, error) {

	claims := token.Claims.(jwt.MapClaims)
	idString := claims["sub"].(string)

	id, err := strconv.Atoi(idString)
	if err != nil {
		return 0, err
	}
	return id, nil
}

// Authenticate returns true if a user exists
// in the datastore
func Authenticate(user *models.User) bool {

	success := datastore.Users().Validate(user)
	return success
}

func validateToken(token *jwt.Token) bool {

	claims := token.Claims.(jwt.MapClaims)
	issuer := claims["iss"].(string)
	userID := claims["sub"].(string)
	expires := claims["exp"].(float64)
	issued := claims["iat"].(float64)

	if issuer == config.Get().Issuer && len(userID) > 0 && (expires-issued) > 0 && token.Valid {
		return true
	}

	return false
}
