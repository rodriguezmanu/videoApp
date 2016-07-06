'use strict';

var User = require('../../../components/models/user.model');
var errorList = require('../../../components/errors/errors');

/**
 * Check reset token password and return user
 */
module.exports = function(req, res, next) {
  User.findOne({
    resetPasswordToken: req.params.token,
    resetPasswordExpires: {
      $gt: Date.now()
    }
  }, function(err, user) {
    if (err) {
      return res.status(500).json({
        status: errorList.INTERNAL_SERVER_ERROR,
        error: err
      });
    }

    if (!user) {
      return res.status(404).json({
        status: errorList.NOT_PASSWORD_RESET_TOKEN
      });
    }

    res.status(200).json({
      status: errorList.SUCCESS,
      user: user
    });
  });
};