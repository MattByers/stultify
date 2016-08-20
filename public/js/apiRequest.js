$(document).ready(function() {
  var url = "http://api.openweathermap.org/data/2.5/forecast?q=Wellington,nz&appid=155a3b1ea43baad50689bcce9ae5629e";
  $.get(url, function(data, status){
        console.log("data", data);
    });
});
