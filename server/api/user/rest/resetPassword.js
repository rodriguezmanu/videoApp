'use strict';

var User = require('../../../components/models/user.model');
var errorList = require('../../../components/errors/errors');
var async = require('async');

/**
 * Reset a users password
 */
module.exports = function(req, res, next) {
  async.waterfall([

    function(done) {
      User.findOne({
        resetPasswordToken: req.params.token,
        resetPasswordExpires: {
          $gt: Date.now()
        }
      }, function(err, user) {
        if (!user) {
          return res.status(404).json({
            status: errorList.NOT_PASSWORD_RESET_TOKEN
          });
        }

        if (req.body.password === undefined) {
          return res.status(400).json({
            status: errorList.BAD_REQUEST
          });
        }

        user.password = req.body.password;
        user.updatedTime = new Date();
        user.resetPasswordToken = null;
        user.resetPasswordExpires = null;

        user.save(function(err) {
          req.logIn(user, function(err) {
            res.status(200).json({
              status: errorList.SUCCESS,
              user: user
            });
          });
        });
      });
    }
  ], function(err) {
    if (err) {
      return res.status(500).json({
        status: errorList.INTERNAL_SERVER_ERROR,
        error: err
      });
    }
  });
};