FROM node:14-alpine

WORKDIR /frontend/

ENV PATH /frontend/node_modules/.bin:$PATH

COPY yarn.lock /frontend/
COPY package.json /frontend/

RUN yarn --silent
RUN yarn global add react-scripts --silent

COPY . /frontend/app/
WORKDIR /frontend/app/