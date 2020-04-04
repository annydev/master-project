const mongoose = require("mongoose");

let schema = new mongoose.Schema({
    price: Number,
    productId: String,
    shopId: String,
    date: Date
});

let object = mongoose.model("Price", schema);

module.exports = object;