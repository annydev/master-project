var express = require('express');
var router = express.Router();

const common = require("../helpers/common");

router.get("/dashboard", async (req, res) => {
    common.Authorize(req, res);

    res.render("dashboard/dashboard");
});

module.exports = router;