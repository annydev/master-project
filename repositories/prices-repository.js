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
             Price.findOne({$and: [{ productId: id }, {isApproved: true}]}, null, { sort: { date: 'desc' } }, function (err, foundPrice) {
                if (!err) {
                    resolve(foundPrice)
                }
            });
        });     
    };

    self.GetLastPriceByDate = (shopId, productId) => {
        return new Promise ((resolve) => {
            let currentDate = new Date();

             Price.findOne({$and: [{ shopId: shopId }, {productId: productId}, {isApproved: true}]}, null, { sort: { date: 'desc' } }, function (err, foundPrice) {
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

    self.CreateStatusFalse = (data) => {
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

    self.Update = (id) => {
        return new Promise ((resolve) => {
            Price.findByIdAndUpdate({ _id: id }, {isApproved: true, date: new Date()}, { new: true }, function (err) {
               resolve(getResult(err))
            });
        });
    }

    return self;
})();

module.exports = { ...PricesRepository }