docker build -f server.Dockerfile -t pi-sense-hat-remote-simulator-server .
docker run -e WS_SERVER_PORT=8080 -p 8080:8080/tcp pi-sense-hat-remote-simulator-server