# Start from a Debian image with the latest version of Go installed
# and a workspace (GOPATH) configured at /go.
FROM golang

ENV DIR=/go/src/github.com/hoopra
WORKDIR ${DIR}/

# Copy the local package files to the container's workspace.
ADD ./api ./api

# Build the outyet command inside the container.
# (You may fetch or manage dependencies here,
# either manually or with a tool like "godep".)
RUN go get -d ./api

RUN ls && echo "-----" && ls api

# Document that the service listens on port 8000.
EXPOSE 8000

# Run the outyet command by default when the container starts.
CMD go run ${DIR}/api/main.go
