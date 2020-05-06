const Shop = require("../entities/shop");

const ShopsRepository = (function () {
    // Preperties

    const self = this;

    // Private functions

    const getResult = (err) => {
        if (err) {
            return { status: false, message: err };
        } else {
            return { status: true };
        }
    }

    // Public functions

    self.GetAll = () => {
        return new Promise((resolve) => {
            Shop.find({}, function (err, shops) {
                if (!err) {
                    resolve(shops)
                }
            });
        });
    };

    self.GetById = (id) => {
        return new Promise((resolve) => {
            Shop.findById({ _id: id }, function (err, shop) {
                if (!err) {
                    resolve(shop)
                }
            });
        });
    }

    self.Create = (data) => {
        return new Promise((resolve) => {
            const newShop = new Shop(data);

            newShop.save(function (err) {
                resolve(getResult(err))
            });
        });
    }

    self.Update = (id, data) => {
        return new Promise((resolve) => {
            Shop.findByIdAndUpdate({ _id: id }, data, { new: true }, function (err) {
                resolve(getResult(err))
            });
        });
    }

    self.Delete = (id) => {
        return new Promise((resolve) => {
            Shop.findOneAndRemove({ _id: id }, function (err) {
                resolve(getResult(err))
            });
        });
    }

    self.findShop = (shopTitle) => {
        return new Promise((resolve) => {
            Shop.findOne({ title: shopTitle }, function (err, foundTitle) {
                if(err) {
                    resolve(getResult(err))
                } else {
                    resolve(foundTitle)
                }
            });
        });
    }

    return self;
})();

module.exports = { ...ShopsRepository }