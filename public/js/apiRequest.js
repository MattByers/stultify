$(document).ready(function() {
  console.log("api request");
  var url = "api/events";
  $.get(url, function(data, status){
        console.log("data", data);
    });
});
