(function() {
    'use strict';

    angular
        .module('CrossoverApp')
        .controller('VideosCtrl', VideosCtrl);

    VideosCtrl.$inject = ['VideosService', '$stateParams', '$sce'];

    /* @ngInject */
    function VideosCtrl(VideosService, $stateParams, $sce) {
        var vm = this;
        vm.getVideos = getVideos;
        vm.getSingleVideo = getSingleVideo;
        vm.setRating = setRating;
        vm.setServerVideo = setServerVideo;

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
                    console.log(response.data);
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

        function setServerVideo(video) {
            //poner variables para el server
            // no se por que no anda para los videos details
            // no se por que no anda en los 4 ultimos videos
            // no se por que hay que hacer refresh en la pagina para que se muestren los videos
            console.log('http://localhost:3000/' + video);
            return $sce.trustAsResourceUrl('http://localhost:3000/' + video);
            // trustAsUrl
        }
    }
})();
