'use strict';

exports.setResolution = function (width, height) {
    browser.driver.manage().window().setSize(width, height);
};
