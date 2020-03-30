// app.get("/registration", function (req, res) {
//   res.render("registration", {
//     pageTitle: "Registration page"
//   });
// });

// app.post("/registration", function (req, res) {

//   //the register method cam from passport-local-passportLocalMongoose

//   User.register({
//     username: req.body.username
//   }, req.body.password, function (err, newRegisteredUser) {
//     if (err) {
//       console.log(err);
//       res.redirect("/registration");
//     } else {
//       passport.authenticate("local")(req, res, function () {
//         res.redirect("/admin");
//       });
//     }
//   });
// });