const express = require('express')
const logger = require('morgan')
const bodyParser = require('body-parser')
const router = require('./routes.js')
const cors = require('cors')

// Initialize express server
const app = express()

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.use('/', router);


app.set('port', process.env.PORT || 3000);

app.listen(app.get('port'), () => {
    console.log('Server started on port 3000')
})