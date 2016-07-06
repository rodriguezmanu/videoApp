'use strict';

var User = require('../../../components/models/user.model');
var errorList = require('../../../components/errors/errors');
var async = require('async');
var crypto = require('crypto');
var sendEmail = require('../../../components/utils/sendEmail');

/**
 * Forgot Password
 */
module.exports = function(req, res, next) {
  async.waterfall([
    function(done) {
      crypto.randomBytes(20, function(err, buf) {
        var token = buf.toString('hex');
        done(err, token);
      });
    },
    function(token, done) {
      User.findOne({
        email: req.body.email
      }, function(err, user) {
        if (!user) {
          return res.status(2).json({
            status: errorList.WRONG_EMAIL
          });
        }
        user.resetPasswordToken = token;
        user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
        user.updatedTime = new Date();
        user.save(function(err) {
          var body = {
            data: {
              name: user.contact.firstName + ' ' + user.contact.lastName,
              email: user.email,
              link: req.protocol + '://' + req.get('host') + '/reset/' + token
            },
            language: req.body.language,
            template: '0003'
          };
          sendEmail(req, res, body, function(err) {
            if (err) {
              console.log(err);
            }
          });

          res.status(200).json({
            status: errorList.SUCCESS,
            user: user
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