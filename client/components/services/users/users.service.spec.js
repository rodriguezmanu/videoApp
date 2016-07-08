'use strict';

describe('Service: UsersService', function () {

    beforeEach(module('CrossoverApp'));

    var UserSvc,
        cookies;

    beforeEach(inject(function (UsersService, _$cookieStore_) {
        UserSvc = UsersService;
        cookies = _$cookieStore_;

    }));

    it('Teting get Session Id from cookie', function() {
        cookies.put('token', {
            sessionId: '123456789',
            username: 'ali'
        });
        expect(UserSvc.getSessionId()).toEqual('123456789');
    });
});
