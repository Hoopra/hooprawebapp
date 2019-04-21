package test

import (
	"hoopraapi/util"
	"testing"
)

func TestInsert(t *testing.T) {
	insert := map[string]interface{}{
		"username": "user",
		"password": "pass",
	}
	err, query := util.Go2SQL.InsertQuery("table", insert)
	if err != nil {
		t.Error(err)
	}
	expect1 := "INSERT INTO table (password,username) VALUES ('pass','user');"
	expect2 := "INSERT INTO table (username,password) VALUES ('user','pass');"
	if query != expect1 && query != expect2 {
		t.Errorf("query was incorrect, got: %v, expected: %v -or- %v", query, expect1, expect2)
	}
	insert2 := []map[string]interface{}{
		{
			"username": "user",
		},
		{
			"username": "user",
			"password": "",
		},
		{
			"username": "user",
			"password": "123",
		},
	}
	err, query = util.Go2SQL.InsertQuery("table", insert2)
	if err != nil {
		t.Error(err)
	}
	expect1 = "INSERT INTO table (username,password) VALUES ('user',NULL),('user',NULL),('user','123');"
	expect2 = "INSERT INTO table (password,username) VALUES (NULL,'user'),(NULL,'user'),('123','user');"
	if query != expect1 && query != expect2 {
		t.Errorf("query was incorrect, got: %v, expected: %v -or- %v", query, expect1, expect2)
	}
}

func TestSelect(t *testing.T) {
	find := map[string]interface{}{
		"username": "",
		"password": "pass",
	}
	err, query := util.Go2SQL.SelectQuery("table", find)
	if err != nil {
		t.Error(err)
	}
	expect1 := "SELECT * FROM table WHERE username IS NULL AND password='pass';"
	expect2 := "SELECT * FROM table WHERE password='pass' AND username IS NULL;"
	if query != expect1 && query != expect2 {
		t.Errorf("query was incorrect, got: %v, expected: %v -or- %v", query, expect1, expect2)
	}
}

func TestUpdate(t *testing.T) {
	update := map[string]interface{}{
		"username": "name",
		"password": "word",
	}
	where := map[string]interface{}{
		"username": "user",
	}
	err, query := util.Go2SQL.UpdateQuery("table", update, where)
	if err != nil {
		t.Error(err)
	}
	expect1 := "UPDATE table SET username='name',password='word' WHERE username='user';"
	expect2 := "UPDATE table SET password='word',username='name' WHERE username='user';"
	if query != expect1 && query != expect2 {
		t.Errorf("query was incorrect, got: %v, expected: %v -or- %v", query, expect1, expect2)
	}
}

func TestDelete(t *testing.T) {
	where := map[string]interface{}{
		"username": "user",
		"password": "pass",
	}
	err, query := util.Go2SQL.DeleteQuery("table", where)
	if err != nil {
		t.Error(err)
	}
	expect1 := "DELETE FROM table WHERE username='user' AND password='pass';"
	expect2 := "DELETE FROM table WHERE password='pass' AND username='user';"
	if query != expect1 && query != expect2 {
		t.Errorf("query was incorrect, got: %v, expected: %v -or- %v", query, expect1, expect2)
	}
}

func TestValue(t *testing.T) {
	value := util.Go2SQL.Value(0)
	expect := "NULL"
	if value != expect {
		t.Errorf("value was incorrect, got: %v, expected: %v", value, expect)
	}
	value = util.Go2SQL.Value(1)
	expect = "1"
	if value != expect {
		t.Errorf("value was incorrect, got: %v, expected: %v", value, expect)
	}
	value = util.Go2SQL.Value("hi")
	expect = "'hi'"
	if value != expect {
		t.Errorf("value was incorrect, got: %v, expected: %v", value, expect)
	}
	value = util.Go2SQL.Value("")
	expect = "NULL"
	if value != expect {
		t.Errorf("value was incorrect, got: %v, expected: %v", value, expect)
	}
	value = util.Go2SQL.Value(1.2)
	expect = "1.2"
	if value != expect {
		t.Errorf("value was incorrect, got: %v, expected: %v", value, expect)
	}
	value = util.Go2SQL.Value(nil)
	expect = "NULL"
	if value != expect {
		t.Errorf("value was incorrect, got: %v, expected: %v", value, expect)
	}
}
