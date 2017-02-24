(() => {
  angular.module('app')
    .controller('LoginController', ['$scope', 'userSession', function ($scope, userSession) {
      $scope.userLogin = function userLogin() {  // TODO set it to vm = this, vm.userLogin...
        const userLog = {
          email: $scope.user.email,
          password: $scope.user.password,
        };
        userSession.login(userLog);
      };
    }]);
})();
