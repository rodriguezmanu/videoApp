(function() {
    'use strict';

    angular
        .module('CrossoverApp')
        .controller('JobDetailCtrl', JobDetailCtrl);

    JobDetailCtrl.$inject = [
        'Job',
        'LocaleService',
        'constantValues',
        'uiGmapGoogleMapApi',
        '$state',
        'UserService',
        'ngDialog',
        '$scope'
    ];

    /* @ngInject */
    function JobDetailCtrl(Job, LocaleService, constantValues, uiGmapGoogleMapApi,
        $state, UserService, ngDialog, $scope) {
        var vm = this;
        vm.timeFormatting = timeFormatting;
        vm.user = UserService.getCurrentUser();
        vm.selected = {
            flixerId: undefined,
            scheduled: undefined
        };
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
            vm.selected.flixerId = vm.user._id;
            ngDialog.open({
                template: 'app/flixer/get-job-list/job-detail/take-modal.html',
                showClose: true,
                resolve: {
                    selected: function() {
                        return vm.selected;
                    },
                    job: function() {
                        return vm.job;
                    }
                },
                closeByDocument: false,
                appendClassName: 'modal-confirm',
                controller: 'TakeModalCtrl',
                controllerAs: 'vm'
            });
        }
    }
})();
