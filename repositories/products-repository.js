const Product = require("../entities/product");

const ProductsRepository = (function () {
    // Preperties

    const self = this;

    // Private functions
    // Public functions

    self.GetAll = async () => {
        let dbProducts;
        let dbSet = Product.GetSet();

        await dbSet.find({}, function (err, products) {
            if (err) {
                console.log(err);
            } else {
                dbProducts = products
            }
        });

        return dbProducts;
    };

    self.GetById = async (id) => {
        let dbProduct;
        let dbSet = Product.GetSet();

        await dbSet.findById({ _id: id }, function (err, product) {
            if (err) {
                console.log(err);
            } else {
                dbProduct = product
            }
        });

        return dbProduct;
    }

    self.Create = async (data) => {
        let result;
        let dbSet = Product.GetSet();

        const newProduct = new dbSet(data);

        await newProduct.save(function (err) {
            if (err) {
                result = { status: false, message: err };
            } else {
                result = { status: true };
            }
        });

        return result;
    }

    self.Update = async (id, data) => {
        let result;
        let dbSet = Product.GetSet();

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
        let dbSet = Product.GetSet();

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

module.exports = { ...ProductsRepository }