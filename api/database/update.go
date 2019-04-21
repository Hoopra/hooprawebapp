package database

import (
	"hoopraapi/util"
)

func (s *storeInstance) Update(set interface{}, where interface{}) error {
	err, query := util.Go2SQL.UpdateQuery(s.table, set, where)
	if err != nil {
		return err
	}
	_, err = s.conn.Exec(query)
	return err
}
