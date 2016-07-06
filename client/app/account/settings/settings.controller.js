(function() {

    'use strict';

    angular
        .module('CrossoverApp')
        .controller('SettingsCtrl', SettingsCtrl);

    SettingsCtrl.$inject = ['UserService', 'User', '$state', '$timeout'];

    /* @ngInject */
    function SettingsCtrl(UserService, User, $state, $timeout) {
        var vm = this;
        vm.errors = {};
        vm.message = null;
        vm.disabled = false;
        vm.submitForm = submitForm;
        vm.cleanAddress = cleanAddress;
        vm.user = UserService.getCurrentUser();

        function cleanAddress() {
            vm.user.address.full = null;
        }

        function submitForm() {
            vm.submitted = true;
            if (vm.form.$valid) {
                vm.disabled = true;
                vm.submitted = false;
                vm.errors.other  = '';
                User.update(
                    {
                        id: vm.user._id
                    },
                    vm.user
                )
                .$promise
                    .then(function(data) {
                        vm.message = 'settings.succedMessage';
                        $timeout(function() {
                            $state.go('root.home');//go where?
                        }, 3000);
                    })
                    .catch(function(err) {
                        vm.disabled = false;
                        vm.message = null;
                        vm.errors.other  = 'settings.errorMessage';
                    });
            }
        }
    }
})();
