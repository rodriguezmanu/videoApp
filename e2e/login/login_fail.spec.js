'use strict';
var specHelper = require('../specHelper');

describe('Login fail', function() {
    var page;
    beforeEach(function() {
        browser.get('/login');
        page = require('./login.po.js');
    });

    it('should get error messages..', function() {
        specHelper.setResolution(1920, 1080);
        page.loginButton.click();
        expect(page.emailEmpty.isDisplayed()).toBe(true);
        expect(page.passwordEmpty.isDisplayed()).toBe(true);
    });
    
    //Tablet
    it('should get error messages..', function() {
        specHelper.setResolution(768, 600);
        page.loginButton.click();
        expect(page.emailEmpty.isDisplayed()).toBe(true);
        expect(page.passwordEmpty.isDisplayed()).toBe(true);
    });
    
    //Mobile
    it('should get error messages..', function() {
        specHelper.setResolution(480, 600);
        page.loginButton.click();
        expect(page.emailEmpty.isDisplayed()).toBe(true);
        expect(page.passwordEmpty.isDisplayed()).toBe(true);
    });
});