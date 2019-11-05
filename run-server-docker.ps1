docker build -f server.Dockerfile -t pi-sense-hat-remote-simulator-server .
docker run -p 8080:8080/tcp pi-sense-hat-remote-simulator-server