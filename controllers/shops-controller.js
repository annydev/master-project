const common = require("../helpers/common");
const shopsRepository = require("../repositories/shops-repository");

const ShopsController = (function () {
    // Preperties

    const self = this;
    const actions = []

    // Actions

    actions.push(["GET", "", async (req, res) => {
        common.Authorize(req, res);

        let dbShops = await shopsRepository.GetAll();

        let result = {
            shops: dbShops
        }

        res.render("shops/index", result);
    }]);

    actions.push(["GET", "edit/:id", async (req, res) => {
        var id = req.params.id;

        common.Authorize(req, res);

        let dbShop = await shopsRepository.GetById(id);

        let result = {
            shop: dbShop
        }
        res.render("shops/edit", result);
    }]);

    actions.push(["POST", "edit", async (req, res) => {
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
    }]);

    actions.push(["POST", "delete", async (req, res) => {
        var shopId = req.body.id;

        let result = await shopsRepository.Delete(shopId)

        res.json(result);
    }]);

    // Public functions

    self.GetActions = () => {
        return actions;
        

        // app.get("/admin/addShop", function (req, res) {
        //     common.Authorize(req, res);

        //     res.render("shops/create");
        // });

        // app.post("/addShop", async (req, res) => {
        //     let newShop = {
        //         title: req.body.shop
        //     };

        //     let result = await shopsRepository.Create(newShop)

        //     if (result.status) {
        //         res.redirect("/admin/shops");
        //     } else {
        //         console.log(result.message);
        //     }

        // });
    }

    return self;
})();

module.exports = { ...ShopsController }