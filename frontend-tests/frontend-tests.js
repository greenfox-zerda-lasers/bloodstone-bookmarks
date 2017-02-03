describe('Testing the test', function () {
  it('has a dummy spec to test 2 + 2', function () {
    expect(2 + 2).toEqual(4);
  });
});

describe('Login controller', function() {

  var httpBackend
  var LoginController

  beforeEach(function () {
    // angular.mock.module('app'));
    module('app');

    inject(function ($controller, $httpBackend) {
      httpBackend = $httpBackend;
      LoginController = $controller('LoginController');

    });
  });

  describe('login', function () {
    it('should be defined', function() {
      expect(LoginController.message).toEqual('pince');
    });
  })
});
