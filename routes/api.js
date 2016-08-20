const wellington = { "lat": -41.292716, "long": 174.773076};
const radius = 300;

var express = require('express');
var router = express.Router();

var prettyjson = require('prettyjson');
var moment = require('moment');

var facebook = require('../exports/facebook');
var eventfinda = require('../exports/eventfinda');

router.get('/event/:source/:id', function(req, res) {
  var source = req.params.source;
  var id = req.params.id;

  if(source == 'facebook') {
    //query facebook here
  } else if(source == 'eventfinda'){
    //query eventfinda here
  }
});

/* GET home page. */
router.get('/events/:lat/:long', function(req, res, next) {

  var lat = parseFloat(req.params.lat);
  var long = parseFloat(req.params.long);

  //Call Facebook api
  facebook.eventsByLatLong(lat, long, radius, function(fbData, fbError){

    if(fbError)  return res.status(400).send("Invalid Request: " + fbError);


    //call the eventfinda api

    eventfinda.getEventsAroundPoint(lat, long, radius, function(efData, efError){

      //If not error
      if(efError) return res.status(400).send("Invalid Request: " + efError);


      aggregateResults(fbData, efData);

    });
  });


  function aggregateResults(facebook, eventfinda) {
    //Aggregate the two json results.

    console.log(prettyjson.render(facebook));
    console.log("\n\n=================================");
    console.log(prettyjson.render(eventfinda));


    var events = [];

    for(i = 0; i < facebook.length; i++){
      var fbItem = facebook[i];
      events.push({"source": "facebook",
        "name": fbItem.name,
        "description": fbItem.description,
        "lat": fbItem.venue.location.latitude,
        "long": fbItem.venue.location.longitude,
        "date": moment(fbItem.startTime,'YYYY-MM-DD').format(),
        "url": fbItem.url,
        "category": null
      });
    }
    for(i = 0; i < eventfinda.length; i++){
      var efItem = eventfinda[i];
      events.push({"source": "eventfinda",
        "name": efItem.name,
        "description": efItem.description,
        "lat": efItem.point.lat,
        "long": efItem.point.lng,
        "date": moment(efItem.datetime_start,'YYYY-MM-DD').format(),
        "url": efItem.url,
        "category": efItem.category.parent_id
      });
    }

    res.status(200).send(events);
  }

});

module.exports = router;
