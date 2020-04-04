const express = require('express');
const router = express.Router();

const common = require("../helpers/common");
const usersRepository = require("../repositories/users-repository");

router.get("/", async (req, res) => {
    common.Authorize(req, res);

    let dbUsers = await usersRepository.GetAll();

    let result = {
        administrators: dbUsers
    }
    res.render("users/index", result);
});

router.get("/add", async (req, res) => {
    common.Authorize(req, res);

    res.render("users/create");
});

router.post("/add", async (req, res) => {
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
});

router.post("/delete", async (req, res) => {
    var adminId = req.body.id;

    let result = await usersRepository.Delete(adminId)

    res.json(result);
});

module.exports = router;