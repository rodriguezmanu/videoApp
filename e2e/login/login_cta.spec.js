'use strict';
var specHelper = require('../specHelper');

describe('Login Page CTA', function() {
    var page;
    beforeEach(function() {
        browser.get('/login');
        page = require('../main/main.po');
        specHelper.setResolution(1920, 1080);
    });

    it('should exist the following elements', function() {
        expect(page.panelFixedEl.isDisplayed()).toBe(true);
        expect(page.panelFixedHrefEl.isDisplayed()).toBe(true);
        expect(page.panelFixedDescription.isDisplayed()).toBe(true);
        expect(page.panelFixedCta.isDisplayed()).toBe(true);
    });

    it('should send the user to About Us page..', function() {
        page.panelFixedCta.click();
        expect(browser.getCurrentUrl()).toMatch(/.\/{2}[a-zA-Z0-9:.-]+\/signup-flixer/);
    });

    //Tablet

    it('should exist the following elements', function() {
        specHelper.setResolution(768, 600);
        expect(page.panelFixedEl.isDisplayed()).toBe(false);
        expect(page.panelFixedHrefEl.isDisplayed()).toBe(false);
        expect(page.panelFixedDescription.isDisplayed()).toBe(false);
        expect(page.panelFixedCta.isDisplayed()).toBe(false);
    });

    it('should send the user to About Us page..', function() {
        page.panelFixedHrefEl.click();
        expect(browser.getCurrentUrl()).toMatch(/.\/{2}[a-zA-Z0-9:.-]+\/signup-flixer/);
    });

    //Mobile

    it('should exist the following elements', function() {
        specHelper.setResolution(480, 600);
        expect(page.panelFixedEl.isDisplayed()).toBe(false);
        expect(page.panelFixedHrefEl.isDisplayed()).toBe(false);
        expect(page.panelFixedDescription.isDisplayed()).toBe(false);
        expect(page.panelFixedCta.isDisplayed()).toBe(false);
    });

    it('should send the user to About Us page..', function() {
        page.panelFixedHrefEl.click();
        expect(browser.getCurrentUrl()).toMatch(/.\/{2}[a-zA-Z0-9:.-]+\/signup-flixer/);
    });
});