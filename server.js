//jshint esversion:6

const bodyParser = require("body-parser");
const express = require("express");
const engine = require("ejs-locals");
const mongoose = require("mongoose");
const { body, check, validationResult } = require('express-validator');

const routing = require("./routing");

const app = express();

app.engine('ejs', engine);

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(express.json({limit: '10mb'}));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
app.use(express.static("public"));

mongoose.connect("mongodb+srv://db-admin:LtV8EdJuzpMUzHIk@foodprices-gjk7y.mongodb.net/pricesDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});

mongoose.set("useCreateIndex", true);

routing.Init(app);

app.listen(process.env.PORT || 3000, function () {
  console.log("Server has started sucessefuly");
});
