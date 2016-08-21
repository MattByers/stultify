$(document).ready(function() {
  

  $("h2").click(function(){
    $(".refine-panel").toggleClass("refine-open", 500);
    console.log("CLICK");
  });


  $("button").click(function() {
    $(this).toggleClass("clicked")
  })

  $('.datepicker').datepicker();



  
});
