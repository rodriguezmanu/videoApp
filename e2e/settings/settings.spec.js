'use strict';
var specHelper = require('../specHelper');

describe('Settings Page', function() {
    var page;
    beforeEach(function() {
        browser.get('/login');
        page = require('./settings.po.js');
    });

    //PC
    it('should login, go to settings page, check the presence of the following elements and access change password page..', function() {
        specHelper.setResolution(1920, 1080);
        //login
        browser.get('/login');
        page.userEmail.sendKeys('ian.hodges.townflix+development@gmail.com');
        page.userPassword.sendKeys('townflix');
        page.loginButton.click();
        expect(browser.getCurrentUrl()).toMatch(/.\/{2}[a-zA-Z0-9:.-]+/);

        //go to settings page and check the following elements
        browser.get('/settings');
        browser.driver.sleep(2000);
        expect(page.FirstName.isDisplayed()).toBe(true);
        expect(page.LastName.isDisplayed()).toBe(true);
        expect(page.Email.isDisplayed()).toBe(true);
        expect(page.PhoneNumber.isDisplayed()).toBe(true);
        expect(page.Address.isDisplayed()).toBe(true);
        expect(page.SubmitButton.isDisplayed()).toBe(true);
        expect(page.ChangePasswordLink.isDisplayed()).toBe(true);
        //access change password page
        page.ChangePasswordLink.click();
        expect(browser.getCurrentUrl()).toMatch(/.\/{2}[a-zA-Z0-9:.-]+\/change-password/);
    });

    // Tablet
    it('go to settings page, check the presence of the following elements and access change password page..', function() {
        specHelper.setResolution(768, 600);
        //go to settings page and check the following elements
        browser.get('/settings');
        expect(page.FirstName.isDisplayed()).toBe(true);
        expect(page.LastName.isDisplayed()).toBe(true);
        expect(page.Email.isDisplayed()).toBe(true);
        expect(page.PhoneNumber.isDisplayed()).toBe(true);
        expect(page.Address.isDisplayed()).toBe(true);
        expect(page.SubmitButton.isDisplayed()).toBe(true);
        expect(page.ChangePasswordLink.isDisplayed()).toBe(true);
        //access change password page
        page.ChangePasswordLink.click();
        expect(browser.getCurrentUrl()).toMatch(/.\/{2}[a-zA-Z0-9:.-]+\/change-password/);
    });

    // Mobile
    it('go to settings page, check the presence of the following elements and access change password page..', function() {
        specHelper.setResolution(480, 600);
        //go to settings page and check the following elements
        browser.get('/settings');
        expect(page.FirstName.isDisplayed()).toBe(true);
        expect(page.LastName.isDisplayed()).toBe(true);
        expect(page.Email.isDisplayed()).toBe(true);
        expect(page.PhoneNumber.isDisplayed()).toBe(true);
        expect(page.Address.isDisplayed()).toBe(true);
        expect(page.SubmitButton.isDisplayed()).toBe(true);
        expect(page.ChangePasswordLink.isDisplayed()).toBe(true);
        //access change password page
        page.ChangePasswordLink.click();
        expect(browser.getCurrentUrl()).toMatch(/.\/{2}[a-zA-Z0-9:.-]+\/change-password/);
    });
});