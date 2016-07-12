/* jshint -W117, -W030 */
'use strict';

describe('Controller: VideosDetailsCtrl', function () {

    beforeEach(module('VideoApp'));

    var VideosDetailsCtrl,
        scope;

    var mockDataVideo = {
        _id: '577 d101fbbae834c3c2b1a52',
        name: ' [3] How does Node.js work',
        description: 'New to Node.js ? Check out this video that explain',
        url: 'videos/How_does_Node.js_work.mp4',
        ratings: [3, 3, 3]
    };

    beforeEach(inject(function ($controller, $rootScope) {
         VideosDetailsCtrl = $controller('VideosDetailsCtrl', {
            $scope: scope,
            getSingleVideo: mockDataVideo
        });
    }));

    it('testing average ratings in single video after vote a new rating', function () {
        VideosDetailsCtrl.getAverageRanking(mockDataVideo);
        expect(mockDataVideo.avgRating).toEqual(3);
    });
});
