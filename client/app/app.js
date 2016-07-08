(function() {
    'use strict';

    angular
        .module('CrossoverApp', [
            'ngCookies',
            'ngSanitize',
            'ui.router',
            'ui.bootstrap',
            'angular-md5',
            'com.2fdevs.videogular',
            'com.2fdevs.videogular.plugins.controls',
            'com.2fdevs.videogular.plugins.overlayplay',
            'CrossoverApp.appConstants',
            'CrossoverApp.usersService',
            'CrossoverApp.videosService',
            'CrossoverApp.ngHeader',
            'CrossoverApp.limitHtml',
            'CrossoverApp.whenScrolled'
        ]);
})();
