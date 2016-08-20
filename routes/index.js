var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('index.html');
});

router.get('/event', function(req, res, next) {
  res.send('event.html');
});

router.get('/interested', function(req, res, next) {
  res.send('interested.html');
});

router.get('/list', function(req, res, next) {
  res.send('list.html');
});

router.get('/map', function(req, res, next) {
  res.send('map.html');
});

router.get('/list', function(req, res, next) {
  res.send('list.html');
});

module.exports = router;
