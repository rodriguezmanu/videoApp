'use strict';

var User = require('../../../components/models/user.model');
var errorList = require('../../../components/errors/errors');

/**
 * Change a users password
 */

module.exports = function(req, res, next) {
  var userId = req.user._id;
  var oldPass = String(req.body.oldPassword);
  var newPass = String(req.body.newPassword);

  User.findById(userId, function(err, user) {
    if (user.authenticate(oldPass)) {
      user.password = newPass;
      user.updatedTime = new Date();
      user.save(function(err) {
        if (err) {
          return res.status(422).json({
            status: errorList.UNPROCESSABLE_ENTITY,
            error: err
          });
        }
        res.status(200).json({
          status: errorList.SUCCESS,
          user: user
        });
      });
    } else {
      res.status(403).json({
        status: errorList.FORBIDDEN
      });
    }
  });
};