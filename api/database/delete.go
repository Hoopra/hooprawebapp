package database

import (
	"hoopraapi/util"
)

func (s *storeInstance) Delete(where map[string]interface{}) error {
	query := util.Go2SQL.DeleteQuery(s.table, where)
	_, err := s.conn.Exec(query)
	return err
}
