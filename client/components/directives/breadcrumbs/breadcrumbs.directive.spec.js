/* jshint -W117, -W030 */
'use strict';

describe('Directive: breadcrumbs', function() {

    // load the directive's module and view
    beforeEach(module('CrossoverApp'));
    beforeEach(module('components/directives/breadcrumbs/breadcrumbs.html'));
    beforeEach(module('components/directives/breadcrumbs/template-breadcrumbs.html'));

    var element,
        scope,
        isolatedScope;

    beforeEach(inject(function($rootScope, $httpBackend, $compile) {
        scope = $rootScope.$new();
        scope.pageTitle = 'text example';

        testTranslate($httpBackend);

        element = angular.element('<ng-breadcrumbs page-title="text example"></ng-breadcrumbs>');
        element = $compile(element)(scope);
        scope.$digest();
        isolatedScope = element.isolateScope().BreadcrumbsVm;
    }));

    it('should directive be defined', function() {
        expect(element).toBeDefined();
    });

    it('should test isolate scope', function() {
        expect(scope.pageTitle).toEqual('text example');
    });

    it('isolated scope should have one properties assigned', function () {
        expect(isolatedScope.pageTitle).toBeDefined();
    });
});
