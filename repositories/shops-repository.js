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
            let shopsSet = Shop.GetSet();

            shopsSet.find({}, function (err, shops) {
                if (!err) {
                    resolve(shops)
                }
            });
        });
    };

    self.GetById = (id) => {
        return new Promise((resolve) => {
            let shopsSet = Shop.GetSet();

            shopsSet.findById({ _id: id }, function (err, shop) {
                if (!err) {
                    resolve(shop)
                }
            });
        });
    }

    self.Create = (data) => {
        return new Promise((resolve) => {
            let dbSet = Shop.GetSet();

            const newShop = new dbSet(data);

            newShop.save(function (err) {
                resolve(getResult(err))
            });
        });
    }

    self.Update = (id, data) => {
        return new Promise((resolve) => {
            let dbSet = Shop.GetSet();

            dbSet.findByIdAndUpdate({ _id: id }, data, { new: true }, function (err) {
                resolve(getResult(err))
            });
        });
    }

    self.Delete = (id) => {
        return new Promise((resolve) => {
            let dbSet = Shop.GetSet();

            dbSet.findOneAndRemove({ _id: id }, function (err) {
                resolve(getResult(err))
            });
        });
    }

    return self;
})();

module.exports = { ...ShopsRepository }