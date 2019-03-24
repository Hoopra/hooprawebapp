package database

import (
	"errors"

	"hoopraapi/utils"

	"github.com/jinzhu/gorm"
)

type userstore interface {
	Add(user *User) error
	Validate(username string, password string) bool
	UpdateName(id int, newName string) error
	UpdatePassword(id int, newPassword string) error
	SelectByID(id int) *User
	SelectByName(name string) *User
}

type User struct {
	gorm.Model
	ID       int    `gorm:"UNIQUE_INDEX; PRIMARY_KEY; NOT NULL; AUTO_INCREMENT; default:NULL" json:"id"`
	Username string `gorm:"type:VARCHAR(100); UNIQUE_INDEX; NOT NULL; default:NULL" json:"username"`
	Password string `gorm:"-" json:"password"`
	Hash     []byte `gorm:"column:password_hash; NOT NULL; default:NULL" json:"password_hash"`
	Email    string `gorm:"type:VARCHAR(100); INDEX; default:NULL" json:"email"`
}

func Users() *storeInstance {
	return &storeInstance{
		conn:  getDatabase().connection,
		table: "users",
	}
}

func (s *storeInstance) Add(user *User) error {

	existing := s.SelectByName(user.Username)

	if existing != nil {
		return errors.New("a user with that name already exists")
	}

	hash, err := utils.HashPassword(user.Password)
	if err != nil {
		return err
	}

	user.Hash = hash
	s.conn.Create(&user)

	return nil
}

func (s *storeInstance) Validate(username string, password string) bool {

	user := s.SelectByName(username)
	if user == nil {
		return false
	}

	err := utils.CompareHashAndPassword(user.Hash, password)
	if user.Username != username || err != nil {
		return false
	}

	return true
}

func (s *storeInstance) UpdateName(id int, newName string) error {

	user := s.SelectByID(id).(User)
	user.Username = newName
	s.conn.Save(&user)

	return nil
}

func (s *storeInstance) UpdatePassword(id int, newPassword string) error {

	hash, err := utils.HashPassword(newPassword)
	if err != nil {
		return err
	}

	user := s.SelectByID(id).(User)
	user.Hash = hash
	s.conn.Save(&user)

	return err
}

func (s *storeInstance) SelectByName(name string) *User {
	user := s.SelectBy(map[string]interface{}{"username": name}).(User)
	return &user
}

// func (s *storeInstance) SelectByID(id int) *User {

// 	user := User{ID: id}
// 	s.conn.Where("id = ?", id).First(&user)
// 	if user.Username == "" || user.ID == 0 {
// 		return nil
// 	}

// 	return &user
// }
