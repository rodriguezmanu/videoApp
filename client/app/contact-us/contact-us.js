(function() {
    'use strict';

    angular
        .module('CrossoverApp')
        .config(function ($stateProvider) {
            $stateProvider
                .state('root.home.contact-us', {
                    url: '^/contact-us',
                    ncyBreadcrumb: {
                        label:'breadcrumbs.contactUs'
                    },
                    views: {
                        '@': {
                            templateUrl: 'app/contact-us/contact-us.html',
                            controller: 'ContactUsCtrl',
                            controllerAs: 'vm'
                        }
                    }
                });
        });
})();
