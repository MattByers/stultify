$(document).ready(function() {

  var lat = -41.286;
  var long = 174.77;

  // Initialize Map
  var map = L.map('mapid', // Map Options
  { center: [lat, long],
    zoom: 13,
    zoomControl: false
  }
);

  // Tiles
  L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v9/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoianVzdGFiaXRkb3BlIiwiYSI6ImNpczJkcjZ5MTAwaGQydHAxNmN2ZHh1NWUifQ.CwwXo2NNcUduhDqbN8tmNA',
  {
    attribution: 'Hello',
    maxZoom: 18,
    id: 'mapbox.mapbox-streets-v7',
    accessToken: 'pk.eyJ1IjoianVzdGFiaXRkb3BlIiwiYSI6ImNpczJkcjZ5MTAwaGQydHAxNmN2ZHh1NWUifQ.CwwXo2NNcUduhDqbN8tmNA' // Peter's Token
  }).addTo(map);

getData(lat, long);

//get user postion
map.on('moveend', function(e) {
  var lat = map.getCenter().lat;
  var long = map.getCenter().lng;
  getData(lat, long);
});

function getData(lat, long) {
  var url = "api/events/"+ lat +'/'+ long;

  // making api get request
  $.get(url, function(data, status){
    placeOnMap(data);
  });

  function placeOnMap(data) {
    data.map(addToMap);
  }

  function addToMap(eventDetail) {
  // Marker Icon
  var fbIcon = L.icon({
    iconUrl: '/images/fb_icon.png',

    iconSize: [38, 38], // size of the icon
});

  // ef_icon.png
  var efIcon = L.icon({
    iconUrl: '/images/ef_icon.png',

    iconSize: [38, 38], // size of the icon
});


  var myIcon;
  if (eventDetail.source === "facebook") {
    myIcon = fbIcon;
  }
  else {
    myIcon = efIcon;
  }

  // Add a test token
  var marker = L.marker([eventDetail.lat, eventDetail.long],
    // Marker Options
    {icon: myIcon}
  ).addTo(map);

  // Test popup
  marker.bindPopup('<h2>' + eventDetail.name +
                  '</h2><br /><h6>' + eventDetail.description + '</h6>' +
                  '<br /><a class="btn btn-default" href='+eventDetail.url+'>link url</a>');
    }
  }
});
