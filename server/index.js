"use strict";

// Basic express setup:

const PORT          = 8080;
const nodeSassMiddleware = require('node-sass-middleware')
const express       = require("express");
const bodyParser    = require("body-parser");
const app           = express();

app.use(nodeSassMiddleware({
  src: path.join(__dirname, "sass"),
  dest: path.join(__dirname, "public"),
  debug: true,
  outputStyle: "compressed"
}));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// The in-memory database of tweets. It's a basic object with an array in it.

const MongoClient = require("mongodb").MongoClient;
const MONGODB_URI = "mongodb://localhost:27017/tweeter";

MongoClient.connect(MONGODB_URI, (err, db) => {
  if (err) {
    console.error(`Failed to connect: ${MONGODB_URI}`);
    throw err;
  }
  
  const DataHelpers = require("./lib/data-helpers")(db);
  const tweetsRoutes = require("./routes/tweets")(DataHelpers);
  app.use("/tweets", tweetsRoutes);

});

// The `data-helpers` module provides an interface to the database of tweets.

// This simple interface layer has a big benefit: we could switch out the
// actual database it uses and see little to no changes elsewhere in the code
// (hint hint).

// Because it exports a function that expects the `db` as a parameter, we can
// require it and pass the `db` parameter immediately:

// The `tweets-routes` module works similarly: we pass it the `DataHelpers` object
// so it can define routes that use it to interact with the data layer.

// Mount the tweets routes at the "/tweets" path prefix:

app.listen(PORT, () => {
  console.log("Tweeting to port " + PORT);
});
