(function() {
    'use strict';

    angular
        .module('VideoApp')
        .config(function ($stateProvider) {
           $stateProvider
            .state('root.home.video', {
                url: '^/video/:id',
                authenticate: true,
                resolve: {
                    getSingleVideo: function(VideosService, $stateParams) {
                        return VideosService.getSingleVideo($stateParams.id);
                    }
                },
                views: {
                    '@': {
                        templateUrl: 'app/video-detail/video-details.html',
                        controller: 'VideosDetailsCtrl',
                        controllerAs: 'vm'
                    }
                }
            });
       });
})();
