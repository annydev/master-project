//jshint esversion:6

const bodyParser = require("body-parser");
const express = require("express");
const ejs = require("ejs");
//const engine = require("ejs-locals");
const moment = require('moment');
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");

const app = express();

//app.engine('ejs', engine);

app.set('view engine', 'ejs');

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

mongoose.connect("mongodb://localhost:27017/pricesDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});

mongoose.set("useCreateIndex", true);

const shopsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please check your data entry, no title specified!"]
  }
});

const Shop = mongoose.model("Shop", shopsSchema);

const categorySchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please check your data entry, no title specified!"]
  },
  parentId: String
});

const Category = mongoose.model("Category", categorySchema);

const productsSchema = new mongoose.Schema({
  title: String,
  categoryId: String,
  imageURL: String
});

const Product = mongoose.model("Product", productsSchema);

const usersSchema = new mongoose.Schema({
  username: String,
  password: String
});

const pricesSchema = new mongoose.Schema({
  price: Number,
  productId: String,
  shopId: String,
  date: Date
});

const Price = mongoose.model("Price", pricesSchema);

//This will help us to hash and salt the passwords of the users and save them into the DB.

usersSchema.plugin(passportLocalMongoose);

const User = mongoose.model("User", usersSchema);

passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.get("/", function (req, res) {
  res.render("index");
});

app.get("/login", function (req, res) {
  res.render("login", {
    pageTitle: "Login page"
  });
});

app.get("/logout", function (req, res) {
  req.logout();
  res.redirect("/");
});

app.get("/admin", function (req, res) {
  if (!req.isAuthenticated()) {
    res.redirect("/login");
  }

  res.render("admin", {
    pageTitle: "Admin"
  });
});

app.get("/admin/shops", async (req, res) => {
  if (!req.isAuthenticated()) {
    res.redirect("/login");
  }

  let dbShops;

  await Shop.find({}, function (err, shops) {
    if (!err) {
      dbShops = shops;
    }
  });

  let result = {
    pageTitle: "Shops page",
    shops: dbShops
  }

  res.render("shops", result);
});

app.get("/admin/products", async (req, res) => {
  if (!req.isAuthenticated()) {
    res.redirect("/login");
  }

  let dbProducts;
  let resultProducts = [];

  await Product.find({}, function (err, products) {
    if (err) {
      console.log(err);
    } else {
      dbProducts = products
    }
  });

  for (i = 0; i < dbProducts.length; i++) {
    let product = dbProducts[i];
    let productCategoryId = product.categoryId;
    let dbCategory;
    let dbSubcategory;
    let dbLastPrice;

    await Category.findById({ _id: productCategoryId }, function (err, category) {
      if (err) {
        console.log(err);
      } else {
        dbCategory = category
      }
    });

    if (!!dbCategory.parentId) {
      await Category.findById({ _id: dbCategory.parentId }, function (err, category) {
        if (err) {
          console.log(err);
        } else {
          dbSubcategory = dbCategory;
          dbCategory = category
        }
      });
    }

    await Price.findOne({ productId: product._id }, null, { sort: { date: 'desc' } }, function (err, foundPrice) {
      if (err) {
        console.log(err);
      } else {
        dbLastPrice = foundPrice
      }
    });

    resultProducts.push({
      id: product._id,
      title: product.title,
      categoryTitle: dbCategory.title,
      subcategoryTitle: !!dbSubcategory ? dbSubcategory.title : '',
      lastPrice: !!dbLastPrice ? dbLastPrice.price : ""
    });
  }

  let result = {
    pageTitle: "Products page",
    products: resultProducts
  }
  res.render("products", result);
});

app.get("/admin/products/edit/:id", async (req, res) => {
  var id = req.params.id;

  if (!req.isAuthenticated()) {
    res.redirect("/login");
  }

  let dbProduct;
  let dbShops;
  let dbPrices;
  let resultPrices = [];

  await Product.findById({ _id: id }, function (err, product) {
    if (err) {
      console.log(err);
    } else {
      dbProduct = product
    }
  });

  await Shop.find({}, function (err, shops) {
    if (err) {
      console.log(err);
    } else {
      dbShops = shops
    }
  });

  await Price.find({ productId: id }, function (err, prices) {
    if (err) {
      console.log(err);
    } else {
      dbPrices = prices
    }
  });

  for (i = 0; i < dbPrices.length; i++) {
    let price = dbPrices[i];
    let dbShop;

    await Shop.findById({ _id: price.shopId }, function (err, shop) {
      if (err) {
        console.log(err);
      } else {
        dbShop = shop;
      }
    });

    resultPrices.push({
      id: price._id,
      price: price.price,
      date: moment(price.date).format('MM/DD/YYYY, k:mm:ss'),
      shopTitle: dbShop.title
    });
  }

  let result = {
    pageTitle: "Edit product page",
    product: dbProduct,
    shops: dbShops,
    prices: resultPrices
  }

  res.render("editProduct", result);
});

