(function() {
    'use strict';

    angular
        .module('CrossoverApp')
        .controller('FlixerGetJobList', FlixerGetJobList);

    FlixerGetJobList.$inject = ['$state'];

    function FlixerGetJobList($state) {
        var vm = this;
        vm.getDetail = getDetail;

        function getDetail() {
            $state.go('root.home.flixer.get-job-list.job', {
                jobId: '56f2b882dc4d23d555c5d4fb'
            });
        }
    }
})();
