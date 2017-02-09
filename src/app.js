const angular = require('angular');
const ngRoute = require('angular-route');
const app = angular.module('app', ['ngRoute']);

var links = [
  {
    "title":"Bloodstone",
    "url":"http://bloodstonedevelopment.tk/"
  },
  {
    "title":"Github",
    "url":"https://github.com/"
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
    "title":"Angular JS",
    "url":"https://angularjs.org/"
  },
  {
    "title":"Origo",
    "url":"http://origo.hu"
  },
  {
    "title":"b.hu",
    "url":"http://b.hu"
  },
  {
    "title":"JS Garden",
    "url":"http://bonsaiden.github.io/JavaScript-Garden/"
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
      logincheck: function() {
        // return checkLoggedin.check();
      },
    }
  })
  .otherwise({
    redirectTo: '/login', // NOTE: Temporarily
  });
}]);

// Check loggedin service
app.service('checkLoggedin',
  ['$q', '$timeout', '$http', '$location', '$rootScope',
  function ($q, $timeout, $http, $location, $rootScope) {
    this.check = function () {
      const deferred = $q.defer();
      $http.get('/api/loggedin')
        .then(function(user) {
          console.log(user);
          $rootScope.errorMessage = null;
          // User is Authenticated
          if (user.data !== '0') {
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
  }
]);

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
