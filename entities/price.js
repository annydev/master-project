const mongoose = require("mongoose");

let schema = new mongoose.Schema({
    price: Number,
    productId: String,
    shopId: String,
    date: Date,
    image: String,
    isApproved: Boolean,
    expiredDate: Date
});

let object = mongoose.model("Price", schema);

module.exports = object;