(function() {
    'use strict';

    angular
        .module('CrossoverApp.ngHeader').directive('ngHeader', function() {
            return {
                templateUrl: 'components/directives/header/header.html',
                restrict: 'EA',
                controller: HeaderCtrl,
                // link: link,
                scope: {},
                controllerAs: 'vm'
            };
        });

    HeaderCtrl.$inject = ['UsersService', '$state'];

    /* @ngInject */
    function HeaderCtrl(UsersService, $state) {
        var vm = this;

        vm.isLoggedIn = UsersService.isLoggedIn;
        vm.getCurrentUser = UsersService.getCurrentUser;
        vm.logout = logout;

        function logout() {
            UsersService.logout()
            .then(function(response) {
                if (response.status === 'success') {
                    $state.go('root.home', {}, {
                        reload: true
                    });
                } else if (response.status === 'error') {
                    vm.errors = response.error;
                }
            })
            .catch(function(err) {
                vm.errors = err.error;
            });
        }
    }

    // function link(scope, element, attr) {
    // var desktop,
    //     tablet,
    //     phone,
    //     device;

    //device detection
    // desktop = (!isMobile.phone && !isMobile.tablet) ? 'desktop' : undefined;
    // tablet = (isMobile.tablet) ? 'tablet' : undefined;
    // phone = (isMobile.phone) ? 'phone' : undefined;
    // device = desktop || tablet || phone;

    // $('body').addClass(device);
    // }
})();
