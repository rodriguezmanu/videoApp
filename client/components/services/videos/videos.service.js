(function() {
    /*jshint validthis:true */
    'use strict';

    angular
        .module('VideoApp.videosService')
        .service('VideosService', VideosService);

    VideosService.$inject = ['$http', 'UsersService', '$q', 'appConstants'];

    /* @ngInject */
    function VideosService($http, UsersService, $q, appConstants) {
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

            $http.get(
                `${appConstants.serverBackEnd}videos?sessionId=${UsersService.getSessionId()}${skipParam}${limitParam}`
            )
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
            $http.get(`${appConstants.serverBackEnd}video?sessionId=${UsersService.getSessionId()}&videoId=${id}`)
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
            $http.post(`${appConstants.serverBackEnd}video/ratings?sessionId=${UsersService.getSessionId()}`, {
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
