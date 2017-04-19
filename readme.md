# Demo

[https://react-wars.now.sh/](https://react-wars.now.sh/)

# Introduction
This demonstrates one approach to building a modern full-stack CRUD application. It uses React and Redux for the frontend view and state management. The frontend is served by an http server written in Express and running on Node. RESTful calls are made by the frontend to the server, which in turn translates them into calls to a remote Mongo database. The responses are marshalled back to the frontend as JSON payloads which are then used for appropriate update. The application has also been deployed to the Zeit Cloud for demo purposes.

# Interesting things about this application
1. MongoDB and Mongoose Schema for data persistence and validation
2. Node and Express to provide RESTful server-side endpoints
3. React for front-end component visualization
4. Redux for front-end state management
5. FlexBox for responsive UI
6. Sass to allow for writing more declarative, succint CSS
7. Jest test framework with Chai assertion library for tests
8. Comprehensive tests for database layer and server layer
9. Deployed in Zeit (A much more expedient approach than Heroku, Digital Ocean, Azure or AWS)
10. Application assets split into app bundle and vendor bundle to leverage browser caching
11. Assets named in a way to allow for cache-busting to ensure future changes available to users
12. Webpack used to bundle both the client-side and server-side code

# Things I would have liked to do if I had more time
1. No tests for store, actions, reducers
2. Better UI for CRUD functionality (No validation of values added into input fields)
3. Pagination and Filtering currently missing from frontend
4. Tests for Redux state management (i.e. event -> actions -> reducer -> state) missing
5. Tests for React components (e.g. correct event handling) missing
6. Perhaps add a DSL REPL to the application to show how to interact with it via a different UI
7. Superior responsive design e.g. table splits into columnar card view as browser resizes
8. Accessibility concerns addressed (Currently not being handled)
9. Performance snapshot and tuning (Currently not being handled)
10. UX feedback and integration back into the product
11. Investigate the use of GraphQL as an alternative to exposing RESTful endpoints
12. Better consideration of edge cases and error handling when database/server down/laggy

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
   $ npm start
   ```
   Open your browser at
   ```
   http://localhost:3000
   ```

# Technology Stack

* [React](https://facebook.github.io/react/) - used to build the front-end as components
* [Redux](http://redux.js.org) - used to provide state management for the front-end components
* [Webpack](https://webpack.js.org) - used to concatenate code and assets into bundles
* [Sass](http://sass-lang.com) - used to make styling simpler to understand and maintain
* [Node](https://nodejs.org/en/) - used to host the application server
* [Express](http://expressjs.com) - used to serve the web application to the browser
* [MongoDB](https://www.mongodb.com) - used to store character information between sessions
* [Jest](https://facebook.github.io/jest/) - used to write tests for the various components
* [Zeit](https://zeit.co/) - used to deploy the application to the Web to play around with