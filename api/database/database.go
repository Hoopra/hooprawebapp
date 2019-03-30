package database

import (
	"fmt"
	"log"
	"time"

	"github.com/jmoiron/sqlx"
	_ "github.com/lib/pq"
	// "github.com/jinzhu/gorm"
	// _ "github.com/jinzhu/gorm/dialects/postgres"
)

type database struct {
	// connection *gorm.DB
	connection *sqlx.DB
}

type storeInstance struct {
	table string
	conn  *sqlx.DB
}

type storeEntry struct {
	ID        uint       `db:"id" json:"id"`
	CreatedAt *time.Time `db:"created_at" json:"created_at"`
	DeletedAt *time.Time `db:"deleted_at" json:"deleted_at"`
	UpdatedAt *time.Time `db:"updated_at" json:"updated_at"`
}

const maxRetries = 5

var (
	retries    = 0
	connecting = false
	datastore  *database
)

func Init() {
	datastore = newDefaultDatabase()
}

func getDatabase() *database {
	if datastore == nil {
		datastore = newDefaultDatabase()
	}
	return datastore
}

func newDefaultDatabase() *database {
	conn, err := connect()
	if err != nil {
		panic("cannot connect to db")
	}
	datastore = &database{
		connection: conn,
	}
	return datastore
}

// Connection returns a connection to the underlying database
func connect() (*sqlx.DB, error) {
	connecting = true
	// TODO read credentials from file
	// TODO accept multiple driver types

	const (
		host     = "db"
		port     = 5432
		user     = "hoopra"
		password = "hoophoop123!"
		dbname   = "hoopra_dev"
	)

	// sslmode=verify-full
	psqlInfo := fmt.Sprintf("host=%s port=%d user=%s password=%s dbname=%s sslmode=disable",
		host, port, user, password, dbname)

	conn, err := sqlx.Connect("postgres", psqlInfo)
	// conn, err := gorm.Open("postgres", psqlInfo)

	if conn == nil || err != nil {
		if retries < maxRetries {
			retries++
			log.Println("could not connect to db, retrying", retries)
			timer1 := time.NewTimer(15 * time.Second)
			<-timer1.C
			return connect()
		} else {
			panic(err)
		}
	}

	connecting = false
	return conn, nil
}
