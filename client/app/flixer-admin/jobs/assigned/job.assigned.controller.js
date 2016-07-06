(function() {
    'use strict';

    angular
        .module('CrossoverApp')
        .controller('JobAssignedCtrl', JobAssignedCtrl);

    JobAssignedCtrl.$inject = [
        'Job',
        'UserService',
        '$state',
        'LocaleService',
        'uiGmapGoogleMapApi',
        'ngDialog',
        'constantValues',
        '$scope',
        'JobService',
        '$timeout'
    ];

    /* @ngInject */
    function JobAssignedCtrl(Job, UserService, $state, LocaleService, uiGmapGoogleMapApi, ngDialog,
        constantValues, $scope, JobService, $timeout) {
        var vm = this;
        vm.releaseJob = releaseJob;
        vm.openModal = openModal;
        vm.message = null;
        vm.errors = null;
        vm.disabled = false;
        vm.uiGmapGoogleMapApi = uiGmapGoogleMapApi;

        vm.map = {
            center: {
                latitude: 51.219053,
                longitude: 4.404418
            },
            markers: [],
            zoom: 18
        };

        Job.get({
            id: $state.params.jobId
        }, function(response) {
            if (response.job) {
                vm.job = response.job;
                vm.job.timeFormatting = moment(vm.job.scheduled).tz(vm.job.address.timezone)
                    .locale(LocaleService.getLocaleCode()).format('LLLL');
                vm.uiGmapGoogleMapApi.then(function(maps) {
                    var geocoder = new maps.Geocoder();
                    geocoder.geocode({
                        address: vm.job.address.full
                    }, function(results, status) {
                        if (status === maps.GeocoderStatus.OK && results.length > 0) {
                            var location = results[0].geometry.location;

                            vm.map.markers.push({
                                id: 1,
                                latitude: location.lat(),
                                longitude: location.lng()
                            });

                            vm.map = {
                                center: {
                                    latitude: location.lat(),
                                    longitude: location.lng()
                                }
                            };
                        }
                    });
                });
                UserService.getUsersByRole(constantValues().roles.flixer, function(response) {
                    if (response.data.users) {
                        vm.flixers = response.data.users.filter(function filterFlixers(value) {
                            return value.flixerPostulation.status === constantValues().status.accepted;
                        });
                    } else {
                        $state.go('root.home.error-page', {
                            id: response.status.code
                        });
                    }
                });
                UserService.getUser(vm.job.flixerId, function(response) {
                    vm.user = response.data.user;
                });
            } else {
                $state.go('root.home.error-page', {
                    id: response.status.code
                });
            }
        });

        function releaseJob(id) {
            vm.disabled = true;
            JobService.actionsJobs(constantValues().jobActions.unassign, id, {}, function(response) {
                if (response.status !== 200) {
                    vm.errors = 'common.errorMessage';
                    vm.message = null;
                    vm.disabled = false;
                } else {
                    vm.message = 'common.succedMessage';
                    vm.errors = null;
                    $timeout(function() {
                        $state.go('root.home.flixer-admin.jobs');
                    }, 3000);
                }
            });
        }

        function openModal() {
            ngDialog.openConfirm({
                template: 'app/flixer-admin/jobs/active/assign-modal.html',
                controller: 'AssignModalCtrl',
                controllerAs: 'vm',
                scope: $scope,
                resolve: {
                    job: function() {
                        return vm.job;
                    },
                    flixers: function() {
                        return vm.flixers;
                    }
                },
                showClose: false,
                closeByEscape: false,
                closeByDocument: false
            });
        }
    }
})();
