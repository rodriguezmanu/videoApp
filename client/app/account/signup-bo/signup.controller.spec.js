'use strict';

describe('Controller: SignupBoCtrl', function () {

  // load the controller's module
  beforeEach(module('CrossoverApp'));

  var SignupBoCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SignupBoCtrl = $controller('SignupBoCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
