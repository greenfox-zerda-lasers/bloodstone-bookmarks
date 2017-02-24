(() => {
  angular.module('app')
    .controller('LoginController', ['userSession', function (userSession) {
      const vm = this;
      vm.userLogin = () => {
        const userLog = {
          email: vm.user.email,
          password: vm.user.password,
        };
        userSession.login(userLog);
      };
    }]);
})();
