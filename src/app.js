const angular = require('angular');
const ngRoute = require('angular-route');
const app = angular.module('app', ['ngRoute']);

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
  })
  .otherwise({
    redirectTo: '/login', // NOTE: Temporarily
  });
}]);

app.run(function check($rootScope, $location, $http, $log) {
  $rootScope.$on('$routeChangeStart', (event, next, current) => {
    console.log(next);
    if (next.$$route.originalPath === '/home') {
      $http.get('/api/loggedin')
      .then((response) => {
        $log.log('Logged in response: ', response.data);
        if (response.data === '0') {
          $location.path('/login');
        }
      })
      .catch((error) => {
        $log.log(error);
        $location.path('/login');
      })
    }
  })
});

// Check loggedin resolve (promises) version
/*
const checkLoggedin = function ($q, $timeout, $http, $location, $rootScope) {
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
*/


module.exports = app;
