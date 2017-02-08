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

app.config(['$routeProvider', 'checkLoggedin', function routeProvider($routeProvider, checkLoggedin) {
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
      logincheck: checkLoggedin.check,
    }
  })
  .otherwise({
    redirectTo: '/login', // NOTE: Temporarily
  });
}]);

// Check loggedin service
app.factory('checkLoggedin',
  ['$q', '$timeout', '$http', '$location', '$rootScope',
  function ($q, $timeout, $http, $location, $rootScope) {
    const check = function () {
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

    return {
      check: check,
    };
  }
]);

app.factory('userSession', ['$location', '$http', '$rootScope', function ($location, $http, $rootScope) {
  const login = function (loginData) {
    return $http.post('/api/login', JSON.stringify(loginData))
      .then(function (response) {
        console.log('Login response: ', response);
        if (loginData.email === response.data) {
          console.log($location.path);
          $rootScope.currentUser = response;
          $location.path('/home');
          console.log($location.path);
        }
      })
      .catch(function (err) {
        console.log('Login error: ', err);
      });
  };

  const register = function (userRegData) {
    return $http.post('/api/register', JSON.stringify(userRegData))
    .then(function (response) {
      console.log("Reg. response: ", response);
      if (response.data.message) {
        $location.url('/home');
      }
    })
    .catch(function (err) {
      console.log('Registration error: ', err);
    });
  };

  return {
    login: login,
    register: register
  }
}]);

// *********** CONTROLLERS ************
app.controller('LoginController', ['$scope', 'sessionFactory', '$rootScope', function ($scope, sessionFactory, $rootScope) {
  $scope.userLogin = function userLogin() {
    var userLog = {
      email: $scope.user.email,
      password: $scope.user.password
    };
    sessionFactory.login(userLog);
  };
}]);

app.controller('RegistrationController', ['$scope', 'sessionFactory', '$rootScope', function ($scope, sessionFactory, $rootScope) {
  $scope.userRegister = function userRegister() {
    if ($scope.user.password !== $scope.user.passwordRepeat) {
      console.log("Error! Passwords don't match!")
    }
    else {
      var userRegData = {
        email: $scope.user.email,
        password: $scope.user.password
      };
      console.log(userRegData);
      sessionFactory.register(userRegData);
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
