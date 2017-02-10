(function () {
  const links = [  // temporily mock received data from server
    {
      "title":"Bloodstone",
      "url":"http://bloodstonedevelopment.tk/"
    },
    {
      "title":"Github",
      "url":"https://github.com/"
    },
    {
      "title":"hvg.hu",
      "url":"http://hvg.hu"
    },
    {
      "title":"Green Fox Academy",
      "url":"http://greenfoxacademy.com"
    },
    {
      "title":"Angular JS",
      "url":"https://angularjs.org/"
    },
    {
      "title":"Origo",
      "url":"http://origo.hu"
    },
    {
      "title":"b.hu",
      "url":"http://b.hu"
    },
    {
      "title":"JS Garden",
      "url":"http://bonsaiden.github.io/JavaScript-Garden/"
    }
  ];

  const app = angular.module('app');

  app.controller('RenderController', ['$scope', '$rootScope', '$http', '$location', function ($scope, $rootScope, $http, $location) {
    $scope.dummyLinks = links;
    $scope.logout = function () {
      $http.post('/api/logout')
        .then(function () {
          $rootScope.currentUser = null;
          $location.url('/home');
        });
    };
  }]);
}());
