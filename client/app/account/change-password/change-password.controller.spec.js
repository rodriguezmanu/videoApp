'use strict';

describe('Controller: ChangePasswordCtrl', function () {

  // load the controller's module
  beforeEach(module('CrossoverApp'));

  var ChangePasswordCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ChangePasswordCtrl = $controller('ChangePasswordCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
