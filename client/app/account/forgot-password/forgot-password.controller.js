(function() {
    'use strict';

    angular
        .module('CrossoverApp')
        .controller('ForgotPasswordCtrl', ForgotPasswordCtrl);

    ForgotPasswordCtrl.$inject = ['$http', '$state', '$timeout', 'constantValues', 'LocaleService'];

    /* @ngInject */
    function ForgotPasswordCtrl($http, $state, $timeout, constantValues, LocaleService) {
        var vm = this;
        vm.message = null;
        vm.disabled = false;
        vm.errors = {};
        vm.forgotPassword = forgotPassword;

        function forgotPassword() {
            vm.submitted = true;
            vm.disabled = true;
            if (vm.form.$valid) {
                $http({
                    method: 'POST',
                    url: '/api/users/forgot',
                    data: {
                        email: vm.email,
                        language: LocaleService.getLocaleCode()
                    }
                }).then(function(response) {
                    vm.message = 'contactUs.error.emailSent';
                    vm.errors.other = '';
                    $timeout(function() {
                        $state.go('root.home');
                    }, 3000);
                }, function(response) {
                    vm.disabled = false;
                    vm.message = null;
                    if (response.status === 2) {
                        vm.errors.other = 'forgotPassword.error.notRegistered';
                    } else {
                        vm.errors.other = 'contactUs.error.emailNotSend';
                    }
                });
            }
        }
    }
})();
