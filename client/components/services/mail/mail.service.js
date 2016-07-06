(function() {
    'use strict';

    angular
        .module('CrossoverApp.mailService')
        .service('mailService', MailService);

    MailService.$inject = ['$http', 'LocaleService'];

    /* @ngInject */
    function MailService($http, LocaleService) {
        this.sendMail = sendMail;

        function sendMail(data) {
            return $http({
                method: 'POST',
                url: '/api/mail/sender',
                data: {
                    response: data,
                    data: data.emailOpts,
                    language: LocaleService.getLocaleCode(),
                    template: data.template
                }
            });
        }
    }
})();
