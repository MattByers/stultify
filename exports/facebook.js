const APP_ID = '1760203874250130';
const APP_SECRET = 'bb2fb9b2f6758b184f761d1fb822615c';

const APP_TOKEN = '1760203874250130|ioiuFc-eIFNzHyx4EBbKVsPyjZo';

var FB = require('fb');
var fbEvents = require('facebook-events-by-location');

var options = FB.options();
FB.options({accessToken: APP_TOKEN});

var EventSearch = require("facebook-events-by-location-core");

var es = new EventSearch({
    "accessToken": APP_TOKEN,
    "lat": -41.292716,
    "lng": 174.773076

});

es.search().then(function (events) {
    console.log(JSON.stringify(events));
}).catch(function (error) {
    console.error(JSON.stringify(error));
});
