(function () {
  angular.module('app').controller('BookmarksController', ['$scope', '$rootScope', '$http', '$location', '$log', 'bookmarkFactory', function ($scope, $rootScope, $http, $location, $log, bookmarkFactory) {

    bookmarkFactory.get()
    .then((response) => {
      $log.log(response);
      $scope.links = response.data;
    });

    $scope.showInputBox = false;
    $scope.logout = () => {
      $http.post('/api/logout')
        .then(() => {
          $rootScope.currentUser = null;
          $location.url('/login');
        });
    };
    $scope.onAddClick = function () {
      $scope.showInputBox = true;
    };
    $scope.saveBookmark = function () {
      const stringJSON = {
        url: $scope.newURL,
      };
      // TODO: 1. Parse URL; 2. Fetch title (+img, +desc); 3. Save title 4. Cache img, desc(?)
      bookmarkFactory.add(stringJSON);
      // Clear input field and close popup
      // TODO: If everything went well
      $scope.newURL = null;
      $scope.showInputBox = false;
    };
  }]);
}());
