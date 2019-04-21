package database

import (
	"hoopraapi/util"
)

func (s *storeInstance) Insert(model interface{}) error {
	err, query := util.Go2SQL.InsertQuery(s.table, model)
	if err != nil {
		return err
	}
	_, err = s.conn.Exec(query)
	return err
}

func (s *storeInstance) BulkInsert(models []interface{}) error {
	err, query := util.Go2SQL.InsertQuery(s.table, models)
	if err != nil {
		return err
	}
	_, err = s.conn.Exec(query)
	return err
}
