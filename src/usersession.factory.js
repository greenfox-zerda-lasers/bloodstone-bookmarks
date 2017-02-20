<<<<<<< HEAD
const app = angular.module('app');

app.factory('userSession', ['$location', '$http', '$rootScope', function ($location, $http, $rootScope) {
  const login = function (loginData) {
    return $http.post('/api/login', JSON.stringify(loginData))
      .then(function (response) {
        if (loginData.email === response.data) {
          $rootScope.currentUser = response; // NOTE: Plox don't store this in the rootScope.
          $location.path('/home');
        }
        // NOTE: What if email does not match?
      })
      .catch(function (err) {
        console.log('Login error: ', err);
      });
  };

  // Check is user is logged in
  const checkLoggedin = function () {
    return $http.get('/api/loggedin');
  };
=======
angular.module('app').factory('userSession', ['$location', '$http', '$rootScope', '$log', function ($location, $http, $rootScope, $log) {
  const login = loginData => $http
    .post('/api/login', JSON.stringify(loginData))
    .then((response) => {
      $log.log('Login response: ', response);
      if (loginData.email === response.data) {
        $rootScope.currentUser = response; // NOTE: Plox don't store this in the rootScope.
        $location.path('/home');
      }
      // NOTE: What if email does not match?
    })
    .catch((err) => {
      $log.log('Login error: ', err);
    });

  // Async, super-safe version // NOTE: async-await fails on Webpack
  const checkLoggedin = () => $http.get('/api/loggedin');
>>>>>>> master

  const register = userRegData => $http
    .post('/api/register', JSON.stringify(userRegData))
    .then((response) => {
      $log.log('Reg. response: ', response);
      if (response.data.message) {
        $location.url('/home');
      }
    })
    .catch((err) => {
      $log.log('Registration error: ', err);
    });

  return {
    login: login,
    register: register,
    checkLoggedin: checkLoggedin,
  };
}]);
