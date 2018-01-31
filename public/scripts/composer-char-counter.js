$( document ).ready(function() {
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
});

// keyup vs input??
