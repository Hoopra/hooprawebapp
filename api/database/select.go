package database

import (
	"fmt"
)

type databaseSelect interface {
	SelectById(id int)
	SelectBy(findMap map[string]interface{})
}

func selectQuery(findMap map[string]interface{}, table string) string {
	query := "SELECT * FROM " + table + " WHERE "
	toAdd := len(findMap)
	for key, value := range findMap {
		query = query + key + "="
		switch value.(type) {
		case string:
			query = query + "'" + value.(string) + "'"
		default:
			query = query + "" + fmt.Sprintf("%v", value) + ""
		}
		toAdd--
		if toAdd > 0 {
			query = query + " AND "
		}
	}
	return query
}

func (s *storeInstance) SelectBy(findMap map[string]interface{}, model interface{}) error {

	query := selectQuery(findMap, s.table)
	rows, err := s.conn.Queryx(query)
	if err != nil {
		return err
	}
	for rows.Next() {
		err := rows.StructScan(model)
		if err != nil {
			return err
		}
	}
	return nil
}

func (s *storeInstance) SelectByID(id int, model interface{}) error {
	return s.SelectBy(map[string]interface{}{"id": id}, model)
}

func (s *storeInstance) SelectByColumn(key string, value interface{}, model interface{}) error {
	return s.SelectBy(map[string]interface{}{key: value, "id": 1}, model)
}
