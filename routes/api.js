const wellington = { "lat": -41.292716, "long": 174.773076};
const radius = 300;

var express = require('express');
var router = express.Router();

var facebook = require('../exports/facebook');
var eventfinda = require('../exports/eventfinda');

/* GET home page. */
router.get('/events', function(req, res, next) {

  //Call Facebook api
  facebook.eventsByLatLong(wellington.lat, wellington.long, function(fbData, fbError){

    if(fbError)  return res.status(400).send("Invalid Request: " + fbError);

    //call the eventfinda api

    eventfinda.getEventsAroundPoint(wellington.lat, wellington.long, radius, function(efData){

      //If not error

      aggregateResults(fbData, efData);

    });
  });


  function aggregateResults(facebook, eventfinda) {
    //Aggregate the two json results.

    res.status(200).send(eventfinda);
  }

});

module.exports = router;
