'use strict';

describe('Controller: FlixerAdminJobs', function () {

  // load the controller's module
  beforeEach(module('CrossoverApp'));

  var FlixerAdminJobs, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    FlixerAdminJobs = $controller('FlixerAdminJobs', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
