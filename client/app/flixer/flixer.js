(function() {
    'use strict';

    angular
        .module('CrossoverApp')
        .config(function($stateProvider, constantValues) {
            $stateProvider
                .state('root.home.flixer', {
                    url: '^/flixer-board',
                    authenticate: true,
                    parent: 'root.home',
                    ncyBreadcrumb: {
                        label: 'breadcrumbs.flixer.flixer-board'
                    },
                    data: {
                        role: constantValues().roles.flixer
                    },
                    views: {
                        '@': {
                            templateUrl: 'app/flixer/flixer-board/flixer-board.html',
                            controller: 'FlixerBoardCtrl',
                            controllerAs: 'vm'
                        }
                    }
                })
                .state('root.home.flixer.job-info', {
                    url: '/:jobId/info',
                    authenticate: true,
                    data: {
                        role: constantValues().roles.flixer
                    },
                    ncyBreadcrumb: {
                        label: 'breadcrumbs.flixer.flixer-board.job-info'
                    },
                    views: {
                        '@': {
                            templateUrl: 'app/flixer/flixer-board/info/job-info.html',
                            controller: 'JobInfoCtrl',
                            controllerAs: 'vm'
                        }
                    }
                })
                .state('root.home.flixer.job-upload', {
                    url: '/:jobId/upload',
                    authenticate: true,
                    data: {
                        role: constantValues().roles.flixer
                    },
                    ncyBreadcrumb: {
                        label: 'breadcrumbs.flixer.flixer-board.job-upload'
                    },
                    views: {
                        '@': {
                            templateUrl: 'app/flixer/flixer-board/upload/job-upload.html',
                            controller: 'JobUploadCtrl',
                            controllerAs: 'vm'
                        }
                    }
                })
                .state('root.home.flixer.job-edit', {
                    url: '/:jobId/edit',
                    authenticate: true,
                    data: {
                        role: constantValues().roles.flixer
                    },
                    ncyBreadcrumb: {
                        label: 'breadcrumbs.flixer.flixer-board.job-edit'
                    },
                    views: {
                        '@': {
                            templateUrl: 'app/flixer/flixer-board/edit/job-edit.html',
                            controller: 'JobEditCtrl',
                            controllerAs: 'vm'
                        }
                    }
                })
                .state('root.home.flixer.get-job-list', {
                    url: '/get-job',
                    authenticate: true,
                    data: {
                        role: constantValues().roles.flixer
                    },
                    ncyBreadcrumb: {
                        label: 'breadcrumbs.flixer.flixer-board.jobs'
                    },
                    views: {
                        '@': {
                            templateUrl: 'app/flixer/get-job-list/flixer.get-job-list.html',
                            controller: 'FlixerGetJobList',
                            controllerAs: 'vm'
                        }
                    }
                })
                .state('root.home.flixer.get-job-list.job', {
                    url: '/:jobId/detail',
                    authenticate: true,
                    data: {
                        role: constantValues().roles.flixer
                    },
                    ncyBreadcrumb: {
                        label: 'breadcrumbs.flixer-admin.job.job-detail'
                    },
                    views: {
                        '@': {
                            templateUrl: 'app/flixer/get-job-list/job-detail/job-detail.html',
                            controller: 'JobDetailCtrl',
                            controllerAs: 'vm'
                        }
                    }
                });
        });
})();
