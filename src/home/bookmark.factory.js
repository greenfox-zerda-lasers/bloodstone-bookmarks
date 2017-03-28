angular.module('app').factory('bookmarkFactory', ['$location', '$http', '$rootScope', '$log', function ($location, $http, $rootScope, $log) {
  const addBookmark = function (bookmarkURL) {
    return $http.post('/api/bookmarks', JSON.stringify(bookmarkURL))
      .then(function (response) {
        $log.log('DEBUG: Bookmark saved, details: ', response);
      })
      .catch(function (err) {
        $log.log('Operation error: ', err);
      });
  };

  const getBookmarks = function () {
    return $http.get('/api/bookmarks')
    .catch(function (err) {
      $log.log('Operation error: ', err);
    });
  };

  const deleteBookmark = function (bookmarkURL) {
    console.log("aaa");
    console.log(bookmarkURL);

    return $http.delete('/api/bookmarks/delete', JSON.stringify(bookmarkURL))
    .catch(function (err) {
      $log.log('Operation error: ', err);
    });
  };

  // Reveal public methods:
  return {
    add: addBookmark,
    get: getBookmarks,
    delete: deleteBookmark,
  };
}]);
