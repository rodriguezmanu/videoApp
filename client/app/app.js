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
            'angular-md5',
            'CrossoverApp.usersService',
            'CrossoverApp.videosService',
            'CrossoverApp.ngHeader',
            'CrossoverApp.limitHtml',
            'com.2fdevs.videogular',
            'com.2fdevs.videogular.plugins.controls',
            'com.2fdevs.videogular.plugins.overlayplay'
        ]);
})();
