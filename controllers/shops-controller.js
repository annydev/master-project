const express = require('express');
const router = express.Router();

const common = require("../helpers/common");
const shopsRepository = require("../repositories/shops-repository");

router.get("/", async (req, res) => {
    common.Authorize(req, res);

    let dbShops = await shopsRepository.GetAll();

    let result = {
        shops: dbShops
    }

    res.render("shops/index", result);
});

router.get("/edit/:id", async (req, res) => {
    var id = req.params.id;

    common.Authorize(req, res);

    let dbShop = await shopsRepository.GetById(id);

    let result = {
        shop: dbShop
    }
    res.render("shops/edit", result);
});

router.get("/add", async (req, res) => {
    common.Authorize(req, res);

    res.render("shops/create");
});

router.post("/edit", async (req, res) => {
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

router.post("/add", async (req, res) => {
    let newShop = {
        title: req.body.title
    };

    const foundShop = await shopsRepository.findShop(newShop.title);

    if(foundShop) {
        console.log("This title is already in use"); 
    } else {
        const result = await shopsRepository.Create(newShop)

        if (result.status) {
            res.redirect("/admin/shops");
        } else {
            console.log(result.message);
        }
    }
   
});

router.post("/delete", async (req, res) => {
    var shopId = req.body.id;

    let result = await shopsRepository.Delete(shopId)

    res.json(result);
});


module.exports = router;