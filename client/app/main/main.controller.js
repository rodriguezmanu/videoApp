(function() {
    'use strict';

    angular
        .module('CrossoverApp')
        .controller('MainCtrl', MainCtrl);

    MainCtrl.$inject = ['VideosService', '$stateParams'];

    /* @ngInject */
    function MainCtrl(VideosService, $stateParams) {
        var vm = this;
        vm.getVideos = getVideos;
        vm.getSingleVideo = getSingleVideo;
        console.log($stateParams.id);
        if ($stateParams.id) {
            console.log("msg");
            getSingleVideo();
        } else {
            getVideos();
        }

        function getVideos() {
            VideosService.getVideos()
            .then(function(response) {
                console.log(response);
                if (response.status === 'success') {
                    vm.videos = response.data;
                    //hacer un promedio de los rankings
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
                console.log(response);
                if (response.status === 'success') {
                    console.log(response);
                    vm.videos = response.data;
                    //hacer un promedio de los rankings
                } else if (response.status === 'error') {
                    vm.errors = response.error;
                }
            })
            .catch(function(err) {
                vm.errors = response.error;
            });
        }
    }
})();
