package test

import (
	"reflect"
	"testing"

	"hoopraapi/util"
)

func TestIsStruct(t *testing.T) {
	user := struct {
		Username string
		Password string
	}{}
	if !util.Object.IsStruct(user) {
		t.Errorf("expected %v to be struct", user)
	}
	userMap := map[string]interface{}{
		"username": "name",
		"password": "pass",
	}
	if util.Object.IsStruct(userMap) {
		t.Errorf("expected %v to not be struct", userMap)
	}
	str := "user"
	if util.Object.IsStruct(str) {
		t.Error("expected string to not be struct")
	}
}

func TestIsMap(t *testing.T) {
	user := struct {
		Username string
		Password string
	}{}
	if util.Object.IsMap(user) {
		t.Errorf("expected %v to not be map", user)
	}
	userMap := map[string]interface{}{
		"username": "name",
		"password": "pass",
	}
	if !util.Object.IsMap(userMap) {
		t.Errorf("expected %v to be map", userMap)
	}
	str := "user"
	if util.Object.IsMap(str) {
		t.Error("expected string to not be map")
	}
}

func TestIsPointer(t *testing.T) {
	user := struct {
		Username string
		Password string
	}{}
	if util.Object.IsPointer(user) {
		t.Errorf("expected %v to not be pointer", user)
	}
	if !util.Object.IsPointer(&user) {
		t.Errorf("expected pointer of %v to be pointer", user)
	}
	userMap := map[string]interface{}{
		"username": "name",
		"password": "pass",
	}
	if util.Object.IsPointer(userMap) {
		t.Errorf("expected %v to not be pointer", userMap)
	}
	if !util.Object.IsPointer(&userMap) {
		t.Errorf("expected pointer of %v to be pointer", userMap)
	}
	str := "123"
	if util.Object.IsPointer(str) {
		t.Errorf("expected string %v to not be pointer", str)
	}
}

func TestIsZero(t *testing.T) {
	type User struct {
		Username string
		Password string
	}
	var user *User
	if !util.Object.IsZero(user) {
		t.Errorf("expected %v to be zero", user)
	}
	user = &User{
		Username: "name",
		Password: "pass",
	}
	if util.Object.IsZero(user) {
		t.Errorf("expected %v to not be zero", user)
	}
	var userMap *map[string]interface{}
	if !util.Object.IsZero(userMap) {
		t.Errorf("expected %v to be zero", userMap)
	}
	userMap = &map[string]interface{}{}
	if util.Object.IsZero(userMap) {
		t.Errorf("expected %v to not be zero", userMap)
	}
	str := "123"
	if util.Object.IsZero(str) {
		t.Errorf("expected string %v to not be zero", str)
	}
	str = ""
	if !util.Object.IsZero(str) {
		t.Errorf("expected string %v to be zero", str)
	}
	num := 1
	if util.Object.IsZero(num) {
		t.Errorf("expected %v to not be zero", num)
	}
	num = 0
	if !util.Object.IsZero(num) {
		t.Errorf("expected %v to be zero", num)
	}
	if util.Object.IsZero(false) || util.Object.IsZero(true) {
		t.Error("expected boolean value to not be zero")
	}
}

func TestCopyProperties(t *testing.T) {
	user := struct {
		Username string
		Password string
	}{
		Username: "name",
		Password: "pass",
	}
	value := map[string]interface{}{}
	err := util.Object.CopyProperties(user, &value)
	if err != nil {
		t.Error(err.Error())
	}
	expect := map[string]interface{}{
		"username": "name",
		"password": "pass",
	}
	eq := reflect.DeepEqual(value, expect)
	if !eq {
		t.Errorf("value incorrect, got: %v, expected: %v", value, expect)
	}
	newUser := struct {
		Username string
		Password string
	}{}
	err = util.Object.CopyProperties(expect, &newUser)
	if err != nil {
		t.Error(err.Error())
	}
	eq = reflect.DeepEqual(newUser, user)
	if !eq {
		t.Errorf("value incorrect, got: %v, expected: %v", newUser, user)
	}
}

func TestDiff(t *testing.T) {
	user := struct {
		Username string
		Password string
	}{
		Username: "name",
		Password: "pass",
	}
	differ := map[string]interface{}{
		"username": "name",
		// "password": "pass",
	}
	err, missing := util.Object.Diff(user, differ)
	if err != nil {
		t.Errorf("unexpected error: %v", err.Error())
	}
	expect := []string{"password"}
	eq := reflect.DeepEqual(missing, expect)
	if !eq {
		t.Errorf("expected %v to equal %v", missing, expect)
	}
}
