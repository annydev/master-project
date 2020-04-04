const passportService = require("./services/passport-service");
const shopsController = require("./controllers/shops-controller");
const categoriesController = require("./controllers/categories-controller");
const productsController = require("./controllers/products-controller");
const pricesController = require("./controllers/prices-controller");
const usersController = require("./controllers/users-controller");
const loginController = require("./controllers/login-controller");
const MainPageController = require("./controllers/main-page-controller");
const AdminDashboardController = require("./controllers/admin-dashboard-controller");

const RoutingModule = (function () {
    // Properties

    const self = this;

    // Public functions

    self.Init = function (app) {
        passportService.Init(app);

        app.use('/admin/categories', categoriesController);
        app.use('/auth', loginController);
        app.use("/admin/shops", shopsController);
        app.use("/admin/products", productsController);
        app.use("/admin/prices", pricesController);
        app.use("/admin/users", usersController);
        app.use("/", MainPageController);
        app.use("/admin", AdminDashboardController);
    };

    return self;
})();

module.exports = { ...RoutingModule }