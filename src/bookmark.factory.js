const app = angular.module('app');

app.factory('bookmarkFactory', ['$location', '$http', '$rootScope', '$log', function ($location, $http, $rootScope, $log) {
  const addBookmark = function (bookmarkURL) {
    return $http.post('/api/bookmarks', JSON.stringify(bookmarkURL))
      .then(function (response) {
        $log.log('Bookmark saved, URL: ', response);
      })
      .catch(function (err) {
        console.log('Operation error: ', err);
      });
  };

  // Reveal public methods:
  return {
    add: addBookmark,
  };
}]);
