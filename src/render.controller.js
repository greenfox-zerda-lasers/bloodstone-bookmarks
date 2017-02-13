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

  angular.module('app').controller('RenderController', ['$scope', '$rootScope', '$http', '$location', function ($scope, $rootScope, $http, $location) {
    $scope.dummyLinks = links;
    $scope.logout = () => {
      $http.post('/api/logout')
        .then(() => {
          $rootScope.currentUser = null;
          $location.url('/home');
        });
    };
  }]);
}());
