(function() {
    'use strict';

    angular
        .module('CrossoverApp', [
            'ngCookies',
            'ngSanitize',
            'ui.router',
            'ui.bootstrap',
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
