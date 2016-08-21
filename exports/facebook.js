const APP_ID = '1760203874250130';
const APP_SECRET = 'bb2fb9b2f6758b184f761d1fb822615c';

const APP_TOKEN = '1760203874250130|ioiuFc-eIFNzHyx4EBbKVsPyjZo'; //This needs to be set at runtime, otherwise it will expire.

var FB = require('fb');
var fbEvents = require('facebook-events-by-location');
var EventSearch = require("facebook-events-by-location-core");

FB.options({accessToken: APP_TOKEN});

var exports = module.exports = {};

exports.eventByID = function(id, callback) {
  FB.api('/' + id, 'GET', {}, function(response) {
    if(!response) callback(null, new Error ("Event not found"));
    else callback(response, null);
  });
};

exports.freeEvents = function(lat, long, radius, callback){
  var es = new EventSearch({
    "accessToken": APP_TOKEN,
    "lat": lat,
    "lng":long,
    "distance": radius,
    "since": Math.floor(Date.now()/1000),
    "until": Math.floor(Date.now()/1000 + 24*3600)

  });

  es.search().then(function (searchResult) {
    var freeEvents = [];

    for(i = 0; i < searchResult.length; i ++) {
      console.log(searchResult[i].ticket_uri);
      if(!searchResult[i].ticket_uri) {
        freeEvents.push(searchResult[i]);
      }
    }
    console.log(freeEvents);
    callback(freeEvents, null);
  }).catch(function (error) {
    callback(null, error);
  });
};

exports.eventsByLatLong = function(lat, long, radius, callback) {


  var es = new EventSearch({
    "accessToken": APP_TOKEN,
    "lat": lat,
    "lng":long,
    "distance": radius,
    "since": Math.floor(Date.now()/1000),
    "until": Math.floor(Date.now()/1000 + 24*3600)

  });

  es.search().then(function (searchResult) {
    callback(searchResult.events, null);
  }).catch(function (error) {
    callback(null, error);
  });

};
