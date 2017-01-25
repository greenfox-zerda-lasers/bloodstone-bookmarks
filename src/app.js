const angular = require('angular');
const ngRoute = require('angular-route');

const app = angular.module('app', ['ngRoute']);

var links = [
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
  .when('/home', {
    templateUrl: './views/list.html',
    controller: 'RenderController'
  })
  .otherwise({
    redirectTo: '/login', // NOTE: Temporarily
  });
}]);

app.controller('LoginController', ['$scope', '$http', function ($scope, $http) {
  $scope.userLogin = function userLogin() {
    $scope.userLog = {
        email: $scope.user.email,
        password: $scope.user.password
    };
    console.log($scope.userLog); // NOTE: 4debug;
    $http
      .post('/api/login', $scope.userLog)
      .then(function (response) {
        console.log(response);
      });
  };
}]);

app.controller('RenderController', ['$scope', function ($scope) {
  $scope.dummyLinks = links;
}]);

module.exports = app;
