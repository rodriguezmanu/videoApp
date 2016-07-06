'use strict';

var reCAPTCHA = require('recaptcha2')

var SITE_KEY  = '6LcxVxUTAAAAAImxveJW_PAVi3JI9INmq5M4bMRk',
    SECRET_KEY = '6LcxVxUTAAAAAGp92TRmQVJufy4OLU_OJv2Cp4Zk';

function validate(req, res) {
    var recaptcha = new reCAPTCHA({
      siteKey: SITE_KEY,
      secretKey: SECRET_KEY
    });

    recaptcha.validate(req.body.response)
      .then(function(){
          return res.status(200).send({
              success: true
          });
      })
      .catch(function(errorCodes){
        return res.status(403).send({
          success: false,
          message: recaptcha.translateErrors(errorCodes)
        });
      });
}

exports.validate = validate;
