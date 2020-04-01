const mongoose = require("mongoose");

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
    };

    return self;
})();

module.exports = { ...ContextModule }