package utils

import (
	"encoding/json"
	"log"
)

func Describe(in struct{}) {
	b, _ := json.Marshal(in)
	log.Println(string(b))
}
