'use strict';

describe('Controller: SignupFlixerCtrl', function () {

  // load the controller's module
  beforeEach(module('CrossoverApp'));

  var SignupFlixerCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SignupFlixerCtrl = $controller('SignupFlixerCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
