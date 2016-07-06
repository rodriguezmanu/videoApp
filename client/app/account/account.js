(function() {
    'use strict';

    angular
        .module('CrossoverApp')
        .config(function($stateProvider) {
            $stateProvider
            // .state('root.home.login', {
            //     url: '^/login',
            //     authenticate: false,
            //     ncyBreadcrumb: {
            //         label:'breadcrumbs.login'
            //     },
            //     views: {
            //         '@': {
            //             templateUrl: 'app/account/login/login.html',
            //             controller: 'LoginCtrl',
            //             controllerAs: 'vm'
            //         }
            //     }
            // })
            .state('root.home.signup-bo', {
                url: '^/signup-bo',
                authenticate: false,
                ncyBreadcrumb: {
                    label:'breadcrumbs.signup'
                },
                views: {
                    '@': {
                        templateUrl: 'app/account/signup-bo/signup.html',
                        controller: 'SignupBoCtrl',
                        controllerAs: 'vm'
                    }
                }
            })
            .state('root.home.signup-flixer', {
                url: '^/signup-flixer',
                ncyBreadcrumb: {
                    label:'breadcrumbs.signup-flixer'
                },
                views: {
                    '@': {
                        templateUrl: 'app/account/signup-flixer/signup.html',
                        controller: 'SignupFlixerCtrl',
                        controllerAs: 'vm'
                    }
                }
            })
            .state('root.home.change-password', {
                url: '^/change-password',
                authenticate: true,
                ncyBreadcrumb: {
                    label:'breadcrumbs.changePassword'
                },
                views: {
                    '@': {
                        templateUrl: 'app/account/change-password/change-password.html',
                        controller: 'ChangePasswordCtrl',
                        controllerAs: 'vm'
                    }
                }
            })
            .state('root.home.settings', {
                url: '^/settings',
                authenticate: true,
                ncyBreadcrumb: {
                    label:'breadcrumbs.settings'
                },
                views: {
                    '@': {
                        templateUrl: 'app/account/settings/settings.html',
                        controller: 'SettingsCtrl',
                        controllerAs: 'vm'
                    }
                }
            })
            .state('root.home.forgot-password', {
                url: '^/forgot-password',
                authenticate: false,
                ncyBreadcrumb: {
                    label:'breadcrumbs.ForgotPassword'
                },
                views: {
                    '@': {
                        templateUrl: 'app/account/forgot-password/forgot-password.html',
                        controller: 'ForgotPasswordCtrl',
                        controllerAs: 'vm'
                    }
                }
            }).state('root.home.reset-token', {
                url: '^/reset/:token',
                authenticate: false,
                ncyBreadcrumb: {
                    label: 'breadcrumbs.resetPassword'
                },
                views: {
                    '@': {
                        templateUrl: 'app/account/reset-password/reset-password.html',
                        controller: 'ResetPasswordCtrl',
                        controllerAs: 'vm'
                    }
                },
                resolve: {
                    getUser: function($state, $http, $stateParams, $q) {
                        var deferred = $q.defer(),
                            getUserToken = $http({
                                method: 'GET',
                                url: '/api/users/reset/' + $stateParams.token
                            });

                        getUserToken.then(function(response) {
                            deferred.resolve(response.data.user);
                        }, function(response) {
                            deferred.reject(response);
                            $state.go('root.home.error-page', {id: 404});
                        });
                        return deferred.promise;
                    }
                }
            });
        });
})();
