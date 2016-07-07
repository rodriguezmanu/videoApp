(function() {
    'use strict';

    angular
        .module('CrossoverApp')
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
            })
            .state('root.home.video', {
                url: '^/video/:id',
                authenticate: true,
                views: {
                    '@': {
                        templateUrl: 'app/videos/video-details.html',
                        controller: 'VideosCtrl',
                        controllerAs: 'vm'
                    }
                }
            });
       });
})();
