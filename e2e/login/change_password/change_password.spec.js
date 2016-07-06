'use strict';

xdescribe('Change Password', function() {
    var page;
    beforeEach(function() {
        browser.get('/change-password');
        page = require('./change_password.po.js');
        // browser.driver.manage().window().setSize(1080, 720);
    });

    it('should exist the following elements', function() {
        expect(page.oldPassword.isDisplayed()).toBe(true);
        expect(page.newPassword.isDisplayed()).toBe(true);
        expect(page.changeButton.isDisplayed()).toBe(true);
    });

    it('insert old and new password..', function() {
        page.oldPasswordModel.sendKeys('123456');
        page.newPasswordModel.sendKeys('12345678');
        page.changeButton.click();
        //here you need to expect somethihg cosmin, maybe a redirection
    });
});