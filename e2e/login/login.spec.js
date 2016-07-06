'use strict';

describe('Login Page', function() {
    var page;
    beforeEach(function() {
        browser.get('/login');
        page = require('./login.po.js');
    });

    it('should exist these elements', function() {
        expect(page.userEmail.isDisplayed()).toBe(true);
        expect(page.userPassword.isDisplayed()).toBe(true);
        expect(page.loginButton.isDisplayed()).toBe(true);
        expect(page.forgotPassword.isDisplayed()).toBe(true);
        expect(page.signUpButton.isDisplayed()).toBe(true);
    });

    it('send keys ...', function() {
        page.userEmail.sendKeys('admin@admin.com');
        page.userPassword.sendKeys('admin');
        page.loginButton.click();
        expect(browser.getCurrentUrl()).toMatch(/.\/{2}[a-zA-Z0-9:.-]+/);
    });
});