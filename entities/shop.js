const mongoose = require("mongoose");

const ShopSchema = (function () {
    // Preperties

    const self = this;

    let schema;
    let object;

    // Private functions

    const defineSchema = () => {
        schema = new mongoose.Schema({
            title: {
                type: String,
                required: [true, "Please check your data entry, no title specified!"]
            }
        });
    }

    const defineObject = () => {
        object = mongoose.model("Shop", schema);
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

module.exports = { ...ShopSchema }