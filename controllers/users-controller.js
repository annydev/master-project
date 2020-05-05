const express = require("express");
const router = express.Router();
const { body, check, validationResult } = require("express-validator");
const common = require("../helpers/common");
const usersRepository = require("../repositories/users-repository");

router.get("/", async (req, res) => {
  common.Authorize(req, res);

  let dbUsers = await usersRepository.GetAll();

  let result = {
    administrators: dbUsers,
  };
  res.render("users/index", result);
});

router.get("/add", async (req, res) => {
  common.Authorize(req, res);

  res.render("users/create");
});

router.post(
  "/add",
//   [
//     // username must be an email
//     check("username").isEmail().withMessage("Email incorect"),
//     // password must be at least 5 chars long
//     check("password").isLength({ min: 5 }).withMessage("Parola incorecta, minim 5 caractere si minim un numar").not().isIn(['123', 'password', 'god']).withMessage('Do not use a common word as the password'),
//   ],
  async (req, res) => {
    // const errors = validationResult(req);
    // if (!errors.isEmpty()) {
    //   return res.status(422).json({ errors: errors.array()});
    // }

    let registerUser = {
      username: req.body.username,
      password: req.body.password,
    };

    const result = await usersRepository.Register(
      registerUser.username,
      registerUser.password
    );

    if (result.status) {
      res.redirect("/admin/users");
    } else {
      res.redirect("/admin/addAdmin");
      console.log(result.message);
    }
  }
);

router.post("/delete", async (req, res) => {
  var adminId = req.body.id;

  let result = await usersRepository.Delete(adminId);

  res.json(result);
});

module.exports = router;
