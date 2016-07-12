(function() {
    'use strict';

    angular
        .module('VideoApp')
        .controller('VideosCtrl', VideosCtrl);

    VideosCtrl.$inject = ['VideosService', 'appConstants'];

    /* @ngInject */
    function VideosCtrl(VideosService, appConstants) {
        var vm = this,
            apiCollection = [];

        vm.getVideos = getVideos;
        vm.stopAllVideos = stopAllVideos;
        vm.onPlayerReady = onPlayerReady;
        vm.getAverageRankings = getAverageRankings;
        vm.serverBackEnd = appConstants.serverBackEnd;
        vm.busy = false;

        activate();

        function activate() {
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
         * Get all videos from back end, adding average ratings and work with
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
    }
})();
