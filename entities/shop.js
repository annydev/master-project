const mongoose = require("mongoose");

const ShopSchema = (function () {
    // Preperties

    const self = this;

    let shopsSchema;
    let shopObject;

    // Private functions

    const defineSchema = () => {
        shopsSchema = new mongoose.Schema({
            title: {
                type: String,
                required: [true, "Please check your data entry, no title specified!"]
            }
        });
    }

    const defineObject = () => {
        shopObject = mongoose.model("Shop", shopsSchema);

    }

    // Public functions

    self.Init = () => {
        defineSchema();
        defineObject();
    };

    self.Entity = () => {
        return shopObject;
    }

    return self;
})();

module.exports = { ...ShopSchema }