(function () {
  const links = [  // temporily mock received data from server
    {
      title: 'Bloodstone',
      url: 'http://bloodstonedevelopment.tk/',
    },
    {
      title: 'Github',
      url: 'https://github.com/',
    },
    {
      title: 'hvg.hu',
      url: 'http://hvg.hu',
    },
    {
      title: 'Green Fox Academy',
      url: 'http://greenfoxacademy.com',
    },
    {
      title: 'Angular JS',
      url: 'https://angularjs.org/',
    },
    {
      title: 'Origo',
      url: 'http://origo.hu',
    },
    {
      title: 'b.hu',
      url: 'http://b.hu',
    },
    {
      title: 'JS Garden',
      url: 'http://bonsaiden.github.io/JavaScript-Garden/',
    },
  ];

<<<<<<< HEAD:src/bookmarks.controller.js
  const app = angular.module('app');

  app.controller('BookmarksController', ['$scope', '$rootScope', '$http', '$location', '$log', 'bookmarkFactory', function ($scope, $rootScope, $http, $location, $log, bookmarkFactory) {
    $scope.dummyLinks = links;
    $scope.showInputBox = false;
    $scope.logout = function () {
=======
  angular.module('app').controller('RenderController', ['$scope', '$rootScope', '$http', '$location', function ($scope, $rootScope, $http, $location) {
    $scope.dummyLinks = links;
    $scope.logout = () => {
>>>>>>> master:src/render.controller.js
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
        title: 'My Bookmark',
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
