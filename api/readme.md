
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


-------------------
-- Run e2e tests --
-------------------
... go run test/e2e.go

--------------------
-- Run unit tests --
--------------------
... go test -v ./...