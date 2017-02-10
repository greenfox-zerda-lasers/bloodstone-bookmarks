(function () {
  const app = angular.module('app');

  app.controller('LoginController', ['$scope', 'userSession', '$rootScope', function ($scope, userSession, $rootScope) {
    $scope.userLogin = function userLogin() {
      var userLog = {
        email: $scope.user.email,
        password: $scope.user.password,
      };
      userSession.login(userLog);
    };
  }]);
}());
