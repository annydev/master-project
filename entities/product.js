const mongoose = require("mongoose");

    let schema = new mongoose.Schema({
        title: String,
        description: String,
        categoryId: String,
        imageURL: String
    });

    let object = mongoose.model("Product", schema);

module.exports = object;