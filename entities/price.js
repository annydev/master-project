const mongoose = require("mongoose");

const PriceSchema = (function () {
    // Preperties

    const self = this;

    let schema;
    let object;

    // Private functions

    const defineSchema = () => {
        schema = new mongoose.Schema({
            price: Number,
            productId: String,
            shopId: String,
            date: Date
          });
    }

    const defineObject = () => {
        object = mongoose.model("Price", schema);
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

module.exports = { ...PriceSchema }