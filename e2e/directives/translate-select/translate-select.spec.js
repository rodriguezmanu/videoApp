'use strict';

var specHelper = require('../../specHelper');

describe('Main View - translate language select directive', function() {
    var page;

    beforeEach(function() {
        browser.get('/');
        page = require('../../main/main.po');
        specHelper.setResolution(1024, 800);
    });

    it('should exist all these html tags...', function() {
        expect(page.header.isDisplayed()).toBe(true);
        expect(page.selectTranslate.isDisplayed()).toBe(true);
        expect(page.selectTranslateButton.isDisplayed()).toBe(true);
    });

    it('should click dropdown....', function() {
        page.selectTranslateButton.click();
        expect(page.selectTranslateContainer.isDisplayed()).toBe(true);
        expect(page.selectTranslateElementFirst.isDisplayed()).toBe(true);
        expect(page.selectTranslateElementLast.isDisplayed()).toBe(true);
    });

    it('should click dropdown and select portuguese language', function() {
        page.selectTranslateButton.click();
        page.selectTranslateElementFirst.click();

        expect(page.html.getAttribute('lang')).toBe('pt');
    });

    it('should click dropdown and select EN US language', function() {
        page.selectTranslateButton.click();
        page.selectTranslateElementLast.click();

        expect(page.html.getAttribute('lang')).toBe('en_US');
    });

    it('should exist all these html tags in mobile...', function() {
        specHelper.setResolution(480, 600);

        page.collapseHeaderMobile.click();
        expect(page.header.isDisplayed()).toBe(true);
        expect(page.selectTranslate.isDisplayed()).toBe(true);
        expect(page.selectTranslateButton.isDisplayed()).toBe(true);

        page.selectTranslateButton.click();
        expect(page.selectTranslateContainer.isDisplayed()).toBe(true);
        expect(page.selectTranslateElementFirst.isDisplayed()).toBe(true);
        expect(page.selectTranslateElementLast.isDisplayed()).toBe(true);
    });

});
