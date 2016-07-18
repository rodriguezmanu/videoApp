(function() {
    'use strict';

    angular
        .module('VideoApp.videosService')
        .service('VideosService', VideosService);

    VideosService.$inject = ['$http', 'UsersService', '$q', 'appConstants', '$log'];

    /* @ngInject */
    function VideosService($http, UsersService, $q, appConstants, $log) {
        this.getVideos = getVideos;
        this.getSingleVideo = getSingleVideo;
        this.setRating = setRating;

        /**
        * Get All videos
        * @param  {Int} limit - optional
        * @param  {Int} skip - optional
        * @return {Promise}
        */
        function getVideos(limit, skip) {
            var limitParam = '',
                skipParam = '';

            if (limit) {
                limitParam = `&limit=${limit}`;
            }

            if (skip) {
                skipParam = `&skip=${skip}`;
            }

            return $http.get(
                `${appConstants.serverBackEnd}videos?sessionId=${UsersService.getSessionId()}${skipParam}${limitParam}`
                )
                .then(getVideosComplete)
                .catch(getVideosFailed);

            function getVideosComplete(response) {
                return response.data;
            }

            function getVideosFailed(error) {
                $log.error('XHR Failed for getVideos. ' + error.data.message);
                return error.data;
            }
        }

        /**
        * Get single video
        * @param  {String} id
        * @return {Promise}
        */
        function getSingleVideo(id) {
            return $http.get(
                `${appConstants.serverBackEnd}video?sessionId=${UsersService.getSessionId()}&videoId=${id}`
                )
                .then(getSingleVideoComplete)
                .catch(getSingleVideoFailed);

            function getSingleVideoComplete(response) {
                return response.data;
            }

            function getSingleVideoFailed(error) {
                $log.error('XHR Failed for getSingleVideo. ' + error.data.message);
                return error.data;
            }
        }

        /**
        * Set rating to a video
        * @param  {String} id
        * @param  {String} rating
        * @return {Promise}
        */
        function setRating(id, rating) {

            return $http.post(
                `${appConstants.serverBackEnd}video/ratings?sessionId=${UsersService.getSessionId()}`,
                {
                    videoId: id,
                    rating: rating
                })
                .then(setRatingComplete)
                .catch(setRatingFailed);

            function setRatingComplete(response) {
                return response.data;
            }

            function setRatingFailed(error) {
                $log.error('XHR Failed for setRating. ' + error.data.message);
                return error.data;
            }
        }
    }
})();
