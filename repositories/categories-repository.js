const Category = require("../entities/category");

const CategoriesRepository = (function () {
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

    self.GetById = (categoryId) => {
        return new Promise((resolve) => {
            let dbSet = Category.GetSet();

            dbSet.findById({ _id: categoryId }, function (err, category) {
                if (!err) {
                    resolve(category)
                }
            });
        })
    };

    self.GetAll = () => {
        return new Promise((resolve) => {
            let dbSet = Category.GetSet();

            dbSet.find({ parentId: { $exists: false } }, function (err, categories) {
                if (!err) {
                    resolve(categories);
                }
            });
        })
    };

    self.GetAllByParrentId = (parrentId) => {
        return new Promise((resolve) => {
            let dbSet = Category.GetSet();

            dbSet.find({ parentId: parrentId }, function (err, subcategories) {
                if (!err) {
                    resolve(subcategories);
                }
            });
        })
    };

    self.Update = () => {
        return new Promise((resolve) => {
            let dbSet = Category.GetSet();

            dbSet.findByIdAndUpdate({ _id: id }, data, { new: true }, function (err) {
                resolve(getResult(err));
            });
        })
    }

    self.Create = (data) => {
        return new Promise((resolve) => {
            let dbSet = Category.GetSet();

            const newCategory = new dbSet(data);

            newCategory.save(function (err) {
                resolve(getResult(err));
            });
        })
    }

    self.Delete = (id) => {
        return new Promise((resolve) => {
            let dbSet = Category.GetSet();

            dbSet.findOneAndRemove({ _id: id }, function (err) {
                resolve(getResult(err));
            })
        })
    }

    return self;
})();

module.exports = { ...CategoriesRepository }