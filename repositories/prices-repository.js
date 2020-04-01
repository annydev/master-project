const Price = require("../entities/price");

const PricesRepository = (function () {
    // Preperties

    const self = this;

    // Private functions
    // Public functions

    self.GetLastByProductId = async (id) => {
        let dbPrice;
        let dbSet = Price.GetSet();

        await dbSet.findOne({ productId: id }, null, { sort: { date: 'desc' } }, function (err, foundPrice) {
            if (err) {
                console.log(err);
            } else {
                dbPrice = foundPrice
            }
        });

        return dbPrice;
    };

    self.GetAllByProductId = async (id) => {
        let dbPrices;
        let dbSet = Price.GetSet();

        await dbSet.find({ productId: id }, function (err, prices) {
            if (err) {
                console.log(err);
            } else {
                dbPrices = prices
            }
        });

        return dbPrices;
    }

    self.Create = async (data) => {
        let result;
        let dbSet = Price.GetSet();

        const newPrice = new dbSet(data);

        await newPrice.save(function (err) {
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
        let dbSet = Price.GetSet();

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

module.exports = { ...PricesRepository }