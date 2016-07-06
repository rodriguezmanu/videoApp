'use strict';

var request = require('request');
var errorList = require('../errors/errors');

module.exports = function(req, res, body, callback) {
  request({
    url: req.protocol + '://' + req.get('host') + '/api/mail/sender',
    method: 'POST',
    json: true,
    body: body
  }, function(error, response, body) {
    if (error || response.statusCode !== 200) {
      return callback(errorList.EMAIL_NOT_SENT);
    }
    callback(null);
  });
};