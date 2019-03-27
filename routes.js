"use strict"

const db = require('./db/db')
// const redisClient = require('./redis')
const router = require('express').Router()

// Retrieve data by name
router.get('/api/v1/name/:name', (req, res) => {
    let sql = `SELECT * FROM heroes WHERE name LIKE '%${req.params.name}%'`
    db.query(sql, (err, result) => {
        if(err) throw err
        console.log(result)
        res.send(JSON.stringify(result))
    })
})

// Retrieve data by power
router.get('/api/v1/power/:power', (req, res) => {
    let sql = `SELECT * FROM heroes WHERE power LIKE '%${req.params.power}%'`
    db.query(sql, (err, result) => {
        if(err) throw err
        console.log(result)
        res.send(JSON.stringify(result))
    })
})

// Retrieve by universe
router.get('/api/v1/universe/:universe', (req, res) => {
    let sql = `SELECT * FROM heroes WHERE universe LIKE '%${req.params.universe}%'`
    db.query(sql, (err, result) => {
        if(err) throw err
        console.log(result)
        res.send(JSON.stringify(result))
    })
})


module.exports = router;