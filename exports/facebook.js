const APP_ID = '1760203874250130';
const APP_SECRET = 'bb2fb9b2f6758b184f761d1fb822615c';

const APP_TOKEN = '1760203874250130|ioiuFc-eIFNzHyx4EBbKVsPyjZo'; //This needs to be set at runtime, otherwise it will expire.

var FB = require('fb');
var fbEvents = require('facebook-events-by-location');
var EventSearch = require("facebook-events-by-location-core");

FB.options({accessToken: APP_TOKEN});

var exports = module.exports = {};



exports.eventsByLatLong = function(lat, long, callback) {

  console.log("inside the facebook events function");

  var es = new EventSearch({
    "accessToken": APP_TOKEN,
    "lat": lat,
    "lng":long

  });

  es.search().then(function (events) {
    callback(events);
  }).catch(function (error) {
    throw "No data found at Lat, long";
  });

};
