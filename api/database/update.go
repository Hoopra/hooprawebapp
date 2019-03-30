package database

type databaseUpdate interface {
	Update()
}

func (s *storeInstance) Update(model interface{}, updateMap map[string]interface{}) error {
	// if model == nil {
	// 	return errors.New("model nil during update")
	// }
	// s.conn.Model(model).Updates(updateMap)
	return nil
}
