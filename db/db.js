"use strict"

const app = require('express').Router()
const mysql = require('mysql')

// Create db connection
const db = mysql.createConnection({
            host     : process.env.DATABASE_URL,
            user     : 'root',
            password : '12345678',
            // database : 'heroes_db'
        })
  
  // Connect
  db.connect((err) => {
      if(err){
          throw err ;
      }
      console.log('MySql Connected...')
  })


// ====== USED TO CREATE DB AND LOAD DATA =====

//   // Create DB
app.get('/createdb', (req, res) => {
    let sql = 'CREATE DATABASE heroes_db'
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result)
        res.send('Database created...')
    })
})

// // Create table
app.get('/createherotable', (req, res) => {
    let sql = 'CREATE TABLE heroes(id int AUTO_INCREMENT, name VARCHAR(255), power VARCHAR(255), universe VARCHAR(255), PRIMARY KEY(id))';
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Heroes table created...')
    })
})

// // Insert Hero data
app.get('/loadherodata', (req, res) => {
    let sql = 'INSERT INTO heroes (name, power, universe) VALUES ?';
    let values = [
        ['Superman', 'flight, superhuman strength, x-ray vision, heat vision, cold breath, super-speed, enhanced hearing, and nigh-invulnerability', 'DC'],
        ['Batman', 'genius-level intellect, physical prowess, martial arts abilities, detective skills, science and technology, vast wealth, intimidation, and indomitable will', 'DC'],
        ['Hulk', 'superhuman strength', 'Marvel'],
        ['Ant-Man', 'ability to change size at will', 'Marvel'],
        ['Captain America', 'agility, strength, speed, endurance, and reaction time superior to any Olympic athlete who ever competed', 'Marvel'],
        ['Captain Marvel', 'superhuman strength, endurance, stamina, physical durability, a limited precognitive "seventh sense" and a perfectly amalgamated human/Kree physiology that rendered her resistant to most toxins and poisons', 'Marvel'],
        ['Black Panther', 'superhumanly acute senses, enhanced strength, speed, agility, stamina, durability, healing, and reflexes', 'Marvel'],
        ['Flash', 'super speed', 'DC'],
        ['Wolverine', 'rapid healing', 'Marvel'],
        ['Cyclops', 'laser optics', 'Marvel'],
        ['Magneto', 'magnetism', 'Marvel'],
        ['Ironman', 'super strength, the ability to fly, durability, and a number of weapons', 'Marvel'],
        ['Silver Surfer', 'superhuman strength, endurance, and senses and the ability to absorb and manipulate the universe\'s ambient energy', 'Marvel'],
        ['Jubilee', 'power to generate pyrotechnic energy plasmoids from her hands', 'Marvel'],
        ['Human Torch', 'fiery form that enables flight, serves as damage shield, Pyrokinesis, ability to absorb heat energy', 'Marvel'],
        ['Wonder Woman', 'incalculable superhuman strength, nigh-invulnerability, speed, flight, healing factor and semi-immortality', 'DC'],
        ['Thor', 'superhuman strength, speed, endurance & resistance to injury', 'Marvel'],
        ['Spawn', 'ability to teleport, to temporarily transform (and heal) his features, superhuman strength and endurance', 'DC'],
        ['Daredevil', 'superhuman senses, echolocative radar sense', 'Marvel'],
        ['Doctor Strange', 'magic', 'Marvel'],
        ['Jean Grey', 'telepathy and telekinesis', 'Marvel'],
        ['Psylocke', 'telekinesis to enhance her speed, strength, and fighting skills to superhuman levels', 'Marvel'],
        ['Storm', 'psionic ability to control all forms of weather over vast areas', 'Marvel'],
        ['Rogue', 'ability to absorb and sometimes also remove the memories, physical strength, and superpowers of anyone she touches', 'Marvel'],
        ['Spider-Woman', 'superhuman strength, speed, reflexes, agility, endurance and durability', 'Marvel']
    ]
    db.query(sql, [values], (err, result) => {
        if(err) throw err;
        console.log("Number of records inserted: " + result.affectedRows);
        res.send('Hero data inserted...')
    })
})

module.exports = db;