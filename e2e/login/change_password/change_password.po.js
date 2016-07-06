'use strict';

var ChangePassword = function() {
    this.oldPassword = element(by.css('input[name=password]'));
    this.newPassword = element(by.css('input[name=newPassword]'));
    this.oldPasswordModel = element(by.model('vm.user.oldPassword'));
    this.newPasswordModel = element(by.model('vm.user.newPassword'));

    this.changeButton = element(by.css('button[type=submit]'));
    this.errorMessage = element(by.css('.has-error .help-block'));
};

module.exports = new ChangePassword();
