var express = require('express');
// var mkdirp = require('mkdirp');
// var fs = require('fs-extra');
var passport = require('passport');
var csrf = require('csurf');
var csrfProtection = csrf();

var router = express.Router();

var User = require('../models/User');

router.use(csrfProtection);

router.get('/users', function(req, res) {
    User.find({}, function(err, users) {
        if(err) {
            console.log(err);
        }

        res.render('admin/admin_users', {users, users});
    });
});

router.get('/add-user', function(req, res, next) {
    let messages = req.flash('error');
    res.render('admin/admin_signup', {csrfToken: req.csrfToken(), messages: messages});

});

router.post('/add-user', passport.authenticate('local.signup', {
    successRedirect: '/admin/users',
    failureRedirect: '/admin/add-user',
    failureFlash: true
}));

router.get('/signin', function(req, res, next) {
    let messages = req.flash('error');
    res.render('admin/admin_signin', {csrfToken: req.csrfToken(), messages: messages});

});

router.post('/signin', passport.authenticate('local.signin', {
    successRedirect: '/admin/users',
    failureRedirect: '/admin/signin',
    failureFlash: true
}));


module.exports = router;