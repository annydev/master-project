const mongoose = require("mongoose");
const shopSchema = require("../entities/shop");

const ContextModule = (function () {
    // Preperties

    const self = this;

    // Private functions

    const connectMongoose = () => {
        mongoose.connect("mongodb://localhost:27017/pricesDB", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        });

        mongoose.set("useCreateIndex", true);
    }

    // Public functions

    self.Init = function () {
        connectMongoose();

        shopSchema.Init();
    };

    return self;
})();

module.exports = { ...ContextModule }