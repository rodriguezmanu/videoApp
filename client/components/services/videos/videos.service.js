(function() {
    'use strict';

    angular
        .module('CrossoverApp.videosService')
        .service('VideosService', VideosService);

    VideosService.$inject = ['$http', 'UsersService', '$q'];

    /* @ngInject */
    function VideosService($http, UsersService, $q) {
        this.getVideos = getVideos;
        this.getSingleVideo = getSingleVideo;

        /**
        * Get All videos
        * @param  {Object} options - optional
        * @param  {Function} callback - optional
        * @return {Promise}
        */
        function getVideos(options, callback) {
            //faltan las options
            var cb = callback || angular.noop;
            var deferred = $q.defer();

            $http.get('http://localhost:3000/videos?sessionId=' + UsersService.getSessionId())
            .success(function(data) {
                deferred.resolve(data);
                return cb();
            })
            .error(function(err) {
                deferred.reject(err);
                return cb(err);
            }.bind(this));
            return deferred.promise;
        }

        /**
        * Get single video
        * @param  {String} id
        * @param  {Function} callback - optional
        * @return {Promise}
        */
        function getSingleVideo(id, callback) {
            var cb = callback || angular.noop;
            var deferred = $q.defer();

            $http.get('http://localhost:3000/videos?sessionId=' + UsersService.getSessionId() + '&videoId=' + id)
            .success(function(data) {
                deferred.resolve(data);
                return cb();
            })
            .error(function(err) {
                deferred.reject(err);
                return cb(err);
            }.bind(this));
            return deferred.promise;
        }
    }
})();
