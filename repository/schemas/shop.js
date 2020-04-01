const mongoose = require("mongoose");

const ShopSchema = (function () {
    // Preperties

    const self = this;

    let shopsSchema;
    let shopObject;

    // Private functions

    const connectMongoose = () => {

    }

    // Public functions

    self.Init = function () {
        shopsSchema = new mongoose.Schema({
            title: {
                type: String,
                required: [true, "Please check your data entry, no title specified!"]
            }
        });

        shopObject = mongoose.model("Shop", shopsSchema);
    };

    return self;
})();

module.exports = { ...ShopSchema }