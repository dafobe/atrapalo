# Atrapalo Frontend test #

### _David Fonollosa_
- ----------------------
### Test Purpose

The main goal of this test is to develop a client side application like MS PAINT that reproduces the Dashboard provided in the test requirements.

Main requirements:
- Clean, easy to read, and testeable code
- Unit Testing
- Reusable Component
- MVC implementation

## Environment
Node
Webpack 2.2.1 as bundler tool and dependency management
Webpack 2.2.1 plugins for code optimization
Babel transpiler to add JS

Webpack dev server as web server

Docker
docker-compose

## Installing and Running
There are two methods to init and start 

## NODE Installation
### Install Node Modules
```sh
npm install
```
### Start the Server with watch and hot reload capabilities
```sh
npm start
```

> The server will be available at localhost:8080

## DOCKER Installation
### Download and Start Docker container
```sh
docker-compose up
```
> The server will be available at localhost:8080


### Testing the code
In order to validate the markup responsiveness, can be used physical devices or emulate the metrics with the browser debugger tools:  

* Screen 1 : Desktop screen
* Screen 2 : Iphone 5/6 