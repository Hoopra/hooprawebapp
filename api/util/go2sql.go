package util

import (
	"fmt"
)

type go2sqlTranslator struct{}

var Go2SQL = &go2sqlTranslator{}

func (*go2sqlTranslator) InsertQuery(table string, model interface{}) (error, string) {
	err, keys, values := Go2SQL.ArgumentList(model)
	if err != nil {
		return err, ""
	}
	query := fmt.Sprintf("INSERT INTO %v %v VALUES %v;", table, keys, values)
	return nil, query
}

func (*go2sqlTranslator) SelectQuery(table string, where interface{}) (error, string) {
	err, whereQuery := Go2SQL.Where(where)
	if err != nil {
		return err, ""
	}
	return nil, fmt.Sprintf("SELECT * FROM %v WHERE %v;", table, whereQuery)
}

func (*go2sqlTranslator) UpdateQuery(table string, setMap interface{}, whereMap interface{}) (error, string) {
	err, updates := Go2SQL.SetAll(setMap)
	if err != nil {
		return err, ""
	}
	err, where := Go2SQL.Where(whereMap)
	if err != nil {
		return err, ""
	}
	return nil, fmt.Sprintf("UPDATE %v SET %v WHERE %v;", table, updates, where)
}

func (*go2sqlTranslator) DeleteQuery(table string, whereMap interface{}) (error, string) {
	err, where := Go2SQL.Where(whereMap)
	if err != nil {
		return err, ""
	}
	query := fmt.Sprintf("DELETE FROM %v WHERE %v;", table, where)
	return nil, query
}

func (*go2sqlTranslator) Value(v interface{}) string {
	if Object.IsZero(v) {
		return "NULL"
	}
	switch v.(type) {
	case string:
		return fmt.Sprintf("'%v'", v)
	default:
		return fmt.Sprintf("%v", v)
	}
}

func (*go2sqlTranslator) Where(where interface{}) (error, string) {
	query := ""
	m := map[string]interface{}{}
	err := Object.CopyProperties(where, &m)
	if err != nil {
		return err, query
	}
	i, target := 0, len(m)-1
	for k, v := range m {
		if Object.IsZero(v) {
			query += fmt.Sprintf("%v IS NULL", k)
		} else {
			v = Go2SQL.Value(v)
			query += fmt.Sprintf("%v=%v", k, v)
		}
		if i < target {
			query = query + " AND "
		}
		i++
	}
	return nil, query
}

func (*go2sqlTranslator) ArgumentList(args interface{}) (error, string, string) {
	if Object.IsArray(args) {
		return Go2SQL.argumentListMultiple(args)
	}
	m := map[string]interface{}{}
	err := Object.CopyProperties(args, &m)
	if err != nil {
		return err, "", ""
	}
	keys, values := "(", "("
	i, target := 0, len(m)
	for k, v := range m {
		v := Go2SQL.Value(v)
		if i != 0 && i != target {
			keys, values = keys+",", values+","
		}
		keys += fmt.Sprintf("%v", k)
		values += fmt.Sprintf("%v", v)
		i++
	}
	keys, values = keys+")", values+")"
	return nil, keys, values
}

func (*go2sqlTranslator) argumentListMultiple(args interface{}) (error, string, string) {
	var columns []string
	model := args.([]map[string]interface{})
	for _, v := range model {
		err, mKeys := Object.KeysOf(v)
		if err != nil {
			return err, "", ""
		}
		for _, key := range mKeys {
			if !Object.Contains(columns, key) {
				columns = append(columns, key)
			}
		}
	}
	keys := "("
	target := len(columns)
	for i, k := range columns {
		if i != 0 && i != target {
			keys += ","
		}
		keys += fmt.Sprintf("%v", k)
	}
	keys += ")"

	values := ""
	inserts := len(model)
	for index, v := range model {
		m := map[string]interface{}{}
		err := Object.CopyProperties(v, &m)
		if err != nil {
			return err, "", ""
		}

		values += "("
		for i, k := range columns {
			v := Go2SQL.Value(m[k])
			if i != 0 && i != target {
				values += ","
			}
			values += fmt.Sprintf("%v", v)
			if i == target-1 {
				values += ")"
			}
		}
		if index != inserts-1 {
			values += ","
		}
	}
	return nil, keys, values
}

func (*go2sqlTranslator) SetAll(set interface{}) (error, string) {
	query := ""
	m := map[string]interface{}{}
	err := Object.CopyProperties(set, &m)
	if err != nil {
		return err, query
	}

	i, target := 0, len(m)
	for k, v := range m {
		if i != 0 && i != target {
			query += ","
		}
		v = Go2SQL.Value(v)
		query += fmt.Sprintf("%v=%v", k, v)
		i++
	}
	return nil, query
}
