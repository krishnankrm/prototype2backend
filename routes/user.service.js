const config = require('../config');
const jwt = require('jsonwebtoken');

//Connect mongodb-ip 
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

var logindb=[] //Variable to store the login database

//Mongo client in database Form under the collection login is detched and stored to logindb variable array
MongoClient.connect(url,{useUnifiedTopology: true,useNewUrlParser: true,}, function(err, db) {
  if (err) throw err;
  var dbo = db.db("Form");
  dbo.collection("login").find({}).toArray(function(err, result) {
    if (err) throw err;
    logindb=result; 
  });
});


//function to check if the login credentials match the one from db 
async function authenticate({ username, password }) {
  const user = logindb.find(u => u.username == username && u.password == password);
    console.log(user)
    if (!user) throw 'Username or password is incorrect';
    const token = jwt.sign({ sub: user.id }, config.secret, { expiresIn: '7d' });
    return {
        'id':user._id,
        'UserName':user.username,
        'FirstName':user.firstname,
        token
    };
}

module.exports = {
    authenticate,
};

