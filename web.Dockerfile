FROM node:13-alpine

ENV SERVER_PORT 80

WORKDIR /usr/src/app

RUN npm i serve -g

COPY package.json ./

RUN npm install

COPY . ./

RUN npm run build:web

EXPOSE $SERVER_PORT
CMD serve wwwroot/ -s -l $SERVER_PORT
