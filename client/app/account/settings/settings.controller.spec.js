'use strict';

describe('Controller: SettingsCtrl', function () {

  // load the controller's module
  beforeEach(module('CrossoverApp'));

  var SettingsCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SettingsCtrl = $controller('SettingsCtrl', {
      $scope: scope,
      getUser: function ($provide) {
          $provide.value('getUser', {role: 'flixer'});
      }
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
