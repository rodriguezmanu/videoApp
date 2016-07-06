/*jshint camelcase: false */
'use strict';

var nodemailer = require('nodemailer');
var mg = require('nodemailer-mailgun-transport');
var errorList = require('../../components/errors/errors');
var EmailTemplate = require('email-templates').EmailTemplate;
var path = require('path')
var templatesDir = path.resolve(__dirname, '..', '../components/emailTemplates')
var opts = require('../../components/emailTemplates/common/emailOptions');

var auth = {
  auth: {
    api_key: process.env.MAILGUN_API_KEY || 'key-5f684939d51bbcd45ba32065b7ab8981',
    domain: process.env.MAILGUN_DOMAIN || 'appc25a01cd500641ae8414e615182ba4b3.mailgun.org'
  }
}
var transporter = nodemailer.createTransport(mg(auth));

/*
 * email server endpoint
 */
exports.default = function(req, res) {
  var data = req.body;

  //Get email template path
  var template = new EmailTemplate(path.join(templatesDir, data.template))

  // Send a single email
  template.render(data, function(err, results) {
    if (err) {
      return res.status(500).json({
        status: errorList.NON_EMAIL_TEMPLATE,
        error: err
      });
    }

    // setting subject and receiver
    var options = {
      subject: opts[data.template][data.language]
    };
    if (opts[data.template].email) {
      options.receiver = opts[data.template].email;
    } else {
      options.receiver = data.data.email;
    }

    transporter.sendMail({
      from: 'Townflix <noreply@townflix.com>',
      to: options.receiver,
      subject: options.subject + ' #' + new Date().getTime(),
      html: results.html
    }, function(err, info) {
      if (err) {
        return res.status(500).json({
          status: errorList.INTERNAL_SERVER_ERROR,
          error: err
        });
      }
      transporter.close();
      res.status(200).json({
        status: errorList.SUCCESS
      });
    });
  });
};