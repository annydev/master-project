const common = require("./helpers/common");

const passportService = require("./services/passport-service");
const shopsController = require("./controllers/shops-controller");
const categoriesController = require("./controllers/categories-controller");
const productsController = require("./controllers/products-controller");
const pricesController = require("./controllers/prices-controller");
const usersController = require("./controllers/users-controller");
const loginController = require("./controllers/login-controller");

const OperatorModule = (function () {
    // Properties

    const self = this;

    // Public functions

    self.Init = function (app) {
        passportService.Init(app);

        common.DefineActions(app, "/admin/shops", shopsController.GetActions());
        common.DefineActions(app, "/admin/categories", categoriesController.GetActions());
        common.DefineActions(app, "/admin/products", productsController.GetActions());
        common.DefineActions(app, "/admin/prices", pricesController.GetActions());
        common.DefineActions(app, "/admin/users", usersController.GetActions());
        common.DefineActions(app, "/login", loginController.GetActions());
    };

    return self;
})();

module.exports = { ...OperatorModule }