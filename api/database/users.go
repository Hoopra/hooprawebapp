package database

import (
	"errors"

	"hoopraapi/utils"
)

type userstore interface {
	Add(user *User) error
	Validate(username string, password string) bool
	Update(user *User) error
	UpdateName(id int, newName string) error
	UpdatePassword(id int, newPassword string) error
	SelectByID(id int) *User
	SelectByName(name string) *User
}

type User struct {
	storeEntry
	Username string `db:"username" json:"username"`
	Password string `db:"-" json:"password"`
	Hash     []byte `db:"password_hash" json:"password_hash"`
	Email    string `db:"email" json:"email"`
}

func Users() *storeInstance {
	return &storeInstance{
		conn:  getDatabase().connection,
		table: "users",
	}
}

func (s *storeInstance) Add(user *User) error {

	err, existing := s.SelectByName(user.Username)

	if existing != nil {
		return errors.New("a user with that name already exists")
	}

	hash, err := utils.HashPassword(user.Password)
	if err != nil {
		return err
	}

	user.Hash = hash
	// s.conn.Create(&user)

	return nil
}

func (s *storeInstance) Validate(username string, password string) bool {

	err, user := s.SelectByName(username)
	if user == nil {
		return false
	}

	err = utils.CompareHashAndPassword(user.Hash, password)
	if user.Username != username || err != nil {
		return false
	}

	return true
}

func (s *storeInstance) UpdateName(id int, newName string) error {

	user := User{}
	err := s.SelectByID(id, user)
	if err != nil {
		return err
	}
	if &user == nil {
		return errors.New("user does not exist")
	}
	user.Username = newName
	// s.conn.Save(&user)

	return nil
}

// func (s *storeInstance) Update(property string, user *User) {
// 	s.conn.Save(&user)
// }

func (s *storeInstance) UpdatePassword(id int, newPassword string) error {

	hash, err := utils.HashPassword(newPassword)
	if err != nil {
		return err
	}

	user := User{}
	err = s.SelectByID(id, user)
	if &user == nil {
		return errors.New("user does not exist")
	}
	user.Hash = hash
	// s.conn.Save(&user)

	return err
}

func (s *storeInstance) SelectByName(name string) (error, *User) {
	user := User{}
	err := s.SelectByColumn("username", name, &user)
	if err != nil {
		return err, nil
	}
	return err, &user
}
