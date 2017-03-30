const angular = require('angular');

const ngRoute = require('angular-route');

angular.module('app', ['ngRoute']);

// *************** ROUTING ***************

angular.module('app').config(['$routeProvider', function routeProvider($routeProvider) {
  $routeProvider
  .when('/login', {
    templateUrl: './views/login.html',
    controller: 'LoginController as login'
  })
  .when('/register', {
    templateUrl: './views/register.html',
    controller: 'RegistrationController as registration'
  })
  .when('/home', {
    templateUrl: './views/bookmarks.html',
    controller: 'BookmarksController as bookmark',
  })
  .otherwise({
    redirectTo: '/login',
  });
}]);

// Managing protected views

angular.module('app').run(['$rootScope', '$location', '$http', '$log', 'userSession', function check($rootScope, $location, $http, $log, userSession) {
  $rootScope.$on('$routeChangeStart', (event, next) => {
    if (next.$$route && next.$$route.originalPath === '/home') {
      userSession.checkLoggedin()
      .then((response) => {
        $log.log('Logged in response: ', response);
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

angular.module('app').filter( 'domain', function () {
  return function ( input ) {
    var matches,
        output = "",
        urls = /\w+:\/\/([\w|\.]+)/;

    matches = urls.exec( input );

    if ( matches !== null ) output = matches[1];

    return output;
  };
});

module.exports = angular.module('app');
