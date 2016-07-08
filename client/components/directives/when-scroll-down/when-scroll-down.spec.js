/* jshint -W117, -W030 */
'use strict';

describe('Directive: when scroll down', function() {

    beforeEach(module('CrossoverApp'));

    var element,
        scope;

    beforeEach(inject(function($rootScope, $compile) {
        scope = $rootScope.$new();

        element = angular.element('<div when-scrolled></div>');
        element = $compile(element)(scope);
        scope.$digest();
    }));

    it('should directive be defined', function() {
        expect(element).toBeDefined();
    });
});
