// const angular = require('angular');
const ngRoute = require('angular-route');
const app = angular.module('app', ['ngRoute', 'loginModule']);

var links = [
  {
    "title":"Index.hu",
    "url":"http://index.hu"
  },
  {
    "title":"Szanalmasaaaaaaaaaaaaaaaaaaaaaaaaaaaaabbbbbbbbbbbbbbbbbbbbbbbbb.hu",
    "url":"http://szanalmas.hu"
  },
  {
    "title":"Index.hu",
    "url":"http://index.hu"
  },
  {
    "title":"Szanalmas.hu",
    "url":"http://szanalmas.hu"
  },
  {
    "title":"Index.hu",
    "url":"http://index.hu"
  },
  {
    "title":"Szanalmas.hu",
    "url":"http://szanalmas.hu"
  }
];

app.config(['$routeProvider', function routeProvider($routeProvider) {
  $routeProvider
  .when('/login', {
    templateUrl: './views/login.html',
    controller: 'LoginController',
    controllerAs: 'loginCtrl',
  })
  .when('/register', {
    templateUrl: './views/register.html',
    controller: 'RegistrationController'
  })
  .when('/home', {
    templateUrl: './views/list.html',
    controller: 'RenderController'
  })
  .otherwise({
    redirectTo: '/login', // NOTE: Temporarily
  });
}]);

var loginModule = angular.module('loginModule', ['ngRoute']);
loginModule.controller('LoginController', [ '$http', function ($http) {
  let vm = this
  vm.message = 'pince'
  console.log(vm.message);
  vm.userLogin = function userLogin() {
    vm.userLog = {
        email: vm.user.email,
        password: vm.user.password
    };
    $http
      .post('/api/login', JSON.stringify(vm.userLog))
      .then(function (response) {
        console.log("Login response: ", response);
      });
  };
}]);

app.controller('RegistrationController', ['$scope', '$http', function ($scope, $http) {
  $scope.userRegister = function userRegister() {
    if ($scope.user.password != $scope.user.passwordRepeat) {
      console.log("Error! Passwords don't match!")
    }
    else {
      $scope.userRegData = {
        email: $scope.user.email,
        password: $scope.user.password
      };
      $http
      .post('/api/register', JSON.stringify($scope.userRegData))
      .then(function (response) {
        console.log("Reg. response: ", response);
      });
    }
  };
}]);

app.controller('RenderController', ['$scope', function ($scope) {
  $scope.dummyLinks = links;
}]);

module.exports = app;
module.exports = loginModule
