const app = angular.module('app');

app.factory('userSession', ['$location', '$http', '$rootScope', function ($location, $http, $rootScope) {
  const login = function (loginData) {
    return $http.post('/api/login', JSON.stringify(loginData))
      .then(function (response) {
        console.log('Login response: ', response);
        if (loginData.email === response.data) {
          $rootScope.currentUser = response;
          $location.path('/home');
        }
        // NOTE: What if email does not match?
      })
      .catch(function (err) {
        console.log('Login error: ', err);
      });
  };

  const checkLoggedin = function () {
    return $http.get('/api/loggedin')
      .then(function (response) {
        console.log('Logged in response: ', response);
        if (response === '0') {
          return false;
        } else { return true; }
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
    register: register,
    checkLogeddin: checkLoggedin
  }
}]);
