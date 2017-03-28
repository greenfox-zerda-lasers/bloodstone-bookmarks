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

    // vm.getLinks = () => {
    //   bookmarkFactory.get()
    //     .then((response) => {
    //       $log.log(response);
    //       vm.links = response.data;
    //     });
    // };

    vm.logout = () => {
      $log.log('logout');
      $http.post('/api/logout')
        .then(() => {
          userSession.currentUser = null;
          $location.url('/login');
        });
    };
// delete
    vm.deleteBookmark = function(obj_url) {
      console.log("delete");
      console.log(obj_url);
      // change to database
      const stringJSON = {
        url: obj_url,
      };
      console.log(stringJSON);
      bookmarkFactory.delete(stringJSON)
      .then(() => {
        vm.getLinks();
      });

      // document.getElementById(obj_title).parentNode.remove();
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
