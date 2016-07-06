(function() {
    'use strict';

    angular
        .module('CrossoverApp')
        .directive('translateLanguageSelect', translateLanguageSelect);

    function translateLanguageSelect() {
        return {
            restrict: 'AE',
            templateUrl: 'components/directives/translateSelect/translateSelect.html',
            controller: TranslateLanguageSelectCtrl,
            controllerAs: 'TranslateLanguageSelectVm'
        };
    }
    TranslateLanguageSelectCtrl.$inject = [
        'LocaleService'
    ];

    /**
     * @ngInject
     */
    function TranslateLanguageSelectCtrl(LocaleService) {
        var vm = this;

        vm.currentLocaleDisplayName = LocaleService.getLocaleDisplayName();
        vm.localesDisplayNames = LocaleService.getLocalesDisplayNames();
        vm.visible = vm.localesDisplayNames && vm.localesDisplayNames.length > 1;

        LocaleService.setInit();

        vm.changeLanguage = changeLanguage;
        function changeLanguage(locale) {
            vm.currentLocaleDisplayName = locale;
            LocaleService.setLocaleByDisplayName(locale);
        }
    }
})();
