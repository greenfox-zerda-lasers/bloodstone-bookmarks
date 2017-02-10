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
