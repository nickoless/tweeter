/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


$(document).ready(function() {

  /* Function to reference time since submit - **Rob from Stack Overflow**
  (https://stackoverflow.com/questions/3177836/how-to-format-time-since-xxx-e-g-4-minutes-ago-similar-to-stack-exchange-site)
  */

  var timeSince = function(date) {
    if (typeof date !== 'object') {
      date = new Date(date);
    }
  
    var seconds = Math.floor((new Date() - date) / 1000);
    var intervalType;
  
    var interval = Math.floor(seconds / 31536000);
    if (interval >= 1) {
      intervalType = 'year';
    } else {
      interval = Math.floor(seconds / 2592000);
      if (interval >= 1) {
        intervalType = 'month';
      } else {
        interval = Math.floor(seconds / 86400);
        if (interval >= 1) {
          intervalType = 'day';
        } else {
          interval = Math.floor(seconds / 3600);
          if (interval >= 1) {
            intervalType = "hour";
          } else {
            interval = Math.floor(seconds / 60);
            if (interval >= 1) {
              intervalType = "minute";
            } else {
              interval = seconds;
              intervalType = "second";
            }
          }
        }
      }
    }
  
    if (interval > 1 || interval === 0) {
      intervalType += 's';
    }
  
    return interval + ' ' + intervalType;
  };

  // creates tweet based on HTML index, recreates DOM using Jquery --------

  function createTweetElement (tweetData) {
      
    let $tweet = $("<article>").addClass("tweet");
    let $header = $("<header>");
    let $img = $("<img>").attr("src", tweetData.user.avatars.regular);
    let $h2 = $("<h2>").text(tweetData.user.name);
    let $headerSpan = $("<span>").text(tweetData.user.handle);
    let $p = $("<p>").text(tweetData.content.text);
    let $footer = $("<footer>");
    let timeStamp = (timeSince(tweetData.created_at) + " ago");
    let $footerSpan = $("<span>").text(timeStamp);
    let $footerFlag =  $("<img>").attr("src", "/images/flag.png");
    let $footerRetweet = $("<img>").attr("src", "/images/retweet.png");
    let $footerLike = $("<img>").attr("src", "/images/like.png")  ;

    $tweet.append($header, $p, $footer);
    $header.append($img, $h2, $headerSpan);
    $footer.append($footerSpan, $footerLike, $footerRetweet, $footerFlag);

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

  // When document is ready, load tweets as default

  loadTweets();

  // POSTs input to /tweets -------------------------------------------------

  $(".new-tweet form").on("submit", function(event) {
    event.preventDefault();
    let tweetLength = $("#textArea").val().length;
    if (tweetLength === 0) {
      alert("Please enter a tweet");
      console.log('test');
    } else if (tweetLength > 140) {
      alert("Your tweet is too long!");
    } else {
      let formData = $(this).serialize();
      $.post('/tweets', formData).done(function() {
        tweetLength = 0;
        $("#textArea").val("");
        $("#tweets-container").empty();
        loadTweets();
      });
    }
  });

});


