'use strict';

var User = require('../../../components/models/user.model');
var errorList = require('../../../components/errors/errors');

/**
 * Get list of users
 */
module.exports = function(req, res) {
  User.find({}, '-salt -hashedPassword', function(err, users) {
    if (err) {
      return res.status(500).json({
        status: errorList.INTERNAL_SERVER_ERROR,
        error: err
      });
    }
    res.status(200).json({
      status: errorList.SUCCESS,
      users: users.filter(search(req.query))
    });
  });
};

function search(query) {
  return function(element) {
    for (var i in query) {
      if (query[i] !== element[i]) {
        return false;
      }
    }
    return true;
  }
}