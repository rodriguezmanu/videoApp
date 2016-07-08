'use strict';

describe('Controller: LoginCtrl', function () {

    beforeEach(module('CrossoverApp'));

    var LoginCtrl,
      scope;

    beforeEach(inject(function ($controller, $rootScope) {
        scope = $rootScope.$new();
        LoginCtrl = $controller('LoginCtrl', {
            $scope: scope
        });
    }));
});
