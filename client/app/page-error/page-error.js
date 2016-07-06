(function() {
    'use strict';

    angular
        .module('CrossoverApp')
        .config(function ($stateProvider) {
            $stateProvider
                .state('root.home.error-page', {
                    url: '^/page-error-:id',
                    ncyBreadcrumb: {
                        label:'breadcrumbs.pageError'
                    },
                    views: {
                        '@': {
                            templateUrl: 'app/page-error/page-error.html',
                            controller: 'PageErrorCtrl',
                            controllerAs: 'vm'
                        }
                    }
                });
        });
})();
