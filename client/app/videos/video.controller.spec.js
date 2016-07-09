'use strict';

describe('Controller: VideosCtrl', function () {

    beforeEach(module('CrossoverApp'));

    var VideosCtrl,
        scope;

    var mockDataVideos = [
        {
            _id: '577 d101fbbae834c3c2b1a52 ',
            name :' [3] How does Node.js work ',
            description :' New to Node.js ? Check out this video that explains',
            url : 'videos/How_does_Node.js_work.mp4',
            ratings: [3, 3, 3, 3]
        },
        {
            _id: '577d101fbbae834c3c2b1a56',
            name: '[7] Google Cardboard Assembly',
            description: 'Google Cardboard Assembly Step by Step Instructions [HD]',
            url: 'videos/Google_Cardboard_Assembly.mp4',
            ratings: [4, 5, 5, 1, 3, 2, 4, 5, 2, 1, 3, 5, 5, 5, 5, 5, 5]
        }
    ];

    var mockDataVideo = {
        _id: '577 d101fbbae834c3c2b1a52',
        name: ' [3] How does Node.js work',
        description: 'New to Node.js ? Check out this video that explain',
        url: 'videos/How_does_Node.js_work.mp4',
        ratings: [3, 3, 3]
    };

    beforeEach(inject(function ($controller, $rootScope) {
         VideosCtrl = $controller('VideosCtrl', {
            $scope: scope
        });
    }));

    it('testing average ratings in all videos', function () {
        VideosCtrl.getAverageRankings(mockDataVideos);
        expect(mockDataVideos[0].avgRating).toEqual(3);
        expect(mockDataVideos[1].avgRating).toEqual(4);
    });

    it('testing average ratings in single video after vote a new rating', function () {
        VideosCtrl.video = mockDataVideo;
        VideosCtrl.getAverageRanking(mockDataVideo);
        expect(mockDataVideo.avgRating).toEqual(3);
    });
});
