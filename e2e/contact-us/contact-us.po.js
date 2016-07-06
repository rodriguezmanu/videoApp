'use strict';

var ContactUs = function() {
    this.Breadcrumbs = element(by.css('ng-breadcrumbs'));

    this.Name = element(by.css('input[name=name]'));
    this.Email = element(by.css('input[name=email]'));
    this.Message = element(by.model('vm.contact.message'));

    this.SubmitButton = element(by.css('button[type=submit]'));

    this.EmailEmpty = element(by.binding('contactUs.error.emailEmpty'));
    this.ValidEmail = element(by.binding('contactUs.error.emailValid'));
    this.NameEmpty = element(by.binding('contactUs.error.nameEmpty'));
    this.MessageEmpty = element(by.binding('contactUs.error.messageEmpty'));
};

module.exports = new ContactUs();