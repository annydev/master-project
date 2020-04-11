var express = require("express");
var router = express.Router();

const categoriesRepository = require("../repositories/categories-repository");
const productsRepository = require("../repositories/products-repository");

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
  let dbSubcategories = await categoriesRepository.GetAllByParrentId(categoryId);

  if (dbSubcategories.length) {
    dbSubcategories.forEach((subcategory) => {
      allIds.push(subcategory.id);
    });
  }

  let dbProducts = await productsRepository.GetAllByCategoryIds(allIds);

  let result = {
    category: dbCategory,
    subcategories: dbSubcategories,
    products: dbProducts,
  };

  res.render("main-page/view-category-page", result);
});

router.get("/subcategory/:id", async (req, res) => {
    let subcategoryId = req.params.id;
    let subcategories = []
  
    let dbSubcategory = await categoriesRepository.GetById(subcategoryId);
    let dbSubcategories = await categoriesRepository.GetAllByParrentId(dbSubcategory.parentId);

    dbSubcategories.forEach(sub => {
      subcategories.push({
        id: sub.id,
        title: sub.title,
        class: subcategoryId === sub.id ? 'active' : ''
      })
    });

    let dbProducts = await productsRepository.GetAllByCategoryIds([subcategoryId]);
  
    let result = {
      subcategory: dbSubcategory,
      subcategories: subcategories,
      products: dbProducts,
    };
  
    res.render("main-page/view-subcategory-page", result);
  });

module.exports = router;
