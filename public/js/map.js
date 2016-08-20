$(document).ready(function() {
  // Initialize Map
  var map = L.map('mapid').setView([-41.286, 174.77], 13);

  // Tiles
  L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v9/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoianVzdGFiaXRkb3BlIiwiYSI6ImNpczJkcjZ5MTAwaGQydHAxNmN2ZHh1NWUifQ.CwwXo2NNcUduhDqbN8tmNA', 
    {
      attribution: 'Hello',
      maxZoom: 18,
      id: 'mapbox.mapbox-streets-v7',
      accessToken: 'pk.eyJ1IjoianVzdGFiaXRkb3BlIiwiYSI6ImNpczJkcjZ5MTAwaGQydHAxNmN2ZHh1NWUifQ.CwwXo2NNcUduhDqbN8tmNA' // Peter's Token
    }
  ).addTo(map);


});
