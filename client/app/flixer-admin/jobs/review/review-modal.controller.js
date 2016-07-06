(function() {
    'use strict';

    angular
        .module('CrossoverApp')
        .controller('ReviewModalCtrl', ReviewModalCtrl);

    ReviewModalCtrl.$inject = ['job', 'constantValues', 'JobService', '$timeout', '$scope', '$state'];

    /* @ngInject */
    function ReviewModalCtrl(job, constantValues, JobService, $timeout, $scope, $state) {
        var vm = this;
        vm.job = job;
        vm.showProgress = false;
        vm.submit = submit;
        vm.disapproved = vm.job.media.filter(function(value) {
            return !value.approved;
        });

        function submit() {
            vm.showProgress = true;
            var action = constantValues().jobActions.externalValidation;
            var body = vm.job;

            // if at less one media disapproved, send it to REDO.
            // if all media approved send it to EXTERNAL VALIDATION
            if (vm.disapproved.length > 0) {
                action = constantValues().jobActions.redo;
                body = vm.job.media;
            }

            JobService.actionsJobs(action, vm.job._id, body, function(response) {
                if (response.status !== 200) {
                    vm.showProgress = false;
                    vm.message = 'common.errorMessage';
                } else {
                    vm.message = 'common.succedMessage';
                    $timeout(function() {
                        $scope.closeThisDialog();
                        $state.go('root.home.flixer-admin.jobs');
                    }, 3000);
                }
            });
        }
    }
})();
