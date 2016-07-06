(function() {
    'use strict';

    angular
        .module('CrossoverApp')
        .controller('ResetPasswordCtrl', ResetPasswordCtrl);

    ResetPasswordCtrl.$inject = ['getUser', '$state', '$timeout', '$http'];

    /* @ngInject */
    function ResetPasswordCtrl(getUser, $state, $timeout, $http) {
        var vm = this;
        vm.message = null;
        vm.disabled = false;
        vm.errors = {};

        vm.resetPassword = resetPassword;

        function resetPassword() {
            if (vm.form.$valid) {
                vm.disabled = true;
                vm.submitted = false;
                vm.errors.other  = '';

                $http({
                    method: 'POST',
                    url: '/api/users/reset/' + getUser.resetPasswordToken,
                    data: {
                        password: vm.user.password
                    }
                }).then(function(response) {
                    vm.message = 'common.succedMessage';
                    $timeout(function() {
                        $state.go('root.home.login');
                    }, 3000);
                }, function(response) {
                    vm.disabled = false;
                    vm.message = null;
                    vm.errors.other  = 'common.errorMessage';
                });
            }
        }
    }
})();
