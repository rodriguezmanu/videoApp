(function() {
    'use strict';

    angular
        .module('CrossoverApp')
        .controller('TakeModalCtrl', TakeModalCtrl);

    TakeModalCtrl.$inject = [
        'selected',
        'job',
        'constantValues',
        'LocaleService',
        'JobService',
        '$timeout',
        '$scope',
        '$state'
    ];

    /* @ngInject */
    function TakeModalCtrl(selected, job, constantValues, LocaleService,
        JobService, $timeout, $scope, $state) {
        var vm = this;
        vm.selected = selected;
        vm.job = job;
        vm.showProgress = false;
        vm.submit = submit;

        function submit() {
            vm.showProgress = true;
            JobService.actionsJobs(constantValues().jobActions.assign, vm.job._id, vm.selected, function(response) {
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
