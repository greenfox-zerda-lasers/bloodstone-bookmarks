(function () {
  angular.module('app').controller('BookmarksController', ['$http', '$location', '$log', 'bookmarkFactory', 'userSession', function (
    $http, $location, $log, bookmarkFactory, userSession) {
    const vm = this;
    vm.getLinks = () => {
      bookmarkFactory.get()
        .then((response) => {
          $log.log(response);
          vm.links = response.data;
        });
    };

    vm.showInputBox = false;
    vm.logout = () => {
      $log.log('logout');
      $http.post('/api/logout')
        .then(() => {
          userSession.currentUser = null;
          $location.url('/login');
        });
    };

    vm.onAddClick = function () {
      vm.showInputBox = true;
    };

    vm.saveBookmark = function () {
      const stringJSON = {
        url: vm.newURL,
      };
      // TODO: 1. Parse URL; 2. Fetch title (+img, +desc); 3. Save title 4. Cache img, desc(?)
      bookmarkFactory.add(stringJSON)
      .then(() => {
        vm.getLinks();
      });
      // Clear input field and close popup
      // TODO: If everything went well
      vm.newURL = null;
      vm.showInputBox = false;
    };

    vm.getLinks();
  }]);
}());
