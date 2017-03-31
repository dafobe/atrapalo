# Use the docker/node base image
FROM node:7.3.0-alpine
MAINTAINER David Fonollosa <dafobe@gmail.com>

# Add node user in order to run without root permissions
# allows run docker image as node -u "node"
# RUN addgroup -S node && adduser -S -g node node 


RUN addgroup -S app && adduser -S -g app app

RUN mkdir -p /src/app

# Trick to avoid build issues when runnig from docker-compose
RUN mkdir /src/app/node_modules
RUN mkdir /src/app/public
RUN chown app:app /src/app/node_modules
RUN chown app:app /src/app/public

# Install app dependencies
COPY package.json /src/app
COPY webpack.config.js /src/app

RUN chown -R app:app /src/app

USER app
WORKDIR /src/app
RUN npm install

USER root
COPY . /src/app
RUN chown -R app:app /src/app/*
USER app

# Bundle app source
# COPY . /src/app

# default API servers port
#EXPOSE 3000

#CMD [ "npm", "start" ]