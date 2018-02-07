$( document ).ready(function() {

  let maxCount = 140;
  $(".counter").html(maxCount);

  $("#textArea").on("input", function() {
    const length = $(this).val().length;
    const counter = $(this).parent().children(".counter");
    counter.html(maxCount - length);
    if (length > maxCount) {
      counter.css("color", "red");
    } else {
      counter.css("color", "");
    }
  });

});

