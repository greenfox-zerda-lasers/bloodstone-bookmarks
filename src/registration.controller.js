(function () {
  angular.module('app')
  .controller('RegistrationController', ['$scope', 'userSession', '$rootScope', '$log', function ($scope, userSession, $rootScope, $log) {
    const vm = this;
    vm.userRegister = function userRegister() {
      if ($scope.user.password !== $scope.user.passwordRepeat) {
        $log.error("Error! Passwords don't match!");
      } else {
        const userRegData = {
          email: $scope.user.email,
          password: $scope.user.password,
        };
        $log.log(userRegData);
        userSession.register(userRegData);
      }
    };
  }]);
}());
