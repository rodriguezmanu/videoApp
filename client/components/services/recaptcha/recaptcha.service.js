(function() {
    'use strict';

    angular
        .module('CrossoverApp.recaptchaService')
        .service('recaptchaService', RecaptchaService);

    RecaptchaService.$inject = ['$http'];

    /* @ngInject */
    function RecaptchaService($http) {
        this.checkCaptcha = checkCaptcha;

        function checkCaptcha(hash) {
            return $http({
                method: 'POST',
                url: '/api/reCaptcha',
                data: {
                    response: hash
                }
            });
        }
    }
})();
