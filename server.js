//jshint esversion:6

const bodyParser = require("body-parser");
const express = require("express");
const engine = require("ejs-locals");
const moment = require('moment');

const common = require("./helpers/common");
const context = require("./context");
const operator = require("./operator");

const shopsRepository = require("./repositories/shops-repository");
const productsRepository = require("./repositories/products-repository");
const categoriesRepository = require("./repositories/categories-repository");
const pricesRepository = require("./repositories/prices-repository");
const usersRepository = require("./repositories/users-repository");

const app = express();

app.engine('ejs', engine);

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

context.Init();
operator.Init(app);

app.get("/", function (req, res) {
  res.render("main-page/index");
});

app.get("/logout", function (req, res) {
  req.logout();
  res.redirect("/");
});

app.get("/admin/dashboard", function (req, res) {
  common.Authorize(req, res);

  res.render("dashboard/dashboard");
});


app.listen(3000, function () {
  console.log("Server started on port 3000");
});
