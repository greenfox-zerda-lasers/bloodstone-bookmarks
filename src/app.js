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
    "title":"Index.hu",
    "url":"http://index.hu"
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
    "title":"JS Garden",
    "url":"http://bonsaiden.github.io/JavaScript-Garden/"
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

app.factory('sessionFactory', ['$location', '$http', function ($location, $http) {
  var login = function (loginData) {
    return $http.post('/api/login', JSON.stringify(loginData))
      .then(function (response) {
        console.log('Login response: ', response);
        if (loginData.email === response.data) {
          $location.url('/home');
        }
      })
      .catch(function (err) {
        console.log('Login error: ', err);
      });
  };

  var register = function (userRegData) {
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
  }
  return {
    login: login,
    register: register
  }
}]);

app.controller('LoginController', ['$scope', 'sessionFactory', function ($scope, sessionFactory) {
  $scope.userLogin = function userLogin() {
    var userLog = {
      email: $scope.user.email,
      password: $scope.user.password
    };
    sessionFactory.login(userLog);
  };
}]);

app.controller('RegistrationController', ['$scope', 'sessionFactory', function ($scope, sessionFactory) {
  $scope.userRegister = function userRegister() {
    if ($scope.user.password != $scope.user.passwordRepeat) {
      console.log("Error! Passwords don't match!")
    }
    else {
      var userRegData = {
        email: $scope.user.email,
        password: $scope.user.password
      };
      sessionFactory.register(userRegData);
    }
  };
}]);

app.controller('RenderController', ['$scope', function ($scope) {
  $scope.dummyLinks = links;
}]);

module.exports = app;
