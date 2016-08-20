$(document).ready(function() {
  var url = "/api/events";
  $.get(url, function(data, status){
        console.log("data", data);
    });
});
