(function() {
    'use strict';

    angular
        .module('CrossoverApp')
        .config(configuration);
    //agregar
    // configuration.$inject = ['$location', '$rootScope', '$http', 'User', '$cookieStore', '$q', 'constantValues'];

    /* @ngInject */
    function configuration(
        $urlRouterProvider,
        $locationProvider,
        $httpProvider,
        tmhDynamicLocaleProvider,
        $translateProvider,
        constantValues
    ) {
        $urlRouterProvider.otherwise('/');

        $locationProvider.html5Mode(true);
        $httpProvider.interceptors.push('authInterceptor');

        translateHandler();//delete it

        function translateHandler() {
            $translateProvider.useStaticFilesLoader({
                prefix: 'i18n/locale-',
                suffix: '.json'
            });
            $translateProvider.preferredLanguage(constantValues().LOCALES.preferredLocale);
            $translateProvider.useLocalStorage();
            $translateProvider.useSanitizeValueStrategy('sanitize');

            // put it into debug mode
            $translateProvider.useMissingTranslationHandlerLog(); // warns about missing translates

            tmhDynamicLocaleProvider
                .localeLocationPattern('/bower_components/angular-i18n/angular-locale_{{locale}}.js');
        }
    }
})();
