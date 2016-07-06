(function() {

    'use strict';

    angular
        .module('CrossoverApp')
        .controller('ChangePasswordCtrl', ChangePasswordCtrl);

    ChangePasswordCtrl.$inject = ['UserService', '$state', '$timeout'];

    /* @ngInject */
    function ChangePasswordCtrl(UserService, $state, $timeout) {
        var vm = this;
        vm.errors = {};
        vm.message = null;

        vm.changePassword = changePassword;

        function changePassword() {
            vm.submitted = true;
            if (vm.form.$valid) {
                vm.submitted = false;
                UserService.changePassword(vm.user.oldPassword, vm.user.newPassword)
                    .then(function() {
                        vm.message = 'changePassword.passwordChanged';
                        vm.errors.other = '';
                        $timeout(function() {
                            $state.go('root.home');
                        }, 3000);

                    })
                    .catch(function(err) {
                        if (err.data.status.code === 403) {
                            vm.errors.other = 'login.error.backend.password';
                        }

                        if (angular.isUndefined(vm.errors.other)) {
                            vm.errors.other = 'login.error.backend.somethingWrong';
                        }
                        vm.user.oldPassword = '';
                        vm.user.newPassword = '';
                        vm.message = null;
                    });
            }
        }
    }
})();
