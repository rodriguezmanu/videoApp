/* jshint -W117, -W030 */
'use strict';

describe('Directive: footer', function() {

    // load the directive's module and view
    beforeEach(module('CrossoverApp'));
    beforeEach(module('components/directives/footer/footer.html'));

    var element,
        scope;

    beforeEach(inject(function($rootScope, $httpBackend, $compile) {
        scope = $rootScope.$new();
        testTranslate($httpBackend);

        element = angular.element('<ng-footer></ng-footer>');
        element = $compile(element)(scope);
        scope.$digest();

    }));

    it('should directive be defined', function() {
        expect(element).toBeDefined();
    });
});
