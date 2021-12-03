# Readme

This is a simple NextJS app, for understanding your calories ;). This app is built using these technologies, goes without mention I am using NodeJS 16.13.0 and NPM 8.1.0.

- Server Side
    1. ExpressJS, with
        - CORS, for CORS policies
        - express-json, json parser for request
        - cookie-parser, cookie handling
        - body-parser, request body parser 
        - express-validator, request body validation
    2. TypeORM, database ORM
        - SQLite, for development
        - MySQL, for product but needs to be set in the configuration
        - class-transformer, for making changes to the TypeORM entity(model) classes.
    3. Typescript, faster & safer development
    4. Nodemon, development and watching changes
    5. tscpaths, transform typescript path aliases to javascript exact paths.
    6. eslint & prettier, for code linting and formatting
    7. moment.js, handling time and date easily.
    8. lodash, object & array manipulation
- Client Side
    1. NextJS 12, react framework with Rust Compiler
    2. Redux-Thunk, for state management in react
    3. prop-types, type validation for components
    4. Antd, react UI framework
    5. moment.js, handling time and date easily.
    6. lodash, object & array manipulation
    7. axios, XHR request handling

## Installing

Make sure you have NodeJS available on your system, I am using NodeJS 16^

```bash
# Installing client dependencies
cd /client
npm install

# Installing server dependencies
cd /server
npm install
```

## Running the App

First you should start the server before running the app, assuming you have already installed the dependencies as indicated above.

```bash
# Running the server
cd /server
npm run dev

# Running the client
# Use another terminal tab, window or tmux
cd client
npm run dev
```

## Powerpoint

[Calocal Google Presentaion](https://docs.google.com/presentation/d/1KVTzUzZlZPOlkoYh0yTXsLE0qcwGM5jIwzi1fFcP-7E/edit?usp=sharing)
