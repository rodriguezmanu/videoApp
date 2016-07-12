(function() {
    'use strict';

    angular
        .module('VideoApp')
        .config(function($stateProvider) {
            $stateProvider
            .state('root.home.login', {
                url: '^/login',
                authenticate: false,
                views: {
                    '@': {
                        templateUrl: 'app/login/login.html',
                        controller: 'LoginCtrl',
                        controllerAs: 'vm'
                    }
                }
            });
        });
})();
