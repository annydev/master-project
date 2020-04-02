const Product = require("../entities/product");

const ProductsRepository = (function () {
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
        return new Promise ((resolve) => {
            let dbSet = Product.GetSet();

             dbSet.find({}, function (err, products) {
                if (!err) {
                    resolve(products)
                } 
            });
        });    
    };

    self.GetById = (id) => {
        return new Promise ((resolve) => {
            let dbSet = Product.GetSet();

             dbSet.findById({ _id: id }, function (err, product) {
                if (!err) {
                   resolve(product)
                } 
            });
        });   
    }

    self.Create = (data) => {
        return new Promise ((resolve) => {
            let dbSet = Product.GetSet();
            const newProduct = new dbSet(data);

            newProduct.save(function (err) {
               resolve(getResult(err))
            });
        });
    }

    self.Update = (id, data) => {
        return new Promise ((resolve) => {
            let dbSet = Product.GetSet();

            dbSet.findByIdAndUpdate({ _id: id }, data, { new: true }, function (err) {
               resolve(getResult(err))
            });
        });
    }

    self.Delete = (id) => {
        return new Promise ((resolve) => {
            let dbSet = Product.GetSet();

            dbSet.findOneAndRemove({ _id: id }, function (err) {
               resolve(getResult(err))
            });
        });
    }

    return self;
})();

module.exports = { ...ProductsRepository }