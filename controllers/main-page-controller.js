var express = require('express');
var router = express.Router();

const categoriesRepository = require("../repositories/categories-repository");

router.get("/", async(req, res) => {

    let dbCategories = await categoriesRepository.GetAll();
    let result = {
        categories: dbCategories
    }

    res.render("main-page/index", result);

});



module.exports = router;