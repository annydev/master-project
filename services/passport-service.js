const passport = require("passport");
const session = require("express-session");

const User = require("../entities/user");

const PassportService = (function () {
    // Preperties

    const self = this;

    let serverApp;

    // Private functions

    const initializePassport = () => {
        serverApp.use(passport.initialize());
        serverApp.use(passport.session());
    }

    const prepareUser = () => {
        let dbSet = User.GetSet();

        passport.use(dbSet.createStrategy());
        passport.serializeUser(dbSet.serializeUser());
        passport.deserializeUser(dbSet.deserializeUser());
    }

    const initializeSession = () => {
        serverApp.use(session({
            secret: "our secret.",
            resave: false,
            saveUninitialized: false
        }));
    }

    // Public functions

    self.Init = (app) => {
        serverApp = app;

        initializeSession()
        initializePassport()
        prepareUser();
    };

    return self;
})();

module.exports = { ...PassportService }