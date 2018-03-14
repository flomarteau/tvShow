var express = require('express');
var router = express.Router();

var request = require('request');

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

module.exports = router;
