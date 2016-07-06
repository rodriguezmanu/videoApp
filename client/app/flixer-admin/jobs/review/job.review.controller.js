(function() {
    'use strict';

    angular
        .module('CrossoverApp')
        .controller('JobReviewCtrl', JobReviewCtrl);

    JobReviewCtrl.$inject = ['Job', 'UserService', '$state', 'LocaleService', 'uiGmapGoogleMapApi',
        'ngDialog', 'constantValues', 'JobService', '$timeout', '$scope'
    ];

    /* @ngInject */
    function JobReviewCtrl(Job, UserService, $state, LocaleService, uiGmapGoogleMapApi, ngDialog,
        constantValues, JobService, $timeout, $scope) {
        var vm = this;
        vm.save = save;
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
                UserService.getUser(vm.job.flixerId, function(response) {
                    vm.user = response.data.user;
                });
            } else {
                $state.go('root.home.error-page', {
                    id: response.status.code
                });
            }
        });

        function save() {
            ngDialog.open({
                template: 'app/flixer-admin/jobs/review/review-modal.html',
                showClose: true,
                resolve: {
                    job: function() {
                        return vm.job;
                    }
                },
                closeByDocument: false,
                appendClassName: 'modal-confirm',
                controller: 'ReviewModalCtrl',
                controllerAs: 'vm'
            });
        }
    }
})();
