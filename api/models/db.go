package models

import (
	"time"
)

type storeEntry struct {
	ID        uint       `db:"id" json:"id"`
	CreatedAt *time.Time `db:"created_at" json:"createdAt"`
	DeletedAt *time.Time `db:"deleted_at" json:"deletedAt"`
	UpdatedAt *time.Time `db:"updated_at" json:"updatedAt"`
}

type User struct {
	storeEntry
	Username string `db:"username" json:"username"`
	Password string `db:"-" json:"password"`
	Hash     []byte `db:"password_hash" json:"-"`
	Email    string `db:"email" json:"email"`
}
