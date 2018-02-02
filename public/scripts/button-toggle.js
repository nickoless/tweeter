$( document ).ready(function() {

  // Slide toggles new tweet form + focus

  $("#nav-bar button").on("click", function(){
    $(".new-tweet").slideToggle();
    $("#textArea").focus();
  });

});





