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

// var showSchema = mongoose.Schema({
//   name: String,
//   poster: String,
//   episodes: String,
//   seasons: String,
//   userId: String,
// });

var UserModel = mongoose.model('users', userSchema);
// var showModel = mongoose.model('users', showSchema);


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/shows', function(req, res, next) {
  request("https://api.betaseries.com/shows/list?key=59e2ab75ac9c&order=followers&limit=200",
    function(error, response, body) {
      body = JSON.parse(body);
      res.json(body.shows);
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
  UserModel.find({
    email: req.query.email,
    password: req.query.password
  },
    function (err, users) {
      if(users.length >0 ) {
        res.json({ result: true, firstName: users[0].firstName, lastName:users[0].lastName, email:users[0].email, password:users[0].password });
      } else {
        res.json({ result: false });
      }
    }
 )
});

//Connexion à un profil via le update pour modifier les infos utilisateurs
router.put('/update', function(req, res, next) {
  console.log(req.query.email);
  console.log('je suis dans la route update');
  UserModel.update(
    { email: req.query.email},
    { firstName: req.body.firstName, lastName: req.body.lastName, password: req.body.password},
    function(error, users) {
      res.json(users);
    }
  );
});

//Route permettant l'ajout des shows par user
router.post('/myshows', function(req, res, next) {
  // var newShow = new showSchema({
  //   lastName: req.body.lastName,
  //   firstName: req.body.firstName,
  //   email: req.body.email,
  //   password: req.body.password});
  // newUser.save(function(error, user) {
  //   res.send("Sign up is done");
  // });
});


module.exports = router;
