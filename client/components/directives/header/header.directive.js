(function() {
    'use strict';

    angular
        .module('CrossoverApp.ngHeader').directive('ngHeader', function() {
            return {
                templateUrl: 'components/directives/header/header.html',
                restrict: 'EA',
                controller: HeaderCtrl,
                // link: link,
                scope: {}
            };
        });

    HeaderCtrl.$inject = ['$scope', 'UsersService', '$state'];

    /* @ngInject */
    function HeaderCtrl($scope, UsersService, $state) {

        $scope.isLoggedIn = UsersService.isLoggedIn;
        $scope.getCurrentUser = UsersService.getCurrentUser;
        $scope.logout = logout;

        function logout() {
            UsersService.logout()
            .then(function(response) {
                if (response.status === 'success') {
                    $state.go('root.home', {}, {
                        reload: true
                    });
                } else if (response.status === 'error') {
                    $scope.errors = response.error;
                }
            })
            .catch(function(err) {
                $scope.errors = err.error;
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
