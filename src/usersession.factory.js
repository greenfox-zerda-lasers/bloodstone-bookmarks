const app = angular.module('app');

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
