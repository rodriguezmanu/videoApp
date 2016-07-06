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
            'CrossoverApp.userService',//delete
            'CrossoverApp.usersService',
            'CrossoverApp.videosService',
            'CrossoverApp.ngHeader',
            'angular-md5'
        ]);
})();
