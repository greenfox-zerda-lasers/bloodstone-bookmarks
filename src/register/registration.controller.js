(() => {
  angular.module('app')
  .controller('RegistrationController', ['userSession', '$log', function (userSession, $log) {
    const vm = this;
    vm.message = 'pince';
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
