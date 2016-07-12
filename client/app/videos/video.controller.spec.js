/* jshint -W117, -W030 */
'use strict';

describe('Controller: VideosCtrl', function() {
    beforeEach(module('VideoApp'));

    var VideosCtrl,
        $scope,
        mockBackEndResponse =  {
        status: 'success',
        data: [{
            _id: '577d101fbbae834c3c2b1a52',
            name: '[3] How does Node.js work',
            description: 'New to Node.js? Check out this video that explains "How does Node work?"',
            url: 'videos/How_does_Node.js_work.mp4',
            ratings: [3, 3, 4, 4, 5, 5],
            avgRating: 4
            }]
        },
        expectedResponse = [{
            _id: '577d101fbbae834c3c2b1a52',
            name: '[3] How does Node.js work',
            description: 'New to Node.js? Check out this video that explains "How does Node work?"',
            url: 'videos/How_does_Node.js_work.mp4',
            ratings: [3, 3, 4, 4, 5, 5],
            avgRating: 4
        }],
        mockDataVideos = [
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
    beforeEach(inject(function($controller, $rootScope, $httpBackend) {
        $scope = $rootScope.$new();

        $httpBackend.when('GET', /.*\/videos\?sessionId=undefined&limit=10/)
          .respond(mockBackEndResponse);

        VideosCtrl = $controller('VideosCtrl', {$scope: $scope});
        $httpBackend.flush();
    }));

    it('should set data to vm.videos', function() {
        VideosCtrl.busy = false;
        expect(VideosCtrl.videos).toEqual(expectedResponse);
    });

    it('testing average ratings in all videos', function () {
        VideosCtrl.getAverageRankings(mockDataVideos);
        expect(mockDataVideos[0].avgRating).toEqual(3);
        expect(mockDataVideos[1].avgRating).toEqual(4);
    });
});
