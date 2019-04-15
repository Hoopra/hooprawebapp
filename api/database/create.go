package database

import (
	"hoopraapi/util"
)

func (s *storeInstance) Insert(model map[string]interface{}) error {
	query := util.Go2SQL.InsertQuery(s.table, model)
	_, err := s.conn.Exec(query)
	return err
}
