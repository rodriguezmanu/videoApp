(function() {
    'use strict';

    angular
        .module('CrossoverApp')
        .controller('FlixerDetailCtrl', FlixerDetailCtrl);

    angular
        .module('CrossoverApp')
        .controller('StatusModalCtrl', StatusModalCtrl);

    FlixerDetailCtrl.$inject = ['UserService', 'User', 'constantValues', '$state', 'ngDialog', '$scope'];
    StatusModalCtrl.$inject = ['UserService', 'constantValues', '$state', 'ngDialog', '$scope', 'user', '$timeout'];

    /* @ngInject */
    function FlixerDetailCtrl(UserService, User, constantValues, $state, ngDialog, $scope) {
        var vm = this;
        vm.openStatusModal = openStatusModal;
        vm.showStatusAction = false;

        UserService.getUser($state.params.flixerId, function(response) {
            vm.user = response.data.user;
            vm.showStatusAction = (vm.user.flixerPostulation.status === constantValues().status.pending) ||
            (vm.user.flixerPostulation.status === constantValues().status.accepted);
        });

        function openStatusModal() {
            var dialog = ngDialog.open({
                template: 'app/flixer-admin/flixers/flixer-detail/status-modal.html',
                controller: 'StatusModalCtrl',
                scope: $scope,
                showClose: false,
                resolve: {
                    user: function() {
                        return vm.user;
                    }
                },
                closeByEscape: false,
                closeByDocument: false
            });

            dialog.closePromise.then(function(user) {
                vm.user = user.value;
                vm.showStatusAction = (vm.user.flixerPostulation.status === constantValues().status.pending) ||
                (vm.user.flixerPostulation.status === constantValues().status.accepted);
            });
        }
    }

    /* @ngInject */
    function StatusModalCtrl(UserService, constantValues, $state, ngDialog, $scope, user, $timeout) {
        $scope.message = null;
        $scope.disabled = false;
        $scope.errors = {};

        $scope.user = user;
        $scope.selected = {
            status: undefined
        };

        $scope.items = [];
        if ($scope.user.flixerPostulation.status === constantValues().status.pending) {
            $scope.items.push(constantValues().status.accepted);
            $scope.items.push(constantValues().status.rejected);
        }
        if ($scope.user.flixerPostulation.status === constantValues().status.accepted) {
            $scope.items.push(constantValues().status.pending);
            $scope.items.push(constantValues().status.rejected);
        }

        $scope.submit = function() {
            $scope.disabled = true;

            UserService.changeFlixerFlowStatus($scope.user._id, $scope.selected.status)
                .then(function(data) {
                    $scope.message = 'common.succedMessage';
                    $scope.errors.other = '';
                    $timeout(function() {
                        $scope.closeThisDialog(data.data.user);
                    }, 3000);
                })
                .catch(function(err) {
                    if (angular.isUndefined($scope.errors.other)) {
                        $scope.errors.other = 'common.errorMessage';
                    }
                    $scope.message = null;
                    $timeout(function() {
                        $scope.closeThisDialog($scope.user);
                    }, 3000);
                });
        };
    }
})();
