package database

import "hoopraapi/util"

type databaseSelect interface {
	SelectById(id int)
	SelectBy(findMap map[string]interface{})
}

func (s *storeInstance) SelectBy(findMap map[string]interface{}, model interface{}) error {

	query := util.Go2SQL.SelectQuery(s.table, findMap)
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
