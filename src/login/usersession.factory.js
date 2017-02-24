angular.module('app').factory('userSession', ['$location', '$http', '$log', function ($location, $http, $log) {
  let currentUser = '';

  const login = loginData => $http
    .post('/api/login', JSON.stringify(loginData))
    .then((response) => {
      $log.log('Login response: ', response);
      if (loginData.email === response.data) {
        currentUser = response;
        $location.path('/home');
      }
    })
    .catch((err) => {
      $log.log('Login error: ', err);
    });

  // Async, super-safe version // NOTE: async-await fails on Webpack
  const checkLoggedin = () => $http.get('/api/loggedin');

  const register = userRegData => $http
    .post('/api/register', JSON.stringify(userRegData))
    .then((response) => {
      $log.log('Reg. response: ', response);
      if (response.data.email) {
        $location.url('/home');
      }                             // TODO: proper message on redirecting to login page
    })
    .catch((err) => {
      $log.log('Registration error: ', err);
    });

  return {
    login: login,
    register: register,
    checkLoggedin: checkLoggedin,
    currentUser: currentUser
  };
}]);
