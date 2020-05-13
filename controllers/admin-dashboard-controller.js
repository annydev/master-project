var express = require('express');
var router = express.Router();

const common = require("../helpers/common");

router.get("/dashboard", async (req, res) => {
    common.Authorize(req, res);

    res.render("dashboard/dashboard");
});

router.get("/", async (req, res) => {
    res.redirect("/admin/dashboard");
});

module.exports = router;