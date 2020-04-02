const mongoose = require("mongoose");
const shopsSchema = require("./entities/shop");
const productsSchema = require("./entities/product");
const categoriesSchema = require("./entities/category");
const pricesSchema = require("./entities/price");
const usersSchema = require("./entities/user");

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

        shopsSchema.Init();
        productsSchema.Init();
        categoriesSchema.Init();
        pricesSchema.Init();
        usersSchema.Init();
    };

    return self;
})();

module.exports = { ...ContextModule }