(function() {
    'use strict';

    angular
        .module('CrossoverApp')
        .controller('FlixerAdminJobs', FlixerAdminJobs);

    FlixerAdminJobs.$inject = [];

    /* @ngInject */
    function FlixerAdminJobs() {
        var vm = this;
    }
})();
