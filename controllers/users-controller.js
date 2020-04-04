const common = require("../helpers/common");
const usersRepository = require("../repositories/users-repository");

const UsersController = (function () {
    // Preperties

    const self = this;
    const actions = []

    // Actions

    actions.push(["GET", "", async (req, res) => {
        common.Authorize(req, res);

        let dbUsers = await usersRepository.GetAll();

        let result = {
            administrators: dbUsers
        }
        res.render("users/index", result);
    }]);

    actions.push(["GET", "add", async (req, res) => {
        common.Authorize(req, res);

        res.render("users/create");
    }]);

    actions.push(["POST", "add", async (req, res) => {
        let registerUser = {
            username: req.body.username,
            password: req.body.password
        }

        const result = await usersRepository.Register(registerUser.username, registerUser.password)

        if (result.status) {
            res.redirect("/admin/users");
        } else {
            res.redirect("/admin/addAdmin");
            console.log(result.message);
        }
    }]);

    actions.push(["POST", "delete", async (req, res) => {
        var adminId = req.body.id;

        let result = await usersRepository.Delete(adminId)

        res.json(result);
    }]);

    // Public functions

    self.GetActions = () => {
        return actions;

    }

    return self;
})();

module.exports = { ...UsersController }