app.get("/admin/addCategory", function (req, res) {
  if (!req.isAuthenticated()) {
    res.redirect("/login");
  }

  res.render("addCategory", {
    pageTitle: "Add new category page"
  });
});

app.get("/admin/categories", async (req, res) => {
  if (!req.isAuthenticated()) {
    res.redirect("/login");
  }
  let dbCategories;
  let resultCategories = [];

  await Category.find({ parentId: { $exists: false } }, function (err, categories) {
    if (!err) {
      dbCategories = categories;
    }
  });

  for (i = 0; i < dbCategories.length; i++) {
    let dbSubcategories;
    let currentCategory = dbCategories[i];

    await Category.find({ parentId: currentCategory._id }, function (err, subcategories) {
      if (!err) {
        dbSubcategories = subcategories;
      }
    });

    resultCategories.push({
      id: currentCategory._id,
      title: currentCategory.title,
      subcategoriesCount: dbSubcategories.length
    })
  }

  let result = {
    pageTitle: "Categories page",
    categories: resultCategories
  }

  res.render("categories", result);
});

app.get("/admin/categories/edit/:id", async (req, res) => {
  var id = req.params.id;

  if (!req.isAuthenticated()) {
    res.redirect("/login");
  }
    let dbCategory;
    let dbSubcategories;

    await Category.findOne({ _id: id }, function (err, category) {
      if (!err) {
        dbCategory = category
      }
    });

    await Category.find({ parentId: id }, function (err, subcategories) {
      if (!err) {
        dbSubcategories = subcategories;
      }
    });

    let result = {
      pageTitle: "Edit category page",
      category: dbCategory,
      subcategories: dbSubcategories
    }

    res.render("editCategory", result);
});

app.get("/admin/addShop", function (req, res) {
  if (!req.isAuthenticated()) {
    res.redirect("/login");
  }

  res.render("addShop", {
    pageTitle: "Add new shop page"
  });
});

app.get("/admin/shops/edit/:id", async (req, res) => {
  var id = req.params.id;

  if (!req.isAuthenticated()) {
    res.redirect("/login");
  }
    let dbShop;

    await Shop.findOne({ _id: id }, function (err, shop) {
      if (!err) {
        dbShop = shop;
      }
    });

    let result = {
      pageTitle: "Edit shop page",
      shop: dbShop
    }
    res.render("editShop", result);
});

app.get("/admin/users", async (req, res) => {
  if (!req.isAuthenticated()) {
    res.redirect("/login");
  }

  let dbUsers;

  await User.find({}, function (err, users) {
    if (err) {
      console.log(err);
    } else {
      dbUsers = users
    }
  });

  let result = {
    pageTitle: "Administrators page",
    administrators: dbUsers
  }
  res.render("users", result);
});

app.get("/admin/addAdmin", (req, res) => {
  if (!req.isAuthenticated()) {
    res.redirect("/login");
  }

  res.render("addAdmin", {
    pageTitle: "Add new admin"
  });
});

app.get("/admin/addProduct", async (req, res) => {
  if (!req.isAuthenticated()) {
    res.redirect("/login");
  }

  let dbCategories;

  await Category.find({ parentId: { $exists: false } }, function (err, categories) {
    if (err) {
      console.log(err);
    } else {
      dbCategories = categories
    }
  });

  let result = {
    pageTitle: "Add new products",
    categories: dbCategories
  }
  res.render("addProduct", result);
});

app.post("/admin/getSubcategories", async (req, res) => {
  let categoryId = req.body.categoryId;
  let dbSubcategories = [];

  await Category.find({ parentId: categoryId }, function (err, subcategories) {
    if (err) {
      console.log(err);
    } else {
      dbSubcategories = subcategories;
    }
  });

  res.json({
    subcategories: dbSubcategories
  });
});

