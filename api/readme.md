
----------------
-- Run server --
----------------
* Development 
... go/src/hoopraapi/go run *.go

* Production
GO_ENV=prod
... go/src/hoopraapi/go run *.go

* Overwrites for key paths
AUTH_PRIVATE_KEY_PATH={key to private key}
AUTH_PUBLIC_KEY_PATH={key to public key}

----------------
-- Race check --
----------------
... go/src/hoopraapi/go run *.go -race


----------------
-- Run tests  --
----------------
... go/src/hoopraapi/test/go run test.go
