$( document ).ready(function() {

  $("#nav-bar button").on("click", function(){
      $(".new-tweet").slideToggle()
      $("#textArea").focus()
  });

  $("#nav-bar").hide().fadeIn(1000);

});4





