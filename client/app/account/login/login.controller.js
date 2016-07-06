(function() {

    'use strict';

    angular
        .module('CrossoverApp')
        .controller('LoginCtrl', LoginCtrl);

    LoginCtrl.$inject = ['UserService', '$state', '$window'];

    /* @ngInject */
    function LoginCtrl(UserService, $state, $window) {
        var vm = this;

        vm.user = {};
        vm.errors = {};
        vm.login = login;

        function login() {
            vm.submitted = true;
            if (vm.form.$valid) {
                UserService.login({
                    email: vm.user.email,
                    password: vm.user.password
                })
                .then(function(response) {
                    UserService.isLoggedInAsync(function(loggedIn) {
                        if (UserService.isFlixerAdmin()) {
                            $state.go('root.home.flixer-admin', {}, {reload: true});
                        }
                        if (UserService.isFlixer()) {
                            $state.go('root.home.flixer', {}, {reload: true});
                        }
                    });
                    $state.go('root.home', {}, {reload: true});
                })
                .catch(function(err) {
                    if (err.status.code === 1) {
                        vm.errors.other = 'login.error.backend.password';
                    }
                    if (err.status.code === 2) {
                        vm.errors.other = 'login.error.backend.email';
                    }

                    if (angular.isUndefined(vm.errors.other)) {
                        vm.errors.other = 'login.error.backend.somethingWrong';
                    }
                });
            }
        }
    }
})();
