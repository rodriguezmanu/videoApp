(function() {
    'use strict';

    angular
        .module('CrossoverApp')
        .controller('ConfirmEditModalCtrl', ConfirmEditModalCtrl);

    ConfirmEditModalCtrl.$inject = [
        'job',
        'constantValues',
        'LocaleService',
        'JobService',
        '$timeout',
        '$scope',
        '$state'
    ];

    /* @ngInject */
    function ConfirmEditModalCtrl(job, constantValues, LocaleService,
        JobService, $timeout, $scope, $state) {
        var vm = this;
        vm.job = job;
        vm.showProgress = false;
        vm.submit = submit;

        function getNewMedia(value) {
            return value.newFile;
        }

        function submit() {
            vm.showProgress = true;

            var newMedia = vm.job.media.filter(getNewMedia);

            JobService.actionsJobs(constantValues().jobActions.upload, vm.job._id, newMedia, function(response) {
                if (response.status !== 200) {
                    vm.showProgress = false;
                    vm.message = 'common.errorMessage';
                } else {
                    vm.message = 'common.succedMessage';
                    $timeout(function() {
                        $scope.closeThisDialog();
                        $state.go('root.home.flixer', {
                            reload: true
                        });
                    }, 3000);
                }
            });
        }
    }
})();
