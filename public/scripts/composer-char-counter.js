$( document ).ready(function() {
    let maxCount = 140;
    $( ".counter").html(maxCount)

    $( "#textArea" ).on("keyup", function() {
    let length = $(this).val().length;
    $(this).parent().children(".counter").html(maxCount - length);
    

});
});


