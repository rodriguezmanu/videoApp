/* jshint -W117, -W030 */
'use strict';

describe('Directive: header', function() {

    // load the directive's module and view
    beforeEach(module('CrossoverApp.mongooseErrors'));

    var element,
        scope;

    beforeEach(inject(function($rootScope, $httpBackend, $compile, $templateCache) {
        scope = $rootScope.$new();

        element = angular.element('<input ng-model="model" mongoose-errors></input>');
        element = $compile(element)(scope);
        scope.$digest();
    }));

    it('should mongoose-errors directive be defined', function() {
        expect(element).toBeDefined();
    });
});