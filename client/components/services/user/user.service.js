(function() {
    /*jshint validthis:true */
    'use strict';

    angular
        .module('CrossoverApp.userService')
        .factory('UserService', UserService);

    UserService.$inject = ['$location', '$rootScope', '$http', 'User', '$cookieStore', '$q', 'constantValues'];

    /* @ngInject */
    function UserService($location, $rootScope, $http, User, $cookieStore, $q, constantValues) {
        var currentUser = {};
        if ($cookieStore.get('token')) {
            currentUser = User.get();
        }
        var service = {
            login: login,
            logout: logout,
            createUser: createUser,
            changePassword: changePassword,
            getUser: getUser,
            getCurrentUser: getCurrentUser,
            isLoggedIn: isLoggedIn,
            isLoggedInAsync: isLoggedInAsync,
            getRole: getRole,
            getToken: getToken
        };
        return service;

        /**
        * Authenticate user and save token
        * @param  {Object}   user     - login info
        * @param  {Function} callback - optional
        * @return {Promise}
        */
        function login(user, callback) {
            var cb = callback || angular.noop;
            var deferred = $q.defer();

            $http.post('/api/auth/local', {
                email: user.email,
                password: user.password
            })
            .success(function(data) {
                $cookieStore.put('token', data.token);
                currentUser = User.get();
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
         */
        function logout() {
            $cookieStore.remove('token');
            currentUser = {};
        }

        /**
         * Create a new user
         * @param  {Object}   user     - user info
         * @param  {Function} callback - optional
         * @return {Promise}
         */
        function createUser(user, callback) {
            var cb = callback || angular.noop;

            return User.save(user,
              function(data) {
                  $cookieStore.put('token', data.token);
                  currentUser = User.get();
                  return cb(user);
              },
              function(err) {
                  this.logout();
                  return cb(err);
              }.bind(this)).$promise;
        }

        /**
           * Change password
           * @param  {String}   oldPassword
           * @param  {String}   newPassword
           * @param  {Function} callback    - optional
           * @return {Promise}
           */
        function changePassword(oldPassword, newPassword, callback) {
              var cb = callback || angular.noop;

              return User.changePassword({id: currentUser.user._id}, {
                  oldPassword: oldPassword,
                  newPassword: newPassword
              }, function(user) {
                  return cb(user);
              }, function(err) {
                  return cb(err);
              }).$promise;
          }

        /**
         * Get User
         * @param  {String} id
         * @param  {Function} callback    - optional
         */
        function getUser(id, callback) {
                var cb = callback || angular.noop;
                var deferred = $q.defer();
                $http.get('/api/users/' + id)
                    .then(function(data) {
                        deferred.resolve(data);
                        return cb(data);
                    },
                    function(err) {
                        deferred.reject(err);
                        return cb(err);
                    });
            }

        /**
         * Gets all available info on authenticated user
         * @return {Object} user
         */
        function getCurrentUser() {
                return currentUser.user;
            }

        /**
         * Check if a user is logged in
         * @return {Boolean}
         */
        function isLoggedIn() {
                return (_.hasIn(currentUser.user, 'role')) ? true : false;
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
                } else if (currentUser.hasOwnProperty('role')) {
                    cb(true);
                } else {
                    cb(false);
                }
            }

        function getRole() {
                if (_.hasIn(currentUser.user, 'role')) {
                    return currentUser.user.role;
                }
            }
        /**
         * Check role method
         * @param  {String} role
         * @return {Boolean}
         */
        function checkRole (role) {
                if (_.hasIn(currentUser.user, 'role')) {
                    return currentUser.user.role === role;
                }
            }

        /**
         * Get auth token
         *  @return {Object} token
         */
        function getToken() {
                return $cookieStore.get('token');
            }
    }
})();

// 'use strict';

// angular.module('CrossoverApp')
//   .factory('UserService', function UserService(
//   $location, $rootScope, $http, User, $cookieStore, $q, constantValues) {
//       var currentUser = {};
//       if ($cookieStore.get('token')) {
//           currentUser = User.get();
//       }

//       return {

//           /**
//            * Get list of user by role
//            *
//            * @param  {String}   role
//            * @param  {Function} callback    - optional
//            */
//           getUsersByRole: function(role, callback) {
//               var cb = callback || angular.noop;
//               var deferred = $q.defer();

//               $http.get('/api/users?role=' + role).
//         then(function(data) {
//             deferred.resolve(data);
//             return cb(data);
//         },
//         function(err) {
//             deferred.reject(err);
//             return cb(err);
//         });
//           },

//           isFlixer: function() {
//               if (_.hasIn(currentUser.user, 'role')) {
//                   return currentUser.user.role === constantValues().roles.flixer;
//               }
//           },

//           isFlixerAdmin: function() {
//               if (_.hasIn(currentUser.user, 'role')) {
//                   return currentUser.user.role === constantValues().roles.flixerAdmin;
//               }
//           },

//           isBussinesOwner: function() {
//               if (_.hasIn(currentUser.user, 'role')) {
//                   return currentUser.user.role === constantValues().roles.businessOwner;
//               }
//           },

//           isRegularUser: function() {
//               if (_.hasIn(currentUser.user, 'role')) {
//                   return currentUser.user.role === constantValues().roles.regularUser;
//               }
//           },

//           getRole: function() {
//               if (_.hasIn(currentUser.user, 'role')) {
//                   return currentUser.user.role;
//               }
//           },

//           checkRole: function(role) {
//               if (_.hasIn(currentUser.user, 'role')) {
//                   return currentUser.user.role === role;
//               }
//           },

//           /**
//            * Get auth token
//            */
//           getToken: function() {
//               return $cookieStore.get('token');
//           }
//       };
//   });
