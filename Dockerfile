FROM node:20-alpine
LABEL authors="semyon"

MAINTAINER Semyon dev


RUN mkdir /app
WORKDIR /app

COPY ./backend/package.json /app

RUN npm i