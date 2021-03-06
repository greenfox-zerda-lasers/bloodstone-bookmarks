(function () {
  angular.module('app').controller('BookmarksController', ['$http', '$location', '$log', 'bookmarkFactory', 'userSession', function (
    $http, $location, $log, bookmarkFactory, userSession) {
    const vm = this;

    vm.getLinks = () => {
      bookmarkFactory.get()
        .then((response) => {
          vm.links = response.data;
        });
    };

    vm.logout = () => {
      $log.log('logout');
      $http.post('/api/logout')
        .then(() => {
          userSession.currentUser = null;
          $location.url('/login');
        });
    };
// delete
    vm.deleteBookmark = function(bookmark_id) {

      bookmarkFactory.delete(bookmark_id)
      .then(() => {
        vm.getLinks();
      });
    }

    vm.showInputBox = false;
    vm.onAddClick = function () {
      vm.showInputBox = true;
    };

    vm.saveBookmark = function () {
      const stringJSON = {
        url: vm.newURL,
      };
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
