(function() {
    /*jshint validthis:true */
    'use strict';

    angular
        .module('CrossoverApp.usersService')
        .factory('UsersService', UsersService);

    UsersService.$inject = ['$location', '$rootScope', '$http', '$cookieStore', '$q', 'md5', 'appConstants'];

    /* @ngInject */
    function UsersService($location, $rootScope, $http, $cookieStore, $q, md5, appConstants) {
        var currentUser = {};

        if ($cookieStore.get('token')) {
            currentUser = setCurrentUser();
        }
        var service = {
            login: login,
            logout: logout,
            getCurrentUser: getCurrentUser,
            isLoggedIn: isLoggedIn,
            isLoggedInAsync: isLoggedInAsync,
            getSessionId: getSessionId
        };
        return service;

        /**
        * Authenticate user and save token
        * @param  {Object}   user     - login info
        * @param  {Function} callback - optional
        * @return {Promise}
        */
        function login(user, callback) {
            var cb = callback || angular.noop,
                deferred = $q.defer();
            $http.post(`${appConstants.serverBackEnd}user/auth`, {
                username: user.username,
                password: md5.createHash(user.password)
            })
            .success(function(data) {
                $cookieStore.put('token', {
                    sessionId: data.sessionId,
                    username: data.username
                });
                currentUser = data;
                deferred.resolve(data);
                return cb();
            })
            .error(function(err) {
                this.logout();
                deferred.reject(err);
                return cb(err);
            }.bind(this));
            return deferred.promise;
        }

        /**
         * Delete access token and user info
         * @param  {Function} callback - optional
         * @return {Promise}
         */
        function logout(callback) {
            var cb = callback || angular.noop,
                deferred = $q.defer();
            $http.get(`${appConstants.serverBackEnd}user/logout?sessionId=${getSessionId()}`)
            .success(function(data) {
                $cookieStore.remove('token');
                currentUser = {};
                deferred.resolve(data);
                return cb();
            })
            .error(function(err) {
                this.logout();//ver
                deferred.reject(err);
                return cb(err);
            }.bind(this));
            return deferred.promise;
        }

        /**
         * Gets all available info on authenticated user
         * @return {Object} user
         */
        function getCurrentUser() {
            return currentUser;
        }

        /**
         * Set Current User
         * @return {Object} currentUser
         */
        function setCurrentUser() {
            var currentUser = {};
            currentUser = {
                sessionId: $cookieStore.get('token').sessionId,
                username:  $cookieStore.get('token').username
            };
            return currentUser;
        }

        /**
         * Check if a user is logged in
         * @return {Boolean}
         */
        function isLoggedIn() {
            //here should be more secure add in backend a getUserBySessionId method in order to call it to prevent
            //injection in cookie
            return (_.hasIn(currentUser, 'sessionId')) ? true : false;
        }

        /**
         * Waits for currentUser to resolve before checking if user is logged in
         */
        function isLoggedInAsync(cb) {
            if (currentUser.hasOwnProperty('$promise')) {
                currentUser.$promise.then(function() {
                    cb(true);
                }).catch(function() {
                    cb(false);
                });
            } else if (isLoggedIn()) {
                cb(true);
            } else {
                cb(false);
            }
        }

        /**
         * Get sessionId
         *  @return {String} sessionId
         */
        function getSessionId() {
            return $cookieStore.get('token').sessionId;
        }
    }
})();
