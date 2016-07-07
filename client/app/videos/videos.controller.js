(function() {
    'use strict';

    angular
        .module('CrossoverApp')
        .controller('VideosCtrl', VideosCtrl);

    VideosCtrl.$inject = ['VideosService', '$stateParams', '$sce', '$scope'];

    /* @ngInject */
    function VideosCtrl(VideosService, $stateParams, $sce, $scope) {
        var vm = this,
            apiCollection = [];
        vm.getVideos = getVideos;
        vm.getSingleVideo = getSingleVideo;
        vm.setRating = setRating;
        vm.stopAllVideos = stopAllVideos;
        vm.onPlayerReady = onPlayerReady;

        function onPlayerReady($API, id) {
            $API.idVideo = id;
            apiCollection.push($API)
        };

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
        } else {
            getVideos();
        }

        function getVideos() {
            VideosService.getVideos()
            .then(function(response) {
                if (response.status === 'success') {
                    vm.videos = response.data;
                    getAverageRankings(response.data);
                } else if (response.status === 'error') {
                    vm.errors = response.error;
                }
            })
            .catch(function(err) {
                vm.errors = response.error;
            });
        }

        function getSingleVideo() {
            VideosService.getSingleVideo($stateParams.id)
            .then(function(response) {
                if (response.status === 'success') {
                    vm.video = response.data;
                    // vm.video.url = 'http://localhost:3000/' + response.data.url;
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
            console.log(videoId, value);
            VideosService.setRating(videoId, value)
            .then(function(response) {
                if (response.status === 'success') {
                    getAverageRanking(response.data)
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
                data[i].avgRating = avg;
            }
        }

        function getAverageRanking(data) {
            var avg = 0,
                sum = 0;
            for (var i = 0; i < data.ratings.length; i++) {
                sum += data.ratings[i];
            }
            avg = sum / i;
            vm.video.avgRating = avg;
        }
    }
})();
