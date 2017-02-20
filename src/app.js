const angular = require('angular');

const ngRoute = require('angular-route');

angular.module('app', ['ngRoute']);

// *************** ROUTING ***************

angular.module('app').config(['$routeProvider', function routeProvider($routeProvider) {
  $routeProvider
<<<<<<< HEAD
  .when('/login', {
    templateUrl: './views/login.html',
    controller: 'LoginController'
  })
  .when('/register', {
    templateUrl: './views/register.html',
    controller: 'RegistrationController'
  })
  .when('/home', {
    templateUrl: './views/bookmarks.html',
    controller: 'BookmarksController',
  })
  .otherwise({
    redirectTo: '/login', // TODO: Alert user of not being logged in
  });
=======
    .when('/login', {
      templateUrl: './views/login.html',
      controller: 'LoginController',
    })
    .when('/register', {
      templateUrl: './views/register.html',
      controller: 'RegistrationController',
    })
    .when('/home', {
      templateUrl: './views/list.html',
      controller: 'RenderController',
    })
    .otherwise({
      redirectTo: '/login', // NOTE: Temporarily
    });
>>>>>>> master
}]);

angular.module('app').run(['$rootScope', '$location', '$http', '$log', 'userSession', function check($rootScope, $location, $http, $log, userSession) {  // TODO await async to prevent load the protected view
  $rootScope.$on('$routeChangeStart', (event, next) => {
    if (next.$$route.originalPath === '/home') {
      userSession.checkLoggedin()
      .then((response) => {
        if (response.data === '0') {
          $location.path('/login');
        }
      })
      .catch((error) => {
        $log.log(error);
        $location.path('/login');
      });
    }
  });
}]);

module.exports = angular.module('app');
