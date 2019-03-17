# Start from a Debian image with the latest version of Go installed
# and a workspace (GOPATH) configured at /go.
FROM golang

ENV GO111MODULE=on
ENV DIR=/src/api
WORKDIR ${DIR}/

# Copy the local package files to the container's workspace
ADD . .

# Build go context
RUN go get

# Listen on port 8000
EXPOSE 8000

# Run the main.go file by default
CMD go run *.go
