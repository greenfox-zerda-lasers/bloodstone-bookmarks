const angular = require('angular');
const ngRoute = require('angular-route');
const app = angular.module('app', ['ngRoute']);

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
    controller: 'LoginController'
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

app.factory('LoginService', ['$scope', '$location', 'serverResponse', function ($scope, $location, serverResponse) {
  return {
    redirect: function (serverResponse) {
      if (serverResponse.data.user) {
        $scope.isLogedIn = true; //NOTE has no function yet
        $location.path('/home');
      }
    }
  }
}]);

app.controller('LoginController', ['$scope', '$http', 'LoginService', function ($scope, $http, LoginService) {
  $scope.userLogin = function userLogin() {
    $scope.isLogedIn = false; //NOTE has no function yet
    $scope.userLog = {
        email: $scope.user.email,
        password: $scope.user.password
    };
    $http
      .post('/api/login', JSON.stringify($scope.userLog))
      .then(function (response) {
        console.log('Login response: ', response);
        LoginService.redirect(response)
      })
      .catch(function (err) {
        console.log('Login error: ', err);
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
