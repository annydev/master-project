//jshint esversion:6

const bodyParser = require("body-parser");
const express = require("express");
const engine = require("ejs-locals");
const moment = require('moment');
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");

const common = require("./helpers/common");
const context = require("./context");

const shopsRepository = require("./repositories/shops-repository");
const productsRepository = require("./repositories/products-repository");
const categoriesRepository = require("./repositories/categories-repository");
const pricesRepository = require("./repositories/prices-repository");

const app = express();

app.engine('ejs', engine);

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs'); // so you can render('index')

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

//We are telling to the app to use session

app.use(session({
  secret: "our secret.",
  resave: false,
  saveUninitialized: false
}));

//  Initialize passport and set to the passport to use session

app.use(passport.initialize());
app.use(passport.session());

context.Init();

const usersSchema = new mongoose.Schema({
  username: String,
  password: String
});

//This will help us to hash and salt the passwords of the users and save them into the DB.

usersSchema.plugin(passportLocalMongoose);

const User = mongoose.model("User", usersSchema);

passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.get("/", function (req, res) {
  res.render("main-page/index");
});

app.get("/login", function (req, res) {
  res.render("login");
});

app.get("/logout", function (req, res) {
  req.logout();
  res.redirect("/");
});

app.get("/admin/dashboard", function (req, res) {
  common.Authorize(req, res);

  res.render("dashboard/dashboard");
});

app.get("/admin/shops", async (req, res) => {
  common.Authorize(req, res);

  let dbShops = await shopsRepository.GetAll();

  let result = {
    shops: dbShops
  }

  res.render("shops/index", result);
});

app.get("/admin/products", async (req, res) => {
  common.Authorize(req, res);

  let dbProducts = await productsRepository.GetAll();
  let resultProducts = [];

  for (i = 0; i < dbProducts.length; i++) {
    let product = dbProducts[i];
    let productCategoryId = product.categoryId;
    let dbCategory = await categoriesRepository.GetById(productCategoryId);
    let dbSubcategory;

    if (!!dbCategory.parentId) {
      dbSubcategory = dbCategory;
      dbCategory = await categoriesRepository.GetById(dbCategory.parentId);
    }

    let dbLastPrice = await pricesRepository.GetLastByProductId(product._id);

    resultProducts.push({
      id: product._id,
      title: product.title,
      categoryTitle: dbCategory.title,
      subcategoryTitle: !!dbSubcategory ? dbSubcategory.title : '',
      lastPrice: !!dbLastPrice ? dbLastPrice.price : ""
    });
  }

  let result = {
    products: resultProducts
  }
  res.render("products/index", result);
});

app.get("/admin/products/edit/:id", async (req, res) => {
  var id = req.params.id;

  common.Authorize(req, res);

  let dbProduct = await productsRepository.GetById(id);
  let dbShops = await shopsRepository.GetAll();
  let dbPrices = await pricesRepository.GetAllByProductId(id);
  let resultPrices = [];

  for (i = 0; i < dbPrices.length; i++) {
    let price = dbPrices[i];
    let dbShop = await shopsRepository.GetById(price.shopId);

    resultPrices.push({
      id: price._id,
      price: price.price,
      date: moment(price.date).format('MM/DD/YYYY, k:mm:ss'),
      shopTitle: dbShop.title
    });
  }

  let result = {
    product: dbProduct,
    shops: dbShops,
    prices: resultPrices
  }

  res.render("products/edit", result);
});

app.get("/admin/addCategory", function (req, res) {
  common.Authorize(req, res);

  res.render("categories/create");
});

app.get("/admin/categories", async (req, res) => {
  common.Authorize(req, res);

  let dbCategories = await categoriesRepository.GetAll();
  let resultCategories = [];

  for (i = 0; i < dbCategories.length; i++) {
    let currentCategory = dbCategories[i];
    let dbSubcategories = await categoriesRepository.GetAllByParrentId(currentCategory._id);

    resultCategories.push({
      id: currentCategory._id,
      title: currentCategory.title,
      subcategoriesCount: dbSubcategories.length
    })
  }

  let result = {
    categories: resultCategories
  }

  res.render("categories/index", result);
});

app.get("/admin/categories/edit/:id", async (req, res) => {
  var id = req.params.id;

  common.Authorize(req, res);

  let dbCategory = await categoriesRepository.GetById(id);
  let dbSubcategories = await categoriesRepository.GetAllByParrentId(id);

  let result = {
    category: dbCategory,
    subcategories: dbSubcategories
  }

  res.render("categories/edit", result);
});

app.get("/admin/addShop", function (req, res) {
  common.Authorize(req, res);

  res.render("shops/create");
});

app.get("/admin/shops/edit/:id", async (req, res) => {
  var id = req.params.id;

  common.Authorize(req, res);

  let dbShop = await shopsRepository.GetById(id);

  let result = {
    shop: dbShop
  }
  res.render("shops/edit", result);
});

