(function() {
    'use strict';

    angular
        .module('CrossoverApp')
        .controller('PageErrorCtrl', PageErrorCtrl);

    PageErrorCtrl.$inject = ['$stateParams'];

    /* @ngInject */
    function PageErrorCtrl($stateParams) {
        var vm = this;
        vm.errorCode = $stateParams.id;
    }
})();
