(function() {
    'use strict';

    angular
        .module('CrossoverApp')
        .controller('MainCtrl', MainCtrl);

    MainCtrl.$inject = ['ngDialog'];

    /* @ngInject */
    function MainCtrl(ngDialog) {
        var vm = this;
    }
})();
