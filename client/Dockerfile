# base image
FROM node:14.17.0-alpine as build-stage

# set working directory
WORKDIR /client/app


# add `/app/node_modules/.bin` to $PATH
ENV PATH /client/app/node_modules/.bin:$PATH

RUN apk update && apk upgrade && \
    apk add --no-cache bash git openssh

# install and cache app dependencies

COPY package-lock.json /client/app/package-lock.json
COPY package.json /client/app/package.json

RUN npm install --unsafe-perm --production
#RUN npm install react-scripts@3.0.1 -g --silent
COPY . /client/app/
RUN npm run build

FROM nginx:1.22 as production-stage
RUN mkdir /app
COPY --from=build-stage /client/app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 8080:8080
CMD ["nginx", "-g", "daemon off;"]
