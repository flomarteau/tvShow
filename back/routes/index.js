var express = require('express');
var router = express.Router();
var mongoose= require('mongoose');
var request = require('request');


var options = { server: { socketOptions: {connectTimeoutMS: 5000 } }};
mongoose.connect('mongodb://Createur:createur@ds111299.mlab.com:11299/tv_show_app',
    options,
    function(err) {
     console.log(err);
    }
);

var userSchema = mongoose.Schema({
    lastName: String,
    firstName: String,
    email: String,
    password: String
});

var UserModel = mongoose.model('users', userSchema);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/shows', function(req, res, next) {
  request(
    "https://api.themoviedb.org/3/discover/tv?api_key=57d6fa067a2b6c52e97ec557f764514f&language=en-US&sort_by=popularity.desc&include_null_first_air_dates=false",
    function(error, response, body) {
      body = JSON.parse(body);
      res.json(body.results);
    });
});

router.get('/users', function(req, res, next) {
  UserModel.find({},(error, users) => {
    res.json(users);
  })
});

//Création d'un nouveau profil via le signup
router.post('/signup', function(req, res, next) {
  UserModel.find({
    email: req.body.email
  }, function(err, users) {
    if (users.length == 0) {
      var newUser = new UserModel({
        lastName: req.body.lastName,
        firstName: req.body.firstName,
        email: req.body.email,
        password: req.body.password});
      newUser.save(function(error, user) {
        res.send("Sign up is done");
      });
    }
  })
});

//Connexion à un profil via le signin
router.get('/signin', function(req, res, next) {
  console.log('il passe dans la route');
  console.log(req.query.email);
  console.log(req.query.password);

  UserModel.find({
    email: req.query.email,
    password: req.query.password
  },
    function (err, users) {
      if(users.length >0 ) {
        console.log('on est la : ');
        console.log(users);
        res.json({ result: true, firstName: users[0].firstName, lastName:users[0].lastName, email:users[0].email, password:users[0].password });
      } else {
        console.log('on a rien trouvé');
        res.json({ result: false });
      }
    }
 )
});

module.exports = router;
