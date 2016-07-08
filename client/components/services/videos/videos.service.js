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
        this.setRating = setRating;

        /**
        * Get All videos
        * @param  {Int} limit - optional
        * @param  {Int} skip - optional
        * @param  {Function} callback - optional
        * @return {Promise}
        */
        function getVideos(limit, skip, callback) {
            var cb = callback || angular.noop,
                deferred = $q.defer(),
                limitParam = '',
                skipParam = '';

            if (limit) {
                limitParam = `&limit=${limit}`;
            }

            if (skip) {
                skipParam = `&skip=${skip}`;
            }

            $http.get(`http://localhost:3000/videos?sessionId=${UsersService.getSessionId()}${skipParam}${limitParam}`)
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
            var cb = callback || angular.noop,
                deferred = $q.defer();
            //cambiar a es6
            $http.get('http://localhost:3000/video?sessionId=' + UsersService.getSessionId() + '&videoId=' + id)
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
        * Set rating to a video
        * @param  {String} id
        * @param  {String} rating
        * @param  {Function} callback - optional
        * @return {Promise}
        */
        function setRating(id, rating, callback) {
            var cb = callback || angular.noop,
                deferred = $q.defer();
            //cambiar a es6
            $http.post('http://localhost:3000/video/ratings?sessionId=' + UsersService.getSessionId(), {
                videoId: id,
                rating: rating
            })
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
