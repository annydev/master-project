var express = require('express');
var router = express.Router();

router.get("/", async (req, res) => {

    res.render("main-page/index");
});

module.exports = router;