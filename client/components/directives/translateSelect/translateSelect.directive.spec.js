/* jshint -W117, -W030 */
'use strict';

describe('Directive: translateSelect', function() {

    // load the directive's module and view
    beforeEach(module('CrossoverApp'));
    beforeEach(module('components/directives/translateSelect/translateSelect.html'));

    var element,
        scope;

    beforeEach(inject(function($rootScope, $httpBackend, $compile, $templateCache) {
        scope = $rootScope.$new();
        testTranslate($httpBackend);

        element = angular.element('<translate-language-select></translate-language-select>');
        element = $compile(element)(scope);
        scope.$digest();
    }));

    it('should directive be defined', function() {
        expect(element).toBeDefined();
    });
});

