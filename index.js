"use strict"

const express = require('express')
const bodyParser = require('body-parser')
const router = require('./routes.js')
const cors = require('cors')
const mongooseMorgan = require('mongoose-morgan')
const responseTime = require('response-time')

// Express
const app = express()

// HTTP request logs stored in MongoDB
app.use(() => {
    // Production environment
    if (process.env.NODE_ENV == "production") {
        return mongooseMorgan({
            connectionString: process.env.MLAB_URL
        },{},'dev')
    // Dev environment
    } else {
        return mongooseMorgan({
            connectionString: 'mongodb://localhost/logger_db'
        },{},'dev')
    }
});
    
    
    

// Use response-time as a middleware
app.use(responseTime());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.use('/', router);


app.set('port', process.env.PORT || 3000);

// Start server
app.listen(app.get('port'), () => {
    console.log('Server started on port 3000')
})