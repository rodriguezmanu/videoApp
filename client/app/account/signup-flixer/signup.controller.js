(function() {
    'use strict';

    angular
        .module('CrossoverApp')
        .controller('SignupFlixerCtrl', SignupFlixerCtrl);

    /* @ngInject */
    SignupFlixerCtrl.$inject = [
        'UserService',
        '$state',
        'recaptchaService',
        'constantValues',
        'ngDialog',
        '$scope'
    ];

    function SignupFlixerCtrl(UserService, $state, recaptchaService, constantValues, ngDialog, $scope) {
        var vm = this;

        vm.user = {};
        vm.errors = {};
        vm.siteKey = constantValues().siteKeyCaptcha;
        vm.register = register;
        vm.isDesktop = !isMobile.phone && !isMobile.tablet;
        vm.modalIdInformation = modalIdInformation;

        function modalIdInformation() {
            var dialog = ngDialog.open({
                template: 'app/account/signup-flixer/add-information-id.html',
                showClose: true,
                scope: $scope,
                closeByDocument: false
            });
        }

        function register() {
            vm.submitted = true;
            if (vm.form.$valid && vm.gRecaptchaResponse) {
                recaptchaService.checkCaptcha(vm.gRecaptchaResponse)
                    .then(function(response) {
                        vm.user.role = constantValues().roles.flixer;
                        //this should be temporal, in a future we'll have 2 emails
                        vm.user.email = vm.user.contact.email;
                        // setProfilePicture(vm.user.fileProfile);
                        // setFlixerPostulation(vm.user.fileId, vm.user.filesFlixer);

                        UserService.createUser(vm.user)
                            .then(function() {
                                var dialog = ngDialog.open({
                                    template: 'app/account/signup-flixer/confirm.html',
                                    showClose: false,
                                    scope: $scope,
                                    closeByEscape: false,
                                    closeByDocument: false
                                });
                                dialog.closePromise
                                    .then(function(data) {
                                        $state.go('root.home', {}, {reload: true});
                                    }
                                );
                            })
                            .catch(function(err) {
                                vm.error = 'common.errorMessage';
                                err = err.data.error;
                                vm.errors = {};
                                // Update validity of form fields that match the mongoose errors
                                angular.forEach(err.errors, function(error, field) {
                                    vm.form[field].$setValidity('mongoose', false);
                                    vm.errors[field] = error.message;
                                });
                            });
                    })
                    .catch(function(err) {
                        vm.error = 'common.errorMessage';
                    });
            } else {
                angular.element('input.ng-invalid').first().focus();
                angular.element('.help-block.error.ng-binding').first().focus();
            }
        }
    }
})();
