const Shop = require("../entities/shop");

const ShopsRepository = (function () {
    // Preperties

    const self = this;

    // Private functions
    // Public functions

    self.GetAll = async () => {
        let dbShops;
        let shopsSet = Shop.GetSet();

        await shopsSet.find({}, function (err, shops) {
            if (!err) {
                dbShops = shops;
            }
        });

        return dbShops;
    };

    self.GetById = async (id) => {
        let dbShop;
        let shopsSet = Shop.GetSet();

        await shopsSet.findById({ _id: id }, function (err, shop) {
            if (err) {
                console.log(err);
            } else {
                dbShop = shop;
            }
        });

        return dbShop;
    }

    self.Create = async (data) => {
        let result;
        let dbSet = Shop.GetSet();

        const newShop = new dbSet(data);

        await newShop.save(function (err) {
            if (err) {
                result = { status: false, message: err };
            } else {
                result = { status: true };
            }
        });

        return result;
    }

    self.Update = async () => {
        let result;
        let dbSet = Shop.GetSet();

        dbSet.findByIdAndUpdate({ _id: id }, data, { new: true }, function (err) {
            if (err) {
                result = { status: false, message: err };
            } else {
                result = { status: true };
            }
        });

        return result;
    }

    self.Delete = async (id) => {
        let result;
        let dbSet = Shop.GetSet();

        dbSet.findOneAndRemove({ _id: id }, function (err) {
            if (err) {
                result = { status: false, message: err };
            } else {
                result = { status: true };
            };
        });

        return result;
    }

    return self;
})();

module.exports = { ...ShopsRepository }