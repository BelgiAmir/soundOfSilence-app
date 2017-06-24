// Get dependencies
const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');

//mongo
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/foo');
let db = mongoose.connection;

//check db connection
db.once('open', function() {
    console.log('connected to MongoDb!');
})

//check for db errors
db.on('error', function(err) {
    console.log(error);
})

// Get our API routes
const api = require('./server/routes/api');

const app = express();
var cors = require('cors');
app.use(cors());
//bring in model
let Report = require('./server/models/selfReport');

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Point static path to dist
app.use(express.static(path.join(__dirname, '../dist')));
// app.use(express.static(static_dir));
// Set our api routes
app.use('/api', api);

// Catch all other routes and return the index file
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist/index.html'));
});



app.post('/add', function(req, res) {
    console.log('submmiting report');
    console.log(req.body);
    res.end("Good");
    return;
})

/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || '3000';
app.set('port', port);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, () => console.log(`API running on localhost:${port}`));