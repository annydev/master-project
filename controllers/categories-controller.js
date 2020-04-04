var express = require('express');
var router = express.Router();

const common = require("../helpers/common");
const categoriesRepository = require("../repositories/categories-repository");

router.get("/", async (req, res) => {
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
})

router.get("/edit/:id", async (req, res) => {
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

router.get("/add", async (req, res) => {
    common.Authorize(req, res);

    res.render("categories/create");
});

router.post("/edit", async (req, res) => {
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

router.post("/add", async (req, res) => {
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

router.post("/delete", async (req, res) => {
    var categoryId = req.body.id;

    let result = await categoriesRepository.Delete(categoryId)

    res.json(result);
});

router.post("/addSubcategory", async (req, res) => {
    let newSubcategory = {
        title: req.body.titleSubcategory,
        parentId: req.body.categoryId
    };

    let result = await categoriesRepository.Create(newSubcategory)

    res.json(result);
});

router.post("/deleteSubcategory", async (req, res) => {
    var subcategoryId = req.body.subId;

    let result = await categoriesRepository.Delete(subcategoryId)

    res.json(result);
});

module.exports = router;