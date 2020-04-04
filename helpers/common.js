const CommonModule = (function () {
    // Preperties

    const self = this;

    // Public functions

    self.Authorize = function (req, res) {
        if (!req.isAuthenticated()) {
            res.redirect("/login");
        }
    };

    self.DefineActions = (app, path, actions) => {
        actions.forEach((action) => {
            switch (action[0]) {
                case "GET":
                    app.get(`${path}/${action[1]}`, action[2]);
                    break;

                case "POST":
                    app.post(`${path}/${action[1]}`, action[2]);
                    break;
            }
        })
    }

    return self;
})();

module.exports = { ...CommonModule }