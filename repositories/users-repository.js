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
            User.find({}, function (err, users) {
                if (!err) {
                    resolve(users);
                }
            });
        });
    };

    self.Register = (username, password) => {
        return new Promise((resolve) => {
            User.register({username}, password, function (err) {
                if(!err) {
                    resolve(getResult(err))
                }
              });
        });
    }

    self.GetNew =  (username, password) => {
        return new User({
            username: username,
            password: password
        });
    }

    self.Delete = (id) => {
        return new Promise((resolve) => {
           User.findByIdAndRemove({ _id: id }, function (err) {
                resolve(getResult(err));
            });
        });
    }

    
    return self;
})();

module.exports = { ...UsersRepository }