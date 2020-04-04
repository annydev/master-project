const usersRepository = require("../repositories/users-repository");

const LoginController = (function () {
    // Preperties

    const self = this;
    const actions = []

    // Actions

    actions.push(["GET", "", async (req, res) => {
        res.render("login");
    }]);

    actions.push(["POST", "", async (req, res) => {
        let user = usersRepository.GetNew(req.body.username, req.body.password);

        req.login(user, function (err) {
            if (!err) {
                res.redirect("/admin/dashboard");
            }
        });

    }]);

    // Public functions

    self.GetActions = () => {
        return actions;

    }

    return self;
})();

module.exports = { ...LoginController }