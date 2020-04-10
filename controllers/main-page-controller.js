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

router.get("/subcategories/:id", async(req, res) => {
    var categoryId = req.params.id;

    let dbCategory = await categoriesRepository.GetById(categoryId);

    let dbSubcategories = await categoriesRepository.GetAllByParrentId(categoryId);

    let result = {
        category: dbCategory,
        subcategories: dbSubcategories
    }

    res.render("main-page/view-subcategory-page", result);

});



module.exports = router;