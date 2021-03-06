# Introduction
This application shows how to build a 3-tier (client-server-database) application deployed in the Cloud
* The client uses React to compose the view out of modular, decoupled components whose state is managed by Redux, layout by FlexBox and styling by Sass
* The server uses Express on Node to provide an http server that serves the client as well as providing RESTful endpoints for the client to use
* The database uses MongoDB to store the character data and Mongoose to provide schemas to facilitate constrained interaction between the client and the database
* The tests use Jest as a test runner and to build test suites; Chai is used to write the assertions for each test
* The application client and server are transpiled with Babel and bundled with Webpack to allow for use of the latest features
* The entire application has been deployed to the Zeit Cloud to make it simpler for a User to play around with without having to go through the installation steps

# Architecture
The application is made up of a driver, client, server, database and tests. These components are intentionally decoupled from each other. This provides the benefits listed below:
* changes to the driver, client, server, database and tests can be made independently of each other
* understanding the application is simpler as at the top level it is made up of coarse granularity sub-systems

# Driver
* The purpose of the driver is to provide an entry point into the application. It reads a database URI from an environment file and connects to a remote database.

# Client
* The purpose of the client is to define a responsive front-end that can be served by an http server and loaded into a browser. It provides the ability to display the characters in the database as well as provide the ability to create, update and delete chaaracters. It is split into components, actions, reducers and asset files.

# Server
* The purpose of the server is to serve the bundled up client to a web browser. It provides CRUD RESTful endpoints which the client can invoke to facilitate running commands/queries against the database.

# Database
* The purpose of the database is two-fold. It serves as a persistent store for character data. It also provides CRUD operations with which to retrieve/mutate information for a client. It is located remotely to simplify the installation and running of this application.

# Tests
* The purpose of the tests is to provide confidence that the database, server and client have been written correctly. We have good test coverage for the database and server components for now. In the future we hope to extend this coverage to the client.

# Install Steps
* Install [Node 7.8.0](https://nodejs.org/en/)

# Build Steps

Open up a Terminal command line session
```
$
```

Download the project code from GitHub
```
$ git clone https://github.com/debugme/react-wars.git
```

Navigate into the downloaded folder
```
$ cd react-wars
```

Install the project dependencies
```
$ npm install
```

# Run Steps

Start up the server
```
$ port=3000 mongodburi=<add-mongodb-uri-here> npm start
```
Open your browser at
```
http://localhost:3000
```

# Use Steps

* The information for each character is displayed as a row in a table
* If you click the icon in the header of the last column, a new character row is added
* You can designate whether a character is a favorite or not by toggling the heart icon in its row
* You can designate whether a character is editable or not by toggling the lock icon in its row
 * When the lock icon is open and green, the character fields can be edited
 * When the lock icon is closed and red, any changes you have made are saved and the character cannot be edited
* You can delete a character by clicking the trash can icon in its row

# Test Steps

Run the tests
```
$ npm test
```
View the test results in your browser
```
$ open coverage/lcov-report/index.html
```

# Technology Stack

* [React](https://facebook.github.io/react/) - used to build the front-end as components
* [Redux](http://redux.js.org) - used to provide state management for the front-end components
* [Webpack](https://webpack.js.org) - used to concatenate code and assets into bundles
* [Sass](http://sass-lang.com) - used to make styling simpler to understand and maintain
* [Node](https://nodejs.org/en/) - used to host the application server
* [Express](http://expressjs.com) - used to serve the web application to the browser
* [MongoDB](https://www.mongodb.com) - used to store character information between sessions
* [Mongoose](http://mongoosejs.com/) - used to define schemas to control interaction with MongoDB
* [Jest](https://facebook.github.io/jest/) - used to write tests for the various components
* [Chai](http://chaijs.com/) - used to provide assertions for the tests
* [Zeit](https://zeit.co/) - used to deploy the application to the Web to play around with
