(function() {
    'use strict';

    angular
        .module('CrossoverApp')
        .factory('authInterceptor', authInterceptor)
        .run(runApp);
    //agregar
    // authInterceptor.$inject = ['$location', '$rootScope', '$http', 'User', '$cookieStore', '$q', 'constantValues'];

    /* @ngInject */
    function authInterceptor($rootScope, $q, $cookieStore, $location, LocaleService) {
        return {
            // Add authorization token to headers
            request: function(config) {

                // if ($cookieStore.get('token')) {
                //     config.headers.Authorization = 'Bearer ' + $cookieStore.get('token');
                // }
                return config;
            },

            responseError: function(response) {
                if (response.status === 401) {
                    $location.path('/login');
                    // remove any stale tokens
                    $cookieStore.remove('token');
                    return $q.reject(response);
                } else {
                    return $q.reject(response);
                }
            }
        };
    }

    //agregar
    // authInterceptor.$inject = ['$location', '$rootScope', '$http', 'User', '$cookieStore', '$q', 'constantValues'];

    /* @ngInject */
    function runApp($rootScope, $location, UsersService, $window) {
        // Redirect to login if route requires auth and you're not logged in
        $rootScope.$on('$stateChangeStart', function(event, toState) {
            UsersService.isLoggedInAsync(function(loggedIn) {
                if (toState.authenticate && !loggedIn) {
                    $location.path('/login');
                }
                if (toState.authenticate === false && loggedIn) {
                    $location.path('/');
                }
            });
        });
        $rootScope.$on('$viewContentLoaded', function() {
            $window.scrollTo(0, 0);
        });
    }
})();
