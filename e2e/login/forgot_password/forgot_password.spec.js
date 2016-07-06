'use strict';

describe('Forgot Password', function() {
    var page;
    beforeEach(function() {
        browser.get('/forgot-password');
        page = require('./forgot_password.po.js');
    });

    it('should exist these elements..', function() {
        expect(page.Email.isDisplayed()).toBe(true);
        expect(page.SubmitButton.isDisplayed()).toBe(true);
    });

    it('get the hint message', function() {
        page.SubmitButton.click();
        expect(page.ErrorMessage.isDisplayed()).toBe(true);
    });
});