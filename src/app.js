const angular = require('angular');
const ngRoute = require('angular-route');

const app = angular.module('app', ['ngRoute']);

app.config(['$routeProvider', function routeProvider($routeProvider) {
  $routeProvider
  .when('/home', {
    templateUrl: './views/login.html',
    controller: 'LoginController'
  })
  .when('/list', {
    templateUrl: './views/list.html',
    controller: 'RenderController'
  })
  .otherwise({
    redirectTo: '/home',
  });
}]);

app.controller('LoginController', ['$scope', '$http', function ($scope, $http) {
  $scope.userLogin = function userLogin() {
    $scope.userLog = {
        email: $scope.user.email,
        password: $scope.user.password
    };
    console.log($scope.userLog); // NOTE: 4debug;
    $http.post('/login', $scope.userLog).then(function (data) {
      console.log(data)
    });
  };
}]);

app.controller('RenderController', ['$scope', function($scope) {

  $scope.dummyLinks = [
    {
      "title":"Index.hu",
      "url":"http://index.hu"
    },
    {
      "title":"Szanalmas.hu",
      "url":"http://szanalmas.hu"
    },
  ]

}]);


module.exports = app;
