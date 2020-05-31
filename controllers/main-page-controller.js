var express = require("express");
var router = express.Router();

const moment = require('moment');

const categoriesRepository = require("../repositories/categories-repository");
const productsRepository = require("../repositories/products-repository");
const shopsRepository = require("../repositories/shops-repository");
const pricesRepository = require("../repositories/prices-repository");

router.get("/", async (req, res) => {
  let dbCategories = await categoriesRepository.GetAll();
  let result = {
    categories: dbCategories,
  };

  res.render("main-page/index", result);
});

router.get("/category/:id", async (req, res) => {
  var categoryId = req.params.id;
  let allIds = [categoryId];

  let dbCategory = await categoriesRepository.GetById(categoryId);
  let dbSubcategories = await categoriesRepository.GetAllByParrentId(
    categoryId
  );

  if (dbSubcategories.length) {
    dbSubcategories.forEach((subcategory) => {
      allIds.push(subcategory.id);
    });
  }

  let dbProducts = await productsRepository.GetAllByCategoryIds(allIds);
  let resultProd = [];
  for (let i = 0; i < dbProducts.length; i++) {
    const currentProduct = dbProducts[i];
    
    let dbLastPriceOfProduct = await pricesRepository.GetLastByProductId(currentProduct._id);
    let resProd = {
      title: currentProduct.title,
      imageURL: currentProduct.imageURL,
      lasPrice: !!dbLastPriceOfProduct ? dbLastPriceOfProduct.price + "MDL" : "",
    }

    resultProd.push(resProd)
  }

  let result = {
    category: dbCategory,
    subcategories: dbSubcategories,
    products: resultProd,
  };

  res.render("main-page/view-category-page", result);
});

router.get("/subcategory/:id", async (req, res) => {
  let subcategoryId = req.params.id;
  let subcategories = [];

  let dbSubcategory = await categoriesRepository.GetById(subcategoryId);
  let dbSubcategories = await categoriesRepository.GetAllByParrentId(
    dbSubcategory.parentId
  );

  dbSubcategories.forEach((sub) => {
    subcategories.push({
      id: sub.id,
      title: sub.title,
      class: subcategoryId === sub.id ? "active" : "",
    });
  });

  let dbProducts = await productsRepository.GetAllByCategoryIds([
    subcategoryId,
  ]);

  let resultProd = [];
  for (let i = 0; i < dbProducts.length; i++) {
    const currentProduct = dbProducts[i];
    
    let dbLastPriceOfProduct = await pricesRepository.GetLastByProductId(currentProduct._id);
    let resProd = {
      title: currentProduct.title,
      imageURL: currentProduct.imageURL,
      lasPrice: !!dbLastPriceOfProduct ? dbLastPriceOfProduct.price + "MDL" : "",
    }

    resultProd.push(resProd)
  }

  let result = {
    subcategory: dbSubcategory,
    subcategories: subcategories,
    products: resultProd,
  };

  res.render("main-page/view-subcategory-page", result);
});

router.get("/price/:id", async (req, res) => {
  let productId = req.params.id;
  let dbProductPrices = [];

  let dbProduct = await productsRepository.GetById(productId);

  let dbShops = await shopsRepository.GetAll();

  for (let i = 0; i < dbShops.length; i++) {
    shop = dbShops[i];
    let dbLastPrice;

    dbLastPrice = await pricesRepository.GetLastPriceByDate(shop._id, productId);

    let priceDetails = {
      shopId: shop._id,
      shopName: shop.title,
      lastPrice: !!dbLastPrice ? dbLastPrice.price + "MDL" : "",
      lastDate: !!dbLastPrice ? moment(dbLastPrice.date).format('DD.MM.YYYY') : ""
    };

    dbProductPrices.push(priceDetails);
  }

  let result = {
    product: dbProduct,
    prices: dbProductPrices,
  };

  res.render("main-page/product-prices", result);
});

router.post("/prices/suggestPrice", async (req, res) => {
  let newPrice = {
    price: req.body.price,
    productId: req.body.productId,
    shopId: req.body.shopId,
    image: req.body.image,
    date: req.body.date,
    expiredDate: req.body.expiredDate,
    isApproved: false
}

let result = await pricesRepository.CreateStatusFalse(newPrice)

res.json(result);
});

router.post("/product/suggestProduct", async(req, res) => {
  let newProduct = {
    title: req.body.productName,
    description: "New product suggested!",
    categoryId: req.body.categoryId,
    imageURL: "",
    isApproved: false,
    date: req.body.date
  }

let result = await productsRepository.CreateStatusFalse(newProduct)

res.json(result);
});


module.exports = router;
