'use strict';

var express = require('express');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/', auth.isAuthenticated(), require('./rest/index'));
router.get('/me', auth.isAuthenticated(), require('./rest/me'));
router.get('/:id', auth.isAuthenticated(), require('./rest/show'));
router.get('/reset/:token', require('./rest/tokenResetPassword'));
router.post('/reset/:token', require('./rest/resetPassword'));
router.post('/', require('./rest/create'));
router.post('/forgot', require('./rest/forgotPassword'));
router.put('/:id/password', auth.isAuthenticated(), require('./rest/changePassword'));
router.put('/:id', auth.isAuthenticated(), require('./rest/update'));

module.exports = router;