(function() {
    'use strict';

    angular
        .module('CrossoverApp')
        .controller('ConfirmUploadModalCtrl', ConfirmUploadModalCtrl);

    ConfirmUploadModalCtrl.$inject = [
        'job',
        'constantValues',
        'LocaleService',
        'JobService',
        '$timeout',
        '$scope',
        '$state'
    ];

    /* @ngInject */
    function ConfirmUploadModalCtrl(job, constantValues, LocaleService,
        JobService, $timeout, $scope, $state) {
        var vm = this;
        vm.job = job;
        vm.showProgress = false;
        vm.submit = submit;

        function submit() {
            vm.showProgress = true;
            JobService.actionsJobs(constantValues().jobActions.upload, vm.job._id, vm.job.media, function(response) {
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
