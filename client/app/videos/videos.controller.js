(function() {
    'use strict';

    angular
        .module('CrossoverApp')
        .controller('VideosCtrl', VideosCtrl);

    VideosCtrl.$inject = ['VideosService', '$stateParams', 'appConstants'];

    /* @ngInject */
    function VideosCtrl(VideosService, $stateParams, appConstants) {
        var vm = this,
            apiCollection = [];

        vm.getVideos = getVideos;
        vm.getSingleVideo = getSingleVideo;
        vm.setRating = setRating;
        vm.stopAllVideos = stopAllVideos;
        vm.onPlayerReady = onPlayerReady;
        vm.getAverageRanking = getAverageRanking;
        vm.getAverageRankings = getAverageRankings;
        vm.serverBackEnd = appConstants.serverBackEnd;
        vm.busy = false;

        //mejorar esto, cambiar de conroladores o recorrer directamente en el resolve de ui router
        if ($stateParams.id) {
            getSingleVideo();
        } else {
            getVideos();
        }

        /**
         * Save on load event all videos handlers in an array
         * @param  {Object} $API Relative to videogular dependencie
         * @param  {String} id
         */
        function onPlayerReady($API, id) {
            $API.idVideo = id;
            apiCollection.push($API);
        }

        /**
         * Avoid multiple play videos
         * @param  {String} id
         */
        function stopAllVideos(id) {
            angular.forEach(apiCollection, function (value) {
                if (value.idVideo !== id) {
                    value.pause();
                }
            });
        }

        /**
         * Get all videos form back end, adding average ratings and work with
         * scroll in order to load more videos
         */
        function getVideos() {
            if (vm.busy) {
                return;
            }
            vm.busy = true;
            var itemsDom = angular.element('.video').length,
                items = (itemsDom === 0) ? 10 : itemsDom += 2;

            VideosService.getVideos(items)
            .then(function(response) {
                if (response.status === 'success') {
                    vm.videos = response.data;
                    getAverageRankings(response.data);
                    vm.busy = false;
                } else if (response.status === 'error') {
                    vm.errors = response.error;
                }
            })
            .catch(function(err) {
                vm.errors = err.error;
            });
        }

        /**
         * Get a single video and add average rating for video detail
         */
        function getSingleVideo() {
            VideosService.getSingleVideo($stateParams.id)
            .then(function(response) {
                if (response.status === 'success') {
                    vm.video = response.data;
                    getAverageRanking(response.data);
                } else if (response.status === 'error') {
                    vm.errors = response.error;
                }
            })
            .catch(function(err) {
                vm.errors = err.error;
            });
        }

        /**
         * Set new rating
         * @param {String} videoId
         * @param {Int} value
         */
        function setRating(videoId, value) {
            VideosService.setRating(videoId, value)
            .then(function(response) {
                if (response.status === 'success') {
                    getAverageRanking(response.data);
                } else if (response.status === 'error') {
                    vm.errors = response.error;
                }
            })
            .catch(function(err) {
                vm.errors = err.error;
            });
        }

        /**
         * Get average ratings for all videos
         * @param  {Object} data
         */
        function getAverageRankings(data) {
            for (var i = 0; i < data.length; i++) {
                var avg = 0,
                    sum = 0;
                for (var j = 0; j < data[i].ratings.length; j++) {
                    sum += data[i].ratings[j];
                }
                avg = sum / j;
                data[i].avgRating = Math.round(avg);
            }
        }

        /**
         * Get average rating for a single video
         * @param  {Object} data
         */
        function getAverageRanking(data) {
            var avg = 0,
                sum = 0;
            for (var i = 0; i < data.ratings.length; i++) {
                sum += data.ratings[i];
            }
            avg = sum / i;
            avg = Math.round(avg * 10) / 10;
            vm.video.avgRating = Math.round(avg);
        }
    }
})();
