'use strict';

var User = require('../../../components/models/user.model');
var errorList = require('../../../components/errors/errors');

/**
 * Get a single user
 */
module.exports = function(req, res, next) {
  var userId = req.params.id;

  User.findById(userId, function(err, user) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(404).json({
        status: errorList.NOT_FOUND
      });
    }
    res.status(200).json({
      status: errorList.SUCCESS,
      user: user
    });
  });
};