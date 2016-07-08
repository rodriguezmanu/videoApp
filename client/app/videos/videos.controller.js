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

        //agregar la variable de vm.server con localghost:3000 con ngconstant

        vm.getVideos = getVideos;
        vm.getSingleVideo = getSingleVideo;
        vm.setRating = setRating;
        vm.stopAllVideos = stopAllVideos;
        vm.onPlayerReady = onPlayerReady;
        vm.serverBackEnd = appConstants.serverBackEnd;
        vm.busy = false;

        function onPlayerReady($API, id) {
            $API.idVideo = id;
            apiCollection.push($API);
        }

        function stopAllVideos(id) {
            angular.forEach(apiCollection, function (value) {
                if (value.idVideo !== id) {
                    value.pause();
                }
            });
        }

        //mejorar esto, cambiar de conroladores o recorrer directamente en el resolve de ui router
        if ($stateParams.id) {
            getSingleVideo();
        }

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
