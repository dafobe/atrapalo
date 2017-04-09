# Atrapalo Frontend test #

### _David Fonollosa_
- ----------------------
### Test Purpose

The main goal of this test is to develop a client side application like MS PAINT following the provided specs  requirements.

Main requirements:
- Clean, easy to read, and testeable code
- Unit Testing
- Reusable Component

Architecture:
- Core: I propose to develop a Modular application where each Module follow the MCV pattern, where each layer is isolated from other (Models, Business Logic --Services-- and Views). Since this application has not Server side nor persistent data(DB), has not been needed to implement services, repositories, etc...

This architecture lets to create small teams of developers to implement isolated modules. 

- CSS: Since this is a Modular application, the CSS architecture which best suits with the Modules development is the BEM architecture which has been applied in this project. 


## Environment
Node
Webpack 2.2.1 as bundler tool and dependency management
Webpack 2.2.1 plugins for code optimization
Webpack hot reloading for Development.
Babel transpiler to add JS
Babel loaders (css loader, less loader, exctract CSS, etc..)

Docker and Docker-compose in order to Containerize (Virtualize) environment.

## NPM Installation
## Installing and Running
There are two methods to init and start 

## NODE Installation
### Install Node Modules
```sh
npm install
```
### Start DEV Server with watch and hot reload capabilities
```sh
npm start
```
### Production Build
```sh
npm run build
``` 
### Start Tests
```sh
npm run test
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