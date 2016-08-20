$(document).ready(function() {

    // Initialize Map
    var map = L.map('mapid', // Map Options
                         { center: [-41.286, 174.77],
                           zoom: 13
                         }
      );

    // Tiles
    L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v9/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoianVzdGFiaXRkb3BlIiwiYSI6ImNpczJkcjZ5MTAwaGQydHAxNmN2ZHh1NWUifQ.CwwXo2NNcUduhDqbN8tmNA',
      {
        attribution: 'Hello',
        maxZoom: 18,
        id: 'mapbox.mapbox-streets-v7',
        accessToken: 'pk.eyJ1IjoianVzdGFiaXRkb3BlIiwiYSI6ImNpczJkcjZ5MTAwaGQydHAxNmN2ZHh1NWUifQ.CwwXo2NNcUduhDqbN8tmNA' // Peter's Token
      }
    ).addTo(map);

    // Marker Icon
    var myIcon = L.divIcon({className: 'my-div-icon', iconSize: 200});

    // Add a test token
    var marker = L.marker([-41.286, 174.77]
      // Marker Options
      // { icon: myIcon
      // }
      ).addTo(map);

    // Test popup
    marker.bindPopup('<p><b>Hello world!</b><br />This is a nice popup.</p>');


    var url = "api/events";

    // making api get request
    $.get(url, function(data, status){
      placeOnMap(data);
    });

    function placeOnMap(data) {
      data.map(addToMap);
    }

    function addToMap(eventDetail) {
      // console.log("looping through the data");
      // Tiles
      L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v9/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoianVzdGFiaXRkb3BlIiwiYSI6ImNpczJkcjZ5MTAwaGQydHAxNmN2ZHh1NWUifQ.CwwXo2NNcUduhDqbN8tmNA',
        {
          attribution: 'Hello',
          maxZoom: 18,
          id: 'mapbox.mapbox-streets-v7',
          accessToken: 'pk.eyJ1IjoianVzdGFiaXRkb3BlIiwiYSI6ImNpczJkcjZ5MTAwaGQydHAxNmN2ZHh1NWUifQ.CwwXo2NNcUduhDqbN8tmNA' // Peter's Token
        }
      ).addTo(map);

      // Marker Icon
      var myIcon = L.divIcon({className: 'my-div-icon', iconSize: 200});

      // Add a test token
      var marker = L.marker([eventDetail.lat, eventDetail.long]
        // Marker Options
        // { icon: myIcon
        // }
        ).addTo(map);

      // Test popup
      marker.bindPopup('<p><b>' + eventDetail.name + '</b><br />' + eventDetail.description + '</p>');
    }

  });
