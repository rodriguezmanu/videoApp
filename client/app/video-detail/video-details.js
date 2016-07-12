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
                    getSingleVideo: function(VideosService, $state, $stateParams, $q) {
                        var deferred = $q.defer();
                        VideosService.getSingleVideo($stateParams.id)
                        .then(function(response) {
                            if (response.status === 'success') {
                                deferred.resolve(response.data);
                            } else if (response.status === 'error') {
                                deferred.reject(response);
                                $state.go('root.home.videos');
                            }
                        })
                        .catch(function(err) {
                            deferred.reject(err);
                            $state.go('root.home.videos');
                        });
                        return deferred.promise;
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
