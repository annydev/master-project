const mongoose = require("mongoose");

let schema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Please check your data entry, no title specified!"]
    },
    parentId: String,
    image: String
});

let object = mongoose.model("Category", schema);

module.exports = object;