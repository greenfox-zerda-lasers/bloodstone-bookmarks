(() => {
  angular.module('app')
  .controller('RegistrationController', ['$scope', 'userSession', '$rootScope', '$log', function ($scope, userSession, $rootScope, $log) {
    const vm = this;
    vm.userRegister = function userRegister() {
      if (vm.user.password !== vm.user.passwordRepeat) {
        $log.error("Error! Passwords don't match!");
      } else {
        const userRegData = {
          email: vm.user.email,
          password: vm.user.password,
        };
        $log.log(userRegData);
        userSession.register(userRegData);
      }
    };
  }]);
})();
