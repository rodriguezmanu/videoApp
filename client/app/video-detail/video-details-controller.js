(function() {
    'use strict';
    angular
        .module('CrossoverApp')
        .controller('VideosDetailsCtrl', VideosDetailsCtrl);

    VideosDetailsCtrl.$inject = ['getSingleVideo', 'appConstants', 'VideosService'];

    /* @ngInject */
    function VideosDetailsCtrl(getSingleVideo, appConstants, VideosService) {
        var vm = this;

        vm.setRating = setRating;
        vm.getAverageRanking = getAverageRanking;
        vm.serverBackEnd = appConstants.serverBackEnd;

        activate();

        function activate() {
            vm.video = getSingleVideo;
            getAverageRanking(getSingleVideo);
        }

        /**
         * Set new rating for single video
         * @param {String} videoId
         * @param {Int} value
         */
        function setRating(videoId, value) {
            vm.errors = null;
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
