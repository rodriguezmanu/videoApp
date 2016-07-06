'use strict';
var specHelper = require('../../specHelper');

describe('Main View - cta fixed directive', function() {
    var page;

    beforeEach(function() {
        browser.get('/');
        page = require('../../main/main.po');
        //set desktop view
        specHelper.setResolution(1024, 800);
    });

    it('should exist panelFixedEl, panelFixedHrefEl, panelFixedDescription and panelFixedCta', function() {
        expect(page.panelFixedEl.isDisplayed()).toBe(true);
        expect(page.panelFixedHrefEl.isDisplayed()).toBe(true);
        expect(page.panelFixedDescription.isDisplayed()).toBe(true);
        expect(page.panelFixedCta.isDisplayed()).toBe(true);
    });

    it('should click cta and go somewhere', function() {
        page.panelFixedCta.click();
        expect(browser.getCurrentUrl()).toMatch(/.\/{2}[a-zA-Z0-9:.-]+\/{1}[a-zA-Z-]+/);
    });

    it('should not see it in tablet', function() {
        specHelper.setResolution(768, 600);

        expect(page.panelFixedEl.isDisplayed()).toBe(false);
        expect(page.panelFixedHrefEl.isDisplayed()).toBe(false);
        expect(page.panelFixedDescription.isDisplayed()).toBe(false);
        expect(page.panelFixedCta.isDisplayed()).toBe(false);
    });

    it('should not see it in mobile', function() {
        specHelper.setResolution(480, 600);

        expect(page.panelFixedEl.isDisplayed()).toBe(false);
        expect(page.panelFixedHrefEl.isDisplayed()).toBe(false);
        expect(page.panelFixedDescription.isDisplayed()).toBe(false);
        expect(page.panelFixedCta.isDisplayed()).toBe(false);
    });
});
