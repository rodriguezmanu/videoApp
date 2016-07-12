(function() {
    'use strict';

    angular
        .module('VideoApp')
        .config(function ($stateProvider) {
           $stateProvider
            .state('root.home.videos', {
                url: '^/videos',
                authenticate: true,
                views: {
                    '@': {
                        templateUrl: 'app/videos/videos.html',
                        controller: 'VideosCtrl',
                        controllerAs: 'vm'
                    }
                }
            });
       });
})();
