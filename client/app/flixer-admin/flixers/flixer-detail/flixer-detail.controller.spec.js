'use strict';

describe('Controller: FlixerDetailCtrl', function () {

  // load the controller's module
  beforeEach(module('CrossoverApp'));

  var FlixerDetailCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    FlixerDetailCtrl = $controller('FlixerDetailCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});