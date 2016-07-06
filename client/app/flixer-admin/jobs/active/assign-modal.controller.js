(function() {
    'use strict';

    angular
        .module('CrossoverApp')
        .controller('AssignModalCtrl', AssignModalCtrl);

    AssignModalCtrl.$inject = ['job', 'flixers', 'UserService', 'constantValues',
        'LocaleService', 'JobService', '$timeout', '$scope', '$state'
    ];

    /* @ngInject */
    function AssignModalCtrl(job, flixers, UserService, constantValues, LocaleService,
        JobService, $timeout, $scope, $state) {
        var vm = this;
        vm.job = job;
        vm.flixers = flixers;
        vm.getMatchingFlixers = getMatchingFlixers;
        vm.selectedFlixer = undefined;
        vm.onSelectFlixer = onSelectFlixer;
        vm.timeFormatting = timeFormatting;
        vm.selected = {
            flixer: undefined,
            time: undefined
        };
        vm.message = null;
        vm.errors = null;
        vm.disabled = false;
        vm.submit = submit;

        function timeFormatting(schedule) {
            return moment(schedule).tz(vm.job.address.timezone).locale(LocaleService.getLocaleCode()).format('LLLL');
        }

        function onSelectFlixer($item, $model, $label) {
            vm.selected.flixer = $item;
        }

        function getMatchingFlixers($viewValue) {
            var matchingFlixers = [];
            for (var i = 0; i < vm.flixers.length; i++) {
                if (
                    vm.flixers[i].contact.firstName.toLowerCase()
                    .indexOf($viewValue.toLowerCase()) !== -1 ||
                    vm.flixers[i].contact.lastName.toLowerCase()
                    .indexOf($viewValue.toLowerCase()) !== -1 ||
                    vm.flixers[i].contact.lastName.toLowerCase()
                    .concat(' ' + vm.flixers[i].contact.firstName
                        .toLowerCase()).indexOf($viewValue.toLowerCase()) !== -1 ||
                    vm.flixers[i].contact.firstName
                    .toLowerCase().concat(' ' + vm.flixers[i]
                        .contact.lastName.toLowerCase())
                    .indexOf($viewValue.toLowerCase()) !== -1) {
                    matchingFlixers.push(vm.flixers[i]);
                }
            }
            return matchingFlixers;
        }

        function submit() {
            vm.disabled = true;
            var data = {
                flixerId: vm.selected.flixer._id,
                scheduled: vm.selected.time
            };
            JobService.actionsJobs(constantValues().jobActions.assign, vm.job._id, data, function(response) {
                if (response.status !== 200) {
                    vm.errors = 'common.errorMessage';
                    vm.message = null;
                    vm.disabled = false;
                } else {
                    vm.message = 'common.succedMessage';
                    vm.errors = null;
                    $timeout(function() {
                        $scope.closeThisDialog(response.data.job);
                        $state.go('root.home.flixer-admin.jobs.assigned', {
                            jobId: response.data.job._id
                        }, {reload: true});
                    }, 3000);
                }
            });
        }
    }
})();
