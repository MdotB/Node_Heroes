const express = require('express')
const mysql = require('mysql')

// Create db connection
const db = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '12345678',
  database : 'heroes_db'
})

// Connect
db.connect((err) => {
    if(err){
        throw err ;
    }
    console.log('MySql Connected...')
})

const app = express()

// Create DB
app.get('/createdb', (req, res) => {
    let sql = 'CREATE DATABASE heroes_db'
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result)
        res.send('Database created...')
    })
})

// Create table
app.get('/createherotable', (req, res) => {
    let sql = 'CREATE TABLE heroes(id int AUTO_INCREMENT, title VARCHAR(255), body VARCHAR(255), PRIMARY KEY(id))';
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Heroes table created...')
    })
})

// Insert Hero

app.listen('3000', () => {
    console.log('Server started on port 3000')
})