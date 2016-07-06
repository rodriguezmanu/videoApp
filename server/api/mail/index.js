'use strict';

var express = require('express');
var controller = require('./mail.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.post('/sender', controller.default);

module.exports = router;