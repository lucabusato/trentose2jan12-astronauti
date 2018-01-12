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
astronauts.route('/astronauts/:id')
  .put((req, res) => {
    var id = req.params.id
    const i = astronautsArray.findIndex(item => {return item.id === id})
    if (i==-1) res.sendStatus(404) //elemento non trovato
    else {
        if (req.body.firstName) astronautsArray[i].firstName = req.body.firstName
        if (req.body.lastName) astronautsArray[i].lastName = req.body.lastName
        if (req.body.isInSpace) astronautsArray[i].isInSpace = req.body.isInSpace
        res.status(200)
        res.json(astronautsArray[i])
    }
  })
  .delete((req, res) => {
    var id = req.params.id
    const i = astronautsArray.findIndex(item => {return item.id === id})
    if (i==-1) res.sendStatus(404) //elemento non trovato
    else {
        astronautsArray.splice(i,1) //elimina l'elemento
        res.status(200)
        res.json({message: 'deleted'})
    }
  })
  .get((req, res) => {
    var id = req.params.id
    const i = astronautsArray.findIndex(item => {return item.id === id})
    if (i==-1) res.sendStatus(404)
    else{
      res.status(200)
      res.json(astronautsArray[i])
    }
  });

module.exports = astronauts