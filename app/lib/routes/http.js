let express = require('express');
let passport = require('passport');
let csrf = require('csurf');

module.exports = function(app) {
    let csrfProtection = csrf();


    //add kongregate header: 
    app.use(function(req, res, next) {
        res.header('X-Frame-Options' , 'allow-from https://www.kongregate.com/' );
        next();
    });


    /*************************************************
     * Kongregate Endpoints                          *
     *************************************************/

    app.get('/kongregate',
        function(req, res) {
            res.render('kongregate/shell', { user: req.user });
    });

    app.get('/kongregate/guest',
        function(req, res) {
            res.render('kongregate/guest', { user: req.user });
    });

    app.get('/kongregate/callback',
        function(req, res) {
            res.render('home', { user: req.user });
    });

    app.get('/kongregate/authenticate',
        passport.authenticate('kongregate-authenticate', { 
            successRedirect: '/game',
            failureRedirect: '/kongregate/error',
            failureFlash : true
        })
    );

    /*************************************************
     * Non-Authenticated Endpoints                   *
     *************************************************/

    app.get('/',
        function(req, res) {
            res.render('home', { user: req.user });
    });

    /*************************************************
     * Authentication Endpoints                      *
     *************************************************/

    app.get('/login',
        csrfProtection,
        function(req, res){
            res.render('auth/login', { csrfToken: req.csrfToken(), message: req.flash('error') });
    });

    app.post('/login', 
        csrfProtection,
        passport.authenticate('login', { 
            successRedirect: '/game',
            failureRedirect: '/login',
            failureFlash : true
        })
    );

    app.get('/register',
        csrfProtection,
        function(req, res){
            res.render('auth/register', { csrfToken: req.csrfToken(), message: req.flash('error') });
    });

    app.post('/register', 
        csrfProtection,
        passport.authenticate('register', { 
            successRedirect: '/game',
            failureRedirect: '/register',
            failureFlash : true
        })
    );

    app.get('/logout',
        function(req, res){
            req.logout();
            res.redirect('/');
    });
    
    /*************************************************
     * Authenticated Endpoints                       *
     *************************************************/

    //any endpoints defined under this line will require authentication on them.
    app.use(passport.requireAuthenticationMiddleware({ redirectTo: '/login'}));

    app.get('/game',
    function(req, res){
        res.render('game', { user: req.user });
    })
}