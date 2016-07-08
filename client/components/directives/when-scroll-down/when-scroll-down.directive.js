(function() {
    'use strict';

    angular
        .module('CrossoverApp.whenScrolled')
        .directive('whenScrolled', directive);

    directive.$inject = ['$window'];

    /* @ngInject */
    function directive($window) {
        return {
            link: link,
            restrict: 'AE'
        };

        function link(scope, element, attrs) {
            $(window).scroll(function() {
                if ($(window).scrollTop() + $(window).height() > $(document).height() - 100) {
                    scope.$apply(attrs.whenScrolled);
                }
            });
        }
    }
})();
