'use strict';

var SettingsPage = function() {
    this.FirstName = element(by.css('input[name=firstName]'));
    this.LastName = element(by.css('input[name=lastName]'));
    this.Email = element(by.css('input[name=email]'));
    this.PhoneNumber = element(by.css('input[name=phoneNumber]'));
    this.Address = element(by.css('input[name=address]'));
    this.SubmitButton = element(by.css('button[type=submit]'));

    this.ChangePasswordLink = element(by.binding('header.links.changePassword'));

    //Elements used for login, to access the settings page
    this.userEmail = element(by.css('form [name=email]'));
    this.userPassword = element(by.css('form [name=password]'));
    this.loginButton = element(by.css('button[type=submit]'));
};

module.exports = new SettingsPage();