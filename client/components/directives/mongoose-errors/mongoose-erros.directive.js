(function() {
    'use strict';

    angular
        .module('CrossoverApp.mongooseErrors')
        .directive('mongooseErrors', function () {
            return {
                link: link,
                restrict: 'A',
                require: 'ngModel',
                scope: false
            };

            function link(scope, element, attrs, ngModel) {
                element.on('keydown', function() {
                    ngModel.$setValidity('mongoose', true);
                });
            }
        });
})();
