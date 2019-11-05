docker build -f web.Dockerfile -t pi-sense-hat-remote-simulator-web .
docker run -p 3000:80/tcp pi-sense-hat-remote-simulator-web