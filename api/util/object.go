package util

import (
	"encoding/json"
	"errors"
	"reflect"
)

type objUtil struct{}

var Object = &objUtil{}

func (*objUtil) StructToMap(in interface{}) (error, map[string]interface{}) {
	var out map[string]interface{}
	temp, err := json.Marshal(in)
	if err != nil {
		return errors.New("variable must be mappable"), nil
	}
	err = json.Unmarshal(temp, &out)
	if err != nil {
		return errors.New("variable must be mappable"), nil
	}
	return nil, out
}

func (*objUtil) IsZero(v interface{}) bool {
	switch reflect.TypeOf(v) {
	case reflect.TypeOf(""):
		return v == ""
	case reflect.TypeOf(0):
		return v == 0
	case reflect.TypeOf(0.0):
		return int(v.(float64)) == 0
	default:
		// allow booleans to be false
		return v == nil
	}
}
