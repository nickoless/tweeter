$(document).ready(function() {

  // creates tweet based on HTML index, recreates DOM using Jquery --------

  function createTweetElement (tweetData) {
      
    const $tweet = $("<article>").addClass("tweet");
    const $header = $("<header>");
    const $img = $("<img>").attr("src", tweetData.user.avatars.regular);
    const $h2 = $("<h2>").text(tweetData.user.name);
    const $headerSpan = $("<span>").text(tweetData.user.handle);
    const $p = $("<p>").text(tweetData.content.text);
    const $footer = $("<footer>");
    const $footerSpan = $("<span>").text(moment(tweetData.created_at).fromNow());
    const $footerHeart = $("<i>").addClass("far fa-heart", "icon");
    const $footerFlag =  $("<i>").addClass("far fa-flag", "icon");
    const $footerRetweet = $("<i>").addClass("fas fa-retweet", "icon");

    $tweet.append($header, $p, $footer);
    $header.append($img, $h2, $headerSpan);
    $footer.append($footerSpan, $footerHeart, $footerRetweet, $footerFlag);

    return ($tweet);
  }

  // renders tweets based on form data -----------------------------------

  function renderTweets(tweets) {
    tweets.forEach(function(tweet) {
      const tweetElement = createTweetElement(tweet);
      $('#tweets-container').prepend(tweetElement);
    });
  }

  // loads tweets after rendering ----------------------------------------

  function loadTweets(){
    $.ajax({
      url: "/tweets",
      method: "get",
      dataType: "json",
      success: function(tweet) {
        renderTweets(tweet);
      },
      error: function(error) {
        console.log(error);
      }
    });
  }

  loadTweets();

  // POSTs input to /tweets -------------------------------------------------

  $(".new-tweet form").on("submit", function(event) {
    event.preventDefault();
    let tweet = $("#textArea").val();
    if (tweet.trim().length === 0) {
      alert("Please enter a tweet");
      return false;
    } else if (tweet.length > 140) {
      alert("Your tweet is too long!");
      return false;
    } else {
      $(".counter").html(maxCount);
      const formData = $(this).serialize();
      $.post('/tweets', formData).done(function() {
        tweet.length = 0;
        $("#textArea").val("");
        $("#tweets-container").empty();
        loadTweets();
      });
    }
  });

});


