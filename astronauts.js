const express = require('express'),
    bodyParser = require('body-parser');
const astronauts = express.Router()

var uuid = require('uuid-v4'); //crea id univoci

const astronautsArray = [] //array di oggetti

//presentazione
astronauts.route('/')
  .get((req, res) => {
    res.status(200)
    res.json({message: 'Welcome to the API'})
  });

astronauts.route('/astronauts')
  //get di tutto l'array
    .get((req, res) => {
    res.status(200)
    res.json(astronautsArray)
  })
//posta un elemento
  .post((req, res) => {
    var astronauts = {}
    astronauts.id = uuid()
    if (req.body.firstName) astronauts.firstName = req.body.firstName
    if (req.body.lastName) astronauts.lastName = req.body.lastName
    if (req.body.isInSpace) astronauts.isInSpace = req.body.isInSpace
    astronautsArray.push(astronauts)
    res.status(200)
    res.json(astronauts)
  });

module.exports = astronauts