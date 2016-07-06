(function() {
    'use strict';

    angular
        .module('CrossoverApp.ngHeader').directive('ngHeader', function() {
            return {
                templateUrl: 'components/directives/header/header.html',
                restrict: 'EA',
                controller: HeaderCtrl,
                link: link,
                scope: {}
            };
        });

    HeaderCtrl.$inject = ['$scope', '$location', 'UserService', '$state'];

    /* @ngInject */
    function HeaderCtrl($scope, $location, UserService, $state) {

        $scope.isCollapsed = true;
        $scope.isFlixerAdmin = UserService.isFlixerAdmin;
        $scope.isFlixer = UserService.isFlixer;
        $scope.isLoggedIn = UserService.isLoggedIn;
        $scope.getCurrentUser = UserService.getCurrentUser;
        $scope.logout = logout;
        $scope.isActive = isActive;

        function logout() {
            UserService.logout();
            $state.go('root.home.login', {}, {reload: true});
        }

        function isActive(route) {
            return route === $location.path();
        }
    }

    function link(scope, element, attr) {
        var desktop,
            tablet,
            phone,
            device;

        //device detection
        desktop = (!isMobile.phone && !isMobile.tablet) ? 'desktop' : undefined;
        tablet = (isMobile.tablet) ? 'tablet' : undefined;
        phone = (isMobile.phone) ? 'phone' : undefined;
        device = desktop || tablet || phone;

        $('body').addClass(device);
    }
})();
