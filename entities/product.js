const mongoose = require("mongoose");

    let schema = new mongoose.Schema({
        title: String,
        description: String,
        categoryId: String,
        imageURL: String,
        isApproved: Boolean,
        date: Date
    });

    let object = mongoose.model("Product", schema);

module.exports = object;