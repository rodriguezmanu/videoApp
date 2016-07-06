'use strict';

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var errorList = require('../../components/errors/errors.js');

exports.setup = function(User, config) {
  passport.use(new LocalStrategy({
      usernameField: 'email',
      passwordField: 'password' // this is the virtual field on the model
    },
    function(email, password, done) {
      User.findOne({
        email: email.toLowerCase()
      }, function(err, user) {
        if (err) {
          return done(err);
        }
        if (!user) {
          return done(null, false, {
            status: errorList.WRONG_EMAIL
          });
        }
        if (!user.authenticate(password)) {
          return done(null, false, {
            status: errorList.WRONG_PASSWORD
          });
        }
        return done(null, user);
      });
    }
  ));
};