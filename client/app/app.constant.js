/* jslint camelcase: false */
/*jscs:disable requireCamelCaseOrUpperCaseIdentifiers */
(function() {
    'use strict';

    angular
        .module('CrossoverApp')
        .constant('constantValues', constantValues);

    function constantValues() {
        return {
            LOCALES: {
                locales: {
                    pt: 'Portugues',
                    en_US: 'English'
                },
                preferredLocale: 'en_US'
            }
        };
    }
})();
