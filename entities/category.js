const mongoose = require("mongoose");

const CategorySchema = (function () {
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
            },
            parentId: String
          });
    }

    const defineObject = () => {
        object = mongoose.model("Category", schema);
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

module.exports = { ...CategorySchema }