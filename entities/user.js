const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const UserSchema = (function () {
    // Preperties

    const self = this;

    let schema;
    let object;

    // Private functions

    const defineSchema = () => {
        schema = new mongoose.Schema({
            username: String,
            password: String
        });
    }

    const addPasport = () => {
        schema.plugin(passportLocalMongoose);
    }

    const defineObject = () => {
        object = mongoose.model("User", schema);
    }

    // Public functions

    self.Init = () => {
        defineSchema();
        addPasport();
        defineObject();
    };

    self.GetSet = () => {
        return object;
    }

    return self;
})();

module.exports = { ...UserSchema }