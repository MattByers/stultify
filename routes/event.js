var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/event', function(req, res, next) {
  res.send('event.html');
});

module.exports = router;
