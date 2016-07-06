'use strict';

describe('Main View - cta fixed directive', function() {
    var page;

    beforeEach(function() {
        browser.get('/about-us');
        page = require('../../about-us/about-us.po');
    });

    it('should exist all these html tags...', function() {
        expect(page.breadcrumbs.isDisplayed()).toBe(true);
        expect(page.breadcrumbsTitle.isDisplayed()).toBe(true);
        expect(page.breadcrumbsOl.isDisplayed()).toBe(true);
        expect(page.breadcrumbsOlLi.isDisplayed()).toBe(true);
        expect(page.breadcrumbsOlLiHRef.isDisplayed()).toBe(true);
    });

    it('should click and homepage and go there', function() {
        page.breadcrumbsOlLiHRef.click();
        expect(browser.getCurrentUrl()).toMatch(/.\/{2}[a-zA-Z0-9:.-]+/);
    });

    it('should last item does not have href', function() {
        expect(page.lastEl.element(by.css('a')).isPresent()).toBe(false);
    });
});
