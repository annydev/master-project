const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

let schema = new mongoose.Schema({
    username: String,
    password: String
});

schema.plugin(passportLocalMongoose);

let object = mongoose.model("User", schema);

module.exports = object;