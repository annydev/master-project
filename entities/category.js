const mongoose = require("mongoose");

let schema = new mongoose.Schema({
    title: String,
    parentId: String,
    image: String
});

let object = mongoose.model("Category", schema);

module.exports = object;