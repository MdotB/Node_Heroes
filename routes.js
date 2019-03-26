const db = require('./db/db')
const router = require('express').Router()

// Retrieve all heroes
router.get('/api/v1/name/:name', (req, res) => {
    let sql = `SELECT * FROM heroes WHERE name LIKE '%${req.params.name}%'`
    db.query(sql, (err, result) => {
        if(err) throw err
        console.log(result)
        res.send(JSON.stringify(result))
    })
})

router.get('/api/v1/power/:power', (req, res) => {
    let sql = `SELECT * FROM heroes WHERE power LIKE '%${req.params.power}%'`
    db.query(sql, (err, result) => {
        if(err) throw err
        console.log(result)
        res.send(JSON.stringify(result))
    })
})

router.get('/api/v1/universe/:universe', (req, res) => {
    let sql = `SELECT * FROM heroes WHERE universe LIKE '%${req.params.universe}%'`
    db.query(sql, (err, result) => {
        if(err) throw err
        console.log(result)
        res.send(JSON.stringify(result))
    })
})


module.exports = router;