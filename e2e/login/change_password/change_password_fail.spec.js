'use strict';

describe('Change Password hint', function() {
    var page;
    beforeEach(function() {
        browser.get('/change-password');
        page = require('./change_password.po.js');
        browser.driver.manage().window().setSize(1080, 720);
    });

    it('get error message for empty fields..', function() {
        page.changeButton.click()
        expect(page.errorMessage.isDisplayed()).toBe(true);
    });
});