(function() {
    'use strict';

    angular
        .module('CrossoverApp')
        .controller('SignupBoCtrl', SignupBoCtrl);

    /* @ngInject */
    SignupBoCtrl.$inject = ['UserService', '$state', 'recaptchaService', 'constantValues', 'ngDialog', '$scope'];

    function SignupBoCtrl(UserService, $state, recaptchaService, constantValues, ngDialog, $scope) {
        var vm = this;

        vm.user = {};
        vm.errors = {};
        vm.siteKey = constantValues().siteKeyCaptcha;
        vm.register = register;
        vm.getCountries = [
            {
                name: 'Argentina',
                code: 'AR'
            },
            {
                name: 'Brasil',
                code: 'BR'
            },
            {
                name: 'United State',
                code: 'USA'
            }
        ];

        function register() {
            vm.submitted = true;
            if (vm.form.$valid && vm.gRecaptchaResponse) {

                recaptchaService.checkCaptcha(vm.gRecaptchaResponse)
                    .then(function(response) {
                        UserService.createUser({
                            name: vm.user.name,
                            email: vm.user.email,
                            password: vm.user.password
                        })
                        .then(function() {
                            var dialog = ngDialog.open({
                                template: 'app/account/signup/confirm.html',
                                showClose: false,
                                scope: $scope,
                                closeByEscape: false,
                                closeByDocument: false
                            });
                            dialog.closePromise
                                .then(function(data) {
                                    $state.go('root.home');
                                }
                            );
                        })
                        .catch(function(err) {
                            err = err.data;
                            vm.errors = {};

                            angular.forEach(err.errors, function(error, field) {
                                vm.form[field].$setValidity('mongoose', false);
                                vm.errors[field] = error.message;
                            });
                        });
                    })
                    .catch(function(err) {
                        console.log(err);
                    });
            }
        }
    }
})();
