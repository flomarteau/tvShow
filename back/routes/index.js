var express = require('express');
var router = express.Router();
var mongoose= require('mongoose');
var request = require('request');


var options = { server: { socketOptions: { connectTimeoutMS: 5000 } }};
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
  password: String,
});

var showSchema = mongoose.Schema({
  userId: String,
  name: String,
  description: String,
  poster: String,
  seasons: String,
  episodes: String,
  status: String,
  currentSeason: String,
  currentEpisode: String,
});

var UserModel = mongoose.model('users', userSchema);
var ShowModel = mongoose.model('shows', showSchema);


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
        password: req.body.password
      });
      newUser.save(function(error, user) {
        res.json({ result: "the user has been signed up"});
      });
    } else if (users.length > 0) {
      res.json({ result: "the user already exists" });
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
        res.json({
          result: "user found",
          firstName: users[0].firstName,
          lastName:users[0].lastName,
          email:users[0].email,
          password:users[0].password,
          _id:users[0]._id
        });
      } else if(err) {
        throw err;
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
      if(error) throw error;
      res.json(users);
    }
  );
});

//Route permettant l'ajout des shows par user
router.post('/addshows', function(req, res, next) {
  // Faire route d'envoi des shows dans le showmodel ici
  ShowModel.find({ userId: req.query.userId },(err, shows) => {
    var newShow = new ShowModel({
      name: req.body.name,
      description: req.body.description,
      poster: req.body.poster,
      seasons: req.body.seasons,
      episodes: req.body.episodes,
      status: req.body.status,
      currentSeason: req.body.currentSeason,
      currentEpisode: req.body.currentEpisode,
    });
    newShow.save(function(error, show) {
      if(error) throw error;
      res.json({ result: "the show has been saved"});
    });
  });
});

//Route permettant la récupération des shows par rapport au userId
router.get('/myshows', function(req, res, next) {
  //On affiche les shows correspondant à l'userId en session
  ShowModel.find({ userId: req.query._id },(error, shows) => {
    res.json(shows);
  })
});

//Route permettant le changement de statut de la série (watching ou watchlist)
router.put('/updateshowstatus', function(req, res, next) {
  ShowModel.update(
    { userId: req.query.userId } && { _id: req.query._id },
    { status: req.body.status },
    function(error, shows) {
      if(error) throw error;
      res.json(shows);
    }
  );
});

//Route permettant le changement d'avancement dans la série
router.put('/updateshowprogress', function(req, res, next) {
  ShowModel.update(
    { userId: req.query.userId } && { _id: req.query._id } && { status: "watching" },
    { currentSeason: req.body.currentSeason , currentEpisode: req.body.currentEpisode },
    function(error, shows) {
      if(error) throw error;
      res.json(shows);
    }
  );
});

//Route permettant la suppression d'une série dans la liste
router.delete('/deleteshow', function(req, res, next) {
  ShowModel.find({ userId: req.query.userId },
    ShowModel.remove({ _id: req.query._id },
      function(error, result) {
        if(error) throw error;
        res.json({ result: "the show has been deleted"});
      }
    )
  );
});


module.exports = router;
