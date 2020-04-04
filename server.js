//jshint esversion:6

const bodyParser = require("body-parser");
const express = require("express");
const engine = require("ejs-locals");
const mongoose = require("mongoose");

const common = require("./helpers/common");
const routing = require("./routing");

const app = express();

app.engine('ejs', engine);

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/pricesDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});

mongoose.set("useCreateIndex", true);

routing.Init(app);

app.listen(3000, function () {
  console.log("Server started on port 3000");
});
