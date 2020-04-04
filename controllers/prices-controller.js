const express = require('express');
const router = express.Router();

const pricesRepository = require("../repositories/prices-repository");

router.post("/add", async (req, res) => {
    let newPrice = {
        price: req.body.price,
        productId: req.body.productId,
        shopId: req.body.shopId,
        date: req.body.date
    };

    let result = await pricesRepository.Create(newPrice)

    res.json(result);
});

router.post("/delete", async (req, res) => {
    let priceId = req.body.id;

    let result = await pricesRepository.Delete(priceId)

    res.json(result);
});

module.exports = router;