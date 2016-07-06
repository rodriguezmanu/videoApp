(function() {
    'use strict';

    angular
        .module('CrossoverApp.breadcrumbs')
        .directive('ngBreadcrumbs', ngBreadcrumbs)
        .config(breadcrumbProvider);

    function ngBreadcrumbs() {
        return {
            templateUrl: 'components/directives/breadcrumbs/breadcrumbs.html',
            restrict: 'EA',
            scope: {
                pageTitle: '@'
            },
            controller: BreadcrumbsCtrl,
            controllerAs: 'BreadcrumbsVm',
            bindToController: true
        };
    }

    breadcrumbProvider.$inject = ['$breadcrumbProvider'];

    /* @ngInject */
    function breadcrumbProvider($breadcrumbProvider) {
        $breadcrumbProvider.setOptions({
            templateUrl: 'components/directives/breadcrumbs/template-breadcrumbs.html'
        });
    }

    function BreadcrumbsCtrl() {
        var vm = this;
    }
})();
