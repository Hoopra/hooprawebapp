package config

import (
	"encoding/json"
	"errors"
	"io/ioutil"
	"log"
	"os"
)

var environments = map[string]string{
	"prod": "config/prod.json",
	"dev":  "config/dev.json",
}

// Config for instance
type Config struct {
	PrivateKeyPath string
	PublicKeyPath  string
	ExpireDelta    int
	Issuer         string
	Env            string
	Port           int
}

var config = Config{}
var env string

// Init Config for the current environment
func Init() {
	env = os.Getenv("GO_ENV")
	if env == "" {
		log.Print("using dev as GO_ENV by default")
		env = "dev"
	}

	// fmt.Printf("Threads: %v\n", runtime.GOMAXPROCS(-1))

	err := readConfig("dev", &config)
	if err != nil {
		panic(err)
	}
	if env != "dev" {
		err := readConfig(env, &config)
		if err != nil {
			panic(err)
		}
	}

	priOvr := os.Getenv("AUTH_PRIVATE_KEY_PATH")
	pubOvr := os.Getenv("AUTH_PUBLIC_KEY_PATH")
	if priOvr != "" {
		config.PublicKeyPath = pubOvr
	}
	if pubOvr != "" {
		config.PublicKeyPath = pubOvr
	}

	config.Env = env
}

func readConfig(env string, config *Config) error {
	content, err := ioutil.ReadFile(environments[env])
	if err != nil {
		return errors.New("error while reading config file: " + err.Error())
	}

	jsonErr := json.Unmarshal(content, &config)
	if jsonErr != nil {
		return errors.New("error while parsing config file: " + err.Error())
	}
	return nil
}

// Get returns the current config settings
func Get() Config {
	if &config == nil {
		Init()
	}
	return config
}
