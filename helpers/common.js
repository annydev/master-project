const CommonModule = (function () {
    // Preperties

    const self = this;

    // Public functions

    self.Authorize = function (req, res) {
        if (!req.isAuthenticated()) {
            res.redirect("/auth/login");
        }
    };

    return self;
})();

module.exports = { ...CommonModule }