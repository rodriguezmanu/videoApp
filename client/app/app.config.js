(function() {
    'use strict';

    angular
        .module('CrossoverApp')
        .config(configuration);

    configuration.$inject = ['$urlRouterProvider', '$locationProvider', '$httpProvider'];

    /* @ngInject */
    function configuration($urlRouterProvider, $locationProvider, $httpProvider) {
        $urlRouterProvider.otherwise('/');

        $locationProvider.html5Mode(true);
        $httpProvider.interceptors.push('authInterceptor');
    }
})();
