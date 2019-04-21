package util

import (
	"errors"
	"reflect"
	"strings"
	"unicode"

	"github.com/mitchellh/mapstructure"
)

type objUtil struct{}

var Object = &objUtil{}

func kindOf(i interface{}) reflect.Kind {
	return reflect.TypeOf(i).Kind()
}

func kindOfIndirect(i interface{}) reflect.Kind {
	kind := kindOf(i)
	if kind != reflect.Ptr {
		return kind
	}
	return reflect.Indirect(reflect.ValueOf(i)).Kind()
}

func (*objUtil) IsStruct(t interface{}) bool {
	return kindOf(t) == reflect.Struct
}

func (*objUtil) IsMap(t interface{}) bool {
	return kindOf(t) == reflect.Map
}

func (*objUtil) IsArray(t interface{}) bool {
	k := kindOf(t)
	return k == reflect.Array || k == reflect.Slice
}

func (*objUtil) IsPointer(t interface{}) bool {
	return kindOf(t) == reflect.Ptr
}

func (*objUtil) IsPointerStruct(t interface{}) bool {
	return kindOfIndirect(t) == reflect.Struct
}

func (*objUtil) IsPointerMap(t interface{}) bool {
	return kindOfIndirect(t) == reflect.Map
}

func (*objUtil) IsZero(v interface{}) bool {

	switch v.(type) {
	case string:
		return v == ""
	case int:
		return v == 0
	case float32:
		return v == 0.0
	case float64:
		return v == 0.0
	default:
		return v == nil || (Object.IsPointer(v) && reflect.ValueOf(v).IsNil())
	}
}

func (*objUtil) StructToMap(in interface{}) map[string]interface{} {

	out := map[string]interface{}{}
	Object.CopyProperties(in, &out)
	return out
}

func (*objUtil) CopyProperties(in interface{}, out interface{}) error {
	if !Object.IsPointer(out) {
		return errors.New("(CopyProperties) out must be pointer")
	}
	err := mapstructure.Decode(in, out)
	if err != nil {
		return err
	}
	return Object.LowercaseKeys(out)
}

func (*objUtil) LowercaseKeys(i interface{}) error {
	if !Object.IsPointer(i) {
		return errors.New("(LowercaseKeys) i must be pointer")
	}
	if !Object.IsPointerMap(i) {
		return nil
	}
	m := *i.(*map[string]interface{})
	for k, v := range m {
		if rune(k[0]) == unicode.ToUpper(rune(k[0])) {
			m[strings.ToLower(k)] = v
			delete(m, k)
		}
	}
	return nil
}

// Returns the non-null keys of base that are not non-null keys of diff
func (*objUtil) Diff(base interface{}, diff interface{}) (error, []string) {

	baseMap := map[string]interface{}{}
	diffMap := map[string]interface{}{}
	var missing []string
	err := Object.CopyProperties(base, &baseMap)
	if err != nil {
		return err, missing
	}
	err = Object.CopyProperties(diff, &diffMap)

	if err != nil {
		return err, missing
	}

	for k, _ := range baseMap {
		if !Object.IsZero(baseMap[k]) && Object.IsZero(diffMap[k]) {
			missing = append(missing, k)
		}
	}
	return nil, missing
}

func (*objUtil) KeysOf(i interface{}) (error, []string) {
	iMap := map[string]interface{}{}
	var keys []string
	err := Object.CopyProperties(i, &iMap)
	if err != nil {
		return err, keys
	}
	for k, _ := range iMap {
		keys = append(keys, k)
	}
	return nil, keys
}

func (*objUtil) ValuesOf(i interface{}, keys []string) (error, []interface{}) {
	iMap := map[string]interface{}{}
	var values []interface{}
	err := Object.CopyProperties(i, &iMap)
	if err != nil {
		return err, values
	}
	for _, v := range keys {
		values = append(values, iMap[v])
	}
	return nil, values
}

func (*objUtil) Contains(container []string, key string) bool {
	for _, v := range container {
		if v == key {
			return true
		}
	}
	return false
}
