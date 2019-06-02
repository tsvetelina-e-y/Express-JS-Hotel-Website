var passport = require('passport');
var User = require('../models/User');
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require('bcryptjs');


passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        done(err, user);
    });
});

passport.use('local.signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, function (req, email, password, done) {
    req.checkBody('email', 'Invalid Email').notEmpty().isEmail();
    req.checkBody('password', 'Invalid Password').notEmpty().isLength({ min: 4 });
    var errors = req.validationErrors();
    if (errors) {
        var messages = [];
        errors.forEach(function (error) {
            messages.push(error.msg);
        });
        return done(null, false, req.flash('error', messages));

    }

    User.findOne({ 'email': email }, function (err, user) {
        console.log('here');
        if (err) {
            return done(err);
        }

        if (user) {

            return done(null, false, { message: 'Email is aladeady in use' });
        }

        bcrypt.genSalt(10, function (err, salt) {
            bcrypt.hash(password, salt, function (err, hash) {
                if (err)
                    console.log(err);

                var newUser = new User();
                newUser.email = email;
                newUser.password = hash;

                newUser.save(function (err) {
                    if (err) {
                        return done(err);
                    }
                    return done(null, newUser);
                });
            });
        });
    });
}));


passport.use('local.signin', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, function (req, email, password, done) {
    req.checkBody('email', 'Invalid Email').notEmpty().isEmail();
    req.checkBody('password', 'Invalid password').notEmpty();
    var errors = req.validationErrors();
    if (errors) {
        var messages = [];
        errors.forEach(function (error) {
            messages.push(error.msg);
        });
        return done(null, false, req.flash('error', messages));

    }

    User.findOne({ 'email': email }, function (err, user) {
        console.log('here');
        if (err) {
            return done(err);
        }

        if (!user) {

            return done(null, false, { message: 'No user found!' });
        }

        bcrypt.compare(password, user.password, function (err, isMatch) {
            if (err) console.log(err);

            if (isMatch) {
                return done(null, user);
            } else {
                return done(null, false, { message: 'Wrong password!' });
            }
        });
        
    });

}));

