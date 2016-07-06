'use strict';

var User = require('../../../components/models/user.model');
var errorList = require('../../../components/errors/errors');
var jwt = require('jsonwebtoken');
var config = require('../../../config/environment');

/**
 * Creates a new user
 */
module.exports = function(req, res, next) {
  var newUser = new User(req.body);

  newUser.save(function(err, user) {
    if (err) {
      return res.status(422).json({
        status: errorList.UNPROCESSABLE_ENTITY,
        error: err
      });
    }
    var token = jwt.sign({
      _id: user._id
    }, config.secrets.session, {
      expiresIn: config.expirationTime
    });

    res.status(200).json({
      status: errorList.SUCCESS,
      token: token,
      user: user
    });
  });
};