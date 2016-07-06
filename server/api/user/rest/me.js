'use strict';

var User = require('../../../components/models/user.model');
var errorList = require('../../../components/errors/errors');

/**
 * Get my info
 */
module.exports = function(req, res, next) {
  var userId = req.user._id;
  User.findOne({
    _id: userId
  }, '-salt -hashedPassword', function(err, user) { // don't ever give out the password or salt
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json({
        status: errorList.UNAUTHORIZED
      });
    }
    res.status(200).json({
      status: errorList.SUCCESS,
      user: user
    });
  });
};