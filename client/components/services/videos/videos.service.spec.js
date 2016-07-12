// describe('mocking service http call', function() {
//   beforeEach(module('CroosoverApp'));

//   var MainCtrl, $scope;

//   // describe('with spies', function() {
//   //   beforeEach(inject(function($controller, $rootScope, githubApi) {
//   //     $scope = $rootScope.$new();

//   //     spyOn(githubApi, 'getJasonMore').and.callFake(function() {
//   //       return {
//   //         success: function(callback) { callback({things: 'and stuff'})}
//   //       };
//   //     });

//   //     MainCtrl = $controller('MainCtrl', { $scope: $scope, githubApi: githubApi });
//   //   }));

//   //   it('should set data to "things and stuff"', function() {
//   //     expect($scope.data).toEqual({
//   //       things: 'and stuff'
//   //     });
//   //   });
//   // });

//   describe('with httpBackend', function() {
//     beforeEach(inject(function($controller, $rootScope, $httpBackend) {
//       $scope = $rootScope.$new();

//       $httpBackend.when('GET', 'https://api.github.com/users/jasonmore')
//         .respond({things: 'and stuff'});

//       MainCtrl = $controller('MainCtrl', { $scope: $scope });
//       $httpBackend.flush();
//     }));

//     it('should set data to "things and stuff"', function() {
//       expect($scope.data).toEqual({
//         things: 'and stuff'
//       });
//     });
//   });
// });


// var app = angular.module('plunker', []);

// app.factory('githubApi', function($http){
//   return {
//     getJasonMore: function(){
//       return $http.get('https://api.github.com/users/jasonmore');
//     }
//   }
// });

// app.controller('MainCtrl', function($scope, githubApi, $http) {
//   $scope.name = 'World';

//   githubApi.getJasonMore().success(function(data){
//     $scope.data = data;
//   })
// });
