package routing

import (
	"encoding/json"
	"log"
	"net/http"

	"github.com/gorilla/context"
)

// UnpackJSONBody unpacks JSON from req.Body to an interface
func UnpackJSONBody(req *http.Request, in *struct{}) error {

	if req.Body == nil {
		return nil
	}
	err := json.NewDecoder(req.Body).Decode(&in)
	if err != nil {
		return err
	}

	// return nil
	// log.Println("body", req.Body)
	// body, err := ioutil.ReadAll(req.Body)
	// if err != nil {
	// 	return err
	// }
	// log.Println("body", body)
	// err = json.Unmarshal(body, in)
	// log.Println(in, err)
	// // err.Error() != "unexpected end of JSON input"
	// if err != nil {
	// 	log.Println("err", err.Error() == "unexpected end of JSON input")
	// 	return err
	// }

	return nil
}

// Middleware function, which will be called for each request
// func unpackHTTPBody(next http.Handler) http.Handler {
// return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
func unpackHTTPBody(w http.ResponseWriter, r *http.Request, next http.HandlerFunc) {
	log.Println("start unpacking")
	body := struct{}{}
	err := UnpackJSONBody(r, &body)
	log.Println("unpack", body, err)
	if err != nil {
		http.Error(w, "Forbidden", http.StatusForbidden)
		return
	}

	context.Set(r, "body", body)
	// next.ServeHTTP(w, r)
	// })
}
