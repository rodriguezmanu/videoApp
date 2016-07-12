/* jshint -W117, -W030 */
'use strict';

describe('Filter: Limit Filter', function () {

    beforeEach(module('VideoApp'));

    var filter;

    beforeEach(inject(function (_$filter_) {
        filter = _$filter_;
    }));

    it('should Adding just ... a string', function () {
        var foo = 'hello world',
            result;
        result = filter('limitHtml')(foo);
        expect(result).toEqual('hello world...');
    });
});
