(function() {
    'use strict';

    angular
        .module('CrossoverApp')
        .controller('JobUploadCtrl', JobUploadCtrl);

    JobUploadCtrl.$inject = [
        'Job',
        '$state',
        'LocaleService',
        'uiGmapGoogleMapApi',
        'constantValues',
        'kalturaConstants',
        'ngDialog',
        '$scope'
    ];

    /* @ngInject */
    function JobUploadCtrl(Job, $state, LocaleService, uiGmapGoogleMapApi, constantValues,
        kalturaConstants, ngDialog, $scope) {
        var vm = this;
        vm.uiGmapGoogleMapApi = uiGmapGoogleMapApi;
        vm.imageFormats = constantValues().formats.photo;
        vm.videoFormats = constantValues().formats.video;
        vm.imageAndVideosFormats = vm.imageFormats.concat(vm.videoFormats);
        vm.save = save;
        vm.photoLimit = 10;
        vm.videoLimit = 2;
        vm.material = {};

        function getMediaType(mediaType) {
            var type;
            if (mediaType === 1) {
                type = 'video';
            }
            if (mediaType === 2) {
                type = 'photo';
            }
            return type;
        }

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
            } else {
                $state.go('root.home.error-page', {
                    id: response.status.code
                });
            }
        });

        function openModal() {
            ngDialog.open({
                template: 'app/flixer/flixer-board/upload/upload-modal.html',
                showClose: true,
                resolve: {
                    job: function() {
                        return vm.job;
                    }
                },
                closeByDocument: false,
                appendClassName: 'modal-confirm',
                controller: 'ConfirmUploadModalCtrl',
                controllerAs: 'vm'
            });
        }

        function save() {
            if (vm.material.filesToUpload.length === (vm.photoLimit + vm.videoLimit)) {
                var sample = {};
                angular.forEach(vm.material.filesToUpload, function(file) {
                    sample = {
                        entryId: file.id,
                        type: getMediaType(file.mediaType),
                        thumbnail: file.thumbnailUrl
                    };
                    if (file.mediaType === 1) {
                        sample.iframe =
                            '<iframe src="//cdnapi.kaltura.com/p/' + kalturaConstants.pid + '/sp/' +
                            kalturaConstants.uiconfid + '/embedIframeJs/uiconf_id/' +
                            kalturaConstants.uiconfid + '/partner_id/' + kalturaConstants.pid +
                            '?iframeembed=true&playerId=videoPlayer&entry_id=' +
                            file.id + '&flashvars[streamerType]=auto" width="560" height="395" allowfullscreen ' +
                            'webkitallowfullscreen mozAllowFullScreen frameborder="0"></iframe>';
                    }
                    vm.job.media.push(sample);
                });
                openModal();
            }
        }
    }
})();
