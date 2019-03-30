package routing

import (
	"encoding/json"
	"io/ioutil"
	"net/http"

	"github.com/gorilla/context"
)

// UnpackJSONBody unpacks JSON from req.Body to an interface
func unpack(req *http.Request, in interface{}) error {
	body, err := ioutil.ReadAll(req.Body)
	if err != nil {
		return err
	}
	err = json.Unmarshal(body, &in)
	if err != nil {
		return err
	}
	return nil
}

// Middleware function, which will be called for each request
func unpackJSONBody(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		switch r.Method {
		case "PUT":
			fallthrough
		case "POST":
			body := make(map[string]interface{})
			err := unpack(r, &body)
			if err != nil {
				http.Error(w, "invalid request body", http.StatusBadRequest)
				return
			}
			context.Set(r, "body", body)
		}
		next.ServeHTTP(w, r)
	})
}
