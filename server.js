// Require our dependencies
var express = require("express");
var mongoose = require("mongoose");
var expressHandlebars = require("express-handlebars");
var bodyParser = require("body-parser");

var axios = require("axios");
var cheerio = require("cheerio");


// Set up port @ 3000
var PORT = process.env.PORT || 3000;

// Instantiate Express App
var app = express();

// Set up Express router
var router = express.Router();

// require the routes file and pass the router object
require("./config/routes")(router);

// Designate public folder as a static directory
app.use(express.static(__dirname + "/public"));

// Connect Handlebars to express app
app.engine("handlebars", expressHandlebars({
    defaultLayout: "main"
}));
app.set("view engine", "handlebars");

// Use bodyparser in App
app.use(bodyParser.urlencoded({
    extended: false
}));

// Have request go through router middleware
app.use(router);

// if deployed, use the deployed database, Otherwise the local momgoHeadlines database
var db = process.env.MONOGODB_URI || "mongodb://localhost/mongoHeadlines";

// Connect to mongoose from the database
mongoose.connect(db, function(error) {
    //Log errors connecting with Mongo
    if (error) {
        console.log(error);
    }
    //Or log a success message
    else {
        console.log("mongoose connection is successful");
    }
});

// Listen on the port
app.listen(PORT, function() {
    console.log("Listening on port: " + PORT);
});