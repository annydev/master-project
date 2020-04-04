const User = require("../entities/user");

const UsersRepository = (function () {
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
            let dbSet = User.GetSet();

            dbSet.find({}, function (err, users) {
                if (!err) {
                    resolve(users);
                }
            });
        });
    };

    self.Register = (username, password) => {
        return new Promise((resolve) => {
            let dbSet = User.GetSet();

            dbSet.register({username}, password, function (err) {
                if(!err) {
                    resolve(getResult(err))
                }
              });
        });
    }

    self.GetNew =  (username, password) => {
        let dbSet = User.GetSet();

        return new dbSet({
            username: username,
            password: password
        });
    }

    self.Delete = (id) => {
        return new Promise((resolve) => {
            let dbSet = User.GetSet();

            dbSet.findByIdAndRemove({ _id: id }, function (err) {
                resolve(getResult(err));
            });
        });
    }

    
    return self;
})();

module.exports = { ...UsersRepository }