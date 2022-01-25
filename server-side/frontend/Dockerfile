FROM node:14-alpine

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY package.json ./
COPY yarn.lock ./

RUN yarn --silent
RUN yarn install react-scripts@3.4.1 -g --silent

COPY . ./