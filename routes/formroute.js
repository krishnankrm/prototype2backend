
ObjectID = require('mongodb');
const express = require('express')
const router = express.Router()
const Form = require('../models/form')
var mongodb= require('mongodb');
const userService = require('./user.service');
//Api to get all details

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/Form";
var b,myobj;
MongoClient.connect(url, function(err, client) {
  if (err) throw err;
  console.log("Database created!");
  const db = client.db('Form')

    db.listCollections().toArray(function(err, items) {
    if(items.length<1)
     db.createCollection("login", function(err, res) {
    if (err) throw err;
    console.log("Collection created!");
    var myobj = { username: "test", password: "test", firstname:"krishnan" };
    db.collection("login").insertOne(myobj, function(err, res) {
    if (err) throw err;
    client.close()
    })})

})
})



router.get('/', async(req,res) => {
    try{
           const form = await Form.find()
           res.json(form)
    }catch(err){
        res.send('Error ' + err)
    }
})

//Api for saving the form details
router.post('/form/savedetails', async(req,res) => {
    const form = new Form({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        middlename: req.body.middlename,
        address: req.body.address,
        email: req.body.email,
        phone: req.body.phone,
        height: req.body.height,
        weight: req.body.weight,
    })

    try{
        const a1 =  await form.save() 
        res.json(a1)
    }catch(err){
        res.send('Error')
    }
}) //api call to run this function - localhost:9001/form/savedetails


//Api for deleting the form for a given id
router.delete('/form/delete-details/:id',async(req,res)=> {
    var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb://localhost:27017/";
    console.log(1)
    MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      var dbo = db.db("Form");
      var myobj = {_id:new mongodb.ObjectID(req.params.id)};
      console.log(myobj)
      dbo.collection("forms").deleteOne(myobj, function(err, obj) {
        if (err) throw err;
        res.send("1 document deleted")   
        db.close();
      });
    });

}) //api call to run this function - localhost:9001/form/delete-details/60b9fc5600d1000c9408cf53

//api call for login. transfers command to user.services.js jile
router.post('/login',async(req,res,next)=> {
    userService.authenticate(req.body)
        .then(user => res.json(user))
        .catch(next);

        
}

) //api call to run this function - http://localhost:9001/login
module.exports = router

