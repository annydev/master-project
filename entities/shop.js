const mongoose = require("mongoose");

let schema = new mongoose.Schema({
    title: String
});

let object = mongoose.model("Shop", schema);

module.exports = object;