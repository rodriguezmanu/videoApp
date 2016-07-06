(function() {
    'use strict';

    angular
        .module('CrossoverApp.ngFooter')
        .directive('ngFooter', function () {
            return {
                templateUrl: 'components/directives/footer/footer.html',
                restrict: 'EA',
                scope: {}
            };
        });
})();
