const express = require('express')
const mysql = require('mysql')

// Create db connection
const db = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'secret',
  database : 'heroes_db'
})

// Connect
db.connect((err) => {
    if(err){
      console.error('Error connecting: ' + err.stack);
      return;
    }
    console.log('MySql connected as id ' + db.threadId);
})

const app = express()

// Create DB
app.get('/createdb', (req, res) => {
    let sql = 'CREATE DATABASE heroes_db'
    db.query(sql, (err, result) => {
        if(err) console.error(err)
        console.log(result)
        res.send('Database created...')
    })
})

// Create table
app.get('/createherotable', (req, res) => {
    let sql = 'CREATE TABLE heroes(id int AUTO_INCREMENT, title VARCHAR(255), body VARCHAR(255), PRIMARY KEY(id)';
})

app.listen('3000', () => {
    console.log('Server started on port 3000')
})