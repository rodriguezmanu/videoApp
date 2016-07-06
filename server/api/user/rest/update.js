'use strict';

var User = require('../../../components/models/user.model');
var errorList = require('../../../components/errors/errors');
var _ = require('lodash');

/**
 * Update user
 */
module.exports = function(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  User.findById(req.params.id, function(err, user) {
    if (err) {
      return res.status(500).json({
        status: errorList.INTERNAL_SERVER_ERROR,
        error: err
      });
    }
    if (!user) {
      return res.status(404).json({
        status: errorList.NOT_FOUND
      });
    }
    var updated = _.merge(user, req.body);
    updated.updatedTime = new Date();
    updated.save(function(err) {
      if (err) {
        return res.status(500).json({
          status: errorList.INTERNAL_SERVER_ERROR,
          error: err
        });
      }
      return res.status(200).json({
        status: errorList.SUCCESS,
        user: user
      });
    });
  });
};