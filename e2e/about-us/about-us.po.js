'use strict';

var AboutUsPage = function() {
    this.breadcrumbs = element(by.css('ng-breadcrumbs'));
    this.breadcrumbsTitle = this.breadcrumbs.element(by.css('.heading-center'));
    this.breadcrumbsOl = this.breadcrumbs.element(by.css('ol.breadcrumb'));
    this.breadcrumbsOlLi = this.breadcrumbsOl.element(by.css('li'));
    this.breadcrumbsOlLiHRef = this.breadcrumbsOlLi.element(by.css('a'));
    this.lastEl = element.all(by.css('ng-breadcrumbs ol.breadcrumb li')).last();
};

module.exports = new AboutUsPage();
