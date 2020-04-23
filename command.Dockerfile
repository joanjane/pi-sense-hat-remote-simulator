FROM node:13-alpine

ENV SERVER_URI=ws://server:8080
ENV DEVICE=test-web-client

WORKDIR /usr/src/app

COPY package.json ./

RUN npm install

COPY . ./
CMD npm run message