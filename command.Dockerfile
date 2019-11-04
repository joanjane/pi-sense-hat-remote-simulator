FROM node:13-alpine

ENV SERVER_URI
ENV TARGET

WORKDIR /usr/src/app

COPY package.json ./

RUN npm install

COPY . ./
CMD npm run message