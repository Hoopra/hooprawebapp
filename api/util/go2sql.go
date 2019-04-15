package util

import (
	"fmt"
)

type go2sqlTranslator struct{}

var Go2SQL = &go2sqlTranslator{}

func (*go2sqlTranslator) InsertQuery(table string, model map[string]interface{}) string {
	keys, values := Go2SQL.ArgumentList(model)
	query := fmt.Sprintf("INSERT INTO %v %v VALUES %v;", table, keys, values)
	return query
}

func (*go2sqlTranslator) SelectQuery(table string, where map[string]interface{}) string {
	return fmt.Sprintf("SELECT * FROM %v WHERE %v;", table, Go2SQL.Where(where))
}

func (*go2sqlTranslator) UpdateQuery(table string, setMap map[string]interface{}, whereMap map[string]interface{}) string {
	updates := Go2SQL.SetAll(setMap)
	where := Go2SQL.Where(whereMap)
	query := fmt.Sprintf("UPDATE %v SET %v WHERE %v;", table, updates, where)
	return query
}

func (*go2sqlTranslator) DeleteQuery(table string, whereMap map[string]interface{}) string {
	where := Go2SQL.Where(whereMap)
	query := fmt.Sprintf("DELETE FROM %v WHERE %v;", table, where)
	return query
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

func (*go2sqlTranslator) Where(where map[string]interface{}) string {
	query := ""
	i, target := 0, len(where)-1
	for k, v := range where {
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
	return query
}

func (*go2sqlTranslator) ArgumentList(args map[string]interface{}) (string, string) {
	keys, values := "(", "("
	i, target := 0, len(args)
	for k, v := range args {
		v := Go2SQL.Value(v)
		if i != 0 && i != target {
			keys, values = keys+",", values+","
		}
		keys += fmt.Sprintf("%v", k)
		values += fmt.Sprintf("%v", v)
		i++
	}
	keys, values = keys+")", values+")"
	return keys, values
}

func (*go2sqlTranslator) SetAll(set map[string]interface{}) string {
	query := ""
	i, target := 0, len(set)
	for k, v := range set {
		if i != 0 && i != target {
			query += ","
		}
		v = Go2SQL.Value(v)
		query += fmt.Sprintf("%v=%v", k, v)
		i++
	}
	return query
}
