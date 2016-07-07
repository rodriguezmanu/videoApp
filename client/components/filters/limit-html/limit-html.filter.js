(function() {
    'use strict';

    angular
        .module('CrossoverApp.limitHtml')
        .filter('limitHtml', filter);

    function filter() {
        return filterFilter;

        function filterFilter(text, limit) {
            var changedString = String(text).replace(/<[^>]+>/gm, ''),
                 length = changedString.length,
                 result;

            result = changedString.length > limit ? changedString.substr(0, limit - 1) : changedString;
            return result + '...';
        }
    }
})();
