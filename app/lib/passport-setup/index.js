const passport = require('passport');
const bcrypt = require('bcrypt');
const LocalStrategy = require('passport-local').Strategy;
const passportSocketIo = require('passport.socketio');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const flash = require('connect-flash');

//database
const mysqlSessionStore = require('express-mysql-session')(session);

//local config module
const config = require('config');

//local user handler:
const Account = require('Data/Account');
const Connections = require('Data/Connections');

function getSessionStore() {

    var options = {
        host: config.database.mysql.hostname,
        port: config.database.mysql.port,
        user: config.database.mysql.username,
        password: config.database.mysql.password,
        database: config.database.mysql.database
    };
    
    return new mysqlSessionStore(options);
}

function requireAuthentication(options) {
    return require('connect-ensure-login').ensureLoggedIn(options);
}

function initializePassport(options) {

    /*************************************************
     * Authenticated Endpoints                       *
     *************************************************/

    passport.serializeUser(function (user, callback) {
        callback(null, user.id);
    });

    passport.deserializeUser(function (id, callback) {
        Account.findAccountById(id)
            .then(account => {
                callback(null, account);
            });
    });

    passport.use('kongregate-authenticate', new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true
        },
        function(req, username, password, callback) {
            let user_id = req.query.userid;
            Connections.findAccountByPlatformId("Kongregate", user_id)
                .then(account => {
                    if(account) {
                        callback(null, account);
                    }
                    else {
                        Connections.createPlatformId("Kongregate", user_id)
                            .then(account => {
                                callback(null, account);
                            });
                    }
                });
        })
    );
    
    passport.use('login',new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true
        },
        function (req, username, password, callback) {
            Account.authenticate(username, password)
                .then(account => {
                    if(!account) {
                        callback(null, null, {message: 'Invalid username/password combination.'});
                    }
                    else {
                        callback(null, account);
                    }
                })
                .catch(error => {
                    callback(error, null, {message: 'There was a problem with your request. Please try again or contact Support.'});
                });
        })
    );
    
    let sessionStore = getSessionStore();

    options.app.use(require('body-parser').urlencoded({ extended: true }));

    options.app.use(session({
        secret: config.passport.session_secret,
        resave: false,
        saveUninitialized: false,
        store: sessionStore
    }));

    options.app.use(passport.initialize());
    options.app.use(passport.session());
    options.app.use(flash());

    options.io.use(passportSocketIo.authorize({
        key: 'connect.sid',
        secret: config.passport.session_secret,
        passport: passport,
        cookieParser: cookieParser,
        store: sessionStore
    }));

    passport.requireAuthenticationMiddleware = requireAuthentication;
}

module.exports = initializePassport;