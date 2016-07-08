'use strict';

describe('Filter: Limit Filter', function () {

    beforeEach(module('CrossoverApp'));

    var filter

    beforeEach(inject(function (_$filter_) {
        filter = _$filter_;
    }));

    it('should Adding just ... a string', function () {
        var foo = 'hello world',
            result;
        result = filter('limitHtml')(foo);
        expect(result).toEqual('hello world...');
    });

    it('should Adding ... and cuting a string', function () {
        var foo = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium ab officia fugit voluptatum rerum iste recusandae quia corrupti provident perspiciatis.',
            result;

        result = filter('limitHtml')(foo);
        expect(result).toEqual('Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium ab officia fugit voluptatum rerum iste recusandae quia corrupti provident perspiciatis....');
    });
});
