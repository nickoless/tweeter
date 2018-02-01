/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": {
        "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
        "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
        "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
      },
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": {
        "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
        "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
        "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
      },
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  },
  {
    "user": {
      "name": "Johann von Goethe",
      "avatars": {
        "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
        "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
        "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
      },
      "handle": "@johann49"
    },
    "content": {
      "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
    },
    "created_at": 1461113796368
  }
];

$(document).ready(function() {

  function renderTweets(tweets) {
    tweets.forEach(function(tweet) {
      const tweetElement = createTweetElement(tweet)
      $('#tweets-container').append(tweetElement);
    });
  }

  function createTweetElement (tweetData) {
    console.log(tweetData)
    let $tweet = $("<article>").addClass("tweet");
    let $header = $("<header>")
    let $img = $("<img>").attr("src", tweetData.user.avatars.regular);
    let $h2 = $("<h2>").text(tweetData.user.name)
    let $headerSpan = $("<span>").text(tweetData.user.handle);
    let $p = $("<p>").text(tweetData.content.text);
    let $footer = $("<footer>");
    let $footerSpan = $("<span>").text(tweetData.created_at);
    let $footerFlag=  $("<img>").attr("src", "/images/flag.png");  
    let $footerRetweet = $("<img>").attr("src", "/images/retweet.png");
    let $footerLike = $("<img>").attr("src", "/images/like.png")  ;   

    $tweet.append($header, $p, $footer);
    $header.append($img, $h2 ,$headerSpan);
    $footer.append($footerSpan, $footerFlag, $footerRetweet, $footerLike);

    return ($tweet);
  }

  renderTweets(data);

  $(".new-tweet form").on("submit", function(event) {
    event.preventDefault();
    var formData = $(this).serialize();
    $.post('/tweets', formData).done(function() {
      console.log('test');
    });
  });




  
});


