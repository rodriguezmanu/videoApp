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
                // var patterKaltura = /(kaltura)+/,
                //     resultRegex = patterKaltura.exec(config.url);

                // config.headers = config.headers || {};
                // config.headers['Accept-Language'] = LocaleService.getLocaleCode();

                if ($cookieStore.get('token')) {
                    config.headers.Authorization = 'Bearer ' + $cookieStore.get('token');
                }
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
    function runApp($rootScope, $location, UserService, $window) {
        // Redirect to login if route requires auth and you're not logged in
        $rootScope.$on('$stateChangeStart', function(event, toState) {
            UserService.isLoggedInAsync(function(loggedIn) {
                if (_.hasIn(toState.data, 'role')) {
                    if (!(UserService.checkRole(toState.data.role) && loggedIn)) {
                        $location.path('/');
                    }
                }
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
