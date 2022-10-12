const express = require('express');
const cors = require('cors'); // Used to connect to full stack app or react app
const morgan = require('morgan'); // Used to visualize requests when testing the server on postman
const bodyParser = require('body-parser'); // Used to access content that is passed in the body of the HTTP request
const helmet = require("helmet");
const path = require('path');
require('isomorphic-fetch'); // Used to make fetch calls to API

// Using the index.js file in server.js
// Automatically picks up index.js
const searchRouter = require('./routes/index');
// Requiring the testAPI file 
const testAPIRouter = require('./routes/testApi');

// Initialize Express
const app = express();

// Express serving up resources that have been built from the React app.
if (process.env.NODE_ENV === 'production'){
        app.use(express.static(path.join(__dirname, 'frontend/build')));
        app.get('*', (req, res) => {
            res.sendFile(path.resolve(__dirname, 'frontend', 'build','index.html'));
    });
}
    

// App Middleware
app.use(express.json()); // Enabling to accept requests from requests.body in json format (object)
app.use(cors());
app.use(morgan('dev'));
// The body-parser middleware extracts the entire body portion of an incoming request stream and exposes it on req.body.
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(bodyParser.json());
app.use(helmet());

// Routes
app.use('/testApi', testAPIRouter); // Route used to test if the server is online
app.use('/searchApi', searchRouter); // Route used to fetch the request from the frontend


// Listening on PORT
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
});