"use strict"

const db = require('./db/db')
const redisClient = require('./redis')
const router = require('express').Router()

// Retrieve data by name
router.get('/api/v1/name/:name', (req, res) => {
    let sql = `SELECT * FROM heroes WHERE name LIKE '%${req.params.name}%'`

    return redisClient.get(`heroName: ${req.params.name}`, (err, result) => {
        // If key exists in Redis store
        if (result) {
            const resultJSON = JSON.parse(result)
            return res.status(200).json(resultJSON)
        } else { // Key not cached in redis - get from mySql
            let response = db.query(sql, (err, result) => {
                if(err) throw err
                console.log(result)
                res.send(JSON.stringify(result))
                redisClient.setex(`heroName: ${req.params.name}`, 3600, JSON.stringify({ source: 'Redis Cache', response}))
            })
          }
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