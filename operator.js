const common = require("./helpers/common");

const passportService = require("./services/passport-service");
const shopsController = require("./controllers/shops-controller");

const OperatorModule = (function () {
    // Properties

    const self = this;

    // Public functions

    self.Init = function (app) {
        passportService.Init(app);

        common.DefineActions(app, "/admin/shops", shopsController.GetActions());
    };

    return self;
})();

module.exports = { ...OperatorModule }