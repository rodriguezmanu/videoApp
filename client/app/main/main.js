(function() {
    'use strict';

    angular
        .module('CrossoverApp')
        .config(function ($stateProvider) {
            $stateProvider
                .state('root', {
                    abstract: true,
                    views: {
                        '@': {
                            template: '<ui-view/>'
                        },
                        'header@': {
                            template: '<ng-header></ng-header>'
                        },
                        'footer@': {
                            template: '<ng-footer></ng-footer>'
                        }
                    }
                })
                .state('root.home',{
                    parent:'root',
                    url:'/',
                    templateUrl: 'app/main/main.html',
                    controller: 'MainCtrl',
                    controllerAs: 'vm',
                    ncyBreadcrumb: {
                        label: 'breadcrumbs.homePage'
                    },
                });
        });
})();
