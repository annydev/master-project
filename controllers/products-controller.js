const express = require('express');
const router = express.Router();

const common = require("../helpers/common");
const moment = require('moment');
const productsRepository = require("../repositories/products-repository");
const categoriesRepository = require("../repositories/categories-repository");
const pricesRepository = require("../repositories/prices-repository");
const shopsRepository = require("../repositories/shops-repository");

router.get("/", async (req, res) => {
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

router.get("/edit/:id", async (req, res) => {
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
            image: price.image,
            status: price.isApproved,
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

router.get("/add", async (req, res) => {
    common.Authorize(req, res);

    let dbCategories = await categoriesRepository.GetAll();

    let result = {
        categories: dbCategories
    }
    res.render("products/create", result);
});

router.post("/getSubcategories", async (req, res) => {
    let categoryId = req.body.categoryId;
    let dbSubcategories = await categoriesRepository.GetAllByParrentId(categoryId);

    res.json({
        subcategories: dbSubcategories
    });
});

router.post("/edit", async (req, res) => {
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

router.post("/add", async (req, res) => {
    let newProduct = {
        title: req.body.titleProduct,
        description: req.body.productDescription,
        categoryId: req.body.productCategory,
        imageURL: req.body.productImage
    }

    let foundProduct = await productsRepository.findProduct(newProduct.title);

    if(foundProduct) {
        console.log("This product already exists in DB");     
    } else {
        let result = await productsRepository.Create(newProduct)

        res.json(result);
    }  
});

router.post("/delete", async (req, res) => {
    let productId = req.body.id;

    let result = await productsRepository.Delete(productId)

    res.json(result);
});

module.exports = router;