app.get("/admin/users", async (req, res) => {
  common.Authorize(req, res);

  let dbUsers;

  await User.find({}, function (err, users) {
    if (err) {
      console.log(err);
    } else {
      dbUsers = users
    }
  });

  let result = {
    administrators: dbUsers
  }
  res.render("users/index", result);
});

app.get("/admin/addAdmin", (req, res) => {
  common.Authorize(req, res);

  res.render("users/create");
});

app.get("/admin/addProduct", async (req, res) => {
  common.Authorize(req, res);

  let dbCategories = await categoriesRepository.GetAll();

  let result = {
    categories: dbCategories
  }
  res.render("products/create", result);
});

app.post("/admin/getSubcategories", async (req, res) => {
  let categoryId = req.body.categoryId;
  let dbSubcategories = await categoriesRepository.GetAllByParrentId(categoryId);

  res.json({
    subcategories: dbSubcategories
  });
});

app.post("/addProduct", async (req, res) => {
  let newProduct = {
    title: req.body.titleProduct,
    categoryId: req.body.productCategory,
    imageURL: req.body.productImage
  }

  let result = await productsRepository.Create(newProduct)

  res.json(result);
});

app.post("/admin/shops/edit", async (req, res) => {
  var id = req.body.id;
  var data = {
    title: req.body.title
  }

  let result = await shopsRepository.Update(id, data);

  if (result.status) {
    res.redirect("/admin/shops");
  } else {
    console.log(result.message);
  }

});

app.post("/admin/categories/edit", async (req, res) => {
  var id = req.body.id;
  var data = {
    title: req.body.title
  }

  let result = await categoriesRepository.Update(id, data);

  if (result.status) {
    res.redirect("/admin/categories");
  } else {
    console.log(result.message);
  }
  
});

app.post("/admin/products/edit", async (req, res) => {
  var id = req.body.id;
  var data = {
    title: req.body.title
  };

  let result = await productsRepository.Update(id, data);

  if (result.status) {
    res.redirect("/admin/products");
  } else {
    console.log(result.message);
  }
});

app.post("/admin/prices/add", async (req, res) => {
  let newPrice = {
    price: req.body.price,
    productId: req.body.productId,
    shopId: req.body.shopId,
    date: req.body.date
  };

  let result = await pricesRepository.Create(newPrice)

  res.json(result);
});

app.post("/admin/categories/addSubcategory", async (req, res) => {
  let newSubcategory = {
    title: req.body.titleSubcategory,
    parentId: req.body.categoryId
  };

  let result = await categoriesRepository.Create(newSubcategory)

  res.json(result);

});

app.post("/admin/categories/deleteSubcategory", async (req, res) => {
  var subcategoryId = req.body.subId;

  let result = await categoriesRepository.Delete(subcategoryId)

  res.json(result);
});

app.post("/admin/prices/delete", async (req, res) => {
  let priceId = req.body.id;

  let result = await pricesRepository.Delete(priceId)

  res.json(result);

});

app.post("/admin/product/delete", async (req, res) => {
  let productId = req.body.id;

  let result = await productsRepository.Delete(productId)

  res.json(result);
  
});

app.post('/admin/categories/delete', async (req, res) => {
  var categoryId = req.body.id;

  let result = await categoriesRepository.Delete(categoryId)

  res.json(result);
});

app.post("/admin/addAdmin", function (req, res) {
  //the register method cam from passport-local-passportLocalMongoose

  User.register({
    username: req.body.username
  }, req.body.password, function (err, newRegisteredUser) {
    if (err) {
      console.log(err);
      res.redirect("/admin/addAdmin");
    } else {
      res.redirect("/admin/users");
    }
  });
});

app.post('/admin/users/delete', function (req, res) {
  var adminId = req.body.id;

  User.findByIdAndRemove({ _id: adminId }, function (err) {
    if (err) {
      res.json({ status: false, message: err });
    } else {
      res.json({ status: true });
    };
  });
});

app.post("/login", function (req, res) {
  const user = new User({
    username: req.body.username,
    password: req.body.password
  });
  //login function came from passport package
  req.login(user, function (err) {
    if (err) {
      console.log(err);
    } else {
      passport.authenticate("local")(req, res, function () {
        res.redirect("/admin/dashboard");
      });
    }
  });
});

app.post("/addCategory", async (req, res) => {
  let newCategory = {
    title: req.body.category
  };

  let result = await categoriesRepository.Create(newCategory)

  if (result.status) {
    res.redirect("/admin/categories");
  } else {
    console.log(result.message);
  }

});

app.post("/addShop", async (req, res) => {
  let newShop = {
    title: req.body.shop
  };

  let result = await shopsRepository.Create(newShop)

  res.json(result);

  if (result.status) {
    res.redirect("/admin/shops");
  } else {
    console.log(result.message);
  }

});

app.post("/admin/shops/delete", async (req, res) => {
  var shopId = req.body.id;

  let result = await shopsRepository.Delete(shopId)

  res.json(result);

});

app.listen(3000, function () {
  console.log("Server started on port 3000");
});
