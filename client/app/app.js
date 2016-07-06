(function() {
    'use strict';

    angular
        .module('CrossoverApp', [
            'ngCookies',
            'ngResource',
            'ngSanitize',
            'ui.router',
            'ui.bootstrap',
            'pascalprecht.translate',//delete
            'tmh.dynamicLocale',//delete
            'ngDialog',//modal
            'vsGoogleAutocomplete',//autocomplete input google maps
            'validation.match',//validate password
            'CrossoverApp.recaptchaService',
            'CrossoverApp.breadcrumbs',//quedo bueno ver
            'CrossoverApp.mailService',//delete, para mandar mails
            'CrossoverApp.userService',
            'CrossoverApp.ngHeader',
            'CrossoverApp.ngFooter',
            'CrossoverApp.mongooseErrors'
        ]);
})();
