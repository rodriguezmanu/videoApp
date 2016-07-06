'use strict';

var ForgotPassword = function() {
    this.Email = element(by.model('vm.email'));
    this.SubmitButton = element(by.binding('forgotPassword.submitButton'));
    this.ErrorMessage = element(by.binding('forgotPassword.error.fieldRequired'));
};

module.exports = new ForgotPassword();