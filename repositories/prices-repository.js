const Price = require("../entities/price");

const PricesRepository = (function () {
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

    self.GetLastByProductId = (id) => {
        return new Promise ((resolve) => {
             Price.findOne({ productId: id }, null, { sort: { date: 'desc' } }, function (err, foundPrice) {
                if (!err) {
                    resolve(foundPrice)
                }
            });
        });     
    };

    self.GetAllByProductId = (id) => {
        return new Promise ((resolve) => {
            Price.find({ productId: id }, function (err, prices) {
                if (!err) {
                    resolve(prices)
                } 
            });
        });
    }

    self.Create = (data) => {
        return new Promise((resolve) => {
            const newPrice = new Price(data);

            newPrice.save(function (err) {
                resolve(getResult(err));
            });
        })
    }

    self.Delete = (id) => {
        return new Promise ((resolve) => {
            Price.findOneAndRemove({ _id: id }, function (err) {
                resolve(getResult(err));
            });
        });
    }

    return self;
})();

module.exports = { ...PricesRepository }