(function() {
    'use strict';

    angular
        .module('CrossoverApp')
        .config(function($stateProvider, constantValues) {
            $stateProvider
                .state('root.home.flixer-admin', {
                    parent: 'root.home',
                    authenticate: true,
                    data: {
                        role: constantValues().roles.flixerAdmin
                    },
                    url: '^/flixer-admin',
                    views: {
                        '@': {
                            templateUrl: 'app/flixer-admin/main-board/main-board.html',
                            controller: 'MainBoardCtrl',
                            controllerAs: 'vm',
                        }
                    },
                    ncyBreadcrumb: {
                        label: 'breadcrumbs.flixer-admin.main-board'
                    }
                })
                .state('root.home.flixer-admin.flixers', {
                    url: '/flixers',
                    authenticate: true,
                    data: {
                        role: constantValues().roles.flixerAdmin
                    },
                    ncyBreadcrumb: {
                        label: 'breadcrumbs.flixer-admin.flixers'
                    },
                    views: {
                        '@': {
                            templateUrl: 'app/flixer-admin/flixers/flixer-admin-flixers.html',
                            controller: 'FlixerAdminFlixers',
                            controllerAs: 'vm'
                        }
                    }
                })
                .state('root.home.flixer-admin.flixers.flixer-detail', {
                    authenticate: true,
                    data: {
                        role: constantValues().roles.flixerAdmin
                    },
                    url: '/:flixerId/detail',
                    views: {
                        '@': {
                            templateUrl: 'app/flixer-admin/flixers/flixer-detail/flixer-detail.html',
                            controller: 'FlixerDetailCtrl',
                            controllerAs: 'vm',
                        }
                    },
                    ncyBreadcrumb: {
                        label: 'breadcrumbs.flixer.flixer-detail'
                    }
                })
                .state('root.home.flixer-admin.jobs', {
                    url: '/jobs',
                    authenticate: true,
                    data: {
                        role: constantValues().roles.flixerAdmin
                    },
                    ncyBreadcrumb: {
                        label: 'breadcrumbs.flixer-admin.jobs'
                    },
                    views: {
                        '@': {
                            templateUrl: 'app/flixer-admin/jobs/flixer-admin-jobs.html',
                            controller: 'FlixerAdminJobs',
                            controllerAs: 'vm'
                        }
                    }
                })
                .state('root.home.flixer-admin.jobs.active', {
                    authenticate: true,
                    data: {
                        role: constantValues().roles.flixerAdmin
                    },
                    url: '/:jobId/active',
                    views: {
                        '@': {
                            templateUrl: 'app/flixer-admin/jobs/active/job.active.html',
                            controller: 'JobActiveCtrl',
                            controllerAs: 'vm'
                        }
                    },
                    ncyBreadcrumb: {
                        label: 'breadcrumbs.flixer-admin.job.job-detail'
                    }
                })
                .state('root.home.flixer-admin.jobs.assigned', {
                    authenticate: true,
                    data: {
                        role: constantValues().roles.flixerAdmin
                    },
                    url: '/:jobId/assigned',
                    views: {
                        '@': {
                            templateUrl: 'app/flixer-admin/jobs/assigned/job.assigned.html',
                            controller: 'JobAssignedCtrl',
                            controllerAs: 'vm'
                        }
                    },
                    ncyBreadcrumb: {
                        label: 'breadcrumbs.flixer-admin.job.job-detail'
                    }
                })
                .state('root.home.flixer-admin.jobs.review', {
                    authenticate: true,
                    data: {
                        role: constantValues().roles.flixerAdmin
                    },
                    url: '/:jobId/review',
                    views: {
                        '@': {
                            templateUrl: 'app/flixer-admin/jobs/review/job.review.html',
                            controller: 'JobReviewCtrl',
                            controllerAs: 'vm'
                        }
                    },
                    ncyBreadcrumb: {
                        label: 'breadcrumbs.flixer-admin.job.job-detail'
                    }
                })
                .state('root.home.flixer-admin.jobs.view', {
                    authenticate: true,
                    data: {
                        role: constantValues().roles.flixerAdmin
                    },
                    url: '/:jobId/view',
                    views: {
                        '@': {
                            templateUrl: 'app/flixer-admin/jobs/view/job.view.html',
                            controller: 'JobViewCtrl',
                            controllerAs: 'vm'
                        }
                    },
                    ncyBreadcrumb: {
                        label: 'breadcrumbs.flixer-admin.job.job-detail'
                    }
                });
        });
})();
