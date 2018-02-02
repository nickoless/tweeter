$( document ).ready(function() {

// function to countdown from 140 for every entry in text field

  let maxCount = 140;
  $( ".counter").html(maxCount);

  $( "#textArea" ).on("input", function() {
    let length = $(this).val().length;
    let counter = $(this).parent().children(".counter");
    counter.html(maxCount - length);
    if (length > maxCount) {
      counter.css("color", "red");
    } else {
      counter.css("color", "");
    }
  });

// resets counter on form submission

  $(".new-tweet form").on("submit", function(event) {
    $( ".counter").html(maxCount);
  });

});

