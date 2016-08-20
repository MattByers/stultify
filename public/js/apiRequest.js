// $(document).ready(function() {
var url = "api/events";

var getEvents =  function () {
  $.get(url, function(data, status){
    // console.log(data);
    return data;
  });
};
// });
