FROM node:13-alpine

ENV WS_SERVER_PORT 80
ENV WS_SERVER_SECURE_PORT 443

WORKDIR /usr/src/app

COPY package.json ./

RUN npm install

COPY . ./

EXPOSE $WS_SERVER_PORT
EXPOSE $WS_SERVER_SECURE_PORT
CMD node --experimental-modules lib/scripts/run-server.js $WS_SERVER_PORT $WS_SERVER_SECURE_PORT
