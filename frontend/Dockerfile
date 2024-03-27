FROM node:18-alpine

COPY ./package.json ./package-lock.json ./

WORKDIR /app

RUN npm install

COPY ./ /app/