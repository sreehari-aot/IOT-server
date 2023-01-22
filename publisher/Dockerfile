FROM node:14.17.0-alpine as build-stage

# set working directory
WORKDIR /publisher/app


# add `/app/node_modules/.bin` to $PATH
ENV PATH /publisher/app/node_modules/.bin:$PATH

RUN apk update && apk upgrade && \
    apk add --no-cache bash git openssh

# install and cache app dependencies

COPY package-lock.json /publisher/app/package-lock.json
COPY package.json /publisher/app/package.json

RUN npm install
#RUN npm install react-scripts@3.0.1 -g --silent
COPY . /publisher/app/

ENTRYPOINT [ "node", "scripts" ]
