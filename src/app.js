const angular = require('angular');
const ngRoute = require('angular-route');
const app = angular.module('app', ['ngRoute']);

var links = [
  {
    "title":"Index.hu",
    "url":"http://index.hu"
  },
  {
    "title":"Origo.hu",
    "url":"http://origo.hu"
  },
  {
    "title":"hvg.hu",
    "url":"http://hvg.hu"
  },
  {
    "title":"Green Fox Academy",
    "url":"http://greenfoxacademy.com"
  },
  {
    "title":"Index.hu",
    "url":"http://index.hu"
  },
  {
    "title":"b.hu",
    "url":"http://b.hu"
  }
];

// *************** ROUTING ***************

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
    controller: 'RenderController',
    resolve: {
      logincheck: checkLoggedin,
    }
  })
  .otherwise({
    redirectTo: '/login', // NOTE: Temporarily
  });
}]);

const checkLoggedin = function checkLoggedin($q, $timeout, $http, $location, $rootScope) {
  const deferred = $q.defer();

  $http.get('/api/loggedin')
    .then(function(user) {
      $rootScope.errorMessage = null;
      // User is Authenticated
      if (user !== '0') {
        $rootScope.currentUser = user;
        deferred.resolve();
      } else { // User not Auth.
        $rootScope.errorMessage = 'Error! You need to log in.';
        deferred.reject();
        $location.url('/login');
      }
    });
  return deferred.promise;
};

// *********** CONTROLLERS ************
app.controller('LoginController', ['$location', '$scope', '$http', '$rootScope', function ($location, $scope, $http, $rootScope) {
  $scope.userLogin = function userLogin() {
    $scope.userLog = {
        email: $scope.user.email,
        password: $scope.user.password
    };
    $http
      .post('/api/login', JSON.stringify($scope.userLog))
      .then(function (response) {
        $rootScope.currentUser = response;
        $location.url('/home');
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

app.controller('RenderController', ['$scope', '$rootScope', '$http', '$location', function ($scope, $rootScope, $http, $location) {
  $scope.dummyLinks = links;
  $scope.logout = function() {
    $http.post('/api/logout')
      .then(function() {
        $rootScope.currentUser = null;
        $location.url('/home');
      });
  }
}]);

module.exports = app;
