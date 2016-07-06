(function() {
    'use strict';

    angular
        .module('CrossoverApp')
        .controller('JobActiveCtrl', JobActiveCtrl);

    JobActiveCtrl.$inject = [
        'Job',
        'UserService',
        '$state',
        'LocaleService',
        'uiGmapGoogleMapApi',
        'ngDialog',
        'constantValues',
        '$scope'
    ];

    /* @ngInject */
    function JobActiveCtrl(Job, UserService, $state, LocaleService, uiGmapGoogleMapApi,
        ngDialog, constantValues, $scope) {
        var vm = this;
        vm.timeFormatting = timeFormatting;
        vm.openModal = openModal;
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
            } else {
                $state.go('root.home.error-page', {
                    id: response.status.code
                });
            }
        });

        function timeFormatting(schedule) {
            return moment(schedule).tz(vm.job.address.timezone).locale(LocaleService.getLocaleCode()).format('LLLL');
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
