package util

import (
	"github.com/iancoleman/strcase"
)

type strUtil struct{}

var String = &strUtil{}

// type str interface {
// 	toCamel(str string) string
// }

func (*strUtil) ToLowerCamel(str string) string {
	return strcase.ToLowerCamel(str)
}

func (*strUtil) ToCamel(str string) string {
	return strcase.ToCamel(str)
}

func (*strUtil) Trim(s string, pre int, suf int) string {
	s = s[:len(s)-suf]
	s = s[pre:]
	return s
}
