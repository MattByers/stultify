const wellington = { "lat": -41.292716, "long": 174.773076};

var express = require('express');
var router = express.Router();

var facebook = require('../exports/facebook');

/* GET home page. */
router.get('/events', function(req, res, next) {

  var toReturn;

  //Call Facebook api
  facebook.eventsByLatLong(wellington.lat, wellington.long, function(result){
    toReturn = result;
    console.log(result);
  });

  //call the eventfinda api

  //Aggregate the two json results.

  res.status(200).json(toReturn);
});

module.exports = router;
