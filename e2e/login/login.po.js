'use strict';

var LoginPage = function() {
    this.userEmail = element(by.model('vm.user.email'));
    this.userPassword = element(by.model('vm.user.password'));

    this.loginButton = element(by.css('button[type=submit]'));
    this.forgotPassword = element(by.binding('login.forgotPasswordLink'));
    this.signUpButton = element(by.binding('login.signUp'));

    this.emailEmpty = element(by.binding('login.error.emailEmpty'));
    this.passwordEmpty = element(by.binding('login.error.passwordEmpty'));
};

module.exports = new LoginPage();
