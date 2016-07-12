(function() {
    'use strict';

    angular
        .module('VideoApp', [
            'ngCookies',
            'ngSanitize',
            'ui.router',
            'ui.bootstrap',
            'angular-md5',
            'com.2fdevs.videogular',
            'com.2fdevs.videogular.plugins.controls',
            'com.2fdevs.videogular.plugins.overlayplay',
            'VideoApp.appConstants',
            'VideoApp.usersService',
            'VideoApp.videosService',
            'VideoApp.ngHeader',
            'VideoApp.limitHtml',
            'VideoApp.whenScrolled'
        ]);
})();
