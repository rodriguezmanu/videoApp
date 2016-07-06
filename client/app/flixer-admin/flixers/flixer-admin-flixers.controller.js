(function() {
    'use strict';

    angular
        .module('CrossoverApp')
        .controller('FlixerAdminFlixers', FlixerAdminFlixers);

    FlixerAdminFlixers.$inject = ['UserService', 'constantValues', '$state'];

    /* @ngInject */
    function FlixerAdminFlixers(UserService, constantValues, $state) {
        var vm = this;
        vm.flixerProfile = flixerProfile;

        UserService.getUsersByRole(constantValues().roles.flixer, function(response) {
            vm.users = response.data.users;
        });

        function flixerProfile(flixerId) {
            $state.go('root.home.flixer-admin.flixers.flixer-detail', {
                flixerId: flixerId
            });
        }
    }
})();
