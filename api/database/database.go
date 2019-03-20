package database

import (
	"fmt"
	"log"
	"time"

	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/postgres"
)

type Database interface {
	Rollback()
}

type Datastore struct {
	connection *gorm.DB
}

type storeInstance struct {
	conn *gorm.DB
}

const maxRetries = 5

var (
	retries   = 0
	datastore *Datastore
)

func Init() {
	datastore = newDefaultDatastore()
}

func getDatastore() *Datastore {
	if datastore == nil {
		datastore = newDefaultDatastore()
	}
	return datastore
}

func newDefaultDatastore() *Datastore {
	conn, err := connect()
	if err != nil {
		panic("cannot connect to db")
	}
	datastore = &Datastore{
		connection: conn,
	}
	return datastore
}

// Connection returns a connection to the underlying database
func connect() (*gorm.DB, error) {
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

	conn, err := gorm.Open("postgres", psqlInfo)

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

	return conn, nil
}
