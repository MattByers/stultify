var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/interested', function(req, res, next) {
  res.send('interested.html');
});

module.exports = router;
