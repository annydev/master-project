const mongoose = require("mongoose");

let schema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Please check your data entry, no title specified!"]
    }
});

let object = mongoose.model("Shop", schema);

module.exports = object;