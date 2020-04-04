const common = require("../helpers/common");
const categoriesRepository = require("../repositories/categories-repository");

const CategoriesController = (function () {
    // Preperties

    const self = this;
    const actions = []

    // Actions

    actions.push(["GET", "", async (req, res) => {
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
    }]);

    actions.push(["GET", "edit/:id", async (req, res) => {
        var id = req.params.id;

        common.Authorize(req, res);

        let dbCategory = await categoriesRepository.GetById(id);
        let dbSubcategories = await categoriesRepository.GetAllByParrentId(id);

        let result = {
            category: dbCategory,
            subcategories: dbSubcategories
        }

        res.render("categories/edit", result);
    }]);

    actions.push(["GET", "add", async (req, res) => {
        common.Authorize(req, res);

        res.render("categories/create");
    }]);

    actions.push(["POST", "edit", async (req, res) => {
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
    }]);

    actions.push(["POST", "add", async (req, res) => {
        let newCategory = {
            title: req.body.category
        };

        let result = await categoriesRepository.Create(newCategory)

        if (result.status) {
            res.redirect("/admin/categories");
        } else {
            console.log(result.message);
        }
    }]);

    actions.push(["POST", "delete", async (req, res) => {
        var categoryId = req.body.id;

        let result = await categoriesRepository.Delete(categoryId)

        res.json(result);
    }]);

    actions.push(["POST", "addSubcategory", async (req, res) => {
        let newSubcategory = {
            title: req.body.titleSubcategory,
            parentId: req.body.categoryId
        };

        let result = await categoriesRepository.Create(newSubcategory)

        res.json(result);
    }]);

    actions.push(["POST", "deleteSubcategory", async (req, res) => {
        var subcategoryId = req.body.subId;

        let result = await categoriesRepository.Delete(subcategoryId)

        res.json(result);
    }]);

    // Public functions

    self.GetActions = () => {
        return actions;

    }

    return self;
})();

module.exports = { ...CategoriesController }