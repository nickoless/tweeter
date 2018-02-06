"use strict";

require('dotenv').config();

// Basic express setup:

const PORT          = process.env.PORT || 8080;
const express       = require("express");
const bodyParser    = require("body-parser");
const app           = express();

// Sass

const nodeSassMiddleware = require('node-sass-middleware');
const path = require('path');

app.use(nodeSassMiddleware({
  src: path.join(__dirname, "../sass"),
  dest: path.join(__dirname, "../public/styles"),
  debug: true,
  outputStyle: "compressed",
  prefix: "/styles"
}));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// Mongo DB

const MongoClient = require("mongodb").MongoClient;
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/tweeter";

MongoClient.connect(MONGODB_URI, (err, db) => {
  if (err) {
    console.error(`Failed to connect: ${MONGODB_URI}`);
    throw err;
  }
  const DataHelpers = require("./lib/data-helpers")(db);
  const tweetsRoutes = require("./routes/tweets")(DataHelpers);
  app.use("/tweets", tweetsRoutes);
});

app.listen(PORT, () => {
  console.log("Tweeting to port " + PORT);

});
