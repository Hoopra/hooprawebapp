package database

import (
	"hoopraapi/util"
)

func (s *storeInstance) Update(set map[string]interface{}, where map[string]interface{}) error {
	query := util.Go2SQL.UpdateQuery(s.table, set, where)
	_, err := s.conn.Exec(query)
	return err
}
