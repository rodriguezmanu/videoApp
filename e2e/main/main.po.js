/**
 * This file uses the Page Object pattern to define the main page for tests
 * https://docs.google.com/presentation/d/1B6manhG0zEXkC-H-tPo2vwU06JhL8w9-XCF9oehXzAQ
 */

'use strict';

var MainPage = function() {
    this.html = element(by.css('html'));

    this.panelFixedEl = element(by.css('ng-cta-fixed .panel'));
    this.panelFixedHrefEl = this.panelFixedEl.element(by.css('a'));
    this.panelFixedDescription = this.panelFixedHrefEl.element(by.css('.description-text'));
    this.panelFixedCta = this.panelFixedHrefEl.element(by.css('.cta-text'));

    this.header = element(by.css('ng-header'));
    this.collapseHeaderMobile = this.header.element(by.css('.navbar-header button.collapsed'));
    this.selectTranslate = this.header.element(by.css('translate-language-select'));
    this.selectTranslateButton = this.header.element(by.css('translate-language-select button'));
    this.selectTranslateContainer = this.header.element(by.css('translate-language-select ul'));
    this.selectTranslateElementFirst = element.all(by.css('translate-language-select ul li')).first();
    this.selectTranslateElementLast = element.all(by.css('translate-language-select ul li')).last();
};

module.exports = new MainPage();
