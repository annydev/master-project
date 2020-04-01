const mongoose = require("mongoose");

const ProductSchema = (function () {
    // Preperties

    const self = this;

    let schema;
    let object;

    // Private functions

    const defineSchema = () => {
        schema = new mongoose.Schema({
            title: String,
            categoryId: String,
            imageURL: String
        });
    }

    const defineObject = () => {
        object = mongoose.model("Product", schema);
    }

    // Public functions

    self.Init = () => {
        defineSchema();
        defineObject();
    };

    self.GetSet = () => {
        return object;
    }

    return self;
})();

module.exports = { ...ProductSchema }