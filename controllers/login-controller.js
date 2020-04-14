const express = require('express');
const router = express.Router();

const usersRepository = require("../repositories/users-repository");

router.get("/login", async (req, res) => {
    res.render("login");
});

router.get("/logout", async (req, res) => {
    req.logout();
    res.redirect("/");
});

router.post("/login", async (req, res) => {
    let user = usersRepository.GetNew(req.body.username, req.body.password);

    req.login(user, function (err) {
        if (!err) {
            res.redirect("/admin/users");
        }
    });

});

module.exports = router;