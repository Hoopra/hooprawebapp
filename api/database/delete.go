package database

import (
	"hoopraapi/util"
)

func (s *storeInstance) Delete(where interface{}) error {
	err, query := util.Go2SQL.DeleteQuery(s.table, where)
	if err != nil {
		return err
	}
	_, err = s.conn.Exec(query)
	return err
}
