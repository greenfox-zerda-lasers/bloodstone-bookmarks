describe('Testing the test', function () {
  it('has a dummy spec to test 2 + 2', function () {
    expect(2 + 2).toEqual(4);
  });
});

describe('Registration controller', function() {

  var httpBackend;
  var RegistrationController;

  beforeEach(function () {
    // angular.mock.module('app'));
    angular.mock.module('app');

    inject(function ($controller, $httpBackend) {
      httpBackend = $httpBackend;
      RegistrationController = $controller('RegistrationController');

    });
  });

  describe('register', function () {
    it('Should be defined', function() {
      expect(RegistrationController.message).toEqual('pince');
    });
  })
});
