'use strict';
var specHelper = require('../specHelper.js');

describe('Contact Us', function() {
    var page;
    beforeEach(function() {
        browser.get('/contact-us');
        page = require('./contact-us.po.js');
    });

    it('should be present the following elements', function() {
        specHelper.setResolution(1920, 1080);
        expect(page.Breadcrumbs.isDisplayed()).toBe(true);
        expect(page.Name.isDisplayed()).toBe(true);
        expect(page.Email.isDisplayed()).toBe(true);
        expect(page.Message.isDisplayed()).toBe(true);
    });

    it('should get the following hints for the empty fields..', function() {
        page.SubmitButton.click();
        expect(page.EmailEmpty.isDisplayed()).toBe(true);
        expect(page.NameEmpty.isDisplayed()).toBe(true);
        expect(page.MessageEmpty.isDisplayed()).toBe(true);
    });

    it('should get hint for all fiels other than Name..', function() {
         page.Name.sendKeys('Cosmin');
         page.SubmitButton.click();
         expect(page.EmailEmpty.isDisplayed()).toBe(true);
         expect(page.MessageEmpty.isDisplayed()).toBe(true);
    });

    it('should get hint for all fiels other than Email..', function() {
         page.Email.sendKeys('admin@admin.com');
         page.SubmitButton.click();
         expect(page.NameEmpty.isDisplayed()).toBe(true);
         expect(page.MessageEmpty.isDisplayed()).toBe(true);
    });

    it('should get hint for all fiels other than Message..', function() {
         page.Message.sendKeys('Test Desktop');
         page.SubmitButton.click();
         expect(page.NameEmpty.isDisplayed()).toBe(true);
         expect(page.EmailEmpty.isDisplayed()).toBe(true);
    });

    //Tablet Devices Test

    it('should be present the following elements', function() {
        specHelper.setResolution(768, 600);
        expect(page.Breadcrumbs.isDisplayed()).toBe(true);

        expect(page.Name.isDisplayed()).toBe(true);
        expect(page.Email.isDisplayed()).toBe(true);
        expect(page.Message.isDisplayed()).toBe(true);
    });

    it('should get the following hints for the empty fields..', function() {
        page.SubmitButton.click();
        expect(page.EmailEmpty.isDisplayed()).toBe(true);
        expect(page.NameEmpty.isDisplayed()).toBe(true);
        expect(page.MessageEmpty.isDisplayed()).toBe(true);
    });

    it('should get hint for all fiels other than Name..', function() {
         page.Name.sendKeys('Cosmin');
         page.SubmitButton.click();
         expect(page.EmailEmpty.isDisplayed()).toBe(true);
         expect(page.MessageEmpty.isDisplayed()).toBe(true);
    });

    it('should get hint for all fiels other than Email..', function() {
         page.Email.sendKeys('admin@admin.com');
         page.SubmitButton.click();
         expect(page.NameEmpty.isDisplayed()).toBe(true);
         expect(page.MessageEmpty.isDisplayed()).toBe(true);
    });

    it('should get hint for all fiels other than Message..', function() {
         page.Message.sendKeys('Test Tablet');
         page.SubmitButton.click();
         expect(page.NameEmpty.isDisplayed()).toBe(true);
         expect(page.EmailEmpty.isDisplayed()).toBe(true);
    });

    //Mobile Devices Test

    it('should be present the following elements', function() {
        specHelper.setResolution(480, 600);
        expect(page.Breadcrumbs.isDisplayed()).toBe(true);

        expect(page.Name.isDisplayed()).toBe(true);
        expect(page.Email.isDisplayed()).toBe(true);
        expect(page.Message.isDisplayed()).toBe(true);
    });

    it('should get the following hints for the empty fields..', function() {
        page.SubmitButton.click();
        expect(page.EmailEmpty.isDisplayed()).toBe(true);
        expect(page.NameEmpty.isDisplayed()).toBe(true);
        expect(page.MessageEmpty.isDisplayed()).toBe(true);
    });

    it('should get hint for all fiels other than Name..', function() {
         page.Name.sendKeys('Cosmin');
         page.SubmitButton.click();
         expect(page.EmailEmpty.isDisplayed()).toBe(true);
         expect(page.MessageEmpty.isDisplayed()).toBe(true);
    });

    it('should get hint for all fiels other than Email..', function() {
         page.Email.sendKeys('admin@admin.com');
         page.SubmitButton.click();
         expect(page.NameEmpty.isDisplayed()).toBe(true);
         expect(page.MessageEmpty.isDisplayed()).toBe(true);
    });

    it('should get hint for all fiels other than Message..', function() {
         page.Message.sendKeys('Test Mobile');
         page.SubmitButton.click();
         expect(page.NameEmpty.isDisplayed()).toBe(true);
         expect(page.EmailEmpty.isDisplayed()).toBe(true);
    });
});