app.post("/addProduct", async (req, res) => {
  const newProduct = new Product({
    title: req.body.titleProduct,
    categoryId: req.body.productCategory,
    imageURL: req.body.productImage
  });

  await newProduct.save(function (err) {
    if (err) {
      res.json({ status: false, message: err });
    } else {
      console.log("Success!");
      res.json({ status: true });
    }
  });
});

app.post("/admin/shops/edit", function (req, res) {
  var id = req.body.id;
  var title = req.body.title;

  if (req.isAuthenticated()) {
    Shop.findByIdAndUpdate({ _id: id }, { title: title }, { new: true }, function (err) {
      if (err) {
        console.log(err);
      } else {
        res.redirect("/admin/shops");
      }
    });
  } else {
    res.redirect("/login");
  }
});

app.post("/admin/categories/edit", function (req, res) {
  var id = req.body.id;
  var title = req.body.title;

  if (req.isAuthenticated()) {
    Category.findByIdAndUpdate({ _id: id }, { title: title }, { new: true }, function (err) {
      if (err) {
        console.log(err);
      } else {
        res.redirect("/admin/categories");
      }
    });
  } else {
    res.redirect("/login");
  }
});

app.post("/admin/products/edit", function (req, res) {
  var id = req.body.id;
  var title = req.body.title;

  if (req.isAuthenticated()) {
    Product.findByIdAndUpdate({ _id: id }, { title: title }, { new: true }, function (err) {
      if (err) {
        console.log(err);
      } else {
        res.redirect("/admin/products");
      }
    });
  } else {
    res.redirect("/login");
  }
});

app.post("/admin/prices/add", function (req, res) {
  const newPrice = new Price({
    price: req.body.price,
    productId: req.body.productId,
    shopId: req.body.shopId,
    date: req.body.date
  });

  newPrice.save(function (err) {
    if (!err) {
      console.log("Success!");
      res.json({ status: true });
    } else {
      res.json({ status: false, message: err });
    }
  });
});

app.post("/admin/categories/addSubcategory", function (req, res) {
  const newSubcategory = new Category({
    title: req.body.titleSubcategory,
    parentId: req.body.subId
  });

  newSubcategory.save(function (err) {
    if (!err) {
      console.log("Success!");
      res.json({ status: true });
    } else {
      res.json({ status: false, message: err });
    }
  });
});

app.post("/admin/categories/deleteSubcategory", function (req, res) {
  var subcategoryId = req.body.subId;

  Category.findOneAndRemove({ parentId: subcategoryId }, function (err) {
    if (err) {
      res.json({ status: false, message: err });
    } else {
      res.json({ status: true });
    };
  });
});

app.post("/admin/prices/delete", function (req, res) {
  let priceId = req.body.id;

  Price.findOneAndRemove({ _id: priceId }, function (err) {
    if (err) {
      res.json({ status: false, message: err });
    } else {
      res.json({ status: true });
    };
  });
});

app.post("/admin/product/delete", function (req, res) {
  let productId = req.body.id;

  Product.findOneAndRemove({ _id: productId }, function (err) {
    if (err) {
      res.json({ status: false, message: err });
    } else {
      res.json({ status: true });
    };
  });
});

app.post('/admin/categories/delete', function (req, res) {
  var categoryId = req.body.id;

  Category.findByIdAndRemove({ _id: categoryId }, function (err) {
    if (err) {
      res.json({ status: false, message: err });
    } else {
      res.json({ status: true });
    };
  });
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
        res.redirect("/admin");
      });
    }
  });
});

app.post("/addCategory", function (req, res) {
  const newCategory = new Category({
    title: req.body.category
  });
  newCategory.save(function (err) {
    if (err) {
      console.log(err)
    } else {
      res.redirect("/admin/categories");
    }
  });
});

app.post("/addShop", function (req, res) {
  const newShop = new Shop({
    title: req.body.shop
  });
  newShop.save(function (err) {
    if (err) {
      console.log(err)
    } else {
      res.redirect("/admin/shops");

    }
  })
});

app.post("/admin/shops/delete", function (req, res) {
  var shopId = req.body.id;

  Shop.remove({ _id: shopId }, function (err) {
    if (err) {
      res.json({ status: false, message: err });
    } else {
      res.json({ status: true });
    };
  });
});

app.listen(3000, function () {
  console.log("Server started on port 3000");
});
