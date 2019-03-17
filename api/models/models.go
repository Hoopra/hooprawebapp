package models

// User ...
type User struct {
	ID       int    `json:"id" form:"-"`
	Username string `json:"username" form:"username"`
	Password string `json:"password" form:"password"`
	Hash     []byte `json:"password_hash" form:"password"`
	Email    string `json:"email" form:"email"`
}
