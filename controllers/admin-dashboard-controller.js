var express = require('express');
var router = express.Router();

const common = require("../helpers/common");
const moment = require('moment');
const pricesRepository = require("../repositories/prices-repository");
const productsRepository = require("../repositories/products-repository");

router.get("/dashboard", async (req, res) => {
    common.Authorize(req, res);

    res.render("dashboard/dashboard");
});

router.get("/", async (req, res) => {
    res.redirect("/admin/dashboard");
});

router.post("/dashboard/notifications", async (req, res) => {

    let dbPricesWithStatusFalse = await pricesRepository.GetByStatusFalse();
    let resultPrices = [];

    for (let i = 0; i < dbPricesWithStatusFalse.length; i++) {
        const currentPriceStatusFalse = dbPricesWithStatusFalse[i];
        
        let foundProduct = await productsRepository.GetById(currentPriceStatusFalse.productId);

        resultPrices.push({
            price: currentPriceStatusFalse.price,
            date: moment(currentPriceStatusFalse.date).format('DD.MM.YYYY, k:mm:ss'),
            productName: foundProduct.title,
            productId: currentPriceStatusFalse.productId
        });
    }

    res.json({
        prices: resultPrices
    });
});

module.exports = router;