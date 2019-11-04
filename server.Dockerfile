FROM node:13-alpine

ENV SERVER_PORT 8080

WORKDIR /usr/src/app

COPY package.json ./

RUN npm install

COPY . ./

EXPOSE $SERVER_PORT
CMD npm run ws-serve
