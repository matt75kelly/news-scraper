require("dotenv");
const express = require("express");
const bodyParser = require("body-parser");
const exphbs = require("express-handlebars");
const mongoose = require("mongoose");
const ask = require("request");
const cheerio = require("cheerio");

// Require all models
const db = require("./models");

PORT = process.env.PORT || process.env.DEV_PORT;

// Initialize Express
var app = express();

// Configure middleware

// Use body-parser for handling form submissions
app.use(bodyParser.urlencoded({ extended: true }));
// Use express.static to serve the public folder as a static directory
app.use(express.static("public"));
// Handlebars
app.engine("handlebars", exphbs({
       defaultLayout: "main"
     }));
app.set("view engine", "handlebars");
// Connect to the Mongo DB
mongoose.connect("mongodb://localhost/mongoHeadlinesdb", {useNewUrlParser: true});
mongoose.set("useCreateIndex", true);
mongoose.set("useFindAndModify", false);

// Routes
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

// Start the server
app.listen(PORT, function() {
  console.log("App running on port " + PORT + "!");
});
